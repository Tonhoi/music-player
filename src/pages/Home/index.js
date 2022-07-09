import React, { useEffect, useState } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import { getTrendingArtists } from 'nhaccuatui-api-full';
import classNames from 'classnames/bind';
import 'swiper/css';

import styles from './Home.module.scss';
import Slide from './Slide';
import Cart from './Cart';

const cx = classNames.bind(styles);
const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            const res = await getTrendingArtists();
            setData(res.artistTrending);
        };
        fetchDatas();
    }, []);
    return (
        <Scrollbars autoHide>
            <Slide data={data} />
        </Scrollbars>
    );
};

export default Home;
