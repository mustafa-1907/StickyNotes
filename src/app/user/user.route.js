import {Router} from 'express';
import * as userController from './controller/user.controller.js'
const userRouter = Router();

userRouter.patch('/:id',userController.updateUser)

userRouter.delete('/delete/:id',userController.deleteUserById)
userRouter.get('/:id',userController.getUserById);
export default userRouter;