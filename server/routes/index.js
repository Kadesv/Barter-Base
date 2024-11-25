import { Router } from "express";

import postRouter from "./post.routes.js";
import authRoutes from "./auth.routes.js";
import chatRouter from "./chat.routes.js";

const router = Router();

// Apply isAuthenticated middleware globally to routers that require protection
router.use('/api/posts', postRouter); // Public or partially protected routes
router.use('',  authRoutes); // Authentication routes (e.g., login, register)
router.use('/api/chat', chatRouter); // Chat routes require authentication

export default router;
