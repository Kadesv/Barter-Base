import { Router } from "express";
import { User, Chat, Message } from '../models/index.js';
import { Op } from "sequelize";
const chatRouter = Router()


//create new chat
chatRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const { message, postOwner } = req.body;

  const checkForChat = await Chat.findOne({
    where: {
      [Op.or]: [{ user1Id: userId, user2Id: postOwner.userId }, { user1Id: postOwner.userId, user2Id: userId }],
    }
  })
  if (checkForChat) {
    const newMessage = await Message.create({
      chatId: checkForChat.chatId,
      userId: userId,
      messageText: message
    })
    if (checkForChat && newMessage) {
      res.json({
        success: true,
        newMessage
      })
    }
    } else {
      const findUser = await User.findByPk(userId);
      const newChat = await Chat.create({
        user1Name: findUser.firstName,
        user1Id: userId,
        user2Name: postOwner.firstName,
        user2Id: postOwner.userId
      })
      const newMessage = await Message.create({
        chatId: newChat.chatId,
        userId: userId,
        messageText: message
      })

      if (newChat && newMessage) {
    res.json({
      success: true,
      newChat,
      newMessage
    })
    }
    }
  });


//open chat page
chatRouter.get('/:chatId', async (req, res) => {
  const { chatId } = req.params;
  res.json(await Chat.findOne({
    where: {
      chatId: chatId,
    },
    include: {
      model: Message
    }
  })
  )
});


//send message
chatRouter.post('/msg', async (req, res) => {
  const { chatId, message } = req.body;
  const { userId } = req.session
  // console.log(chatId, message)
  const newMessage = await Message.create({
    chatId: chatId,
    userId: userId,
    messageText: message
  })
  if (newMessage) {
    res.json({ success: true, newMessage })
  }
})

export default chatRouter;