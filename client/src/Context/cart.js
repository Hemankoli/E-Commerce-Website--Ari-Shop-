import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const baseurl = process.env.REACT_APP_BACKEND_URL;

  const fetchCartItems = async (user_id) => {
    try {
      const response = await fetch(`${baseurl}/cart/${user_id}`, {
        method: "GET",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        console.error("Error fetching cart items:", response);
        return;
      }
      
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
