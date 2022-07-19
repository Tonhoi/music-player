import React, { useEffect, useState } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import { getTrendingArtists } from 'nhaccuatui-api-full';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Home.module.scss';
import Slide from './Slide';
import Cart from './Cart';

const cx = classNames.bind(styles);
const Home = () => {
    const [data, setTopSong] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            const res = await getTrendingArtists();
            setTopSong(res.artistTrending);
        };
        fetchDatas();
    }, []);
    return (
        <Scrollbars autoHide>
            <Slide data={data} />
            <Swiper
                spaceBetween={20}
                grabCursor={true}
                slidesPerView={'auto'}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <Cart />
                </SwiperSlide>
                <SwiperSlide>
                    <Cart />
                </SwiperSlide>
                <SwiperSlide>
                    <Cart />
                </SwiperSlide>
                <SwiperSlide>
                    <Cart />
                </SwiperSlide>
            </Swiper>
        </Scrollbars>
    );
};

export default Home;
