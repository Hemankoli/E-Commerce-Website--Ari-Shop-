import React, { useState, useEffect } from 'react';

const BannerProduct = () => {

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

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
          );
        }, 3000);
  
        return () => clearInterval(interval);
      }, []);

    return (
        <div className='overflow-hidden'>
            <a href={links[currentImageIndex]} target="_blank" rel="noopener noreferrer">
                <div className='h-40 md:h-80 w-full'>
                    {
                        images.map((img, index) => {
                            return (
                                <div className='w-full h-full' key={img}>
                                    <img src={images[currentImageIndex]} className='w-full h-full object-cover bg-no-repeat ' />
                                </div>
                            )
                        })
                    }
                </div>
            </a>    
        </div>
    )
}

export default BannerProduct