const router= require("express").Router();
const loginCheck=require("../app/middleware/auth.middleware");
const { isAdminSeller } = require("../app/middleware/rbac.middleware");
const ProductController =require("../app/controllers/product.controller");
const uploader=require("../app/middleware/uploader.middleware")
const prod_ctrl=new ProductController();

const upload_path = (req,res,next)=>{
    req.upload_path="public/uploads/product";
    next();
}

router.route('/')
 .get(prod_ctrl.getAllProducts)
 .post(loginCheck,isAdminSeller,upload_path, uploader.array("images"),prod_ctrl.createProduct)

 router.route('/:id')
 .get(prod_ctrl.getProductsById)
 .put(loginCheck,isAdminSeller,upload_path, uploader.array("images"),prod_ctrl.updateProductsById)
 .delete(loginCheck,isAdminSeller,prod_ctrl.deleteProductsById)

 module.exports=router;


