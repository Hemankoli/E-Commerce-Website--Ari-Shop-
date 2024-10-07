import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../Context/cart';

const Checkout = () => {
    const { cartItems } = useCart();
    const [addresses, setAddresses] = useState([]); // Fetch the user's addresses
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState('');


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
                setAddresses(response.data);
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.post('http://localhost:8000/check_out', {
                userId,
                cartItems,
                totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                shippingAddress,
                paymentMethod,
            });
            setSuccess(true);
            setLoading(false);
            console.log('Order placed:', response.data);
        } catch (error) {
            console.error('Checkout error:', error);
            setLoading(false);
        }
    };

    const handleAddAddress = async (addressId) => {
        if (!newAddress) {
            alert('Please enter a valid address');
            return;
        }
        try {
            const userId = sessionStorage.getItem('userId');
            await axios.post('/addresses', { userId, address: newAddress });
            setNewAddress('');
            setShowAddressForm(false);
            const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Failed to add address:', error);
        }
    };

    return (
        <div className="checkout-container max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

            {/* Address Selection */}
            <div className="shipping-info mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Shipping Address:</label>
                {
                    addresses.length > 0 ? (
                        addresses.map((address) => (
                            <div key={address.id} className="flex justify-between items-center mb-2">
                                <div>
                                    <input
                                        type="radio"
                                        name="shippingAddress"
                                        value={address.id}
                                        onChange={() => setShippingAddress(address.address)}
                                        className="mr-2"
                                    />
                                    <span>{address.address}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-gray-700">No addresses found. Please add a new address.</p>
                            <button 
                                className="text-blue-500 hover:underline mt-2" 
                                onClick={() => setShowAddressForm(true)}>
                                Add Address
                            </button>
                        </div>
                    )
                }
            </div>

            {/* New Address Form */}
            {
                showAddressForm && (
                    <div className="new-address-form mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">New Address:</label>
                        <input
                            type="text"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            placeholder="Enter your new address"
                        />
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            onClick={handleAddAddress}
                        >
                            Save Address
                        </button>
                        <button
                            className="text-gray-500 hover:underline ml-2"
                            onClick={() => setShowAddressForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )
            }

            {/* Payment Method Selection */}
            <div className="payment-info mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Payment Method:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary mb-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                {cartItems.map((item) => (
                    <div key={item.productId} className="cart-item flex justify-between mb-2 border-b pb-2">
                        <span>{item.productName} (x{item.quantity})</span>
                        <span>₹ {item.price}</span>
                    </div>
                ))}
                <div className="total-price">
                    <strong>
                        Total Price: ₹{' '}
                        {cartItems.reduce(
                            (total, item) => total + (item.price || 0) * (item.quantity || 0),
                            0
                        )}
                    </strong>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                className={`checkout-button w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Place Order'}
            </button>

            {success && <p className="text-green-500 mt-4 text-center">Order placed successfully!</p>}
        </div>
    );
};

export default Checkout;
