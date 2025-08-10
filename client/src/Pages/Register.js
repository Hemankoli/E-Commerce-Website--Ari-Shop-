import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && email && password && confirmPassword ) {
            if (password === confirmPassword) {
                if (password.length >= 6 && confirmPassword.length >= 6) {
                    try {
                        const response = await axios.post(`${baseurl}/register`, {
                            name,
                            email,
                            password,
                            confirmPassword: confirmPassword
                        });
                        if(response.status === 201){
                            toast.success("Register Successfully")
                            navigate("/");
                        }else{
                            toast.error("User Already Register");
                            navigate("/register")
                        }
                    } catch (error) {
                        toast.error("Server Error. Please try again later.", error);
                        console.log(error)
                    }
                }else{
                    toast.error("Password length must be greater than 6")
                }    
            }else{
                toast.error("password and confirm password not matched");
            }
        }else{
            toast.error("Please Enter required fields");
        }    
    };


    return (
        <div className="flex items-center justify-center min-h-80 p-12">
            <div className="bg-main border rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
                <div className="md:w-1/2 bg-purple-500 p-8 flex flex-col justify-center">
                    <h2 className="text-white text-3xl font-bold mb-4">Register</h2>
                    <p className="text-white mb-6">Get access to your Orders, Wishlist and Recommendations</p>
                    <img
                        src="https://www.itln.in/h-upload/2022/12/16/33072-3957701-scaled.webp"
                        alt="Register"
                        className="w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type="text"
                                    id="name"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full py-2 px-3"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Enter Email
                            </label>
                            <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type="text"
                                    id="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-2 px-3"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full py-2 px-3"
                                    placeholder="Password"
                                    required
                                />
                                <div className="flex items-center px-2 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    <span className="text-lg">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full py-2 px-3"
                                    placeholder="Confirm Password"
                                    required
                                />
                                <div className="flex items-center px-2 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    <span className="text-lg">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-700 items-center text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-4">
                        Already have an account? <Link to="/login" className="text-purple-500">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
