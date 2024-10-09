const express = require('express');
require('dotenv').config()
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./database/connection')
const userRoutes = require('./routes/userRoutes')
const productRoute = require('./routes/Admin/productRoute')
const getAllUsersRoute = require('./routes/Admin/getAllUsersRoute')
const userProductRoute = require('./routes/User/userProductRoute')
const cartRoute = require('./routes/User/cartRoute')
const addressRoutes = require('./routes/User/addressRoutes')
const orderRoutesAdmin = require('./routes/Admin/orderRoute')



app.use(cors({
    origin : ["https://e-tail-ecommerce.vercel.app"],
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

app.use("/", userRoutes);

// ADMIN ROUTES
app.use("/", productRoute);
app.use("/", getAllUsersRoute);
app.use('/', orderRoutesAdmin)

// USER ROUTE
app.use("/", userProductRoute)
app.use("/", cartRoute)
app.use("/", addressRoutes)

// PORT CONNECTED
app.listen(process.env.PORT, () => {
    console.log(`Server running successfully at http://localhost:${process.env.PORT}`);
});
