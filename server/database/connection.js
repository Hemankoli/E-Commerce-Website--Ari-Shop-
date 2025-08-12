const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000 
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Not Connected');
    process.exit(1);
  }
};

module.exports = connectDB;
