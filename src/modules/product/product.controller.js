import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import productModel from "../../../DB/model/product.model.js";
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from "../../utls/cloudinary.js";
export const getproduct=async(req,res)=>{
    return res.json({message:"success"})
}
export const createProduct = async (req,res)=>{
    const {name,price,discount,categoryId,subcategoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    if(!checkCategory) {
        return res.status(404).json({message:"category not found"});
    }
    const checkSubCategory = await subcategoryModel.findById(subcategoryId);
    if(req.body.subcategoryId){

        if(!checkSubCategory) {
            return res.status(404).json({message:"sub category not found"});
        }
    }
    
    req.body.slug = slugify(name);
    req.body.finalPrice = price - (price * (discount || 0) / 100).toFixed(2);
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.APP_NAME}/product/${req.body.name}/mainImages`});
    req.body.mainImage ={secure_url,public_id};
    req.body.subImages = [];
    for(const file of req.files.subImages){
        const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.APP_NAME}/product/${req.body.name}/subimages`});
            req.body.subImages.push({secure_url,public_id});
        }
    req.body.createdBy = req.user._id;
    req.body.updatedBy= req.user._id;
    const product =await productModel.create(req.body);
    if(!product){
        return res.status(400).json({message:"error while creating product"});
    }
    return res.status(201).json({message:"success",product});
}
