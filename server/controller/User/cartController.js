const CartItem = require('../../models/CartItem');

// Get Cart Items
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const cartItems = await CartItem?.find({ user_id:userId })
    if (cartItems.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Add Item to Cart
exports.addItemToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let existingItem = await CartItem.findOne({ user_id, product_id });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ message: 'Quantity updated' });
    } else {
      const newItem = new CartItem({ user_id, product_id, quantity });
      await newItem.save();
      return res.status(200).json({ message: 'Product added to cart' });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
};

// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: 'User ID and Product ID are required.' });
  }

  try {
    const existingItem = await CartItem.findOne({ user_id, product_id });
    if (!existingItem) {
      return res.status(404).json({ message: 'Item does not exist in the cart' });
    }

    await CartItem.deleteOne({ user_id, product_id });
    const updatedCart = await CartItem.find({ user_id });
    return res.status(200).json({
      message: 'Item removed from cart successfully',
      cart: updatedCart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};

// Update (Decrease) Item Quantity in Cart
exports.updateCartQuantity = async (req, res) => {
  const { product_id, user_id, action } = req.body;

  if (!product_id || !user_id || !['increment', 'decrement'].includes(action)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const cartItem = await CartItem.findOne({ product_id, user_id });
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

    if (action === 'increment') {
      cartItem.quantity += 1;
    } else if (action === 'decrement' && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    }
    await cartItem.save();
    const updatedCart = await CartItem.find({ user_id })
    return res.status(200).json({
      message: 'Cart updated successfully',
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
};