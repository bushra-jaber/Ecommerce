import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";


export const createCategories=async(req,res,next)=>{
   const name =req.body.name.toLowerCase();
   if(await categoryModel.findOne({name})){
    return next(new Error (`category name already exists`, { cause: 409 }));
   }
   const { secure_url, public_id } = await cloudinary.uploader.upload( req.file.path,
    {folder: `${process.env.APP_NAME}/categories` });
    
    const category=await categoryModel.create({name,slug:slugify(name),image:{ secure_url, public_id}});
    return res.status(201).json({ message: 'success', category });

}