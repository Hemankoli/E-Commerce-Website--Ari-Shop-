import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersFourThin } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";

import { HiOutlineCheckBadge } from "react-icons/hi2";

const AdminPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.classList.remove('no-scroll');
    }
  };

  return (
    <div className="flex flex-col mt-[68px]">
      <div className='flex flex-col lg:flex-row min-h-[calc(100vh-120px)]'>
        <aside className={`w-full bg-red-400 lg:w-[260px] fixed lg:static z-40 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className='p-4 border-b border-red-700'>
            <div className='flex lg:flex-row justify-between items-center'>
              <div className='flex items-center text-white'>
                <LuLayoutDashboard className='text-xl text-white' />
                <div className='ml-3 text-center lg:text-left'>
                  <h1 className='text-xl font-bold'>
                  Admin Panel
                  </h1>
                </div>
              </div>
              <button onClick={toggleMenu} className="lg:hidden p-2">
                <IoClose className="text-3xl text-gray-800" />
              </button>
            </div>
          </div>

          <div className='p-4'>
            <nav className='flex flex-col space-y-1'>
                {/* <Link to={'baners'} onClick={closeMenu} className='flex gap-6 md:w-full items-center mx-auto py-2 px-2 rounded-lg text-white hover:text-black  hover:bg-white'>
                    <CiImageOn className='text-lg lg:text-xl' />
                    <span className='text-lg lg:text-lg font-semibold'>Banners</span>
                </Link> */}

              <Link to={'all-products'} onClick={closeMenu} className='flex gap-6 md:w-full items-center mx-auto py-2 px-2 rounded-lg text-white hover:text-black hover:bg-white'>
                <CiShoppingBasket className='text-lg lg:text-xl' />
                <span className='text-lg lg:text-lg font-semibold'>Products</span>
              </Link>

              <Link to={'all-orders'} onClick={closeMenu} className='flex gap-6 md:w-full items-center mx-auto py-2 px-2 rounded-lg text-white hover:text-black hover:bg-white'>
                <HiOutlineCheckBadge className='text-lg lg:text-xl' />
                <span className='text-lg lg:text-lg font-semibold'>Orders</span>
              </Link>

              <Link to={'all-users'} onClick={closeMenu} className='flex gap-6 md:w-full items-center mx-auto py-2 px-2 rounded-lg text-white hover:text-black hover:bg-white'>
                <PiUsersFourThin className='text-lg lg:text-xl' />
                <span className='text-lg lg:text-lg font-semibold'>Users</span>
              </Link>
            </nav>
          </div>
        </aside>

        <main className='flex-grow p-6 bg-purple-300'>
          <div className="lg:hidden p-2">
            <button onClick={toggleMenu}>
              <IoMenu className="text-3xl text-gray-800" />
            </button>
          </div>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
