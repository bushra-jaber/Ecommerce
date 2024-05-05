import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import { auth } from '../../middleware/auth.js';


const router = Router();
router.post('/',auth(),fileUpload(fileValidation.image).single('image'),
asyncHandler(categoryController.createCategories));
router.get('/',asyncHandler(categoryController.getAllCategories));
router.get('/ActiveCategory',asyncHandler(categoryController.getActiveCategories));
router.get('/:id',asyncHandler(categoryController.getDetailsCategories));
router.patch('/:id',auth(),fileUpload(fileValidation.image).single("image"),asyncHandler(categoryController.updateCategories))
router.delete('/:id',auth(),asyncHandler(categoryController.deleteCategories))
export default router;