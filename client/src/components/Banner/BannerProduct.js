import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ArrowButton from '../Buttons/ArrowButton';

const BannerProduct = () => {
    const scrollElement = useRef();

    const slides = [
        {
            image: 'https://koala.sh/api/image/v2-8qlwm-3qfid.jpg?width=1344&height=768&dream',
            text: 'Discover the latest K-Pop fashion trends'
        },
        {
            image: 'https://koala.sh/api/image/v2-8qly1-y9gkv.jpg?width=1344&height=768&dream',
            text: 'Fresh arrivals — style meets comfort'
        },
        {
            image: 'https://images.fwdlife.in/2023/06/jennie_jisoo_k_pop_lisa_rose_in_blue_wall_background_hd_blackpink.jpg',
            text: 'Exclusive Blackpink collection'
        },
        {
            image: 'https://cottonbrazil.com/wp-content/uploads/2023/09/k-pop-and-fashion-3.webp',
            text: 'Elegant streetwear for every season'
        },
        {
            image: 'https://images.lifestyleasia.com/wp-content/uploads/sites/5/2022/09/05184728/blackpink-1-1.jpeg',
            text: 'Bold & beautiful — express yourself'
        },
        {
            image: 'https://qph.cf2.quoracdn.net/main-qimg-44e1d71b949a7dbfadd4423170298075',
            text: 'Shop your idol-inspired outfits'
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const scrollLeft = () => {
        setCurrentImageIndex(prev => prev === 0 ? slides.length - 1 : prev - 1);
    };

    const scrollRight = () => {
        setCurrentImageIndex(prev => (prev + 1) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='overflow-hidden mx-auto relative'>
            <div ref={scrollElement} className='transition-transform duration-300 relative'>
                <img
                    src={slides[currentImageIndex].image}
                    className='w-full h-40 md:h-[600px] object-cover bg-no-repeat'
                    alt={`Banner ${currentImageIndex}`}
                />
                
                {/* Text + Button overlay */}
                <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4'>
                    <h2 className='text-white text-xl md:text-4xl font-bold mb-4'>
                        {slides[currentImageIndex].text}
                    </h2>
                </div>
            </div>

            <ArrowButton method={scrollLeft} icon={<FaAngleLeft />} className='left-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
            <ArrowButton method={scrollRight} icon={<FaAngleRight />} className='right-2 absolute top-1/2 p-3 transform -translate-y-1/2' />
            {/* Dots Navigation */}
            <div className="flex w-full justify-center gap-2 absolute bottom-4">
                {slides.map((_, idx) => (
                    <button
                        aria-label="Image Current Index"
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${
                            idx === currentImageIndex
                                ? "border border-red-300 bg-purple-400"
                                : "bg-gray-500"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerProduct;
