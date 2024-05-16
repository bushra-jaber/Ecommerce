import {Router} from 'express'
import * as cartController from './cart.controller.js';
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import { endpoints } from './cart.endPoint.js';

const router = Router();

router.get('/',auth(endpoints.get),asyncHandler(cartController.getCart));
router.post('/',auth(endpoints.create),asyncHandler(cartController.createCart));
router.put('/clearCart',auth(endpoints.clear),asyncHandler(cartController.clearCart))
router.put('/:productId',auth(endpoints.delete),asyncHandler(cartController.removeItem));
router.put('/updateQuantity/:productId',auth(endpoints.update),asyncHandler(cartController.updateQuantity))
export default router;