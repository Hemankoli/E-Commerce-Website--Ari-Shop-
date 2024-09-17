// const uploadProductPermission = require('../../helpers/permission');
const pool = require("../../database/connection");

// upload product on admin
exports.uploadProduct = async (req, res) => {
    const { productName, brandName, description, image, price, selling, category, quantity } = req.body;
    try {
        // const sessionUser = req.user;
        // if(!uploadProductPermission(sessionUser)){
        //     throw new Error("Permission denied")
        // }

        const sql = `INSERT INTO products (productName, brandName, description, image, price, selling, category, quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await pool.execute(sql, [
            productName,
            brandName,
            description,
            JSON.stringify(image),
            price,
            selling,
            category,
            quantity,
        ]);
        console.log(result);

        res.status(201).json({
            message: 'Product uploaded successfully',
            success: true,
            products: result[0] 
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get products on admin
exports.getAllProducts = (req, res) => {
    pool.query("SELECT * FROM products;", (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};

// update product on admin
exports.updateProduct = (req, res) => {
    try {
        const { productName, brandName, description, image, price, selling, category, quantity } = req.body;
        const { productId } = req.params;
        const values = [
            productName !== undefined ? productName : null,
            brandName !== undefined ? brandName : null,
            description !== undefined ? description : null,
            image !== undefined ? image : null,
            price !== undefined ? price : null,
            selling !== undefined ? selling : null,
            category !== undefined ? category : null,
            quantity !== undefined ? quantity : null,
            productId
        ];
        const query = `UPDATE products SET productName = ?, brandName = ?, description = ?, image = ?, price = ?, selling = ?, category = ?, quantity = ?
            WHERE product_id = ?`;
        pool.execute(query, values, (err, result) => {
            if (err) {
                console.error('Error updating product:', err.message);
                return res.status(500).json({ success: false, message: 'Error updating product' });
            } else {
                res.status(200).json({ success: true, message: 'Product updated successfully', result });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error.message); 
        res.status(500).json({
            message: error.message || 'Unexpected error occurred',
            error: true,
            success: false
        });
    }
};

// update product on admin
exports.deleteProduct = (req, res) => {
    const {productId} = req.params;
    if (!productId) {
        return res.status(400).send({ success: false, message: 'Product ID is required' });
    }
    try {
        pool.execute("DELETE FROM products WHERE product_id = ?", [productId], (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Error deleting product.");
            } else {
                res.send(result);
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}