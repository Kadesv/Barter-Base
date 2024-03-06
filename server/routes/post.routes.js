import { Router } from 'express';
import { Post, User } from '../models/index.js';
const postRouter = Router();

postRouter.get('/browse', async (req, res) => {
  res.json(await post.findAll({
    include:{
      model: User
    }
  }));
});

postRouter.get('/account',async (req, res) => {
  const { userId } = req.session;
  res.json(await post.findAll({
    where:{
      userId: userId
    }
  }));
});



postRouter.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);
 

  res.json({post});
});


postRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const {title, context} = req.body;
  if(title && context && userId){
  await post.create({title, context, userId});
  res.json({success: true})}
 else{
  res.json({success: false})};
 }
)

postRouter.put('/save', async (req, res) => {
  const { userId } = req.session;
  const {title, context, postId} = req.body;

  if(title && context && userId && postId){
  await post.update({title, context},{
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