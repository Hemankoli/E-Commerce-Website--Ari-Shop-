  import { Routes, Route } from 'react-router-dom';
  import { Toaster } from 'react-hot-toast';
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


  function App() {

    return (
      <>
        <Header />
            <main>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="*" element={<ErrorPage />} />
                <Route path='/cart'  element={<CartPage />} />
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
    );
  }

  export default App;
