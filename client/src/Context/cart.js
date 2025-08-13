import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "./index";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const {auth} = useAuth()

  const baseurl = process.env.REACT_APP_BACKEND_URL;

  const fetchCartItems = useCallback(async (user_id) => {
    try {
      if (!user_id) return;
      const response = await axios.get(`${baseurl}/cart/${user_id}`);
      setCartItems(response?.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [baseurl]);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseurl}/get-product`);
        setProducts(response?.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    }
    handleFetch();
  }, [baseurl]);


  const addToCart = async (product_id) => {
    if (!auth?.token || !auth?.user) {
      toast.error('Please login to add product to cart');
      return;
    }
    try {
      await axios.post(`${baseurl}/cart`, {
        user_id: auth?.user?.user_id,
        product_id,
        quantity: 1,
      });
      toast.success("Item added to cart!");
      await fetchCartItems(auth?.user?.user_id);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart.");
    }
  };

    // Decrease cart item quantity
  const updateQuantity = async (product_id, action) => {
    try {
      const response = await axios.put(`${baseurl}/cart`,{
        product_id,
        user_id: auth.user.user_id,
        action
      }, {
        withCredentials: true,
      });
      await fetchCartItems(auth?.user?.user_id);
      return response.data?.cart;
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Delete cart item
  const deleteCartItem = async (product_id) => {
    try {
      const response = await axios.delete(`${baseurl}/cart`, {
        data: {
          user_id: auth.user.user_id,
          product_id
        },
        withCredentials: true,
      });
      await fetchCartItems(auth?.user?.user_id);
      return response.data?.cart;
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };


  return (
    <CartContext.Provider value={{ products, setProducts, cartItems, setCartItems, loading, setLoading, fetchCartItems, addToCart, updateQuantity, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
};
