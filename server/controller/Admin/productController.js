const Product = require("../../models/Product");

// Upload product
exports.uploadProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      description,
      image,
      price,
      selling,
      category,
      quantity,
      showcase
    } = req.body;

    const newProduct = new Product({
      productName,
      brandName,
      description,
      image, // should be an array of URLs or file paths
      price,
      selling,
      category,
      quantity,
      showcase
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      success: true,
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      message: error.message || "Unexpected error occurred",
      error: true,
      success: false
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};
