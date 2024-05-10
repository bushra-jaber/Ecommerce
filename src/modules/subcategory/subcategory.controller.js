import slugify from "slugify";
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";
import { pagination } from "../../utls/pagination.js";



export const createSubCategory = async (req, res) => {
    const name = req.body.name.toLowerCase();
    const { categoryId } = req.body;
    const subcategory = await subcategoryModel.findOne({ name });
    if (subcategory) {
        return res.status(409).json({ message: `sub category ${name} already exists` })
    }
    const category = await categoryModel.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: "category not found" });
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/subcategories`
    })
    const subCategory = await subcategoryModel.create({
        name, slug: slugify(name), categoryId, image: { secure_url, public_id },
        createdBy: req.user._id,
        updatedBy: req.user._id,
    });
    return res.status(201).json({ message: "success", subCategory });
}
export const getAllSubCategories = async (req, res) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    const { categoryId } = req.params
    const category = await categoryModel.findById(categoryId).skip(skip)
        .limit(limit);
    if (!category) {
        return res.status(404).json({ message: "category not found" });
    }
    const subcategory = await subcategoryModel.find({ categoryId }).populate({
        path: 'categoryId'
    });
    return res.status(200).json({ message: "success", count: subcategory.length, subcategory });
}
export const getActivesubCategory = async (req, res, next) => {
    const categoryId = req.params;
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    const subcategory = await subcategoryModel.find({ categoryId, status: 'Active' }).skip(skip)
        .limit(limit).select('name image');

    if (!subcategory) {
        return next(new Error(`subcategory not found`, { cause: 404 }));
    }
    return res.status(200).json({ message: "success", count: subcategory.length, subcategory });
}
export const getDetailsubCategories = async (req, res, next) => {
    const subcategory = await subcategoryModel.findById(req.params.id);
    if (!subcategory) {
        return next(new Error(`subcategory not found`, { cause: 404 }));
    }
    return res.status(200).json({ message: "success", subcategory });
}
export const updatesubCategories = async (req, res, next) => {
    const subcategory = await subcategoryModel.findById(req.params.id);
    if (!subcategory) {
        return res.status(404).json({ message: `invalid subcategory id ${req.params.id}` });
    }
    subcategory.name = req.body.name.toLowerCase();
    if (await subcategoryModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } })) {
        return next(new Error(`subcategory ${req.body.name} already exists`, { cause: 409 }),
        );
    }
    subcategory.slug = slugify(req.body.name);
    subcategory.status = req.body.status;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path, { folder: `${process.env.APP_NAME}/subcategories` },
        );
        await cloudinary.uploader.destroy(subcategory.image.public_id);
        subcategory.image = { secure_url, public_id };
    }
    subcategory.updatedBy = req.user._id;
    await subcategory.save();
    return res.status(200).json({ message: 'success' });
}
export const deletesubCategories = async (req, res, next) => {
    const subcategory = await subcategoryModel.findByIdAndDelete(req.params.id);
    if (!subcategory) {
        return next(new Error(`subcategroy not found`, { cause: 404 }));
    }
    await cloudinary.uploader.destroy(subcategory.image.public_id);
    return res.status(200).json({ message: 'success' });
}   
