import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context";
import { useCart } from "../../Context/cart";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const baseurl = process.env.REACT_APP_BACKEND_URL;
  const { auth } = useAuth();
  const { products } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth?.user?.user_id) return;
        const response = await axios.get(`${baseurl}/orders/${auth.user.user_id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [baseurl, auth?.user?.user_id]);

  return (
    <div className="bg-gray-100 rounded-md p-6 overflow-y-auto max-h-[600px]">
      <h1 className="text-2xl text-purple-500 font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => {
          // Map each order item to include product details
          const orderItemsWithDetails = order.items.map((item) => {
            const productDetails = products.find((p) => p._id === item.product_id) || {};
            return { ...item, ...productDetails, quantity: item.quantity };
          });

          return (
            <div
              key={order._id}
              className="p-5 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: <span className="text-blue-600">{order._id}</span>
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {orderItemsWithDetails.map((item, index) => (
                  <div
                    key={item.product_id || index}
                    className="flex items-center gap-4 border border-gray-100 rounded-lg p-3 min-h-[80px]"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.image?.[0] || ""}
                        alt={item.productName || "Unknown Product"}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between">
                      <span className="font-medium text-gray-700">
                        {item.productName || "Unknown Product"}
                      </span>
                      <span className="text-gray-500">₹{item.price || 0}</span>
                      <span className="text-sm text-gray-400">
                        Qty: {item.quantity || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-4 border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="font-medium text-gray-600">Total</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{order.total_price}
                </span>
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
}
