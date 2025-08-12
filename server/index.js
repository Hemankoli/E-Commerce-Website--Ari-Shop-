const express = require('express');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your DB connection and routes
require('./database/connection');
const userRoutes = require('./routes/userRoutes');
const productRoute = require('./routes/Admin/productRoute');
const getAllUsersRoute = require('./routes/Admin/getAllUsersRoute');
const userProductRoute = require('./routes/User/userProductRoute');
const cartRoute = require('./routes/User/cartRoute');
const addressRoutes = require('./routes/User/addressRoutes');
const orderRoutesAdmin = require('./routes/Admin/orderRoute');
const orderRoutes = require('./routes/User/orderRoutes');
const connectDB = require('./database/connection');

// Allowed origins for CORS
const allowedOrigins = [process.env.FRONTEND_URL];

// Setup CORS middleware before any routes
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Built-in and third-party middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Trust proxy if behind reverse proxy (e.g. Render, Heroku)
app.set('trust proxy', 1);

// Define your routes after CORS setup
app.use("/", userRoutes);
app.use("/", productRoute);
app.use("/", getAllUsersRoute);
app.use("/", orderRoutesAdmin);
app.use("/", userProductRoute);
app.use("/", cartRoute);
app.use("/", addressRoutes);
app.use("/", orderRoutes);

// Simple test route to verify CORS is working
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS Error: This origin is not allowed.' });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to the database
connectDB();

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}
