import React, { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './SearchItem.module.scss';
import Wrapper from '../../../../components/Popper/Wrapper';
import Menu from '../../../../components/Popper/Menu/Menu';

const cx = classNames.bind(styles);
const SearchItem = ({ item, title, debounce }) => {
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                <Menu
                    src={item?.artists[0]?.imageUrl}
                    title={item.title}
                    nameArtist={item?.artists[0]?.name}
                    debounce={debounce}
                    image
                />
            </div>
        </Wrapper>
    );
};

export default memo(SearchItem);
