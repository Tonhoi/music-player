import React from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import '../Slide/Slide.scss';

const cx = classNames.bind(styles);
const Cart = () => {
    return (
        <div className={cx('card-body')}>
            <div className={cx('card-image')}>
                <img
                    src="https://avatar-ex-swe.nixcdn.com/playlist/2022/07/01/4/0/a/0/1656663188434_300.jpg"
                    alt=""
                    className={cx('img')}
                />
            </div>
            <span className={cx('card-title')}>Nhạc Mới Phát Hành 2022</span>
        </div>
    );
};

export default Cart;
