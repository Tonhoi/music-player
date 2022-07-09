import React from 'react';
import className from 'classnames/bind';
import Scrollbars from 'react-custom-scrollbars';

import styles from './SearchMenu.module.scss';
import Wrapper from '../../../../components/Popper/Wrapper';
import { SearchItem } from '../SearchItem';
import { ArrowRedoIcon } from '../../../../components/Icons/Icon';

const cx = className.bind(styles);
const SearchMenu = ({ title, searchResult, searchValue, debounce }) => {
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                {title && <span className={cx('title')}>{title}</span>}
                <Scrollbars style={{ height: 290 }} autoHide>
                    <div className={cx('list')}>
                        {searchResult.map((searchResult, index) => {
                            return (
                                <SearchItem
                                    key={searchResult.key}
                                    item={searchResult}
                                    leftIcon={<ArrowRedoIcon />}
                                    debounce={debounce}
                                />
                            );
                        })}
                    </div>
                </Scrollbars>
                {searchResult.length > 0 && (
                    <div className={cx('result-all')}>Xem tất cả các kết quả của từ khóa "{searchValue}"</div>
                )}
            </div>
        </Wrapper>
    );
};

export default SearchMenu;
