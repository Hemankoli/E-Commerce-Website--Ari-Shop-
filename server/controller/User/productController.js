const Product = require("../../models/Product");

// ============================
// GET: All Products
// ============================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// ============================
// GET: Product by Name
// ============================
exports.getProductDetailsById = async (req, res) => {
  try {
    const { productName } = req.params;
    const product = await Product.findOne({ productName });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    res.status(200).json({
      message: "Product details retrieved successfully",
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// ============================
// SEARCH: Products
// ============================
exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    const products = await Product.find({
      $or: [
        { productName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json({
      message: "Search results",
      data: products,
      error: false,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};
