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
      const response = await fetch(`${baseurl}/cart`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, user_id: auth?.user?.user_id, action })
      });
      if (!response.ok) {
        console.error("Failed to update quantity");
        return;
      }
      await fetchCartItems(auth?.user?.user_id);
      const responseData =  await response.json()
      return responseData?.cart;
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Delete cart item
  const deleteCartItem = async (product_id) => {
    try {
      const response = await fetch(`${baseurl}/cart`, {
        method: "DELETE",
        credentials: 'include',
        headers:{
          "content-type" : 'application/json'
        },
        body: JSON.stringify({ user_id: auth?.user?.user_id, product_id: product_id })
      });
      await fetchCartItems(auth?.user?.user_id);
      const responseData =  await response.json()
      return responseData?.cart;
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
