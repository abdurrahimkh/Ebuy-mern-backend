const router = require("express").Router();
const categoryValidation = require("../validations/categoryValidation");
const categoryController = require("../controllers/categoryController");
const Authorization = require("../services/Authorization");
const homeProducts = require("../controllers/homeProducts");

router.post(
  "/create-category",
  [categoryValidation, Authorization.authorized],
  categoryController.create
);

router.get(
  "/categories/:page",
  Authorization.authorized,
  categoryController.categories
);

router.get(
  "/fetch-category/:id",
  Authorization.authorized,
  categoryController.fetchCategory
);

router.put(
  "/update-category/:id",
  [categoryValidation, Authorization.authorized],
  categoryController.updateCategory
);

router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  categoryController.deleteCategory
);
router.get("/all-categories", categoryController.allCategories);
router.get("/random-categories", categoryController.randomCategories);
router.get("/cat-products/:name/:page?", homeProducts.catProducts);

module.exports = router;
