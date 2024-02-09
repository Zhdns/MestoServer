import { Router } from 'express';
import userController from '../controllers/userController';

const userRoute = Router();

userRoute.post('/users', userController.newUser);
userRoute.get('/users', userController.getAllUsers);
userRoute.patch('/users/me', userController.updateName);
userRoute.patch('/users/me/avatar', userController.updateAvatar);
userRoute.get('/users/:userId', userController.getUserByID);

export default userRoute;
