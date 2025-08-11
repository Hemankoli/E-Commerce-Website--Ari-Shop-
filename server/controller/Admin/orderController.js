const Order = require("../../models/Order");

// Get all orders with populated buyer & product info
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")           // only fetch name from User
      .populate("product", "productName price") // only fetch productName and price
      .sort({ createdAt: -1 });           // DESC order by creation date

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error while fetching orders" });
  }
};

// Update order status
exports.orderStatusController = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server Error", error: true });
  }
};
