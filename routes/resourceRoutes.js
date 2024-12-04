import express from 'express';
import { 
  createResource, 
  getResources, 
  getResourceById, 
  updateResource, 
  deleteResource 
} from '../controllers/resourceController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createResource);
router.get('/', getResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;
