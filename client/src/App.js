import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Login from './Pages/Login';
import Header from './components/Header';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Footer from './components/Footer';
import AdminPanel from './Pages/Admin/AdminPanel';
import UserPanel from './Pages/User/UserPanel';
import AddressPage from './Pages/User/AddressPage';
import UserRoute from './Pages/PrivateRoutes/UserRoute';
import AdminRoute from './Pages/PrivateRoutes/AdminRoute';
import AllUsers from './Pages/Admin/AllUsers';
import AllProducts from './Pages/Admin/AllProducts';
import BannerUpload from './Pages/Admin/BannerUpload';
import AllOrders from './Pages/Admin/AllOrders';
import ProductDetails from './components/Productsonhome/ProductDetails';
import SearchProduct from './Pages/SearchProduct';
import DetailsPage from './Pages/User/DetailsPage';
import OrderPage from './Pages/User/OrderPage';
import CartPage from './components/Cart/CartPage';
import ErrorPage from './Pages/ErrorPage';
import CustomerSupportPage from './Pages/CustomerSupportPage';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>E-Tail</title>
          <meta name="description" content="Welcome to the best e-commerce store for all your needs." />
          <meta name="keywords" content="ecommerce, products, buy online, store, shopping" />
          <meta property="og:title" content="My E-commerce Store" />
          <meta property="og:description" content="Discover a wide range of products at unbeatable prices." />
          <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
          <meta property="og:url" content="https://yourwebsite.com" />
          <link rel="canonical" href="https://yourwebsite.com" />
        </Helmet>
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<ErrorPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/check_out' element={<Checkout />} />
            <Route path='/customer-support' element={<CustomerSupportPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path='/dashboard' element={<UserRoute />} >
              <Route path="user" element={<UserPanel />} >
                <Route path='details' element={<DetailsPage />} />
                <Route path='orders' element={<OrderPage />} />
                <Route path='address' element={<AddressPage />} />
              </Route>
            </Route>
            <Route path='/dashboard' element={<AdminRoute />} >
              <Route path="admin" element={<AdminPanel />} >
                <Route path='baners' element={<BannerUpload />} />
                <Route path='all-users' element={<AllUsers />} />
                <Route path='all-products' element={<AllProducts />} />
                <Route path='all-orders' element={<AllOrders />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </main>
        <Toaster />
      </>
    </HelmetProvider>
  );
}

export default App;
