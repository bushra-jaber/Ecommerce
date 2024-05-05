import {Router} from 'express';
import * as AuthController from './auth.controller.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';



const router = Router();
router.get('/getUser',auth(['User']), AuthController.getUsers);
router.post('/signup',fileUpload(fileValidation.image).single('image'),
asyncHandler(AuthController.signUp));
router.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))
router.post('/signin',asyncHandler(AuthController.signIn));
router.patch('/sendCode',asyncHandler(AuthController.sendCode));
router.patch('/forgotPass',asyncHandler(AuthController.forgotPassword));
router.delete('/invalidConfirm',asyncHandler(AuthController.deleteInvalidConfirm));
export default router;