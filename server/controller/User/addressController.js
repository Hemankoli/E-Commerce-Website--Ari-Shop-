const Address = require('../../models/Address');

// Create Address
exports.createAddress = async (req, res) => {
  const { user_id, address_line1, address_line2, city, state, postal_code, country } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const newAddress = new Address({
      user_id,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Error creating address' });
  }
};

// Update Address
exports.updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const { address_line1, address_line2, city, state, postal_code, country } = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { address_line1, address_line2, city, state, postal_code, country },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address updated successfully', data: updatedAddress });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Error updating address' });
  }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully', data: deletedAddress });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Error deleting address' });
  }
};

// Get Addresses by User
exports.getAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await Address.find({ user_id: userId });

    if (addresses?.length === 0) {
      return res.status(404).json({ message: 'No addresses found' });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Error fetching addresses' });
  }
};
