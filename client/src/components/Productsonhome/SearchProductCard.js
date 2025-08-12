import ProductEmpty from '../Cards/ProductEmpty';
import ProductCard from '../Cards/ProductCard';
import { useCart } from '../../Context/cart';


const SearchProductCard = ({products}) => {
    const loadingList = new Array(15).fill(null);
    const {loading, addToCart} = useCart();

    return (
        <div className='md:px-10 px-4 my-12'>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:py-6 px-6 lg::px-20 gap-6'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div  key={index} className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                            <ProductEmpty key={index} />
                        </div>
                    ))
                ) : (
                    products.length > 0 ? (
                        products?.map((product) => (
                            <div key={product?._id}
                                className='relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(25%-2rem)] min-w-[160px] md:min-w-[220px] max-w-[220px] md:w-[300px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
                                    <ProductCard key={product?._id} product={product} addToCart={addToCart} />
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
