const express = require('express');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const PORT = process.env.PORT || 4000;


// Built-in and third-party middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Define your routes after CORS setup
app.use("/", userRoutes);
app.use("/", productRoute);
app.use("/", getAllUsersRoute);
app.use("/", orderRoutesAdmin);
app.use("/", userProductRoute);
app.use("/", cartRoute);
app.use("/", addressRoutes);
app.use("/", orderRoutes);

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
})
