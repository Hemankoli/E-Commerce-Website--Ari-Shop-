const Product = require("../../models/Product");

// ============================
// GET: Products by Category
// ============================
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product?.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found in this category",
        error: true,
        success: false,
        data: []
      });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};
