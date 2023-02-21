const router = require("express").Router();
const auth_routes= require("./auth.routes");
const product_routes=require("./product.routes")
const type_routes=require("./types.routes");
const category_routes=require("./category.routes");
const order_routes = require("./order.routes");

router.use("/auth", auth_routes)
router.use("/product",product_routes)
router.use("/category",category_routes)
router.use("/order",order_routes)
router.use("/",type_routes)

module.exports = router;
