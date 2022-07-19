import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../Content.module.scss';
// import styles from '../../PlayControl.module.scss';
import { OptionMusicIcon } from '../../../../../components/Icons/Icon';
import { setNextMusic, setPlayingMusic, setThumnail } from '../../../../../store/UseReducer/actions';
import { getAudio, setGetInfoMusic } from '../../../../../redux/action';
import Menu from '../../../../../components/Popper/Menu/Menu';

const cx = classNames.bind(styles);
let list;
const ListSong = ({ array, disPatch, state, res }) => {
    const dispatchRedux = useDispatch();

    const topSong = useSelector((prev) => {
        return res?.ranking?.song && prev?.topSong?.length > res?.ranking?.song?.length - 1 && prev?.topSong;
    });

    let searchMusic = useSelector((prev) => {
        return prev.searchMusic;
    });

    list = topSong;
    if (searchMusic.length > 0) {
        list = searchMusic;
    }
    return (
        <div>
            {list &&
                list.length > 0 &&
                list.map((item, index) => {
                    console.log('re-render');
                    array.push(item);
                    return (
                        <Menu
                            key={index}
                            title={item?.song?.title}
                            nameArtist={item?.song ? item?.song?.artists[0]?.name : []}
                            time={item?.song?.duration}
                            className={cx('custom')}
                            itemRight={cx('item-right')}
                            optionIcon={<OptionMusicIcon />}
                            to="/"
                            navLink
                            onClick={(e) => {
                                state.currentIndex = index;
                                disPatch(setThumnail(true));

                                dispatchRedux(setGetInfoMusic(array[index].song));
                                disPatch(
                                    setNextMusic(
                                        state.currentIndex + 1 < array.length
                                            ? array[state.currentIndex + 1].song
                                            : array[state.currentIndex - array.length + 1].song,
                                    ),
                                );
                                disPatch(setPlayingMusic(true));
                                dispatchRedux(
                                    getAudio(array[index].song ? array[index].song.streamUrls[0].streamUrl : ''),
                                );
                            }}
                        />
                    );
                })}
        </div>
    );
};

ListSong.propTypes = {
    array: PropTypes.array,
    res: PropTypes.object,
};

export default memo(ListSong);
