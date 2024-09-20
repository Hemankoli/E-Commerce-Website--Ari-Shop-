import React from 'react';
import { Link } from 'react-router-dom';
import currancySymbol from '../currancySymbol';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa6";
import { useAuth } from '../../Context/index';  
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const SearchProductCard = ({ loading, products = [] }) => {
    const loadingList = new Array(15).fill(null);

    const [auth] = useAuth(); 
    const navigate = useNavigate();

    // Add to Cart functionality
    const addToCart = async (product_id) => {
        if(!auth?.token || !auth?.user){
            toast.error('Please login to add product to cart');
        }else{
            try {
                await axios.post('http://localhost:8000/cart', {
                    user_id: auth?.user?.user_id,
                    product_id,
                    quantity: 1,
                });
                toast.success("Item added to cart!");
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error("Failed to add item to cart.");
            }
        }
    };

    return (
        <div className='container mx-auto relative'>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:py-6 px-6 lg::px-20 gap-6'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='relative mx-auto flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[250px] max-w-[320px] h-[350px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'
                        >
                            <div className='relative h-60 w-full flex items-center justify-center cursor-pointer bg-slate-100 animate-pulse'>
                                <FaSpinner className='w-full animate-spin' />
                                <div className='absolute top-2 right-2'>
                                    <button className='cursor-pointer w-full h-full bg-slate-200 animate-pulse p-4 rounded-full'></button>
                                </div>
                            </div>
                            <div className='flex flex-col mx-2 mt-4 flex-grow'>
                                <h2 className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse p-2 mb-2 rounded-full'></h2>
                                <h2 className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse p-2 rounded-full'></h2>
                                <div className='flex flex-row gap-4 mt-4'>
                                    <p className='text-gray-500 text-md font-sans mt-auto bg-slate-200 animate-pulse p-2 w-full rounded-full'></p>
                                    <p className='text-gray-600 text-xs font-sans flex justify-center items-center line-through bg-slate-200 animate-pulse p-2 w-full rounded-full'></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <div key={product?.product_id}
                            className='relative flex flex-col w-full min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                <Link to={`/product/${product?.productName}`} className='relative h-48 md:h-72 w-full flex items-center justify-center cursor-pointer'
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                    
                                    <img src={product?.image[0]} alt={product?.productName || 'Product Image'}
                                        className='w-full h-full object-cover object-center' 
                                    />
                                    <p className='absolute top-0 left-0 bg-pink-400 px-1 text-white'>{product?.category}</p>

                                </Link>
                                <div className='flex flex-col mx-2 mt-4 flex-grow'>
                                    <h2 className='text-md text-gray-800 line-clamp-2'>{product?.productName}</h2>
                                    <div className='flex flex-row gap-4'>
                                        <p className='text-gray-500 text-md font-sans mt-auto'>
                                            {currancySymbol(product?.price)}
                                        </p>
                                        <p className='text-gray-600 text-xs font-sans flex justify-center items-center line-through'>
                                            {currancySymbol(product?.selling)}
                                        </p>
                                    </div>
                                    <div className='absolute top-2 right-2'>
                                        <button onClick={() => addToCart(product.product_id)}
                                            className='bg-purple-500 hover:bg-red-400 p-2 rounded-full cursor-pointer'>
                                            <PiShoppingCartSimpleFill className='text-white text-lg' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='w-full flex justify-center'>
                            <h1 className="text-center py-4 text-red-500">
                                No products found.
                            </h1>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default SearchProductCard;
