import React from 'react'
import { Link } from 'react-router-dom'
import currancySymbol from '../currancySymbol'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'

export default function ProductCard({product, addToCart}) {
    return (
        <div key={product?._id}
            className='relative flex flex-col w-[220px] md:w-[320px] lg:w-[220px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>

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
            </div>
        </div>
    )
}
