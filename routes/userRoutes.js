import express from 'express';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  loginUser 
} from '../controllers/userController.js';
import { protectRoute, verifyUserType } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);

router.use(protectRoute);

router.post('/', verifyUserType('admin'), createUser);
router.get('/', verifyUserType('admin'), getUsers);
router.get('/:id', getUserById);
router.put('/:id', verifyUserType('admin'), updateUser);
router.delete('/:id', verifyUserType('admin'), deleteUser);

export default router;
