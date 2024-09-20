const pool = require('../../database/connection'); 

exports.createAddress = async (req, res) => {
  const { user_id, address_line1, address_line2, city, state, postal_code, country } = req?.body;
  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    pool.query('INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, address_line1, address_line2, city, state, postal_code, country],
      (err, result) =>{
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'Error creating address' });
        }
        return res.status(201).json(result);
      }
    );
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Error creating address' });
  }
};

exports.updateAddress = async (req, res) => {
  const {addressId} = req?.params;
  const {  address_line1, address_line2, city, state, postal_code, country } = req?.body;
  try {
    pool.query(`UPDATE addresses SET address_line1 = ?, address_line2 = ?, city = ?, state = ?, postal_code = ?, country = ? WHERE address_id = ?;`,
      [address_line1, address_line2, city, state, postal_code, country, addressId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'Error updating address' });
        }
        return res.status(200).json({ message: 'Address updated successfully', data: result });
      }  
    );
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Error updating address' });  
  }
};

exports.deleteAddress = async (req, res) => {
  const {addressId} = req?.params;
  try {
    pool.query('DELETE FROM addresses WHERE address_id = ?', [addressId],
      (err, result) => {  
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'Error Deleting address' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Address not found' });
        }
        console.log(result)
        return res.status(200).json(result);
      });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Error deleting address' });
  }
};

exports.getAddresses = async (req, res) => {
  const { userId } = req?.params;
  try {
    pool.query('SELECT * FROM addresses WHERE user_id = ?', [userId],
      (err, result) => {
        if (err) {
          console.log(err); 
          return res.status(400).json({ message: 'Error fetching addresses' });
        } 
        return res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Error fetching addresses' });
  }
};
