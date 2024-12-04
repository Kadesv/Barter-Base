import { Router } from "express";
import { User, Chat, Message } from '../models/index.js';
import { Op } from "sequelize";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

// Create new chat
chatRouter.post('/new', isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { message, postOwner } = req.body;

  const checkForChat = await Chat.findOne({
    where: {
      [Op.or]: [{ user1Id: userId, user2Id: postOwner.userId }, { user1Id: postOwner.userId, user2Id: userId }],
    }
  });
  if (checkForChat) {
    const newMessage = await Message.create({
      chatId: checkForChat.chatId,
      userId: userId,
      messageText: message
    });
    if (newMessage) {
      res.json({ success: true, newMessage });
    }
  } else {
    const findUser = await User.findByPk(userId);
    const newChat = await Chat.create({
      user1Name: findUser.firstName,
      user1Id: userId,
      user2Name: postOwner.firstName,
      user2Id: postOwner.userId
    });
    const newMessage = await Message.create({
      chatId: newChat.chatId,
      userId: userId,
      messageText: message
    });

    if (newChat && newMessage) {
      res.json({ success: true, newChat, newMessage });
    }
  }
});

// Delete message(s)
chatRouter.put('/delete/:chatId', isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { chatId, user1DelDate, user2DelDate, user1Id, user2Id } = req.params;
  const newDate = new Date();

  if (userId === user1Id) {
    await Chat.update({ user1DelDate: newDate }, { where: { chatId } });

    if (user2DelDate !== null) {
      await Message.destroy({
        where: { createdAt: { [Op.lt]: user2DelDate } }
      });
    }

    res.json({ success: true });
  } else if (userId === user2Id) {
    await Chat.update({ user2DelDate: newDate }, { where: { chatId } });
    
    if (user1DelDate !== null) {
      await Message.destroy({
        where: { createdAt: { [Op.lt]: user1DelDate } }
      });
    }

    res.json({ success: true });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Open chat page
chatRouter.get('/:chatId', isAuthenticated, async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.session;

  const chatInfo = await Chat.findByPk(chatId);
  if (!chatInfo) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const userDelDate = chatInfo.user1Id === userId ? chatInfo.user1DelDate : chatInfo.user2DelDate;

  const chatMessages = await Message.findAll({
    where: {
      chatId: chatId,
      ...(userDelDate ? { createdAt: { [Op.gt]: userDelDate } } : {})
    }
  });

  res.json({ chatInfo, chatMessages, userId });
});

// Send message
chatRouter.post('/msg', isAuthenticated, async (req, res) => {
  const { chatId, messageInput } = req.body;
  const { userId } = req.session;

  const newMessage = await Message.create({
    chatId: chatId,
    userId: userId,
    messageText: messageInput
  });
  
  if (newMessage) {
    res.json({ success: true, newMessage });
  }
});

export default chatRouter;
