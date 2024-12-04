import express from 'express';
import { 
  createWeatherData, 
  getWeatherData, 
  getWeatherDataById, 
  updateWeatherData, 
  deleteWeatherData
} from '../controllers/weatherDataController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectRoute, verifyUserType(["admin"]));

router.post('/', createWeatherData);
router.get('/', getWeatherData);
router.get('/:id', getWeatherDataById);
router.put('/:id', updateWeatherData);
router.delete('/:id', deleteWeatherData);

export default router;
