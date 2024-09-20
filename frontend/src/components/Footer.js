import React from 'react';
import { Link } from 'react-router-dom';
import { FaSquareFacebook, FaSquareTwitter, FaSquareInstagram } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-gray-100 mx-auto">
            <div className="container mx-auto px-4">
                <div className="md:flex md:flex-wrap md:-mx-4 py-6">
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h1 className="mb-8 flex items-center text-4xl font-bold" >
                            <img src='https://1000logos.net/wp-content/uploads/2021/12/Akatsuki-Logo.png' alt='logo' className='h-8 md:h-10 items-center' />
                            <span className='flex items-center text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent'>
                                AriZon
                            </span>
                            </h1>
                        <h4 className="text-black text-lg font-bold mb-2">About Us</h4>
                        <p className="text-gray-600">AriZon is your go-to online store for all things fashion. We offer the latest trends and styles at affordable prices.</p>
                    </div>
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h4 className="text-black text-lg font-bold mb-2">Categories</h4>
                        <ul>
                            <li><Link to="/men" className="text-gray-600 hover:text-purple-500">Men</Link></li>
                            <li><Link to="/women" className="text-gray-600 hover:text-purple-500">Women</Link></li>
                            <li><Link to="/kids" className="text-gray-600 hover:text-purple-500">Kids</Link></li>
                            <li><Link to="/accessories" className="text-gray-600 hover:text-purple-500">Accessories</Link></li>
                            <li><Link to="/new-arrivals" className="text-gray-600 hover:text-purple-500">New Arrivals</Link></li>
                            <li><Link to="/sale" className="text-gray-600 hover:text-purple-500">Sale</Link></li>
                        </ul>
                    </div>
                    <div className="md:w-1/4 md:px-4 mb-6 md:mb-0">
                        <h4 className="text-black text-lg font-bold mb-2">Customer Care</h4>
                        <ul>
                            <li><Link to="/customer-support" className="text-gray-600 hover:text-purple-500">Contact Us</Link></li>
                            <li><Link to="/customer-support" className="text-gray-600 hover:text-purple-500">FAQs</Link></li>
                            <li><Link to="/customer-support" className="text-gray-600 hover:text-purple-500">Shipping & Returns</Link></li>
                            <li><Link to="/customer-support" className="text-gray-600 hover:text-purple-500">Terms & Conditions</Link></li>
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
                    <p className="text-gray-600 text-center">&copy; {new Date().getFullYear()} Ditto All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
