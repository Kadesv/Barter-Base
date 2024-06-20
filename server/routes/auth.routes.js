import { Router } from "express";
import { User, Favorites, Post, Chat, Message } from "../models/index.js";
import { Op } from 'sequelize';
const authRoutes = Router();

authRoutes.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email },include:{model: Post } });
console.log(user)
  if (user && user.password === password) {

    req.session.userId = user.userId;
    const favorites = await Favorites.findAll({
      where: {
        userId: user.userId
      },
      include: {
        model: Post
      }
    })
    const rooms = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: user.userId }, { user2Id: user.userId }],
      },
      include: {
        model: Message,
      }
    })
    res.json({ success: true, user, favorites, rooms});
  } else {
    res.json({ success: false });
  }
});
// new user
authRoutes.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, preferredName, city, state, zipCode } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  if (checkEmail !== null) {
    res.json({ success: false });
  }
  else if (email && password && firstName && lastName && preferredName && city && state && zipCode) {
    const user = await User.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      preferredName: preferredName,
      city: city,
      state: state,
      zipCode: zipCode
    })
    console.log(user);
    req.session.userId = user.userId;
    res.json({ success: true, user })
  }
  else {
    res.json({ success: false });

  }
});


authRoutes.post('/api/checkss', async (req, res) => {
  const { userId } = req.session
  if (userId) {
    const user = await User.findOne({ where: { userId: userId } });

    const favorites = await Favorites.findAll({
      where: {
        userId: userId
      },
      include: {
        model: Post
      }
    })
    const rooms = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        model: Message,
      }
    })
    res.json({ success: true, user, favorites, rooms });
  }
  else {
    res.json({ success: false });
  }
})

authRoutes.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

export default authRoutes;
