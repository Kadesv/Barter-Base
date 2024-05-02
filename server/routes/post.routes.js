import { Router } from 'express';
import { Post, User, Favorites, Category, SubCategory } from '../models/index.js';
const postRouter = Router();

postRouter.get('/browse', async (req, res) => {
  const { userId } = req.session;

  const posts = await Post.findAll({
    include: {
      model: User
    }
  })
  if (userId) {
    const userFavorites = await Favorites.findAll({
      where: {
        userId: userId
      }
    })

    res.json({ posts, userFavorites })

  } else {
    res.json({ posts })
  }
});


postRouter.get('/getCategories', async (req, res) => {

  res.json(await Category.findAll({
    include: {
      model: SubCategory
    }
  }));

})

postRouter.get('/account', async (req, res) => {
  const { userId } = req.session;
  const posts = (await Post.findAll({
    where: {
      userId: userId
    }
  }));
  const user = (await User.findByPk(userId));

  const favorites = (await Favorites.findAll({
    where: {
      userId
    }
  }));
  res.json({ success: true, posts, user, favorites });
});

postRouter.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  res.json(await Post.findByPk(postId));
});

postRouter.post('/create', async (req, res) => {
  const { userId } = req.session;
  const { title, context, price, image, selectedSubCategory } = req.body;
  const newPost = await Post.create({
    title: title,
    price: price,
    context: context,
    image: image,
    userId: userId,
    subCategoryId: selectedSubCategory
  })
  if (newPost) {
    res.json({ success: true })
  }
  else {
    res.json({ success: false });
  }
});

postRouter.put('/save', async (req, res) => {
  const { userId } = req.session;
  const { title, context, postId } = req.body;

  if (title && context && userId && postId) {
    await Post.update({ title, context }, {
      where: {
        postId
      }
    })
    res.json({ success: true })
  }
  else {
    res.json({ success: false })
  }
}
)
postRouter.post('/favoriting/:postId', async (req, res) => {
  const { userId } = req.session;
  const { postId } = req.params;
  if(userId && postId){
   await Favorites.create({
      where: {
        postId: postId,
        userId: userId
      }
    })
    res.json({ success: true });
  } else{
    res.json({ success : false })
  }
})

postRouter.delete('/favorite/delete/:postId', async (req, res) => {
  const { userId } = req.session
  const { postId } = req.params;
if(userId && postId){
  await Favorites.destroy({
    where: {
      postId: postId,
      userId: userId
    }
  })
  res.json({ success: true });
} else{
  res.json({ success : false })
}
});

postRouter.delete('/delete/:postId', async (req, res) => {
const {postId} = req.params;
await Post.destroy({
  where:{
    postId
  }
})
  res.json({ success: true });
});

export default postRouter;