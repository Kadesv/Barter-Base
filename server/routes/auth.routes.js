import { Router } from "express";
import { User, Favorites, Post, Chat, Message } from "../models/index.js";
import { Op } from 'sequelize';
const authRoutes = Router();

authRoutes.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email }});
  if (user && user.password === password) {

    req.session.userId = user.userId;
    const favorites = await Favorites.findAll({
      where: {
        userId: user.userId
      },
      include:{
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
    res.json({ success: true, user, favorites, rooms });
  } else {
    res.json({ success: false });
  }
});
// new user
authRoutes.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, city, state, zipCode } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  if (checkEmail !== null) {
    res.json({ success: false });
  }
  else if (email && password && firstName && lastName && city && state && zipCode) {
    const user = await User.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      city: city,
      state: state,
      zipCode: zipCode
    })
    req.session.userId = user.userId;
    res.json({ success: true, user })
  }
  else {
    res.json({ success: false });

  }
});


authRoutes.post('/api/authCheck', async (req, res) => {
  const {message} = req.body
  const { userId } = req.session
  // console.log(message)
  if (userId) {
    const user = await User.findOne({
      where: { userId: userId },
      include: {
        model: Post
      }
    });
    // console.log(user)


    const favorites = await Favorites.findAll({
      where: {
        userId: userId
      },
      include:{
        model: Post
      }
    })
    console.log(favorites)
    const rooms = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        model: Message,
      }
    })
    // console.log(rooms)
    res.json({ success: true, user, favorites, rooms, });
  }
  else {
    res.json({ success: false });
  }
})

authRoutes.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});


authRoutes.get('/api/accountInfo', async (req, res) => {
  const { userId } = req.session;
  if(userId === undefined){
    res.json({success: false})
  }
  const user = await User.findOne({
    where: { userId: userId },
    include: {
      model: Post
    }
  })
  res.json({user}) 
})

export default authRoutes;
