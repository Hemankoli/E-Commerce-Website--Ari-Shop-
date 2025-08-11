const express = require('express');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoute = require('./routes/Admin/productRoute');
const getAllUsersRoute = require('./routes/Admin/getAllUsersRoute');
const userProductRoute = require('./routes/User/userProductRoute');
const cartRoute = require('./routes/User/cartRoute');
const addressRoutes = require('./routes/User/addressRoutes');
const orderRoutesAdmin = require('./routes/Admin/orderRoute');
const connectDB = require('./database/connection');

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];

// Setup CORS middleware before any routes
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Built-in and third-party middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


// Define your routes after CORS setup
app.use("/", userRoutes);
app.use("/", productRoute);
app.use("/", getAllUsersRoute);
app.use("/", orderRoutesAdmin);
app.use("/", userProductRoute);
app.use("/", cartRoute);
app.use("/", addressRoutes);

// Connect to the database
connectDB();

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}
