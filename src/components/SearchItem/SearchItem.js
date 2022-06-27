import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);
const SearchItem = ({ title, leftIcon, rightIcon }) => {
    // console.log(title);
    return (
        <li className={cx('item')}>
            {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
            <span className={cx('title')}>
                <img src={title.artists[0].imageUrl} alt="" className={cx('img')} />
                {title.title}
            </span>
            {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
        </li>
    );
};

export default SearchItem;
