import { Router } from "express";

import postRouter from "./post.routes.js";
import authRoutes from "./auth.routes.js";
import chatRouter from "./comment.routes.js";

const router = Router();

router.use('/api/post', postRouter);

router.use('', authRoutes);

router.use('/api/chat', chatRouter);

export default router;
