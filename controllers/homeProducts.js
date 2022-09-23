const productModel = require("../models/Product");

class HomeProducts {
  async catProducts(req, res) {
    const { name, page } = req.params;
    const perPage = 12;
    const skip = (page - 1) * perPage;
    if (page) {
      try {
        const count = await productModel
          .find({ category: name })
          .where("stock")
          .gt(0)
          .countDocuments();
        const allProducts = await productModel
          .find({ category: name })
          .where("stock")
          .gt(0)
          .skip(skip)
          .limit(perPage)
          .sort({ updatedAt: -1 });
        return res.json({ products: allProducts, perPage, count });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ erros: [{ msg: error.message }] });
      }
    } else {
      const response = await productModel
        .find({ category: name })
        .where("stock")
        .gt(0)
        .limit(4)
        .sort({ updatedAt: -1 });
      return res.json({ products: response });
    }
  }
}

module.exports = new HomeProducts();
