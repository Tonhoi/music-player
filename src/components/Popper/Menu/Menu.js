import React from 'react';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './Menu.module.scss';
import Wrapper from '../Wrapper';
import SearchItem from '../../SearchItem/SearchItem';
import { ArrowRedoIcon } from '../../Icons/Icon';

const cx = classNames.bind(styles);
const Menu = ({ title, searchResult, debounce, searchValue }) => {
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                {title && <span className={cx('title')}>{title}</span>}
                <Scrollbars style={{ height: 290 }} autoHide>
                    <ul className={cx('list')}>
                        {searchResult.map((searchResult) => {
                            return (
                                <SearchItem
                                    key={searchResult.key}
                                    item={searchResult}
                                    leftIcon={<ArrowRedoIcon />}
                                    debounce={debounce}
                                />
                            );
                        })}
                    </ul>
                </Scrollbars>
                {searchResult.length > 0 && (
                    <div className={cx('result-all')}>Xem tất cả các kết quả của từ khóa "{searchValue}"</div>
                )}
            </div>
        </Wrapper>
    );
};

export default Menu;
