import React from 'react';
import className from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = className.bind(styles);

const Wrapper = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default Wrapper;
