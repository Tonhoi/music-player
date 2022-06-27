import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DropDown.module.scss';
import Wrapper from '../Wrapper';
import SearchItem from '../../SearchItem/SearchItem';
import { ArrowRedoIcon } from '../../Icons/Icon';

const cx = classNames.bind(styles);
const DropDown = ({ title, searchResult, searchValue }) => {
    // console.log(searchResult);
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                <ul className={cx('list')}>
                    {title && <span className={cx('title')}>{title}</span>}
                    {searchResult.map((searchResult) => {
                        return <SearchItem key={searchResult.key} title={searchResult} leftIcon={<ArrowRedoIcon />} />;
                    })}
                </ul>
                {searchResult.length > 0 && (
                    <div className={cx('result-all')}>Xem tất cả các kết quả của từ khóa "{searchValue}"</div>
                )}
            </div>
        </Wrapper>
    );
};

export default DropDown;
