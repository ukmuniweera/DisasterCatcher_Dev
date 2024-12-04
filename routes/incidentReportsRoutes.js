import express from 'express';
import { 
  createIncidentReport, 
  getIncidentReports, 
  getIncidentReportById, 
  updateIncidentReport, 
  deleteIncidentReport 
} from '../controllers/incidentReportsController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createIncidentReport);
router.get('/', getIncidentReports);
router.get('/:id', getIncidentReportById);
router.put('/:id', updateIncidentReport);
router.delete('/:id', deleteIncidentReport);

export default router;
