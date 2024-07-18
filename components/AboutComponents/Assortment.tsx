import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const Assortment: React.FC = () => {

    return (
        <div className="about__assortment-block">
            <p className='about__why-info'>
                Our fast food menu boasts a&nbsp;wide variety of&nbsp;delicious items, ranging from shawarma and sushi to&nbsp;burgers and gyros. For more datails go to `Products` page!
            </p>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={2}
                autoplay={{ delay: 5000 }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide id='swiper-slide-1'></SwiperSlide>
                <SwiperSlide id='swiper-slide-2'></SwiperSlide>
                <SwiperSlide id='swiper-slide-3'></SwiperSlide>
                <SwiperSlide id='swiper-slide-4'></SwiperSlide>
            </Swiper>    
        </div>
    );
};

export default Assortment;
