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
    origin : ["http://localhost:3000"],
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
if (require.main === module) {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`✅ Server running at http://localhost:${PORT}`);
    });
}
