import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation } from 'swiper';

import './Slide.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
const Slide = ({ data }) => {
    return (
        <div style={{ margin: '30px -42px 0' }}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Autoplay]}
            >
                {data.length > 0 &&
                    data.map((data, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img
                                    src={data.imageUrl}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        userSelect: 'none',
                                        borderRadius: '5px',
                                    }}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};

export default Slide;
