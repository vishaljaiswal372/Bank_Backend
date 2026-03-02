import {Router} from 'express';
import { createAccount, 
    getAccountDetails } from '../controllers/account.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const AccountRouter=Router();

AccountRouter.post('/createAccount',authMiddleware,upload.fields([{
    name:"photo",
    maxCount:1,
},{
    name:"signature",
    maxCount:1,
}
]),createAccount);

AccountRouter.get('/accountDetails',authMiddleware,getAccountDetails);



export default AccountRouter;