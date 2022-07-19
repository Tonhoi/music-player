import React, { memo } from 'react';
import className from 'classnames/bind';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';

import styles from './SearchMenu.module.scss';
import Wrapper from '../../../../components/Popper/Wrapper';
import { SearchItem } from '../SearchItem';
import { ArrowRedoIcon } from '../../../../components/Icons/Icon';
import { getSong } from 'nhaccuatui-api-full/dist';
import { setGetInfoMusics } from '../../../../redux/reducer';

const cx = className.bind(styles);
const SearchMenu = ({ title, searchResult, searchValue, debounce }) => {
    const dispatch = useDispatch();
    const handleUpdateData = (searchResultt) => {
        searchResult.map((searchResult) => {
            const updateData = async () => {
                const data = await getSong(searchResult.key);
                dispatch(setGetInfoMusics(data));
            };
            updateData();
        });
    };
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                {title && <span className={cx('title')}>{title}</span>}
                <Scrollbars style={{ height: 290 }} autoHide>
                    <div className={cx('list')}>
                        {searchResult.map((searchResultt, index) => {
                            return (
                                <SearchItem
                                    key={searchResultt.key}
                                    item={searchResultt}
                                    leftIcon={<ArrowRedoIcon />}
                                    debounce={debounce}
                                    onClick={(e) => handleUpdateData(searchResultt)}
                                />
                            );
                        })}
                    </div>
                </Scrollbars>
                {searchResult && searchResult.length > 0 && (
                    <div className={cx('result-all')}>Xem tất cả các kết quả của từ khóa "{searchValue}"</div>
                )}
            </div>
        </Wrapper>
    );
};

export default memo(SearchMenu);
