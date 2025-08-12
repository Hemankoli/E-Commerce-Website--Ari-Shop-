import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../Context/index';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (email && password) {
            try {
                const response = await axios.post(`${baseurl}/login`, { email, password }, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                      },
                });
                if (response.status === 200 ) {
                    toast.success('Login Successfully');
                    setAuth({ user: response.data.user, token: response.data.token })
                    localStorage.setItem('auth', JSON.stringify(response.data))
                    navigate('/');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Incorrect Password');
                } else if (error.response && error.response.status === 404) {
                    toast.error('User Not Found');
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
                console.log(error);
            }
        } else {
            toast.error('Please enter both email and password');
        }
    };

    

    return (
        <div className="flex items-center justify-center min-h-80 p-12 mt-32">
            <div className="bg-main border rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
                <div className="md:w-1/2 bg-purple-500 p-8 flex flex-col justify-center">
                    <h2 className="text-white text-3xl font-bold mb-4">Login</h2>
                    <p className="text-white mb-6">Get access to your Orders, Wishlist and Recommendations</p>
                    <img
                        src="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2020/07/The-best-eCommerce-platform-for-Food-delivery.png"
                        alt="Login"
                        className="w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-md font-bold mb-2">
                                Email
                            </label> 
                            <div className="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    required
                                    className="w-full py-2 px-3"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-md font-bold mb-2">
                                Password
                            </label>
                            <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name='password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    required
                                    className="w-full py-2 px-3"
                                />
                            
                                <div className="flex items-center px-2 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    <span className="text-lg">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            
                            <div className='mt-2 flex justify-start'>
                                <div className="flex-grow"></div>
                                <Link to="/forget-password" className="hover:underline text-sm">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>     
                            <div className="flex items-center justify-center">
                                <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Login
                                </button>
                            </div>
                    </form> 
                    <p className="text-center text-gray-500 text-xs mt-4">
                        New Here? <Link to="/register" className="text-purple-500">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
