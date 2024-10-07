const pool = require("../../database/connection");


//  Checkout Orders 
exports.ckeckOutOrders = async (req, res) => {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    try {
        const query = `INSERT INTO orders (user_id, total_price, shipping_address, payment_method) VALUES (?, ?, ?, ?)`;
        const [orderResult] = await pool.query(query, [userId, totalPrice, shippingAddress, paymentMethod]);
        const orderId = orderResult.insertId;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

// Get All Order
exports.getAllOrders = async (req, res) => {
    try {
      pool.query('SELECT * FROM orders', (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ message: 'Error fetching orders' });
        }
        return res.status(200).json(result);
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Server error' });
    }
}

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const {id} = req.params;
        pool.query('SELECT * FROM orders WHERE id = ?', [id], (err, result)=> {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: 'Error fetching order' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
        return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get Products By Order
exports.getProductsByOrder = async (req, res) => {
    try {
        const {id} = req.params;
        pool.query('SELECT * FROM products WHERE order_id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: 'Error fetching products' });
            }
            return res.status(200).json(result);
            });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update Order
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: 'Error updating order' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
        return res.status(200).json({ message: 'Order updated successfully' });
        });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get past orders by User ID
exports.getOrdersByUser = async (req, res) => {
    try {
        const { id } = req.params;
        pool.query('SELECT * FROM orders WHERE user_id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: 'Error fetching orders' });
            }
        return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
