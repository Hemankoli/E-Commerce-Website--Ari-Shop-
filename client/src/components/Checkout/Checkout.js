import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/index';
import { useCart } from '../../Context/cart';
import toast from 'react-hot-toast';
import OrderPlaced from './OrderPlaced';

const Checkout = () => {
  const {auth} = useAuth()
  const { products, cartItems, deleteCartItem } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [form, setForm] = useState({
    address_line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',  
  });
  const [editingAddress, setEditingAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [placedModal, setPlacedModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  
  const baseurl = process.env.REACT_APP_BACKEND_URL;

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/addresses/${auth?.user?.user_id}`
        );
        setAddresses(response?.data || []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [auth?.user?.user_id, baseurl]);

  // Handle form input change
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update address (combined functionality)
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        // Update address
        const response = await axios.put(
          `${baseurl}/addresses/${editingAddress?._id}`,
          form
        );
        setAddresses(
          addresses.map((addr) =>
            addr._id === editingAddress?._id
              ? response.data
              : addr
          )
        );
      } else {
        // Add new address
        const response = await axios.post(`${baseurl}/addresses`, {
          user_id: auth?.user?.user_id,
          ...form,
        });
        setAddresses([...addresses, response.data]);
      }
      setShowAddressForm(false);
      resetForm();
    } catch (error) {
      console.error('Error adding/updating address:', error);
    }
  };

  // Reset the form
  const resetForm = () => {
    setForm({
      address_line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    });
    setEditingAddress(null);
  };

  // Edit an address
  const editAddress = (address) => {
    setEditingAddress(address);
    setForm({
      address_line1: address.address_line1,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    });
    setShowAddressForm(true);
  };

  // Delete an address
  const deleteAddress = async (address_id) => {
    try {
      await axios.delete(`${baseurl}/addresses/${address_id}`);
      setAddresses(
        addresses.filter((address) => address._id !== address_id)
      );
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Handle Payment Method Change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products?.find(p => p?._id === item?.product_id);
      const price = product?.price || 0;
      return total + price * (item?.quantity || 0);
    }, 0);
  };

  
  // Handle Submit Order
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
      toast.error("Please add an address first");
      return;
    }
    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    try {
      const address = addresses.find(addr => addr?._id === selectedAddressId);
      const response = await axios.post(`${baseurl}/checkout`, {
        user_id: auth?.user?.user_id,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        })),
        total_price: calculateSubtotal(),
        shippingAddress: [{
          street: address?.address_line1,
          city: address?.city,
          state: address?.state,
          postal_code: address?.postal_code,
          country: address?.country
        }]
      });
      toast.success('Order submitted successfully');
      await deleteCartItem(cartItems?.map(item => ({ product_id: item.product_id })));
      setSelectedAddressId(null);
      setPlacedModal(true);
      return response?.data;
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <div className="px-4 py-10 mt-20 flex flex-col lg:flex-row justify-center lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Address Section */}
        <div className="w-full lg:w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Billing Details</h2>
          <div className="border p-4 rounded-md mb-4">
            {addresses.length > 0 ? (
              <div>
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex justify-between border p-2 sm:p-4 rounded-md mb-4"
                  >
                  <div className='flex items-center'>
                      <input
                          type="radio"
                          name="address"
                          value={address._id}
                          checked={selectedAddressId === address._id}
                          onChange={() => handleSelectAddress(address._id)}
                          className="mr-2"
                      />
                      <div>
                          <p className="text-sm sm:text-base text-gray-600 mb-1">
                          {address.address_line1}
                          </p>
                          <p className="text-sm sm:text-base text-gray-600 mb-2 mr-2">
                          {address.city}, {address.state}, {address.postal_code},{' '}
                          {address.country}
                          </p>
                      </div>
                  </div>
                  <div className="md:space-x-2 flex flex-col md:block space-y-2 "> 
                      <button
                        onClick={() => editAddress(address)}
                        className="bg-green-500 text-xs sm:text-sm px-2 py-1 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="bg-red-500 text-xs sm:text-sm px-2 py-1 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="bg-blue-500 text-xs sm:text-sm text-white p-2 rounded font-semibold hover:bg-blue-600 transition duration-300"
                >
                  + Add New Address
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddressForm(true)}
                className="bg-blue-500 text-xs sm:text-sm text-white p-2 rounded font-semibold hover:bg-blue-600 transition duration-300"
              >
                Add Address
              </button>
            )}

            {/* Address Form */}
            {showAddressForm && (
              <form className="space-y-4 mt-4" onSubmit={handleAddressSubmit}>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm">
                    Street:
                  </label>
                  <input
                    type="text"
                    name="address_line1"
                    value={form.address_line1}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm">
                    City:
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm">
                    State:
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm">
                    Postal Code:
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={form.postal_code}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm">
                    Country:
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 text-xs sm:text-sm"
                >
                  {editingAddress ? 'Update Address' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Your Order</h2>
          <ul className="mb-4">
            {cartItems.map((item, index) => {
              const product = products?.find((p) => p?._id === item?.product_id);
              return (
              <li
                key={index}
                className="flex justify-between items-start mb-2 space-x-2"
              >
                <img
                  src={product?.image?.[0]}
                  alt={product?.productName || 'Product Image'}
                  className="w-8 h-8 object-cover"
                />
                <div>
                  <span className="flex-1 text-sm  line-clamp-2">
                    {product?.productName}
                  </span>
                    <span className="flex-1 text-sm  line-clamp-2">
                      Quantities: {item?.quantity}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ₹. {product?.price}
                </span>
              </li>
            )})}
          </ul>
          <div className="border-t pt-2">
            <div className="flex justify-between pb-1 text-xs sm:text-base">
              <span>Subtotal</span>
              <span>₹. {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between pb-1 text-xs sm:text-base">
              <span>Shipping</span>
              <span>₹. 0</span>
            </div>
            <div className="flex justify-between pb-2 text-xs sm:text-base">
              <span>Tax</span>
              <span>₹. 0</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>₹. {calculateSubtotal()}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="font-bold text-xs sm:text-base">Payment Method</h3>
            <div className="mt-2">
              <label className="mr-4 text-xs sm:text-sm">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                Cash on delivery
              </label>
              <label className="text-xs sm:text-sm">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                Card
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-4">
            <label className="text-xs sm:text-sm">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              I have read and agree to the website's{' '}
              <a href="/customer-support" className="text-blue-500">
                terms and conditions
              </a>
              .
            </label>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleSubmitOrder}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 text-xs sm:text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
      { placedModal && <OrderPlaced /> }
    </div>
  );
};

export default Checkout;