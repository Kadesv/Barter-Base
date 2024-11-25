import { Router } from 'express';
import { Post, User, Favorite, Category, SubCategory } from '../models/index.js';
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const postRouter = Router();

//get all posts for browser page
postRouter.get('/browse', async (req, res) => {
  const { userId } = req.session;

  try {
    // Fetch all posts
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['userId'], // Include only necessary fields
      },
    });
    // If user is logged in, fetch their favorites
    let userFavorites = [];
    if (userId) {
      userFavorites = await Favorite.findAll({
        where: { userId },
        include: { model: Post },
      });
    }

    // Always return posts; include favorites if user is logged in
    res.status(200).json({ posts, userFavorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


// Get all categories and subcategories
postRouter.get('/getCategories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: SubCategory },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get user's favorites
postRouter.get('/getFavorites', isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    const favorites = await Favorite.findAll({
      where: { userId },
      include: { model: Post },
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Get a single post by ID
postRouter.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create a new post
postRouter.post('/create', isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { title, context, price, image, selectedCategory, selectedSubCategory } = req.body;

  if (!title || !context || !price || !image || !selectedCategory || !selectedSubCategory) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const newPost = await Post.create({
      title,
      price: parseFloat(price),
      context,
      image,
      userId,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
    });
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

// Update an existing post
postRouter.put('/save', isAuthenticated, async (req, res) => {
  const { title, context, postId, image, selectedCategory, selectedSubCategory } = req.body;

  if (!title || !context || !postId) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const updatedPost = await Post.update(
      { title, context, image, categoryId: selectedCategory, subCategoryId: selectedSubCategory },
      { where: { id: postId }, returning: true }
    );

    if (updatedPost[0] > 0) {
      res.status(200).json({ success: true, post: updatedPost[1][0] });
    } else {
      res.status(404).json({ success: false, error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
});

// Add or remove a favorite
postRouter.post('/favorite/:postId', isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { postId } = req.params;

  try {
    await sequelize.transaction(async (transaction) => {
      const favorite = await Favorite.findOne({
        where: { userId, postId },
        transaction,
      });

      if (favorite) {
        await favorite.destroy({ transaction });
      } else {
        await Favorite.create({ userId, postId }, { transaction });
      }

      const userFavorites = await Favorite.findAll({
        where: { userId },
        include: { model: Post },
        transaction,
      });

      res.status(200).json(userFavorites);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
});

// Delete a post
postRouter.delete('/delete/:postId', isAuthenticated, async (req, res) => {
  const { postId } = req.params;

  try {
    const deleted = await Post.destroy({
      where: { id: postId },
    });

    if (deleted) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
});

export default postRouter;
