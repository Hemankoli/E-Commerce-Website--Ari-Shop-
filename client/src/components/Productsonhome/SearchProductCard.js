import { useAuth } from '../../Context/index';  
import toast from 'react-hot-toast';
import axios from 'axios';
import ProductEmpty from '../Cards/ProductEmpty';
import ProductCard from '../Cards/ProductCard';


const SearchProductCard = ({ loading, products = [] }) => {
    const loadingList = new Array(15).fill(null);

    const {auth} = useAuth() 

    const baseurl = process.env.REACT_APP_BACKEND_URL;  


    // Add to Cart functionality
    const addToCart = async (product_id) => {
        if(!auth?.token || !auth?.user){
            toast.error('Please login to add product to cart');
        }else{
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
        }
    };

    return (
        <div className='md:px-10 px-4 my-12'>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:py-6 px-6 lg::px-20 gap-6'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <ProductEmpty key={index} />
                    ))
                ) : (
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product?._id} product={product} addToCart={addToCart} />
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
