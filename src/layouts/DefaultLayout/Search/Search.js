import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { searchByKeyword } from 'nhaccuatui-api-full';

import styles from './Search.module.scss';
import { DropDown } from '../../../components/Popper/DropDown';
import { CloseIcon, SearchIcon } from '../../../components/Icons/Icon';
import HookDropDown from '../../../hook/HookDropDown';
import HookDeBounce from '../../../hook/HookDeBounce';

const cx = classNames.bind(styles);
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounce = HookDeBounce(searchValue, 600);
    const [loading, setLoading] = useState(false);
    const { active, searchRef } = HookDropDown();
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        const fetData = async () => {
            const res = await searchByKeyword(debounce);
            setSearchResult(res.search.song.song);
            setLoading(false);
        };
        fetData();
    }, [debounce]);

    return (
        <div className={`${cx('wrapper')}`} ref={searchRef}>
            <div className={`${cx('header-search')}  ${active && searchResult.length > 0 ? cx('active') : ''} `}>
                <SearchIcon className={cx('icon-search')} />
                <input
                    type="text"
                    placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {!loading && searchResult.length > 0 && (
                    <div onClick={(e) => setSearchValue('')}>
                        <CloseIcon className={cx('close')} />
                    </div>
                )}
                {loading && <div className={cx('loading')}></div>}
            </div>
            {active && searchResult.length > 0 && (
                <DropDown title="Kết quả tìm kiếm" searchResult={searchResult} searchValue={searchValue} />
            )}
        </div>
    );
};

export default Search;
