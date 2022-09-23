const { validationResult } = require("express-validator");
const categoryModel = require("../models/Category");

class Category {
  async create(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;
    if (errors.isEmpty()) {
      const exist = await categoryModel.findOne({ name });
      if (!exist) {
        await categoryModel.create({ name });
        return res
          .status(201)
          .json({ message: "your category has created successfully" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exists` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  async categories(req, res) {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
      const count = await categoryModel.find({}).countDocuments();
      const allCategories = await categoryModel
        .find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.json({ categories: allCategories, perPage, count });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ erros: [{ msg: error.message }] });
    }
  }

  async fetchCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await categoryModel.findOne({ _id: id });
      return res.json({ category });
    } catch (error) {
      console.log(error);
      return res.json({ erros: [{ msg: error.message }] });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const exist = await categoryModel.findOne({ name });
      if (!exist) {
        const response = await categoryModel.updateOne(
          { _id: id },
          { $set: { name } }
        );
        if (response) {
          return res
            .status(201)
            .json({ message: "your category has created successfully" });
        }
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exists` }] });
      }
    } else {
      return res.status(400).json({ erros: errors.array() });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      await categoryModel.deleteOne({ _id: id });
      return res.json({ message: "Category has deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ erros: [{ msg: error.message }] });
    }
  }

  async allCategories(req, res) {
    try {
      const categories = await categoryModel.find({});
      return res.json({ categories });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ erros: [{ msg: error.message }] });
    }
  }

  async randomCategories(req, res) {
    try {
      const categories = await categoryModel.aggregate([
        {
          $sample: { size: 3 },
        },
      ]);
      return res.json({ categories });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ erros: [{ msg: error.message }] });
    }
  }
}

module.exports = new Category();
