    import React, { useState, useEffect, useRef } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import logo from '../assets/logo.png';
    import { MdMenu, MdClose } from 'react-icons/md';
    import { CiUser, CiSearch } from "react-icons/ci";
    import { FaHome, FaTv, FaTshirt } from 'react-icons/fa';
    import { PiUserCircleThin, PiShoppingBagLight, PiCodesandboxLogoThin, PiPhoneThin } from "react-icons/pi";
    import { IoIosLogOut } from "react-icons/io";
    import { IoSearch, IoBookSharp } from "react-icons/io5";
    import { MdOutlineKitchen } from 'react-icons/md';
    import { GiClothes } from 'react-icons/gi';
    import { useAuth } from '../Context/index';
    import { useSearch } from '../Context/search';
    import { useCart } from '../Context/cart';
    import toast from 'react-hot-toast';
    import axios from 'axios';

    const Header = () => {
        const [showMobileMenu, setShowMobileMenu] = useState(false);
        const [showSearchForm, setShowSearchForm] = useState(false);
        const [showDropdown, setShowDropdown] = useState(false);
        const dropdownRef = useRef(null);
        const [auth, setAuth] = useAuth();
        const { cartItems, fetchCartItems } = useCart();
        const [values, setValues] = useSearch();
        const navigate = useNavigate();

        console.log(auth?.user?.user_id)

        useEffect(() => {
            if (auth?.user?.user_id) {
              fetchCartItems(auth.user.user_id);
            }else{
              navigate('/login')
            }
        }, [auth, fetchCartItems, navigate]);

        const toggleMobileMenu = () => {
            setShowMobileMenu(!showMobileMenu);
            if (!showMobileMenu) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        };

        const handleLogout = async () => {
            await axios.post('http://localhost:8000/logout');
            setAuth({
                ...auth,
                user: null, token: ""
            });
            localStorage.removeItem("token")
            toast.success("Logout Successfully")
            navigate('/login');
        };


        const toggleSearchForm = () => {
            setShowSearchForm(!showSearchForm);
        };


        const handleSearch = async (e) => {
            e.preventDefault();
            if (values.keyword.trim()) { 
                try {
                    const response = await axios.get(`http://localhost:8000/search/${values.keyword}`);
                    setValues({ ...values, results: response.data.data });
                    navigate('/search');
                } catch (error) {
                    toast.error("Error fetching search results");
                }
            }
        }      

        const toggleDropdown = () => {
            setShowDropdown(!showDropdown);
        };    

        const handleLinkClick = () => {
            setShowMobileMenu(false);
            setShowDropdown(false);
            setShowSearchForm(false);
            document.body.classList.remove('no-scroll');

        };


        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        useEffect(() => {
            if (showDropdown) {
                document.addEventListener('mousedown', handleClickOutside);
            } else {
                document.removeEventListener('mousedown', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [showDropdown]);

        return (
            <div>
            <nav className="py-2 px-4 bg-main relative">
                <div className="mx-auto flex justify-between">
                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <button onClick={toggleMobileMenu} className="focus:outline-none">
                                {showMobileMenu ? <MdClose className="w-7 h-7 border border-gray-400 rounded-full p-1" /> : <MdMenu className="w-7 h-7 border border-gray-400 rounded-full p-1" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src={logo} alt="logo" className="h-8 w-8" />
                            <h1 className="text-3xl  font-bold text-gray-800">
                                <span className="tracking-wide">eTail</span>
                            </h1>
                        </Link>
                    </div>

                    <div className='container hidden my-auto lg:block'>
                        <div className='flex justify-center space-x-8'>
                            <Link to={'/'} className='flex items-center gap-1 py-1 px-2 rounded cursor-pointer text-purple-500'>
                                <FaHome className=''/>
                                <span className=''>Home</span>
                            </Link>
                            <Link className='flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:text-purple-500'>
                                <MdOutlineKitchen className=''/>
                                <span className=''>Accessories</span>
                            </Link>
                            <Link className='flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:text-purple-500'>
                                <FaTshirt className=''/>
                                <span className=''>K-pop</span>
                            </Link>
                            <Link className='flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:text-purple-500'>
                                <GiClothes className=''/>
                                <span className=''>Clothes</span>
                            </Link>
                            <Link className='flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:text-purple-500'>
                                <FaTv className=''/>
                                <span className=''>K-drama</span>
                            </Link>
                            <Link className='flex items-center gap-1  py-1 px-2 rounded cursor-pointer hover:text-purple-500'>
                                <IoBookSharp className=' '/>
                                <span className=''>Books</span>
                            </Link>

                        </div>
                    </div>
                    
                    <div className='flex items-center space-x-2 lg:space-x-4'>
                        <button onClick={toggleSearchForm} className='mx-2 hover:scale-110 transition-transform'>
                            <CiSearch className="w-6 h-6 hover:text-purple-500" />
                        </button>

                        <Link to="/cart" className="mx-2 relative hover:scale-110 transition-transform">
                            <PiShoppingBagLight className="w-6 h-6 hover:text-purple-500" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-1 bg-red-400 p-1 rounded-full h-5 w-5 text-white text-xs flex justify-center items-center">
                                {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <div className="flex items-center relative" ref={dropdownRef}>
                            <div className='hidden lg:block'>
                                {auth?.user ? (
                                    <button onClick={toggleDropdown} className="rounded-md py-1 px-2 flex items-center focus:outline-none">
                                        {auth.user && auth.user.name ? (
                                            <div className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                        ) : (
                                            <PiUserCircleThin className="w-8 h-8" />
                                        )}
                                    </button>                            
                                ) : (
                                    
                                    <button className="flex justify-center items-center">
                                        <Link to={"/login"} onClick={handleLinkClick} 
                                        className="px-1 py-1 text-white rounded bg-purple-500 hover:bg-purple-600 font-semibold cursor-pointer flex items-center">
                                        <PiUserCircleThin className='w-6 h-6 mr-1' /> Login
                                        </Link>
                                    </button>
                                )}
                            </div>

                            {showDropdown && (
                                <div className="absolute bg-white top-12 text-lg left-auto right-0 w-96 max-w-xs lg:max-w-md bg-custom-gray shadow-lg rounded-lg z-50">
                                    <div  onClick={handleLinkClick} className="px-4 py-4 flex font-semibold items-center">
                                        <div className='pr-2'>
                                            {   
                                                auth.user && auth.user.name ? (
                                                    <div className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full">
                                                        {auth.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                ) : (
                                                    <PiUserCircleThin className="w-8 h-8" />
                                                )
                                            }  
                                        </div>
                                        { 
                                            auth?.user ? (
                                                <span>{auth?.user?.name}</span>
                                            ) : (
                                                <Link to="/login" onClick={handleLinkClick} className="px-2 flex items-center text-white bg-purple-400 ">Login & Register</Link>
                                            )
                                        }                        
                                    </div>

                                    <hr className='border border-gray-200'></hr>
                                    
                                    <Link to={`/dashboard/${auth?.user?.role === 'ADMIN' ? 'admin/baners' : 'user/details'}`} onClick={handleLinkClick} className="flex items-center px-4 py-2 bg-white hover:bg-gray-100">
                                        <CiUser className='mx-2 w-5 h-5' />{auth?.user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Profile'}
                                    </Link>

                                
                                    <Link to="/dashboard/user/orders" onClick={handleLinkClick} className="flex items-center px-4 py-2 hover:bg-gray-100">
                                        <PiCodesandboxLogoThin className='mx-2 w-5 h-5' /> Orders
                                    </Link>

                                    <Link to="/customer-support" onClick={handleLinkClick} className="flex items-center px-4 py-2 hover:bg-gray-100 my-1">
                                        <PiPhoneThin className='mx-2 w-5 h-5' /> Customer Support 24x7
                                    </Link>

                                    <hr className='border border-gray-200'></hr>

                                    { auth.user ? (
                                        <div onClick={handleLinkClick} >
                                            <Link onClick={handleLogout} className="flex items-center px-1 py-2 bg-red-400 hover:bg-red-500 w-32 my-2 mx-8 font-semibold rounded-md text-white ">
                                                <IoIosLogOut className='mx-2 w-5 h-5' /> Logout
                                            </Link>
                                        </div>
                                        ) : (null)
                                    }
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* mobile version */}
                <div className={`lg:hidden fixed inset-0 top-12 z-10  bg-white transition-transform ${showMobileMenu ? 'transform translate-x-0' : 'transform -translate-x-full '} transition-transform duration-300 ease-in-out`}>
                    <div className="flex flex-col h-full">
                        <div className="px-4 py-4 flex font-semibold items-center mb-1">
                            {
                                auth.user && auth.user.name ? (
                                        <div className="w-8 h-8 flex items-center justify-center bg-purple-400 text-white rounded-full">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    ) : (
                                        <PiUserCircleThin className="w-8 h-8" />
                                )
                            
                            }
                            { auth?.user ? (
                                    <span className='px-2 items-center flex text-xl'>{auth?.user?.name}</span>
                                ) : (
                                    <Link to="/login" onClick={handleLinkClick} className="px-2 text-lg flex items-center ">
                                        Login & Register
                                   </Link>
                                )
                            }    
                        </div>     
                        <Link to={`/dashboard/${auth?.user?.role === 'ADMIN' ? 'admin/baners' : 'user/details'}`} onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100">
                            <CiUser className='mx-2 w-5 h-5 text-purple-500' />Profile
                        </Link>
                        <Link to="/dashboard/user/orders" onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100">
                            <PiCodesandboxLogoThin className='mx-2 w-5 h-5 text-purple-500' /> Orders
                        </Link>
                        <Link to="/customer-support" onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100 mb-1">
                            <PiPhoneThin className='mx-2 w-5 h-5 text-purple-500' /> Customer-support Support 24x7
                        </Link>
                        
                        <hr className='h-1 border-gray-200'></hr>

                        <div className='mx-2'>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>
                                Kpop 
                            </Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Kdrama</Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Accessories</Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Kids</Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Mens</Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Womens</Link>
                            <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Shirts</Link>
                        </div>
                        
                        {auth?.user ? (
                            <div className="mt-auto">    
                                <div onClick={handleLinkClick}>
                                    <Link onClick={handleLogout} className=" flex text-xl font-semibold items-center px-4 py-2 hover:bg-gray-100 mt-1">
                                        <IoIosLogOut className='mx-2 w-5 h-5 text-purple-500' /> Logout
                                    </Link>
                                </div>
                            </div>
                        ) : 
                        (null)
                        }
                    
                    </div>
                </div>

                {/* SHOW SEARCH FORM FOR MOBILE VERSION */}
                {showSearchForm && (
                    <div className={`absolute top-0 left-0 w-full shadow-lg p-2 bg-white z-40 transition-transform duration-300 ease-in-out ${showSearchForm ? 'translate-y-0' : '-translate-y-full'}`}>
                        <form className="max-w-3xl mx-auto flex items-center" onSubmit={handleSearch}>
                            <div className="relative flex items-center w-full">
                                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    className="w-full h-9 pl-10 pr-12 border border-purple-500 bg-slate-100 focus:shadow-md focus:outline-none focus:bg-inherit rounded-lg"
                                    placeholder="Search..."
                                    value={values.keyword}
                                    onChange={((e) => setValues({...values, keyword: e.target.value}))}
                                />
                                <button type="submit" onClick={handleSearch} className="ml-4 bg-purple-500 text-white rounded-lg px-1 py-1 hover:bg-purple-600">
                                    <IoSearch onClick={handleLinkClick} className='w-6 h-6' />
                                </button>
                                <button className="ml-2 bg-purple-500 text-white rounded-lg px-1 py-1 hover:bg-purple-600" onClick={toggleSearchForm}>
                                    <MdClose className="w-6 h-6" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* <hr className='hidden lg:block my-5 border-purple-400 -mx-2'></hr>
                <div className='hidden lg:flex space-x-20 mb-4 mx-44 text-xl font-mono'>
                    <Link className='nav-link hover:text-purple-500' to="/">Kpop</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Kdrama</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Accessories</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Kids</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Mens</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Womens</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Shirts</Link>
                    <Link className='nav-link hover:text-purple-500' to="/">Shirts</Link>
                </div> */}
            </nav>
            </div>
        );
    };

    export default Header;
