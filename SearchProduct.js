import React, { useState, useEffect } from 'react';
import { useSearch } from '../Context/search';
import SearchProductCard from '../components/Productsonhome/SearchProductCard';
import axios from 'axios';
import { useAuth } from '../Context/index';  

const SearchProduct = () => {
    const {values, setValues} = useSearch();
    const [loading, setLoading] = useState(false);
    const {auth} = useAuth(); 

    const baseurl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseurl}/search/${values?.keyword}`);
                setValues({ ...values, results: response?.data?.data });
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (values?.keyword) {
            fetchProducts();
        }
    }, [values?.keyword, setValues]);

    return (
        <div>
            {loading && (
                <p className='flex justify-center items-center text-lg text-purple-500'>Loading...</p>
            )}

            <div className='relative mb-10'>
                <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] uppercase text-white text-lg md:text-3xl font-bold mb-6 text-center">
                {`Welcome ${auth?.token && auth?.user?.name ? "to the shopping cart" : "Guest"}`}
                </h1>
                <img src='https://koala.sh/api/image/v2-8qlwm-3qfid.jpg?width=1344&height=768&dream' alt={"cartImage"}
                className='w-full h-24 md:h-32 object-cover' />
            </div>
            
            {values?.results?.length === 0 && !loading && (
                <p className='flex justify-center items-center text-lg text-center text-purple-500'>No results found</p>
            )}

            {values?.results?.length > 0 && !loading && (
                <SearchProductCard loading={loading} products={values.results} />
            )}
        </div>
    );
}

export default SearchProduct;
