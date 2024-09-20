import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders'); 
        setOrders(response?.data);
      } catch (error) {
        setError("Error fetching orders");
        console.error(error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/order-status/${orderId}`, { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      
      <div className='bg-white border-2 border-purple-400  py-2 mb-4 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Orders</h1>
      </div> 
           
      <div className="overflow-x-auto border-2 border-purple-500 shadow-md">

      <table className="min-w-full divide-y-2 divide-purple-600 bg-white">
          <thead className='bg-purple-400'> 
            <tr>  
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Order ID</th>
              <th className='py-4 px-4 text-center text-xs font-bold text-white uppercase tracking-wider'>Image</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Buyer Name</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Product Name</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Total Price</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Order Date</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-purple-600"> 
            {
              Array.isArray(orders) && orders?.length > 0 ? (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{order.buyer_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{order.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">${order.total_price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        <select
                          value={order?.status}
                          onChange={(e) => handleStatusChange(order?.id, e.target.value)}
                          className="border border-gray-400 px-2 py-1">
                          <option className="bg-yellow-500 text-white px-4 py-2 rounded" value="Processing">
                            Processing
                          </option>
                          <option className="bg-blue-500 text-white px-4 py-2 rounded" value="Shipped">
                            Shipped
                          </option>
                          <option className="bg-green-500 text-white px-4 py-2 rounded" value="Delivered">
                            Delivered
                          </option>
                          <option className="bg-red-500 text-white px-4 py-2 rounded" value="Cancel">
                            Cancel
                          </option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()
                      }</td>
                    </tr>
                  ))
              ) :(
                <tr>
                  <td colSpan="8" className="text-slate-400 px-4 py-2 text-center">
                    No orders found
                  </td>
                </tr>
              )
            } 
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AllOrders;
