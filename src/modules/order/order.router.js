import {Router} from 'express';
import * as orderController from './order.controller.js';
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import { endpoints } from './order.endPoint.js';


const router = Router();
router.post('/',auth(endpoints.create),asyncHandler(orderController.createOrder))
router.get('/AllOrder',auth(endpoints.getAll),asyncHandler(orderController.getallOrder));
router.get('/orderUser',auth(endpoints.orderUser),asyncHandler(orderController.getOrderUser));
router.patch('/:orderId',auth(endpoints.updateOrder),asyncHandler(orderController.changeStatus));
export default router;