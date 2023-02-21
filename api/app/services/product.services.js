const ProductModel = require("../model/product.model");
const Joi = require("joi");

class ProductServices {
    getAllProducts = async () => {
        try {
            let result = await CategoryModel.find()
                .populate("categories")
                .populate("brand")
                .populate("seller");
            return result;
        } catch (except) {
            throw except;
        }
    }
    validateData = async (data) => {
        try {
            let schema = Joi.object({
                title: Joi.string().required().min(3),
                image: Joi.array(),
                slug: Joi.string(),
                status: Joi.string().valid("active", "inactive").default("inactive"),
                categories:Joi.array().required(),
                brand:Joi.string(),
                price:Joi.number().required(),
                discount:Joi.number().default(0),
                description:Joi.string(),
                seller:Joi.string().empty(null,''),
                sku:Joi.string().empty(null,""),
                stock: Joi.number().empty(null, 0)
            })
            let response = schema.validate(data);
            if (response.error) {
                throw response.error.details[0].message
            }
            return data;
        } catch (except) {
            throw except;
        }
    }
    saveContent = async (data) => {
        try {
            let product = new ProductModel(data);
            return product.save();
        } catch (except) {
            throw except;
        }
    }
    updateContent = async (data, id) => {
        try {
            return await ProductModel.findByIdAndUpdate(id, {
                $set: data
            })
        } catch (except) {
            throw except;
        }
    }
    getProductById = async (data,id) => {
        try {
            let data = await ProductModel.findOne({
                _id: id
            })
            .populate("categories")
            .populate("brand")
            .populate("seller");
            if (!data) {
                throw "Resource not found"
            }
            return data;
        } catch (except) {
            throw except;
        }
    }
    deleteById = async (id) => {
        try {
            let data = await ProductModel.findOneAndDelete({
                _id: id
            })
            if (!data) {
                throw "Content Already Deleted"
            }
            return data;
        } catch (except) {
            throw except;
        }
    }
}
module.exports=ProductServices; 