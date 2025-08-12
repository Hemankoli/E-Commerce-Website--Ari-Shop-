import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useCart} from "../../Context/cart";
import toast from 'react-hot-toast';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {products} = useCart();

  const baseurl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/all-orders`);
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [baseurl]);

  useEffect(() => {
    const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${baseurl}/all-users`, {
            withCredentials: true,
        });
        if (response.status === 200) {
            setAllUsers(response.data || []);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
    }
  }
  fetchAllUsers();
  }, [baseurl]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${baseurl}/order-status/${orderId}`, { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mx-auto">
      <div className='bg-white border-2 border-purple-400 py-2 mb-4 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Orders</h1>
      </div>

      <div className="overflow-x-auto border-2 border-purple-500 shadow-md">
        <table className="min-w-full divide-y-2 divide-purple-600 bg-white">
          <thead className='bg-purple-400'>
            <tr>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Order ID</th>
              <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Image</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Buyer</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Product</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Total Price</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Order Date</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-purple-600">
            {orders.length > 0 ? (
              orders.map(order => {
                const orderItemsWithDetails = order.items.map((item) => {
                  const productDetails = products.find((p) => p._id === item.product_id) || {};
                  return { ...item, ...productDetails, quantity: item.quantity };
                })
                return (
                  orderItemsWithDetails.map((item, index) => (
                    <tr key={`${order._id}-${index}`} className="hover:bg-gray-100">
                    {index === 0 && (
                      <td
                        rowSpan={order.items.length}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600"
                      >
                        {order?._id}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <img
                        src={item.image?.[0]|| "/placeholder.png"}
                        alt={item.productName || "Product"}
                        className="h-12 w-12 object-cover mx-auto"
                      />
                    </td>
                    {index === 0 && (
                      <td
                        rowSpan={order.items.length}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600"
                      >
                        {allUsers.find(user => user._id === order.user_id)?.name}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {item.productName || "Unknown Product"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {item.quantity}
                    </td>
                    {index === 0 && (
                      <td
                        rowSpan={order.items.length}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600"
                      >
                        ₹{order.total_price.toFixed(2)}
                      </td>
                    )}
                    {index === 0 && (
                      <td
                        rowSpan={order.items.length}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600"
                      >
                        <select className={`border text-white px-2 py-1 outline-none rounded 
                        ${order.status === "Processing" ? "bg-yellow-300 border-yellow-400" : order.status === "Shipped" ? "bg-blue-300 border-blue-400" : 
                          order.status === "Delivered" ? "bg-green-300 border-green-400" : "bg-red-300 border-red-400"}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      </td>
                    )}
                    {index === 0 && (
                      <td
                        rowSpan={order.items.length}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600"
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    )}
                  </tr>
                  )
              ))})
            ) : (
              <tr>
                <td colSpan="8" className="text-slate-400 px-4 py-2 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
