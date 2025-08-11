import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../Context/index';
import axios from 'axios';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import toast from 'react-hot-toast';
import ArrowButton from '../Buttons/ArrowButton';
import ProductCard from '../Cards/ProductCard';
import ProductEmpty from '../Cards/ProductEmpty';

const ProductByCategory = ({ heading, category }) => {
    const {auth} = useAuth()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollElement = useRef();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    const loadingList = new Array(15).fill(null);

    const handleFetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseurl}/category-product/${category}`);
            setProducts(response?.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products.');
        }
        setLoading(false);
    }, [baseurl, category]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch]);

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollElement.current.scrollBy({ left: 500, behavior: 'smooth' });
    };

    const addToCart = async (product_id) => {
        if (!auth?.token || !auth?.user) {
            toast.error('Please login to add product to cart');
            return;
        }
        try {
            await axios.post(`${baseurl}/cart`, {
                user_id: auth?.user?._id,
                product_id,
                quantity: 1,
            });
            toast.success("Item added to cart!");
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error("Failed to add item to cart.");
        }
    };

    return (
        <div className='md:px-10 px-4 my-12'>
            <h1 className='text-2xl font-bold text-center mb-12 transition-all'>{heading}</h1>

            <div className='relative'>
                <div className='flex gap-4 overflow-x-scroll scrollbar-none py-4' ref={scrollElement} >

                    {loading ? (
                        loadingList.map((_, index) => (
                            <ProductEmpty key={index} />
                        ))
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product?._id} product={product} addToCart={addToCart} />
                        ))
                    )}
                </div>
                <ArrowButton method={scrollLeft} icon={<FaAngleLeft />} className='left-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
                <ArrowButton method={scrollRight} icon={<FaAngleRight />} className='right-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
            </div>
        </div>
    );
};

export default ProductByCategory;
