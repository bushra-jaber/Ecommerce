import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { asyncHandler } from '../../utls/errorHandling.js';


const router = Router();
router.post('/',fileUpload(fileValidation.image).single('image'),
asyncHandler(categoryController.createCategories));

export default router;