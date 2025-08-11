import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const baseurl = process.env.REACT_APP_BACKEND_URL;


    // Fetch all orders
  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${baseurl}/orders`);
      setOrders(response?.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [baseurl]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Fetch order by ID
  const fetchOrderById = async (orderId) => {
    try {
      const response = await axios.get(`${baseurl}/orders/${orderId}`);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  // Fetch products by order
  const fetchProductsByOrder = async (orderId) => {
    try {
      const response = await axios.get(`${baseurl}/orders/${orderId}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products for order:', error);
    }
  };

  // Update order
  const updateOrder = async (orderId) => {
    try {
      await axios.put(`${baseurl}/orders/${orderId}`, {
        status,
        payment_method: paymentMethod,
      });
      alert('Order updated successfully');
      fetchAllOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };


  return (
    <div className="bg-gray-100 rounded-md p-6">
       <h1 className="text-2xl text-purple-500 font-bold mb-4">Orders</h1>
        <ul className="space-y-4">
          {
            orders.map((order) => (
              <li key={order._id} className="p-4 border rounded">
                <p>Order ID: {order._id}</p>
                <p>Status: {order.status}</p>
                <p>Total: {order.total_amount}</p>
                <button onClick={() => fetchOrderById(order._id)} className="text-blue-500">
                  View Details
                </button>
                <button onClick={() => fetchProductsByOrder(order._id)} className="text-green-500">
                  View Products
                </button>
                <button onClick={() => updateOrder(order._id)} className="text-yellow-500">
                  Update Order
                </button>
              </li>
            ))
          }
        </ul>

        {
          selectedOrder && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h2 className="text-xl font-bold">Order Details</h2>
              <p>Order ID: {selectedOrder._id}</p>
              <p>Status: {selectedOrder.status}</p>
              <p>Total: {selectedOrder.total_amount}</p>

              <div>
                <label>Status</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-2 border rounded"
                />
                <label>Payment Method</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="p-2 border rounded"
                />
                <button onClick={() => updateOrder(selectedOrder._id)} className="bg-blue-500 text-white p-2 rounded">
                  Update
                </button>
              </div>
            </div>
          )
        }

      {/* Products in Order */}
        {
          products.length > 0 && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h2 className="text-xl font-bold">Products in Order</h2>
              <ul className="space-y-2">
                {
                  products.map((product) => (
                    <li key={product._id}>{product.productName}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
    </div>
  );
};

export default OrderPage;
