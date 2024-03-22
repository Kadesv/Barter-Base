import { Router } from 'express';
import { Post, User, Favorites, Category, SubCategory} from '../models/index.js';
const postRouter = Router();

postRouter.get('/browse', async (req, res) => {
  res.json( await Post.findAll({
    include:{
      model: User
    }
  }));
});

postRouter.get('/getCategories', async (req, res) => {

 res.json (await Category.findAll({
  include:{
    model: SubCategory
  }
 }));
  
})

postRouter.get('/account',async (req, res) => {
  const { userId } = req.session;
  const posts = (await Post.findAll({
    where:{
      userId: userId
    }
  }));
  const user = (await User.findByPk({
    where:{
      userId: userId
    }
  }));
  const favorites = (await Favorites.findAll({
    where:{
      userId: userId
    }
  }));
res.json({posts, user, favorites});

});



postRouter.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  res.json(await Post.findByPk(postId));
});


postRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const {title, context} = req.body;
  if(title && context && userId){
  await Post.create({title, context, userId});
  res.json({success: true})}
 else{
  res.json({success: false})};
 }
)

postRouter.put('/save', async (req, res) => {
  const { userId } = req.session;
  const {title, context, postId} = req.body;

  if(title && context && userId && postId){
  await Post.update({title, context},{
    where:{
      postId
    }
  })
  res.json({success: true})}
 else{
  res.json({success: false})
}
 }
)

// postRouter.delete('/delete/:postId', async (req, res) => {
// const {postId} = req.params;
// await Post.destroy({
//   where:{
//     postId
//   }
// })
//   res.json({ success: true });
// });

export default postRouter;