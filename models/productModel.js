// updateProductModule.js
const pool = require('../database/connection');



// Get all Products on USER
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM products;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getProductDetailsById = (productId) => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT * FROM product WHERE productId = ?";
        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};



// update product on ADMIN 
exports.updateProduct = (id, updateData) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE products
            SET
                productName = ?,
                brandName = ?,
                description = ?,
                image = ?,
                price = ?,
                selling = ?,
                category = ?,
                quantity = ?
            WHERE id = ?
        `;

        const values = [
            updateData?.productName,
            updateData?.brandName,
            updateData?.description,
            updateData?.image,
            updateData?.price,
            updateData?.selling,
            updateData?.category,
            updateData?.quantity,
            id
        ];
        console.log("With values:", values);
        
        pool.query(query, values, (err, result) => {
            if (err) {
                console.error("SQL Error: ", err.message); 
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
