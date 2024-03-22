import { Router } from "express";
import { User } from "../models/index.js";

const authRoutes = Router();

authRoutes.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  // if (user && user.password === password) {
  if (user.password === password) {
    req.session.userId = user.userId;
    res.json({ success: true, user });
    console.log(user.firstName);
  } else {
    res.json({ success: false });
  }
});

authRoutes.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  const checkUsername = await User.findOne({ where: { username: username } });

  if (checkEmail || checkUsername) {
    res.json({ success: false });
  }
  else if (email && password && username) {
    const user = await User.create({ username, email, password })
    req.session.userId = user.Id;
    res.json({ success: true, user })
  }
  else {
    res.json({ success: false });

  }
});

// ADDING A USER

authRoutes.post('/api/signUp', async (req, res) => {
  const { firstName, lastName, city, state, email, password } = req.body;
  const checkEmail = await User.findOne({ where: { email: email } });
  const checkPassword = await User.findOne({ where: { password: password } });
  const message = "";

  if (checkEmail) {
    res.json({ sucess: false, message: "A user with that email already exists." });
  } else if (firstName && lastName && city && state && email && password) {
    const user = await User.create({ firstName, lastName, city, state, email, password })
    req.session.userId = user.Id;
    res.json({ sucess: true, user });
  } else {
    res.json({ sucess: false, message: "Sorry, it looks like something went wrong." });
  }
});

authRoutes.post('/api/checkss', async (req, res) => {
  const { userId } = req.session
  if (userId) {
    const user = await User.findOne({ where: { userId: userId } });
    res.json({ success: true, user });
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