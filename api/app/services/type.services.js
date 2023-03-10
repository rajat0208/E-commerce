const TypeModel = require("../model/types.model");
const Joi = require("joi");
class TypeService {
    getAllTypes = async (type) => {
        try {
            let result = await TypeModel.find({
                type: type
            });
            return result;
        }
        catch (except) {
            throw except;
        }
    }
    validateData = async (data) => {
        try {
            let schema = Joi.object({
                title: Joi.string().required().min(3),
                image: Joi.string().required(),
                link: Joi.string(),
                type: Joi.string().valid("brand", "banner"),
                status: Joi.string().valid("active", "inactive").default("inactive")
            })
            let response = schema.validate(data);
            if (response.error) {
                throw response.error.details[0].message
            }
            return data;
            // console.log(response)

        } catch (except) {
            throw except;
        }
    }
    saveContent = async (data) => {
        try {
            let type = new TypeModel(data);
            return type.save();
        }
        catch (except) {
            throw except;
        }
    }
    updateContent = async (data, id) => {
        try {
            return await TypeModel.findByIdAndUpdate(id, {
                $set: data
            })
        } catch (except) {
            throw except;
        }
    }
    getTypeById = async (type,id) => {
        try {
            let data = await TypeModel.findOne({
                type:type,
                _id: id
            })
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
            let data = await TypeModel.findOneAndDelete({
                type:type,
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
module.exports = TypeService;