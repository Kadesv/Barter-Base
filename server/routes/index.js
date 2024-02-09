import { Router } from "express";

import forumRouter from "./forum.routes.js";
import authRoutes from "./auth.routes.js";
import commentsRouter from "./comment.routes.js";

const router = Router();

router.use('/api/forums', forumRouter);

router.use('', authRoutes);

router.use('/api/comments', commentsRouter);

export default router;
