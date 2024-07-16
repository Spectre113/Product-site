"use client";
import React, { useEffect } from 'react';
import Swiper from 'swiper';

interface SwiperInstance {
  realIndex: number;
  params: {
    slidesPerGroup: number;
  };
  slides: {
    length: number;
  };
  loopedSlides: number;
}

const Assortment: React.FC = () => {
    useEffect(() => {
        new Swiper('.swiper', {
          slidesPerView: 2,
          centeredSlides: false,
          slidesPerGroup: 2,
          grabCursor: true,
          keyboard: {
            enabled: true,
          },
          loop: true,
          spaceBetween: 50,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          autoplay: {
            delay: 10000,
            disableOnInteraction: false,
          },
        });

      }, []);

    return (
        <div className="about__assortment-block">
            <p className='about__why-info'>
                Our fast food menu boasts a&nbsp;wide variety of&nbsp;delicious items, ranging from shawarma and sushi to&nbsp;burgers and gyros.
            </p>

            
        </div>
    );
};

export default Assortment;
