import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const UserPanel = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="user-panel">
      <div className='relative mb-10'>
            <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] uppercase text-white text-lg md:text-3xl font-bold mb-6 text-center">
                Profile
            </h1>
            <img src='https://koala.sh/api/image/v2-8qlwm-3qfid.jpg?width=1344&height=768&dream'  alt='PrfileImage'
            className='w-full h-24 md:h-32 object-cover' />
      </div>
      <div className="container  px-4 mx-auto my-8">
        <div className="bg-white p-8 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Account</h2>
            <button 
              className="lg:hidden p-1 border rounded-md text-gray-500 hover:bg-gray-200" onClick={toggleMenu}
            >
              Menu
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`lg:flex flex justify-center max-w-[260px] min-w-[100px] border border-gray-300 rounded-md bg-gray-100 py-1 ${menuOpen ? 'block' : 'hidden'} lg:block shadow-md`}>
            <Link to={'details'} className="py-2 px-4 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">Details</Link>
            <Link to={'orders'} className="py-2 px-4 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">Orders</Link>
            <Link to={'address'} className="py-2 px-4 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">Address</Link>
          </div>


          <div className="mt-4 border rounded-lg p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
  
