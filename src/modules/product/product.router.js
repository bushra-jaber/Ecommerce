import {Router} from 'express';
import * as productController from './product.controller.js';
import fileUpload, { fileValidation } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoint } from './product.endPoint.js';


const router = Router();
router.get('/',productController.getproduct);
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4},
]),productController.createProduct)
export default router;