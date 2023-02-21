const CategoryService = require("../services/category.services")
const slugify = require("slugify");

class CategoryController {
    constructor() {
        this.category_svc = new CategoryService();
    }
    getAllLists = async (req, res, next) => {
        try {
            console.log("i am here")
            let result = await this.category_svc.getAllCategories();
            res.json({
                result: result,
                status: true,
                msg: "Category fetched"
            })
        } catch (exception) {
            console.log("getAllList:", exception);
            next({ status: 422, msg: exception })
        }
    }
    createContent = async (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            data.slug = slugify(data.name, { lower: true })
            if (!data.parent_id || data.parent_id === 'null') {
                data.parent_id = null;
            }
            await this.category_svc.validateData(data);
            let response = await this.category_svc.saveContent(data);
            if (response) {
                res.json({
                    result: data,
                    status: true,
                    mssg: "Category created"
                })
            } else {
                throw "Problem while creating content"
            }
        }
        catch (exception) {
            console.log('createConetnt:', exception);
            next({ status: 422, msg: exception })
        }
    }
    updateContent = async (req, res, next) => {
        try {
            let data = req.body;
            let category = await this.category_svc.getCategoryById(req.params.id)
            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = category.image;
            }
            if (!data.parent_id || data.parent_id === 'null') {
                data.parent_id = null;
            }
            await this.category_svc.validateData(data);
            let response = await this.category_svc.updateContent(data, req.params.id);
            if (response) {
                res.json({
                    result: data,
                    status: true,
                    mssg: "Category created"
                })
            } else {
                throw "Problem while updating content"
            }
        }
        catch (exception) {
            console.log('createConetnt:', exception);
            next({ status: 422, msg: exception })
        }
    }
    getById = async (req, res, next) => {
        try {
            let data = await this.category_svc.getCategoryById(req.params.id);
            res.json({
                result: data,
                status: true,
                mssg: "Resource fetched"
            })
        } catch (exception) {
            next({ status: 422, msg: exception })
        }
    }
    deleteById = async (req, res, next) => {
        try {
            let response = await this.category_svc.deleteById(req.params.id);
            res.json({
                result: response,
                status: true,
                mssg: "Content deleted successfully"
            })
        } catch (exception) {
            next({ status: 422, msg: exception })
        }
    }
}
module.exports = CategoryController;