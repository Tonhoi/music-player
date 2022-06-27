import React from 'react';
import Header from './Header';
import PlayControl from './PlayControl';
import Sidebar from './Sidebar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('header')}>
                <Header />
                {children}
            </div>
            <PlayControl />
        </div>
    );
};

export default DefaultLayout;
