import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import { auth } from '../../middleware/auth.js';
import subcategoryRouter from './../subcategory/subcategory.router.js'
import { endPoint } from './category.endPoint.js';

const router = Router();
router.use('/:categoryId/subcategory',subcategoryRouter)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),
asyncHandler(categoryController.createCategories));
router.get('/',auth(endPoint.getAll),asyncHandler(categoryController.getAllCategories));
router.get('/ActiveCategory',asyncHandler(categoryController.getActiveCategories));
router.get('/:id',asyncHandler(categoryController.getDetailsCategories));
router.patch('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single("image"),asyncHandler(categoryController.updateCategories))
router.delete('/:id',auth(endPoint.delete),asyncHandler(categoryController.deleteCategories))
export default router;