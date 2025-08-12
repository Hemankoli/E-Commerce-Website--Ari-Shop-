import { useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ArrowButton from '../Buttons/ArrowButton';
import ProductCard from '../Cards/ProductCard';
import ProductEmpty from '../Cards/ProductEmpty';
import { useCart } from '../../Context/cart';

const ProductByCategory = ({ heading, category }) => {
    const { products, loading, addToCart} = useCart();
    const scrollElement = useRef();

    const loadingList = new Array(15).fill(null);

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollElement.current.scrollBy({ left: 500, behavior: 'smooth' });
    };

    const filteredProducts = products?.filter(prod => prod?.showcase === "kpop") || [];

    return (
        <div className='md:px-10 px-4 my-12'>
            <h1 className='text-2xl font-bold text-center mb-12 transition-all'>{heading}</h1>

            <div className='relative'>
                <div className='flex gap-4 overflow-x-scroll scrollbar-none py-4' ref={scrollElement} >

                    {loading ? (
                        loadingList.map((_, index) => (
                            <div  key={index} className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                <ProductEmpty key={index} />
                            </div>                        ))
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product?._id}
                                className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:w-[300px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                <ProductCard key={product?._id} product={product} addToCart={addToCart} />
                            </div>
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
