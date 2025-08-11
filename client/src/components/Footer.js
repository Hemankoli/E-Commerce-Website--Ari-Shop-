import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaSquareFacebook, FaSquareTwitter, FaSquareInstagram } from "react-icons/fa6";


const Footer = () => {

    const navigate = useNavigate();
    function handleLogoClick(path) {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <footer className="bg-gray-100 py-4">
            <div className="px-4 md:px-10">
                <div className="md:flex md:flex-wrap md:-mx-4 py-6">
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h1 className="mb-8 flex items-center text-4xl font-bold space-x-2" >
                            <img src={logo} alt='logo' className='h-8 md:h-10 items-center' />
                            <span className='flex items-center text-3xl font-bold text-gray-800'>
                                E-Tail
                            </span>
                            </h1>
                        <h4 className="text-black text-lg font-bold mb-2">About Us</h4>
                        <p className="text-gray-600">E-Tail is your go-to online store for all things fashion. We offer the latest trends and styles at affordable prices.</p>
                    </div>
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h4 className="text-black text-lg font-bold mb-2">Categories</h4>
                        <ul>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">Men</button></li>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">Women</button></li>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">Kids</button></li>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">Accessories</button></li>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">New Arrivals</button></li>
                            <li><button onClick={()=>handleLogoClick('/')} className="text-gray-600 hover:text-purple-500">Sale</button></li>
                        </ul>
                    </div>
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h4 className="text-black text-lg font-bold mb-2">Customer Care</h4>
                        <ul>
                            <li><button onClick={()=>handleLogoClick('/customer-support')} className="text-gray-600 hover:text-purple-500">Contact Us</button></li>
                            <li><button onClick={()=>handleLogoClick('/customer-support')} className="text-gray-600 hover:text-purple-500">FAQs</button></li>
                            <li><button onClick={()=>handleLogoClick('/customer-support')} className="text-gray-600 hover:text-purple-500">Shipping & Returns</button></li>
                            <li><button onClick={()=>handleLogoClick('/customer-support')} className="text-gray-600 hover:text-purple-500">Terms & Conditions</button></li>
                        </ul>
                    </div>
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h4 className="text-black text-lg font-bold mb-2">Follow Us</h4>
                        <ul className="flex">
                            <li className="mr-4">
                                <Link to="/facebook" className="text-blue-600 ">
                                    <FaSquareFacebook className='hover:scale-110 transition-transform' style={{ width: "20px", height: "20px" }} />
                                </Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/twitter" className="text-blue-600 ">
                                    <FaSquareTwitter className='hover:scale-110 transition-transform' style={{ width: "20px", height: "20px" }} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/instagram" className="text-instragram ">
                                    <FaSquareInstagram className='hover:scale-110 transition-transform' style={{ width: "20px", height: "20px" }} />
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6">
                <div className="container mx-auto px-4 pt-6">
                    <p className="text-gray-600 text-center">&copy; {new Date().getFullYear()} E-Tail All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
