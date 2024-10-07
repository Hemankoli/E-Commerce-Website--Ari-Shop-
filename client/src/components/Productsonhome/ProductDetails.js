import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaSpinner, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import curranceySymboy from '../currancySymbol';
import ProductCardFirst from './ProductCardFirst';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/index';
import { Helmet } from 'react-helmet-async';


const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const productImageLoadingList = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState('');
    const [zoomImageCordinate, setZoomImageCordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);
    const [auth] = useAuth();
    const { productId } = useParams();
    const navigate = useNavigate();

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    const productHemlet = { name: 'E-Tail', description: 'A great product', image: 'product-image-url.jpg' };

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseurl}/product/${productId}`);
            setProduct(response?.data?.data[0]);
            setActiveImage(response?.data?.data[0]?.image?.[0] || 'defaultImageURL');
        } catch (error) {
            console.error('Error fetching product de    tails:', error);
            toast.error('Failed to fetch product details.');
        }
        setLoading(false);
    };

        useEffect(() => {
            if(productId){
                fetchProductDetails();
            } 
        }, [productId]);

    
    const handleChangeImage = (imgUrl) => {
        setActiveImage(imgUrl);
    };

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImageCordinate({ x, y });
    }, []);

    const handleLeaveZoomImage = () => {
        setZoomImage(false);
    };

    // Add to Cart functionality
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


    if (loading) {
        return (
            <div className='py-4 px-6 lg:py-6 lg:px-10'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='h-full flex flex-col lg:flex-row-reverse gap-4'>
                        <div className='relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded'>
                            <div className='h-full w-full flex justify-center items-center bg-slate-300 rounded animate-pulse'>
                                <div></div>
                                <FaSpinner className='animate-spin' />
                            </div>
                        </div>
                        <div className='h-full flex flex-row lg:flex-col overflow-scroll scrollbar-none'>
                            {productImageLoadingList.map((_, index) => (
                                <div key={index} className='h-20 mr-2 md:mb-2 w-20 bg-slate-300 rounded animate-pulse'></div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-full lg:mt-0 lg:mx-10 mt-10'>
                        <div className='grid gap-4'>
                            <p className='bg-slate-200 animate-pulse h-6 w-full rounded-full'></p>
                            <h2 className='bg-slate-200 animate-pulse h-6 w-full rounded-full'></h2>
                            <p className='bg-slate-200 animate-pulse h-6 rounded-full'></p>
                            <div className='bg-slate-200 animate-pulse h-6 rounded-full'></div> 
                            <div className='flex gap-4'>
                                <button className='bg-slate-200 h-8 rounded-full animate-pulse w-full'></button>
                                <button className='bg-slate-200 h-8 rounded-full animate-pulse w-full'></button>
                            </div>
                            <div>
                                <p className='bg-slate-200 h-6 rounded-full animate-pulse w-full'></p>
                                <p className='bg-slate-200 h-12 mt-6 rounded animate-pulse w-full'></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <Helmet>
                <title>{productHemlet.name} - {product.productName}</title>
                <meta name="description" content={productHemlet.description} />
                <meta name="keywords" content={`${productHemlet.name}, buy online, ecommerce`} />
                <meta property="og:title" content={productHemlet.name} />
                <meta property="og:description" content={productHemlet.description} />
                <meta property="og:image" content={productHemlet.image} />
                <link rel="canonical" href={`https://yourwebsite.com/product/${productId}`} />
            </Helmet>
        
            <div className='container mx-auto py-4 px-6 lg:py-6 lg:px-10'>
                <div className='min-h-[200px] flex flex-col md:flex-row lg:flex-row'>
                    {/* Image details */}
                    <div className='h-96 flex flex-col md:flex-row-reverse lg:flex-row-reverse gap-4'>
                        <div className='relative h-[300px] w-[300px] lg:h-96 lg:w-96 rounded'>
                            <img
                                src={activeImage}
                                alt="Product"
                                className='h-full w-full object-cover cursor-pointer'
                                onMouseMove={handleZoomImage}
                                onMouseLeave={handleLeaveZoomImage}
                            />
                            {/* Zoom Image */}
                            {zoomImage && (
                                <div className='hidden md:block absolute min-h-[400px] min-w-[500px]  p-1 -right-[520px] top-0 overflow-hidden'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] bg-cover'
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        <div className='h-full flex flex-row md:flex-col lg:flex-col gap-2 sm:overflow-x-auto md:overflow-y-auto lg:overflow-y-auto scrollbar-none'>
                            {Array.isArray(product.image) && product.image.length > 0 ? (
                                product.image.map((imgUrl, index) => (
                                    <div key={index} className='h-20 w-20 rounded'>
                                        <img
                                            src={imgUrl}
                                            alt={`Thumbnail ${index}`}
                                            onMouseEnter={() => handleChangeImage(imgUrl)}
                                            onClick={() => handleChangeImage(imgUrl)}
                                            className='w-full h-full object-cover cursor-pointer'
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className='flex flex-col gap-4 md:mt-0 md:mx-8 lg:mt-0 mt-12 lg:mx-8'>
                        <h2 className='text-2xl lg:text-2xl font-medium'>{product.productName}</h2>
                        <p className='bg-purple-200  text-red-400 px-4 py-1 rounded-full inline-block w-fit'>{product.brandName}</p>
                        <div className='text-yellow-400 flex items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <div className='flex items-center gap-2 font-medium'>
                            <p className='text-lg lg:text-xl text-slate-400 line-through'>{curranceySymboy(product.selling)}</p>
                            <p className='text-xl lg:text-2xl text-purple-500'>{curranceySymboy(product.price)}</p>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                            <Link to={'check_out'}>
                                <button className='border-2 border-purple-500 hover:border-purple-600 px-10 py-2 rounded-lg min-w-[120px] bg-purple-500 hover:bg-purple-600 text-white font-semibold'>
                                    Buy
                                </button>
                            </Link>
                            
                            <button onClick={() => addToCart(product.product_id)} 
                            className='border-2 border-purple-500 md:px-4 px-4 py-2 rounded-lg min-w-[120px] text-black hover:bg-purple-500 hover:text-white'>
                                Add To Cart
                            </button>
                        </div>
                        
                        <div>
                            <p className='text-slate-600 font-medium'>Description:</p>
                            <p className='text-slate-500'>{product.description}</p>
                        </div>
                    </div>
                </div>

                <ProductCardFirst category={"k-pop"} heading={"Best Selling products"} />
                <ProductCardFirst category={"k-pop"} heading={"Related Products"} />    
            </div>  
        </>
        
    );
}   

export default ProductDetails;
