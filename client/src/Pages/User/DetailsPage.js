import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const DetailsPage = () => {
  const {auth, setAuth} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const baseurl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const {email, name, phoneNumber, password, confirmPassword} = auth?.user
    setName(name)
    setEmail(email)
    setPhoneNumber(phoneNumber)
    setPassword(password)
    setConfirmPassword(confirmPassword)
  }, [auth?.user]);
  

  useEffect(() => {
    if (!auth?.token && !auth?.user) {
      navigate('/login');
    }
  }, [auth, navigate]);

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return; 
    }
    setLoading(true);

    try {
      const response = await axios.put(`${baseurl}/details`, 
        { user_id:auth?.user?.user_id, name, email, phone_number: phoneNumber, password, confirmpassword: confirmPassword }, {
        withCredentials: true, 
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const dataResponse = response.data;
      console.log(dataResponse)
      if(dataResponse?.error){
        toast.error(dataResponse?.error)
      }else{
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: { ...prevAuth.user, ...dataResponse.data },
        }));
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: dataResponse.data }));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error('Error updating profile');
    }
    setLoading(false);
  };

  return (
      <div className='bg-gray-100 rounded-lg'>
        <div className="w-full md:w-1/2 p-8">
          <h1 className='text-2xl text-purple-500 font-bold'>Details</h1>
          <form onSubmit={handleSubmit} className='mx-auto w-full'>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 px-3"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3"
                  placeholder="Email"
                  required
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <input
                  type= "number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full py-2 px-3"
                  placeholder="phone Number"
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
                  name="password"
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
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="flex shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
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
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default DetailsPage;
