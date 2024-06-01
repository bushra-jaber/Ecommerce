import couponModel from "../../../DB/model/coupn.model.js";

export const createCoupon=async(req,res,next)=>{
    const {name,amount}=req.body;
    if(await couponModel.findOne({name})){
        return res.status(409).json({message:`coupon ${name} already exist`});
    }
   req.body.expireDate=new Date(req.body.expireDate);
   const coupon= await couponModel.create(req.body);
   return res.status(201).json({message:"success",coupon});
}