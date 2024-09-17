import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });
  const [editingAddress, setEditingAddress] = useState(null);

  const userId = 1; 

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Handle form input change
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add new address
  const addAddress = async () => {
    try {
      const response = await axios.post('http://localhost:8000/addresses', { user_id: userId, ...form});
      setAddresses([...addresses, response.data]);
      setForm({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      });
      } catch (error) {
      console.error('Error adding address:', error);
    }
    addAddress();
  };

  // Edit an address
  const editAddress = (address) => {
    setEditingAddress(address);
    setForm({
      address_line1: address.address_line1,
      address_line2: address.address_line2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    });
  };

  // Update an address
  const updateAddress = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/addresses/${editingAddress.address_id}`, form);
      setAddresses(addresses.map((addr) => (addr.address_id === editingAddress.address_id ? response.data : addr)));
      setEditingAddress(null);
      setForm({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      });
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Delete an address
  const deleteAddress = async (address_id) => {
    try {
      await axios.delete(`http://localhost:8000/addresses/${address_id}`);
      setAddresses(addresses.filter((address) => address.address_id !== address_id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-gray-100">
      <h1 className="text-2xl text-purple-500 font-bold mb-4">Manage Addresses</h1>

      {/* Address Form */}
      <div className="mb-6">
        <h2 className="text-xl text-center mb-2">{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
        <form className="space-y-4 mx-auto md:w-96">
          <input
            type="text"
            name="address_line1"
            value={form.address_line1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address_line2"
            value={form.address_line2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleInputChange}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="postal_code"
            value={form.postal_code}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={editingAddress ? updateAddress : addAddress}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {editingAddress ? 'Update Address' : 'Add Address'}
          </button>
        </form>
      </div>

      {/* Display Addresses */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4" >
            {
              addresses.map((address) => (
                <li key={address.address_id} className="p-4 bg-white border rounded">
                  <p>{address.address_line1}, {address.address_line2}</p>
                  <p>{address.city}, {address.state}, {address.postal_code}, {address.country}</p>
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => editAddress(address)}
                      className="bg-yellow-500 text-white hover:bg-yellow-400 font-semibold  px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAddress(address.address_id)}
                      className="bg-red-500 text-white hover:bg-red-400 font-semibold px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
};

export default AddressPage;
