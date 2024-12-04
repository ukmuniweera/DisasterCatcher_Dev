import express from 'express';
import { 
  createNotification, 
  getNotifications, 
  getNotificationById, 
  updateNotification, 
  deleteNotification 
} from '../controllers/notificationController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
