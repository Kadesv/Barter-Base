import { Router } from 'express';
import { Post, User, Favorites} from '../models/index.js';
const postRouter = Router();

postRouter.get('/browse', async (req, res) => {
  res.json(await Post.findAll({
    include:{
      model: User
    }
  }));
});

postRouter.get('/account',async (req, res) => {
  const { userId } = req.session;
  const posts = (await Post.findAll({
    where:{
      userId: userId
    }
  }));
  const favorites = (await Favorites.findAll({
    where:{
      userId: userId
    }
  }));
res.json({posts, favorites});

});



// postRouter.get('/:postId', async (req, res) => {
//   const { postId } = req.params;
//   const post = await Post.findByPk(postId);
 

//   res.json({post});
// });


// postRouter.post('/new', async (req, res) => {
//   const { userId } = req.session;
//   const {title, context} = req.body;
//   if(title && context && userId){
//   await Post.create({title, context, userId});
//   res.json({success: true})}
//  else{
//   res.json({success: false})};
//  }
// )

// postRouter.put('/save', async (req, res) => {
//   const { userId } = req.session;
//   const {title, context, postId} = req.body;

//   if(title && context && userId && postId){
//   await Post.update({title, context},{
//     where:{
//       postId
//     }
//   })
//   res.json({success: true})}
//  else{
//   res.json({success: false})
// }
//  }
// )

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