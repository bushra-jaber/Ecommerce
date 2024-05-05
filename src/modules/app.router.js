
import cors from 'cors'
import categoryRouter from './category/category.router.js';
import productRouter from './product/product.router.js';
import authRouter from './auth/auth.router.js';
import connectDB from '../../DB/connection.js';
import { globalErrorHandler } from '../utls/errorHandling.js';


 const initApp=(app,express)=>{
  connectDB();
  app.use(cors());
 app.use(express.json());
 app.get('/',(req,res)=>{
    return res.status(200).json({message:"welcome"});
 });


app.use('/categories',categoryRouter);
app.use('/auth',authRouter)
app.use('/products',productRouter);

app.use('*',(req,res)=>{
    return res.status(404).json({message:"page not found"});
 })
 app.use(globalErrorHandler);
}
export default initApp;