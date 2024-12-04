import express from 'express';
import { 
  createFeedback, 
  getFeedbacks, 
  getFeedbackById, 
  updateFeedback, 
  deleteFeedback 
} from '../controllers/feedbackController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.get('/:id', getFeedbackById);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router;
