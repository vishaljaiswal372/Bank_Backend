import {Router} from 'express';
import {RegisterUser,
    LoginUser,
    LogOutUser,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const UserRouter=Router();

// UserRouter.route('/register').post(RegisterUser);

UserRouter.post('/register',RegisterUser);
UserRouter.post('/login',LoginUser);
UserRouter.post('/logout',authMiddleware,LogOutUser);


export default UserRouter;