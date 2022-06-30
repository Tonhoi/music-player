import React from 'react';
import classNames from 'classnames/bind';

import styles from './SearchItem.module.scss';
import { CaretForward } from '../Icons/Icon';
import Image from '../Images/Image';

const cx = classNames.bind(styles);
const SearchItem = ({ item, leftIcon, rightIcon, debounce }) => {
    return (
        <li className={cx('item')}>
            {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
            <span className={cx('title')}>
                <div className={cx('wrapper-image')}>
                    <div className={cx('overlay')}></div>
                    <Image src={item?.artists[0]?.imageUrl} alt="" className={cx('img')} debounce={debounce} />
                    <CaretForward className={cx('icon-img')} />
                </div>
                <div className={cx('info')}>
                    <span className={cx('name-music')}>{item.title}</span>
                    <span className={cx('name-artist')}>{item?.artists[0]?.name}</span>
                </div>
            </span>
            {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
        </li>
    );
};

export default SearchItem;
