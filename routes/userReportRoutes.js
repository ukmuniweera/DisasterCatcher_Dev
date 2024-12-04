import express from 'express';
import { 
  createUserReport, 
  getUserReports, 
  getUserReportById, 
  updateUserReport, 
  deleteUserReport 
} from '../controllers/userReportController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createUserReport);
router.get('/', getUserReports);
router.get('/:id', getUserReportById);
router.put('/:id', updateUserReport);
router.delete('/:id', deleteUserReport);

export default router;
