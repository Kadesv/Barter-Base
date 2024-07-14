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
postRouter.get('/getFavorites', async (req, res) => {
  const { userId } = req.session
  if(userId){
res.json( await Favorites.findAll({
    where: {
      userId: userId
    },
    include:{
      model: Post
    }
  }))}

  else{
    res.json({message: 'no user'})
  }
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
  const { title, context, price, image, selectedCategory, selectedSubCategory } = req.body;
  const cat = JSON.parse(selectedCategory);
  const subCat = JSON.parse(selectedSubCategory);
  const numPrice = JSON.parse(price)
  console.log(req.body)
//   if(title && context && price && image && selectedCategory && selectedSubCategory){
//   const newPost = await Post.create({
//     title: title,
//     price: numPrice,
//     context: context,
//     image: image,
//     userId: userId,
//     categoryId: cat,
//     subCategoryId: subCat
//   })
//   if (newPost) {
//     console.log(newPost)
//     res.json({ success: true })
//   }
//   else {
//     res.json({ success: false });
//   }
// }else {
//   res.json({ success: false });
// }
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

postRouter.post('/favorite/:postId', async (req, res) => {
  const { userId } = req.session;
  const { postId } = req.params;
  const parsedPostId = JSON.parse(postId);
  const checkFavorite = await Favorites.findOne({
    where: {
      userId: userId,
      postId: parsedPostId
    }
  })
  if (checkFavorite === null) {
  await Favorites.create({
      postId: parsedPostId,
      userId: userId
    })
    res.json(await Favorites.findAll({
      where:{
        userId: userId
      },
      include:{
        model: Post
      }
    }))

  } else {
   await Favorites.destroy({
      where: {
        postId: parsedPostId,
        userId: userId
      }
    })
    res.json(await Favorites.findAll({
      where:{
        userId: userId
      },
      include:{
        model: Post
      }
    }))
  }
})


postRouter.delete('/delete/:postId', async (req, res) => {
  const { postId } = req.params;
  await Post.destroy({
    where: {
      postId
    }
  })
  res.json({ success: true });
});

export default postRouter;