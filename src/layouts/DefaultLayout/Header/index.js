import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Search } from '../Search';
import { SettingIcon, ThemeIcon } from '../../../components/Icons/Icon';

const cx = classNames.bind(styles);
const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Search />
            </div>
            <div className={cx('header-right')}>
                <Tippy content={<span>Chủ đề</span>}>
                    <div className={cx('icon')}>
                        <ThemeIcon />
                    </div>
                </Tippy>
                <Tippy content={<span>Cài đặt</span>}>
                    <div className={cx('icon')}>
                        <SettingIcon />
                    </div>
                </Tippy>
                <div className={cx('wrapper-image')}>
                    <img src="https://avatar.talk.zdn.vn/default.jpg" alt="" className={cx('img')} />
                </div>
            </div>
        </div>
    );
};

export default Header;
