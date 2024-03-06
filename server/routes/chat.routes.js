import { Router } from "express";
import { loginRequired } from "../middlewares/auth.middleware.js";
import { User, Chat } from '../models/index.js';
const chatRouter = Router()



// chatRouter.post('/new', loginRequired, async (req, res) => {
//   const { userId } = req.session;
//   const {postId} =req.body;
//   const user2Id = await Post.findByPk(postId).userId;
//   const newChat = await Chat.create(
//     { user1Id: userId, user2Id : user2Id }
//   );


//   res.json({ success: true, newChat: { ...newChat, user } });
// });

// chatRouter.post('/newsub', loginRequired, async (req, res) => {
//   const { userId } = req.session;
//   const { commentId, subCommentText } = req.body;
//   const newSubComment = await SubComment.create(
//     { userId: userId, commentId: commentId, subCommentText: subCommentText }
//   );
//   const user = await User.findByPk(newSubComment.userId);

//   res.json({ success: true, newSubComment: { ...newSubComment, user } });
// });

export default chatRouter;