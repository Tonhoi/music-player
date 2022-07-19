import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { Image } from '../../../../components/Images';

const cx = classNames.bind(styles);
const Header = ({ state }) => {
    const getInfoMusic = useSelector((prev) => (prev?.getInfoMusic ? prev?.getInfoMusic : []));

    return (
        <div
            className={cx('header-playControl-pc', {
                add: state.moreList,
            })}
        >
            <div
                className={cx('wrapper-image', {
                    thumbnailRotate: state.isThumbnailRotate,
                    reset_Thumnail: !state.isThumbnailRotate,
                    add: state.moreList,
                })}
            >
                <Image
                    src={(getInfoMusic?.artists && getInfoMusic?.artists[0]?.imageUrl) || getInfoMusic.thumbnail}
                    alt=""
                    className={cx('img')}
                />
            </div>

            <div
                className={cx('wrapper-name-music', {
                    add: state.moreList,
                })}
            >
                <div>
                    <span className={cx('name-music')}>{getInfoMusic.title || 'tên bài hát'}</span>
                    <p className={cx('name-artists')}>
                        {getInfoMusic.artists ? getInfoMusic?.artists[0]?.name : 'tên ca sĩ'}
                    </p>
                </div>
                <span>{getInfoMusic.duration || 'Thời gian'}</span>
            </div>
        </div>
    );
};

export default Header;
