import express from 'express';
import { 
  createLocation, 
  getLocations, 
  getLocationById, 
  updateLocation, 
  deleteLocation 
} from '../controllers/locationController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', createLocation);
router.get('/', getLocations);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
