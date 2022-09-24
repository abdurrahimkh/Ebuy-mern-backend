const Product = require("../controllers/productController");
const router = require("express").Router();
const Authorization = require("../services/Authorization");
const productValidation = require("../validations/productValidation");
const homeProducts = require("../controllers/homeProducts");

router.post("/create-product", Authorization.authorized, Product.create);
router.get("/products/:page", Authorization.authorized, Product.get);
router.get("/product/:id", Product.getProduct);
router.put(
  "/product",
  [Authorization.authorized, productValidation],
  Product.updateProduct
);
router.delete("/delete/:id", Authorization.authorized, Product.deleteProduct);
router.get("/search-products/:keyword/:page?", homeProducts.catProducts);

module.exports = router;
