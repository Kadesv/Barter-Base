import { Router } from 'express';
import { loginRequired } from '../middlewares/auth.middleware.js';
import { Forum, Comment, SubComment, User } from '../models/index.js';
const forumRouter = Router();

forumRouter.get('/browse', async (req, res) => {
  res.json(await Forum.findAll({
    include:{
      model: User
    }
  }));
});

forumRouter.get('/account', loginRequired,async (req, res) => {
  const { userId } = req.session;
  res.json(await Forum.findAll({
    where:{
      userId: userId
    }
  }));
});



forumRouter.get('/:forumId', async (req, res) => {
  const { forumId } = req.params;
  const forum = await Forum.findByPk(forumId);
 
  const comments = await Comment.findAll({
    where:{
    forumId },
    include:[{
      model: User
      }, {
        model: SubComment
      }]
 });

  res.json({forum, comments});
});


forumRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const {title, context} = req.body;
  if(title && context && userId){
  await Forum.create({title, context, userId});
  res.json({success: true})}
 else{
  res.json({success: false})};
 }
)

forumRouter.put('/save', async (req, res) => {
  const { userId } = req.session;
  const {title, context, forumId} = req.body;

  if(title && context && userId && forumId){
  await Forum.update({title, context},{
    where:{
      forumId
    }
  })
  res.json({success: true})}
 else{
  res.json({success: false})
}
 }
)

forumRouter.delete('/delete/:forumId', async (req, res) => {
const {forumId} = req.params;
await Forum.destroy({
  where:{
    forumId
  }
})
  res.json({ success: true });
});

export default forumRouter;