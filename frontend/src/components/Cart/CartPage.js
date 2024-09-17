import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from '../../Context/index'
import { useNavigate, useParams } from 'react-router-dom';
import {FaCircleMinus, FaCirclePlus} from 'react-icons/fa6'
import BannerProduct from '../Banner/BannerProduct';

const CartPage = () => {
  const [cartItems, setCartItems] = useState({});
  const [auth] = useAuth()
  const navigate = useNavigate()

  
  // Fetch cart items for the user
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/${1}`);
      setCartItems(response?.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // useEffect(() => {
  //   if (!auth?.token && !auth?.user) {
  //     navigate('/login');
  //   }
  // }, [auth, navigate]);

  useEffect(() => {
      fetchCartItems();
    
  }, []);

  // Add or update cart item
  const addToCart = async (product_id) => {
    try {
      await axios.post('http://localhost:8000/cart', {
        user_id: auth?.user?.user_id,
        product_id,
        quantity: 1,
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Decrease cart item quantity
  const decreaseQuantity = async (product_id) => {
    try {
      await axios.put('http://localhost:8000/cart', {
        user_id: auth?.user?.user_id,
        product_id,
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Delete cart item
  const deleteCartItem = async (product_id) => {
    try {
      await axios.delete('http://localhost:8000/cart', {
        data: {
          user_id: auth?.user?.user_id,
          product_id,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
      <div className='mx-auto mt-8'>
        <div className='relative mb-10'>
            <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] uppercase text-white text-lg md:text-3xl font-bold mb-6 text-center">
              {`Welcome ${auth?.token && auth?.user?.name ? "to the shopping cart" : "Guest"}`}
            </h1>
            <img src='https://koala.sh/api/image/v2-8qlwm-3qfid.jpg?width=1344&height=768&dream' alt={"cartImage"}
            className='w-full h-24 md:h-32 object-cover' />
        </div>
        
        <div className='container p-2 mx-auto mb-20'>
            { 
              cartItems?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    {
                      Array.isArray(cartItems) && cartItems.map((item) => (
                        <div key={item.product_id} className="bg-white shadow-md p-4 mb-4 rounded-md flex">
                          
                          <img src={Array.isArray(item?.image) && item?.image.length > 0 ? item?.image[0] : 'fallback_image_url'}
                            alt={item?.productName || "Product Image"}
                            className="w-24 h-24 object-cover rounded-md"/>
                          
                          <div className="ml-4 flex-1">
                            <h2 className="text-lg font-semibold">{item?.itemroductName || "Product Name"}</h2>
                            <div className="flex space-x-2 mt-2">
                              <button className="text-gray-500 text-xs py-1 hover:text-red-400"
                                onClick={() => deleteCartItem(item.product_id)}>
                                Remove Item
                              </button>
                            </div>
                          </div>

                          <div className='flex-1'>
                            <p className="text-gray-500">Price: ₹<strong>{item?.price || "0.00"}</strong></p>
                            <p className="text-gray-500">Quantity: {item?.quantity || 0}</p>
                            <div className='flex'>
                              <button onClick={() => decreaseQuantity(item.product_id, 'decrement')} disabled={item.quantity <= 1} 
                                  className="text-xl mr-4 disabled:opacity-50">
                                  <FaCircleMinus />
                              </button>
                              <span className="px-3 mr-4 py-1 bg-gray-100 rounded-md">{item?.quantity || 0}</span>
                              <button onClick={() => addToCart(item.product_id, 'increment')} className="text-xl">
                                <FaCirclePlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div className="bg-white shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <p className="text-md font-md mb-4">Total Items : <strong>{cartItems.length}</strong></p>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹<strong>{cartItems.reduce((total, item) => total + (item.itemrice || 0) * (item.quantity || 0), 0)}</strong></span>
                    </div>  
                    <div className="flex justify-between mb-4">
                      <span>Shipping:</span>  
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total: ₹<strong>{cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)}</strong></span>
                    </div>
                    <button
                      onClick={() => navigate(auth?.token ? '/checkout' : '/login')}
                      className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700">
                      {auth?.token ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </button>
                    <button
                      className="w-full mt-4 bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600">
                      Clear Cart
                    </button>
                  </div>  
                </div>
              ) : (
                <p className='text-lg text-center animate-bounce text-red-400'>Your cart is empty</p>
              )
            }
        </div>
        
      </div>
  );
};

export default CartPage;
