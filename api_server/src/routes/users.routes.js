import express from 'express';
import userController from '../controller/user.controller.js';


const router = express.Router();

router.post('/', userController.userLogin)
router.post('/signup', userController.userSignaup)

export default router;