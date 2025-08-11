const CartItem = require('../../models/CartItem');
const Product = require('../../models/Product');

// Get Cart Items
exports.getCartItems = async (req, res) => {
  const { user_id } = req.params;
  try {
    const cartItems = await CartItem.find({ user_id })
      .populate('product_id', 'productName image price'); // Join-like behavior

    if (cartItems.length === 0) {
      return res.status(404).json({ error: 'No cart items found' });
    }

    res.json(cartItems);
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
    return res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};

// Update (Decrease) Item Quantity in Cart
exports.updateItemInCart = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const cartItem = await CartItem.findOne({ user_id, product_id });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      return res.status(200).json({ message: 'Quantity decreased' });
    } else {
      await CartItem.deleteOne({ user_id, product_id });
      return res.status(200).json({ message: 'Product removed from cart' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
};
