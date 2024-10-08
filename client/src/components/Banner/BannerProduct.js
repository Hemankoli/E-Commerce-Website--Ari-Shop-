import React, { useState, useEffect, useRef } from 'react'; 
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"; 

const BannerProduct = () => { 
    const scrollElement = useRef(); 
    const images = [ 
        'https://koala.sh/api/image/v2-8qlwm-3qfid.jpg?width=1344&height=768&dream', 
        'https://koala.sh/api/image/v2-8qly1-y9gkv.jpg?width=1344&height=768&dream', 
        'https://images.fwdlife.in/2023/06/jennie_jisoo_k_pop_lisa_rose_in_blue_wall_background_hd_blackpink.jpg', 
        'https://cottonbrazil.com/wp-content/uploads/2023/09/k-pop-and-fashion-3.webp', 
        'https://images.lifestyleasia.com/wp-content/uploads/sites/5/2022/09/05184728/blackpink-1-1.jpeg', 
        'https://qph.cf2.quoracdn.net/main-qimg-44e1d71b949a7dbfadd4423170298075', 
    ]; 

    const links = [ 
        'https://link1.com', 
        'https://link2.com', 
        'https://link3.com', 
        'https://link4.com', 
        'https://link5.com', 
        'https://link6.com', 
    ]; 

    const [currentImageIndex, setCurrentImageIndex] = useState(0); 

    const scrollLeft = () => { 
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1); 
    }; 

    const scrollRight = () => { 
        setCurrentImageIndex(prev => (prev + 1) % images.length); 
    }; 

    useEffect(() => { 
        const interval = setInterval(() => { 
            setCurrentImageIndex(prev => (prev + 1) % images.length); 
        }, 3000); 

        return () => clearInterval(interval); 
    }, []); 

    return ( 
        <div className='overflow-hidden max-w-7xl mx-auto relative'> 
            <div ref={scrollElement} className=' transition-transform duration-300'> 
                <a href={links[currentImageIndex]} target="_blank" rel="noopener noreferrer"> 
                    <div className='h-40 md:h-80 w-full'> 
                        <img 
                            src={images[currentImageIndex]} 
                            className='w-full h-full object-cover bg-no-repeat' 
                            alt={`Banner ${currentImageIndex}`} 
                        /> 
                    </div> 
                </a> 
            </div> 

            <button 
                onClick={scrollLeft} 
                className='bg-purple-500 hover:bg-red-500 text-white font-bold border-2  shadow-lg rounded-full p-3 text-xl hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2'
            > 
                <FaAngleLeft /> 
            </button> 

            <button 
                onClick={scrollRight} 
                className='bg-purple-500 hover:bg-red-500 text-white font-bold border-2 shadow-lg rounded-full p-3 text-xl hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2'
            > 
                <FaAngleRight /> 
            </button> 
        </div> 
    ); 
} 

export default BannerProduct;
