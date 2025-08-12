const Order = require('../../models/Order');

// Create Order
exports.createOrder = async (req, res) => {
  const { user_id, items, total_price, shippingAddress } = req.body;
  console.log(req.body)

  if (!user_id || !items || !total_price || !Array.isArray(shippingAddress) || shippingAddress.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      user_id,
      items,
      total_price,
      shippingAddress
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};


// Get Orders by User
exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user_id: userId });

    if (orders?.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};