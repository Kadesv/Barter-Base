import { Router } from "express";
import { User, Favorites, Post, Chat, Message } from "../models/index.js";
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import validator from 'validator';

const authRoutes = Router();
const saltRounds = 10;  // for bcrypt

// Login route
authRoutes.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided and in the correct format
  if (!email || !password || !validator.isEmail(email)) {
    console.log('email or password are invalid')
    return res.status(400).json({ success: false, message: "Invalid email or password format" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.userId;

      const favorites = await Favorites.findAll({
        where: { userId: user.userId },
        include: { model: Post },
      });
      
      const rooms = await Chat.findAll({
        where: { [Op.or]: [{ user1Id: user.userId }, { user2Id: user.userId }] },
        include: { model: Message },
      });

      const posts = await Post.findAll({ where: { userId: user.userId } });
      
      return res.json({ success: true, user, favorites, rooms, posts });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Registration route
authRoutes.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, city, state, zipCode } = req.body;

  // Basic input validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      city,
      state,
      zipCode,
    });

    req.session.userId = user.userId;
    return res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Auth check route
authRoutes.post('/api/authCheck', async (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  try {
    const user = await User.findOne({
      where: { userId },
      include: { model: Post },
    });

    const favorites = await Favorites.findAll({
      where: { userId },
      include: { model: Post },
    });

    const rooms = await Chat.findAll({
      where: { [Op.or]: [{ user1Id: userId }, { user2Id: userId }] },
      include: { model: Message },
    });

    const posts = await Post.findAll({ where: { userId } });

    return res.json({ success: true, user, favorites, rooms, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Logout route
authRoutes.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" });
    res.clearCookie('connect.sid');
    return res.json({ success: true });
  });
});

// Update user details route
authRoutes.put('/api/update', async (req, res) => {
  const { userId } = req.session;
  const { firstName, lastName, email, state, city, zipCode } = req.body;

  if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });
  if (!firstName || !lastName || !email || !validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid data provided" });
  }

  try {
    await User.update({ firstName, lastName, email, state, city, zipCode }, { where: { userId } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Account info route
authRoutes.get('/api/accountInfo', async (req, res) => {
  const { userId } = req.session;

  if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

  try {
    const user = await User.findOne({
      where: { userId },
      include: { model: Post },
    });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default authRoutes;
