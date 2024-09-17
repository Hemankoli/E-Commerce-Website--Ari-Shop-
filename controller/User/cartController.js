const pool = require("../../database/connection");


exports.getCartItems = async (req, res) => {
  const {userId} = req?.params;
  const query = `SELECT ci.cart_item_id, ci.quantity, p.productName, p.image, p.price 
                FROM cart_items ci
                JOIN products p ON ci.product_id = p.product_id
                WHERE ci.user_id = ? AND ci.status = 'active';`;
  try {
    pool.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err, "Error fetching cart items");
        return res.json({message : "Error fetching cart items"})
      }  
    res.json(result);
    })
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};



exports.addItemToCart = (req, res) => {
    const {user_id, product_id, quantity} = req?.body;
    try {
        pool.query('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [user_id, product_id, ], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error' });
          }
          if (result.length > 0) {
            const newQuantity = result[0].quantity + quantity;
            
            pool.query('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?', [newQuantity, user_id, product_id], (updateErr) => {
              if (updateErr) {
                return res.status(500).json({ message: 'Error updating quantity' });
              }
              return res.status(200).json({ message: 'Quantity updated' });
            });
          } else {
            pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity], (insertErr) => {
              if (insertErr) {
                return res.status(500).json({ message: 'Error adding product to cart' });
              }
              return res.status(200).json({ message: 'Product added to cart' });
            });
          }
        });
    } catch (error) {
        console.error('Error processing cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.removeItemFromCart = (req, res) => {
    const { user_id, product_id } = req?.body;
    try {
        pool.query("DELETE FROM cart_items WHERE product_id = ? AND user_id = ?", [product_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).json({message: "Error removing item from cart", error: err});
            } 
            return res.status(200).json({message: "Item removed from cart successfully", data : result}); 
          }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


exports.updateItemInCart = (req, res) => {
    const { user_id, product_id} = req?.body;
    try {
        pool.query('SELECT * FROM cart_items WHERE user_id = ? AND product_id =?', [user_id, product_id], (error, result) => {
            if(error){
                return res.status(500).json({ message: 'Error fetching cart item' })
            }
            if(result.length > 0 && result[0].quantity > 1){
                // Decrese Quantity
                const newQuantity = result[0].quantity - 1;
                
                pool.query('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?', [newQuantity, user_id, product_id], (updateErr) => {
                    if(updateErr){
                        return res.status(500).json({ message: 'Error decreasing quantity' });
                    }
                    return res.status(200).json({ message: 'Quantity decreased' });
                });
            }else{
                pool.query('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [user_id, product_id], (deleteErr) => {
                    if (deleteErr) {
                      return res.status(500).json({ message: 'Error removing product from cart' });
                    }
                    return res.status(200).json({ message: 'Product removed from cart' });
                });
            }    
        });
    } catch (error) {
        console.error('Error processing cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}