const pool = require("../../database/connection");

const getProductsByCategory = async (req, res)=>{
    const {category} = req?.params;
   try {
        const query = "SELECT * FROM products WHERE category = ?";
        pool.query(query, [category], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error fetching products" });
            }
            return res.json(result);
        } )         
    } catch (error) {
        res.status(200).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}

module.exports = getProductsByCategory;