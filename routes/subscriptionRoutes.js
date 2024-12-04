import express from 'express';
import { 
  createSubscription, 
  getSubscriptions, 
  getSubscriptionById, 
  updateSubscription, 
  deleteSubscription 
} from '../controllers/subscriptionController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createSubscription);
router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
