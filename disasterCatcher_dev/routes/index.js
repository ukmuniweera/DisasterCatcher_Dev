import express from 'express';
import adminLogsRoutes from './adminLogsRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/adminLogs', adminLogsRoutes);
router.use('/user', userRoutes);

export default router;