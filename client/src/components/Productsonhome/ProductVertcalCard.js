import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaChevronDown } from "react-icons/fa";
import toast from 'react-hot-toast';
import ProductEmpty from '../Cards/ProductEmpty';
import ProductCard from '../Cards/ProductCard';
import { useCart } from '../../Context/cart';

const ProductVerticalCard = ({ heading }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);    
    const [hasMore, setHasMore] = useState(true); 
    const [noMoreProductsShown, setNoMoreProductsShown] = useState(false); 
    const scrollElement = useRef();
    const {addToCart} = useCart();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    const loadingList = new Array(15).fill(null);

    const handleFetch =  useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseurl}/get-product?page=${page}`);
            if (response?.data?.length > 0) {
                const newProducts = response.data;
                setProducts(prevProducts => {
                    const existingProductIds = new Set(prevProducts.map(p => p._id));
                    const filteredProducts = newProducts.filter(product => product?.showcase === 'new' && !existingProductIds.has(product._id));
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
    }, [baseurl, noMoreProductsShown]);

    useEffect(() => {
        handleFetch(page);
    }, [page, handleFetch]);

    const loadMoreProducts = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className='md:px-10 px-4 my-12'>
            <h1 className='text-2xl font-bold text-center mb-12 transition-all'>{heading}</h1>

            <div className='relative'>
                <div className='grid grid-cols-2 md:grid-cols-4 justify-center lg:grid-cols-6 gap-4 py-4' ref={scrollElement}>

                    {
                        loading ? (
                            loadingList.map((_, index) => (
                                <div  key={index} className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                    <ProductEmpty key={index} />
                                </div>
                            ))
                        ) : (
                        products.map((product) => (
                            <div key={product?._id}
                                className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:w-[300px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                    <ProductCard key={product?._id} product={product} addToCart={addToCart} />
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
