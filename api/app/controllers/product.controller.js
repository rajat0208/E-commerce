const helpers = require("../../config/helper");
const ProductService = require("../services/product.services");
const slugify = require("slugify");

class ProductController {
    constructor() {
        this.product_svc = new ProductService();
    }
    createProduct = async (res, req, next) => {
        try {
            let data = req.body;
            if (req.files) {
                data.images = req.files.map((item) => item.filename);
            }
            data.slug = slugify(data.title, { lower: true })
            if (!data.categories || data.categories === "null") {
                data.categories = null;
            } else {
                data.categories = data.categories.split('.');
            }
            if (!data.brand || data.brand === "null") {
                data.brand = null;
            }
            if (!data.seller || data.seller === "null") {
                data.seller = null;
            }
            await this.product_svc.validateData(data);
            data.actual_price = data.price - data.price * data.discount / 100;
            let response = await this.product_svc.saveContent(data);
            if (response) {
                res.json({
                    result: data,
                    status: true,
                    msg: "Product created"
                })
            } else {
                throw "Problem while creating content"
            }
        } catch (exception) {
            console.log("createContent:", exception);
            next({ status: 422, msg: exception })
        }
    }
    getAllProducts = async (req, res, next) => {
        try {
            let all_products = await this.product_svc.getAllProducts()
            res.json({
                result: all_products,
                status: true,
                msg: "Product fetched"
            })
        } catch (exception) {
            console.log("List Product:", exception);
            next({ status: 422, msg: exception })
        }
    }
    getProductsById = async (req, res, next) => {
        try {
            let productDetail = await this.product_svc.getProductsById(req.params.id);
            res.json({
                result: productDetail,
                status: true,
                msg: "Product detail fetched"
            })
        } catch (err) {
            next({ status: 422, msg: exception })
        }
    }
    updateProductsById = async (req, res, next) => {
        try {
            let data = req.body;
            data.images = [];
            if (req.files) {
                data.images = req.files.map((item) => item.filename);
            }
            if (!data.categories || data.categories === "null") {
                data.categories = null;
            } else {
                data.categories = data.categories.split('.');
            }
            if (!data.brand || data.brand === "null") {
                data.brand = null;
            }
            if (!data.seller || data.seller === "null") {
                data.seller = null;
            }
            let current_product = await this.product_svc.getProductsById(req.params.id);
            data.slug = current_product.slug;
            if (data.del_image) {
                let image_to_delete = data.del_image.split(".");
                current_product.images.map((item) => {
                    if (!image_to_delete.includes(item)) {
                        data.images.push(item)
                    }
                })
            }
            delete data.del_image;
            await this.product_svc.validateData(data);
            data.actual_price = data.price - data.price * data.discount / 100;
            let response = await this.product_svc.updateContent(data, req.params.id);
            if (response) {
                res.json({
                    result: data,
                    status: true,
                    msg: "Product updated"
                })
            } else {
                throw "Problem while updating product"
            }
        } catch (exception) {
            console.log("UpdateProduct:", exception);
            next({ status: 422, msg: exception })
        }
    }
    deleteProductsById = async (req, res, next) => {
        try {
            let response = await this.product_svc.deleteById(req.params.id);
            res.json({
                result: response,
                status: true,
                msg: "Product deleted"
            })
        } catch (err) {
            next({ status: 400, msg: err })
        }
    }
}
module.exports = ProductController;