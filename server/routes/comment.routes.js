import { Router } from "express";
import { loginRequired } from "../middlewares/auth.middleware.js";
import { User, Comment, SubComment } from '../models/index.js';
const commentsRouter = Router()



commentsRouter.post('/new', loginRequired, async (req, res) => {
  const { userId } = req.session;
  const { forumId, commentText } = req.body;
  const newComment = await Comment.create(
    { userId: userId, forumId: forumId, commentText: commentText }
  );
  const user = await User.findByPk(newComment.userId);

  res.json({ success: true, newComment: { ...newComment, user } });
});

commentsRouter.post('/newsub', loginRequired, async (req, res) => {
  const { userId } = req.session;
  const { commentId, subCommentText } = req.body;
  const newSubComment = await SubComment.create(
    { userId: userId, commentId: commentId, subCommentText: subCommentText }
  );
  const user = await User.findByPk(newSubComment.userId);

  res.json({ success: true, newSubComment: { ...newSubComment, user } });
});

export default commentsRouter;