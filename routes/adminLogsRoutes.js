import express from 'express';
import { 
  createAdminLog, 
  getAdminLogs, 
  getAdminLogById, 
  updateAdminLog, 
  deleteAdminLog
} from '../controllers/adminLogsController.js';
import {
  protectRoute,
  verifyUserType
} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute, verifyUserType(["admin"]))

router.post('/', createAdminLog);
router.get('/', getAdminLogs);
router.get('/:id', getAdminLogById);
router.put('/:id', updateAdminLog);
router.delete('/:id', deleteAdminLog);

export default router;