import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import currancySymbol from '../currancySymbol';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/index';  
import { useNavigate } from 'react-router-dom';

const ProductVerticalCard = ({ heading }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);    
    const [hasMore, setHasMore] = useState(true); 
    const [noMoreProductsShown, setNoMoreProductsShown] = useState(false); 
    const scrollElement = useRef();
    const [auth] = useAuth(); 
    const navigate = useNavigate();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    const loadingList = new Array(15).fill(null);

    const handleFetch = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseurl}/get-product?page=${page}`);
            if (response?.data?.length > 0) {
                const newProducts = response.data;
                setProducts(prevProducts => {
                    const existingProductIds = new Set(prevProducts.map(p => p.product_id));
                    const filteredProducts = newProducts.filter(product => !existingProductIds.has(product.product_id));
                    return [...prevProducts, ...filteredProducts];
                });
                setHasMore(true);
            } else {
                setHasMore(false);
                if (!noMoreProductsShown) {
                    toast("No more products available.");
                    setNoMoreProductsShown(true);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleFetch(page);
    }, [page]);

    const addToCart = async (product_id) => {
        if(!auth?.token || !auth?.user){
            toast.error('Please login to add product to cart');
        }else{
            try {
                await axios.post(`${baseurl}/cart`, {
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

    const loadMoreProducts = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className='container mx-auto px-4 my-12 max-w-full'>
            <h1 className='text-2xl font-bold text-center mb-12 transition-all'>{heading}</h1>

            <div className='relative'>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 justify-center lg:grid-cols-4 gap-4 py-4' ref={scrollElement}>

                    {
                        loading ? (
                            loadingList.map((_, index) => (
                                <div key={index}
                                    className='relative flex flex-col w-full h-[350px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>                               
                                    <div className='relative h-60 w-full flex items-center justify-center cursor-pointer bg-slate-100 animate-pulse'>
                                        <FaSpinner className='w-full animate-spin'/>
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
                        products.map((product, index) => (
                            <div key={index}
                            className='relative flex flex-col w-full min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                <Link to={`/product/${product.productName}`} className='relative h-48 md:h-72 w-full flex items-center justify-center cursor-pointer'
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                    <img src={product?.image[0]} alt={product?.productName || 'Product Image'}
                                        className='w-full h-full object-cover object-center' />

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
                        )
                    }
                </div>
            </div>

            <div className='mt-6 flex justify-center items-center'>
                <button 
                    onClick={loadMoreProducts}
                    disabled={!hasMore}
                    className={`bg-purple-500 flex justify-center items-center gap-2 text-white text-md px-6 py-2 rounded-full transition-all duration-300 ${!hasMore && 'opacity-50 cursor-not-allowed hover:bg-purple-600 '}`}
                >
                    {hasMore ? 'View all bestsellers' : 'No more products'}
                    <FaChevronDown />
                </button>
            </div>
        </div>
    );
};

export default ProductVerticalCard;
