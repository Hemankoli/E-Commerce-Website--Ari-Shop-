import { useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ArrowButton from '../Buttons/ArrowButton';
import ProductEmpty from '../Cards/ProductEmpty';
import { useCart } from '../../Context/cart';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import currancySymbol from '../currancySymbol';
import { Link } from 'react-router-dom';

const ProductCardFirst = ({ heading }) => {
    const { products, loading, addToCart } = useCart();
    const scrollElement = useRef();
    const loadingList = new Array(15).fill(null)

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollElement.current.scrollBy({ left: 500, behavior: 'smooth' });
    };

    const filteredProducts = products?.filter(prod => prod?.showcase === "bestselling") || [];


    return (
        <div className='md:px-10 px-4 my-12'>
            <h1 className='text-2xl font-bold text-center mb-12 transition-all'>{heading}</h1>

            <div className='relative'>
                <div className='flex gap-4 overflow-x-scroll scrollbar-none py-4' ref={scrollElement} >

                    {loading ? (
                        loadingList.map((_, index) => {
                            return (
                                <div key={index} className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                    <ProductEmpty key={index} />
                                </div>
                            )
                        })
                    ) : (
                        filteredProducts?.map((product) => (
                            <div key={product?._id}
                                className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:w-[300px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                <Link to={`/product/${product.productName}`} className='relative h-48 md:h-64 w-full flex items-center justify-center cursor-pointer'
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

                                    <img src={product?.image[0]} alt={product?.productName || 'Product Image'}
                                        className='w-full h-full object-cover object-center' />

                                    <p className='absolute top-0 left-0 bg-pink-400 px-1 text-white'>{product?.category}</p>

                                </Link>

                                <div className='flex flex-col mx-2 mt-4 flex-grow'>
                                    <h2 className='text-md text-gray-800 line-clamp-2'>{product?.productName}</h2>
                                    <div className='flex flex-row mt-4 gap-4'>
                                        <p className='text-gray-500 text-md font-sans mt-auto'>
                                            {currancySymbol(product?.price)}
                                        </p>
                                        <p className='text-gray-600 text-xs font-sans flex justify-center items-center line-through'>
                                            {currancySymbol(product?.selling)}
                                        </p>
                                    </div>
                                    <div className='absolute top-2 right-2'>
                                        <button onClick={() => addToCart(product._id)}
                                            className='bg-purple-500 hover:bg-red-400 p-2 rounded-full cursor-pointer'>
                                            <PiShoppingCartSimpleFill className='text-white text-lg' />
                                        </button>
                                    </div>
                                </div>                            </div>
                        ))
                    )}
                </div>
                <ArrowButton method={scrollLeft} icon={<FaAngleLeft />} className='left-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
                <ArrowButton method={scrollRight} icon={<FaAngleRight />} className='right-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
            </div>
        </div>
    );
};

export default ProductCardFirst;
