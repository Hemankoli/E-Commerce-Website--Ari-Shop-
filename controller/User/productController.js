const pool = require("../../database/connection");


// get products on user
exports.getProducts = async(req, res) => {
    try {
        const query = `SELECT * FROM products`; 
            pool.execute(query, (err, results) => {
                if (err) {
                  console.error(err.message);
                  return res.status(500).send({
                    success: false,
                    message: "Error in getting products",
                    error: err.message,
                  });
                }
                res.status(200).send({
                    success: true,
                    countTotal: results.length,
                    message: "All Products",
                    products: results,
                  });
            });  
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// // get one product on user
exports.getProductDetailsById = (req, res) => {
    try {
      const {productId} = req?.params;
      console.log(productId)
      const query = "SELECT * FROM products WHERE product_id = ?";
        pool.execute(query, [productId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message || err,
                    error: true,
                    success: false
                });
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: "Product not found",
                    error: true,
                    success: false
                });
            }
        res.status(200).json({
            message: "Product details retrieved successfully",
            success: true,
            data: result
        });
    });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
};


// search product query
exports.searchProducts = async (req, res) => {
    try {
      const {keyword}  = req?.params;

      const searchTerm = `%${keyword}%`;
  
      const sql = "SELECT * FROM products WHERE productName LIKE ? OR description LIKE ?";
  
      pool.execute(sql, [searchTerm, searchTerm], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
          });
        }
        res.json({
          message: "Search results",
          data: result,
          error: false,
          success: true
        });
      });
  
    } catch (error) {
      res.status(400).json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
};
  