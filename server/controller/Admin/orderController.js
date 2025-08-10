const pool = require("../../database/connection");


exports.getAllOrders = async (req, res) => {
    try {
      const sql = `SELECT o.id, o.user_id, o.product_id, o.quantity, o.total_price, o.status, o.created_at,
          u.name as buyer_name, p.productName as product_name, p.price as product_price 
        FROM 
          orders o
        JOIN 
          users u ON o.user_id = u.user_id
        JOIN 
          products p ON o.product_id = p.product_id
        ORDER BY 
          o.created_at DESC;`;

        pool.execute(sql, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error fetching orders" });
            }
            res.json(result);
        })  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error while fetching orders" });
    }
  };
  
exports.orderStatusController = async (req, res) => {
  const { orderId} = req?.params;
  const { status }  = req.body;
  try {
    const sql = `UPDATE orders SET status = ?`
    pool.execute( sql, [orderId, status], (error, result) => {
      if(error){
        console.log(error);
        return res.status(500).json({message : "Error While Updating Status"})
      }
      res.status(200).json(result)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({message : "Server Error", error : true})    
  }
}
