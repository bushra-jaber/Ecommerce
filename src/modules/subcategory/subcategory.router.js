import {Router} from 'express';
import * as subcategoryController from './subcategory.controller.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { asyncHandler } from '../../utls/errorHandling.js';

import { auth } from '../../middleware/auth.js';
import { endPoint } from './subcategory.endPoint.js';

const router =Router({mergeParams:true});

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),
asyncHandler(subcategoryController.createSubCategory));
router.get('/',auth(endPoint.getAll),asyncHandler(subcategoryController.getAllSubCategories))
router.get('/getActive/:id',asyncHandler(subcategoryController.getActivesubCategory))
router.get('/getSpecific/:id',asyncHandler(subcategoryController.getDetailsubCategories));
router.patch('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single("image"),asyncHandler(subcategoryController.updatesubCategories))
router.delete('/:id',auth(endPoint.delete),asyncHandler(subcategoryController.deletesubCategories))
export default router;