import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { CiUser, CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { PiUserCircleThin, PiShoppingBagLight, PiCodesandboxLogoThin, PiPhoneThin } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useAuth } from '../Context/index';
import { useSearch } from '../Context/search';
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [auth, setAuth] = useAuth();
    const [values, setValues] = useSearch();
    const navigate = useNavigate();



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
           <nav className="p-2 bg-main relative">
            <div className="mx-auto flex justify-between">
                <div className="flex items-center">
                    <div className="lg:hidden">
                        <button onClick={toggleMobileMenu} className="focus:outline-none">
                            {showMobileMenu ? <MdClose className="w-7 h-7 border border-gray-400 rounded-full p-1" /> : <MdMenu className="w-7 h-7 border border-gray-400 rounded-full p-1" />}
                        </button>
                    </div>
                </div>
                <div className="">
                    <Link to="/">
                        <h1 className="flex text-3xl font-bold" >
                            <img src='https://1000logos.net/wp-content/uploads/2021/12/Akatsuki-Logo.png' alt='logo' className='h-8' />
                            <span className=''>Ari</span>
                        </h1>
                    </Link>
                </div>
                {/* <div className='container hidden lg:block'>
                    <div className='flex justify-center space-x-8'>
                        <Link className='flex items-center gap-1'>
                            <FcHome className='-mt-0.5'/>
                            <span className=''>Home</span>
                        </Link>
                        <Link className='flex items-center gap-1'>
                            <FcTwoSmartphones className='-mt-0.5'/>
                            <span className=''>Accessories</span>
                        </Link>
                        <Link className='flex items-center gap-1'>
                            <FcTwoSmartphones className='-mt-0.5'/>
                            <span className=''>K-pop</span>
                        </Link>
                        <Link className='flex items-center gap-1'>
                            <FcTwoSmartphones className='-mt-0.5'/>
                            <span className=''>Clothes</span>
                        </Link>
                        <Link className='flex items-center gap-1'>
                            <FcTwoSmartphones className='-mt-0.5'/>
                            <span className=''>K-drama</span>
                        </Link>

                    </div>
                </div> */}
                
                {/* <div className="flex-1 hidden lg:flex justify-center">
                    <div className="relative flex items-center border border-purple-500 rounded-lg w-full max-w-xl" onSubmit={handleSearch}>
                        <CiSearch className="absolute w-5 h-5 left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
                        <input
                            type="text"
                            className="w-full h-8 pl-10 bg-slate-100 focus:bg-inherit focus:shadow rounded-lg focus:outline-none"
                            placeholder="Search for products, brands and more....."
                            onChange={handleInputChange}
                        />
                    </div>
                </div> */}
                <div className='flex items-center space-x-2 lg:space-x-4'>
                    <button onClick={toggleSearchForm} className='mx-2 hover:scale-110 transition-transform'>
                        <CiSearch className="w-6 h-6 hover:text-purple-500" />
                    </button>

                    <Link to="/cart" className="mx-2 relative hover:scale-110 transition-transform">
                        <PiShoppingBagLight className="w-6 h-6 hover:text-purple-500" />
                        <span className="absolute -top-2 -right-1 bg-red-400 p-1 rounded-full h-5 text-white text-md flex justify-center items-center">
                            0
                        </span>
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
                                    <Link to="/login" onClick={handleLinkClick} className="px-3 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-semibold flex items-center">
                                       <FaUser className='text-lg mr-1' /> Login
                                    </Link>
                                </button>
                            )}
                        </div>

                        {showDropdown && (
                            <div className="absolute top-16 text-lg left-auto right-0 w-96 max-w-xs bg-gray-100 lg:max-w-md bg-custom-gray border z-50 rounded-md">
                                <div  onClick={handleLinkClick} className="px-4 py-4 flex bg-gray-100 rounded-md font-semibold items-center">
                                    <PiUserCircleThin className='w-10 h-10' />
                                    
                                    { auth?.user ? (
                                        <span>{auth?.user?.name}</span>
                                    ) : (
                                        <Link to="/login" onClick={handleLinkClick} className="px-2 flex items-center">Login</Link>
                                    )
                                    }                        
                                </div>
                                <Link to={`/dashboard/${auth?.user?.role === 'ADMIN' ? 'admin/baners' : 'user/details'}`} onClick={handleLinkClick} className="flex items-center px-4 py-2 bg-white hover:bg-gray-100">
                                    <CiUser className='mx-2 w-5 h-5' />{auth?.user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Account'}
                                </Link>

                                <Link to="/dashboard/admin/baners" onClick={handleLinkClick} className="flex items-center px-4 py-2 bg-white hover:bg-gray-100">
                                    <PiCodesandboxLogoThin className='mx-2 w-5 h-5' /> ADMIN
                                </Link>

                                <Link to="/dashboard/user/orders" onClick={handleLinkClick} className="flex items-center px-4 py-2 bg-white hover:bg-gray-100">
                                    <PiCodesandboxLogoThin className='mx-2 w-5 h-5' /> Orders
                                </Link>

                                <Link to="/customer" onClick={handleLinkClick} className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 my-1">
                                    <PiPhoneThin className='mx-2 w-5 h-5' /> Customer Support 24x7
                                </Link>

                                { auth.user ? (<div onClick={handleLinkClick} >
                                    <Link onClick={handleLogout} className="flex items-center px-4 py-2 bg-white rounded-md hover:bg-gray-100">
                                         <IoIosLogOut className='mx-2 w-5 h-5' /> Logout
                                    </Link>
                                </div>) : (null)
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
                            {auth.user && auth.user.name ? (
                                    <div className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <PiUserCircleThin className="w-8 h-8" />
                            )}
                        { auth?.user ? (
                                <span className='px-2 items-center flex text-xl'>{auth?.user?.name}</span>
                            ) : (
                            <Link to="/login" onClick={handleLinkClick} className="px-2 text-xl flex items-center">Login</Link>
                            )
                        }    
                    </div>     
                    <Link to={`/dashboard/${auth?.user?.role === 'ADMIN' ? 'admin/baners' : 'user/details'}`} onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100">
                        <CiUser className='mx-2 w-5 h-5 text-purple-500' />Account
                    </Link>
                    <Link to="/orders" onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100">
                        <PiCodesandboxLogoThin className='mx-2 w-5 h-5 text-purple-500' /> Orders
                    </Link>
                    <Link to="/customer" onClick={handleLinkClick} className="flex text-lg items-center px-4 py-2 hover:bg-gray-100 mb-1">
                        <PiPhoneThin className='mx-2 w-5 h-5 text-purple-500' /> Customer Support 24x7
                    </Link>
                    


                    {/* <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>
                        Kpop 
                    </Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Kdrama</Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Accessories</Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Kids</Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Mens</Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Womens</Link>
                    <Link className='flex text-lg items-center px-4 py-2 hover:bg-gray-100'>Shirts</Link> */}

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
