import React from 'react'
import { useCart } from '../../Context/cart';

function ArrowButton({method, icon, className=''}) {
    const { loading } = useCart();
    return (
        <>
            {!loading && (<button
                onClick={method}
                className={`bg-purple-500 hover:bg-red-500 text-white font-bold border-2 border-red-300 shadow-lg rounded-full text-xl hidden md:block ${className}`}
            >
                {icon}
            </button>)}
        </>
        
    )
}

export default ArrowButton
