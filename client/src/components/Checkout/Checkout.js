import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/index'; // Assuming you have an auth context
import { useCart } from '../../Context/cart';
import RazorpayMock from './RazorpayMock';

const CheckoutPage = () => {
  const [auth] = useAuth();
  const { cartItems } = useCart();
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

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/addresses/${auth?.user?.user_id}`
        );
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [auth?.user?.user_id]);

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
          `http://localhost:8000/addresses/${editingAddress.address_id}`,
          form
        );
        setAddresses(
          addresses.map((addr) =>
            addr.address_id === editingAddress.address_id
              ? response.data
              : addr
          )
        );
      } else {
        // Add new address
        const response = await axios.post('http://localhost:8000/addresses', {
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
      await axios.delete(`http://localhost:8000/addresses/${address_id}`);
      setAddresses(
        addresses.filter((address) => address.address_id !== address_id)
      );
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Handle Payment Method Change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle Submit Order
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (agreeTerms) {
      setShowPaymentModal(true);
    } else {
      alert('Please agree to the terms and conditions');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col lg:flex-row justify-center lg:space-x-6 space-y-6 lg:space-y-0">
      {/* Address Section */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-white shadow-md rounded-lg">
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
                        value={address.address_id}
                        checked={selectedAddressId === address.address_id}
                        onChange={() => handleSelectAddress(address.address_id)}
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
                      onClick={() => deleteAddress(address.address_id)}
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
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 space-x-2"
            >
              <img
                src={
                  Array.isArray(item?.image) && item?.image.length > 0
                    ? item?.image[0]
                    : 'fallback_image_url'
                }
                alt={item?.productName || 'Product Image'}
                className="w-8 h-8 object-cover"
              />
              <span className="flex-1 text-sm  line-clamp-2">
                {item.productName}
              </span>
              <span className="text-sm text-gray-500">
                ₹. {item.price}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-2">
          <div className="flex justify-between pb-1 text-xs sm:text-base">
            <span>Subtotal</span>
            <span>₹. {totalAmount}</span>
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
            <span>₹. {totalAmount}</span>
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
            <a href="#" className="text-blue-500">
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

      {showPaymentModal && (
        <RazorpayMock
          amount={totalAmount}
          closeModal={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
