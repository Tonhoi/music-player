import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { searchByKeyword } from 'nhaccuatui-api-full';

import styles from './Search.module.scss';
import { DropDown } from '../../../components/Popper/Menu';
import { CloseIcon, SearchIcon } from '../../../components/Icons/Icon';
import HookDropDown from '../../../hook/HookDropDown';
import HookDeBounce from '../../../hook/HookDeBounce';

const cx = classNames.bind(styles);
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { active, searchRef } = HookDropDown();
    const debounce = HookDeBounce(searchValue, 600);
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        const fetData = async () => {
            try {
                const res = await searchByKeyword(debounce);
                console.log(res);
                setSearchResult(res.search.song.song);
                setLoading(false);
            } catch (error) {
                console.log('không lấy được dữ liệu');
                setLoading(false);
            }
        };
        fetData();
    }, [debounce]);

    const handleInput = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={`${cx('wrapper')}`} ref={searchRef}>
            <div className={`${cx('header-search')}  ${active && searchResult.length > 0 ? cx('active') : ''} `}>
                <SearchIcon className={cx('icon-search')} />
                <input
                    type="text"
                    placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                    value={searchValue}
                    onChange={handleInput}
                    autoComplete="off"
                />
                {!loading && searchResult.length > 0 && (
                    <div onClick={(e) => setSearchValue('')}>
                        <CloseIcon className={cx('close')} />
                    </div>
                )}
                {loading && <div className={cx('loading')}></div>}
            </div>
            {active && searchResult.length > 0 && (
                <DropDown
                    title="Kết quả tìm kiếm"
                    searchResult={searchResult}
                    debounce={debounce}
                    searchValue={searchValue}
                />
            )}
        </div>
    );
};

export default Search;
