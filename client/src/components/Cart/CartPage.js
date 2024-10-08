import React, { useEffect, useState } from 'react';
import {useAuth} from '../../Context/index';
import {useCart} from '../../Context/cart';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaCircleMinus, FaCirclePlus} from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


const CartPage = () => {
  const { cartItems, fetchCartItems } = useCart();
  const [auth] = useAuth()
  const navigate = useNavigate()
  const quantity = 1;

  const baseurl = process.env.REACT_APP_BACKEND_URL;
  
  const { productId } = useParams();

  const product = { name: 'Cart', description: 'A great product', image: 'product-image-url.jpg' }; 


  // Fetch cart items for the user
  useEffect(() => {
    if (auth?.user?.user_id) {
      fetchCartItems(auth.user.user_id);
    }else{
      navigate('/login')
    }
  }, [auth, fetchCartItems, navigate]);

  
  // Add or update cart item
  const addToCart = async (product_id) => {
    try {
      const response = await fetch(`${baseurl}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, user_id: auth?.user?.user_id, quantity: quantity  })
    });
    const responseData = await response.json()
    fetchCartItems()
    toast.success("Product Added Successfully")
    } catch (error) {
      console.error('Error adding to Cart:', error);
    }
  };

  // Decrease cart item quantity
  const decreaseQuantity = async (product_id) => {
    try {
      const response = await fetch(`${baseurl}/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product_id, user_id: auth?.user?.user_id, quantity: quantity })
      });
      const responseData =  await response.json()
      fetchCartItems()
      toast.success("Qauntity Removed Successfully")
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Delete cart item
  const deleteCartItem = async (product_id) => {
    try {
      const response = await fetch(`${baseurl}/cart`, {
        method: "DELETE",
        headers:{
          "content-type" : 'application/json'
        },
        body: JSON.stringify({ user_id: auth?.user?.user_id, product_id: product_id })
      });
      const responseData =  await response.json()
      fetchCartItems()
      toast.success("Product Deleted Successfully")
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
      <>
        <Helmet>
          <title>{product.name} - E-Tail</title>
          <meta name="description" content={product.description} />
          <meta name="keywords" content={`${product.name}, buy online, ecommerce`} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta property="og:image" content={product.image} />
          <link rel="canonical" href={`https://yourwebsite.com/product/${productId}`} />
        </Helmet>

        <div className='mx-auto'>
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
                        Array.isArray(cartItems) && cartItems.map((item, index) => (
                          <div key={index} className="bg-white shadow-md p-4 mb-4 rounded-md flex">
                                                        
                            <Link to={`/product/${item.productName}`} >
                              <img src={Array.isArray(item?.image) && item?.image.length > 0 ? item?.image[0] : 'fallback_image_url'}
                              alt={item?.productName || "Product Image"}
                              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md"/>
                            </Link>
                            
                            <div className="ml-4 flex-1">
                              <Link to={`/product/${item.productName}`} >
                                <h2 className="text-sm md:text-lg font-semibold line-clamp-2">{item?.productName || "Product Name"}</h2>
                              </Link>
                              <div className="flex space-x-2 mt-2">
                                <button className="text-gray-500 text-xs py-1 hover:text-red-400"
                                  onClick={() => deleteCartItem(item.product_id)}>
                                  Remove Item
                                </button>
                              </div>
                            </div>

                            <div className='flex-1'>
                              <p className="text-gray-500 text-sm md:text-lg">Price: ₹<strong>{item?.price || "0.00"}</strong></p>
                              <p className="text-gray-500 text-sm md:text-lg">Quantity: {item?.quantity || 0}</p>
                              <div className='flex'>
                                <button onClick={() => decreaseQuantity(item.product_id, 'decrement')} disabled={item.quantity <= 1} 
                                    className="text-md md:text-xl mr-4 disabled:opacity-50">
                                    <FaCircleMinus />
                                </button>
                                <span className="px-2 md:px-3 py-0 md:py-1 mr-4 text-md md:text-xl bg-gray-100 rounded-md">
                                  {item?.quantity || 0}
                                </span>
                                <button onClick={() => addToCart(item.product_id, 'increment')} className="text-md md:text-xl">
                                  <FaCirclePlus />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                    <div className="bg-white shadow-md p-4 mb-24 rounded-md">
                      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                      <p className="text-md font-md mb-4">Total Items : <strong>{cartItems.length}</strong></p>
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>₹<strong>{cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)}</strong></span>
                      </div>  
                      <div className="flex justify-between mb-4">
                        <span>Shipping:</span>  
                        <span>Free</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total: </span> 
                        <span>₹<strong>{cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)}</strong></span>
                      </div>
                      <button
                        onClick={() => navigate(auth?.token ? '/check_out' : '/login')}
                        className="w-full mt-4 bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700">
                        {auth?.token ? 'Proceed to Checkout' : 'Login to Checkout'}
                      </button>
                    </div>  
                  </div>
                ) : (
                  <p className='text-lg text-center animate-bounce text-red-400'>Your cart is empty</p>
                )
              }
          </div>
          
        </div>
      </>
  );
};

export default CartPage;
