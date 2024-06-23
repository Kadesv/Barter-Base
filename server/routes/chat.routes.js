import { Router } from "express";
import { User, Chat, Message } from '../models/index.js';
import { Op } from "sequelize";
const chatRouter = Router()


//create new chat
chatRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const {message, postOwner} =req.body;
// console.log(message, postOwner.userId)
const checkForChat = await Chat.findOne({
  where:{
    [Op.or]: [{ user1Id: userId, user2Id:postOwner.userId }, { user1Id: postOwner.userId, user2Id: userId }],
  }
})
if(checkForChat){
  const newMessage = await Message.create({
    chatId: checkForChat.chatId,
    userId: userId,
    messageText: message
  })
  if(newChat && newMessage){
    res.json({
      success:true,
      newMessage
    })
  }
}else{
  const findUser = await User.findByPk(userId);
  const newChat = await Chat.create({
user1Name: findUser.pName,
user1Id: userId,
user2Name: postOwner.pName,
user2Id: postOwner.userId
  })
  const newMessage = await Message.create({
    chatId: newChat.chatId,
    userId: userId,
    messageText: message
  })
  
  if(newChat && newMessage){
    res.json({
      success:true,
      newChat,
      newMessage
    })
  }
}});


//open chat page
chatRouter.get('/:chatId', async (req, res) => {
  const { chatId } = req.params;
  console.log('hit')
  console.log(chatId)
 const chatInfo = await Chat.findOne({
  chatId:chatId
 });
 console.log(chatInfo)
res.json({chatInfo})
});  

export default chatRouter;