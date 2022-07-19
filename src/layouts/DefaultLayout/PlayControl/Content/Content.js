import React from 'react';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ListSong from './ListSong/ListSong';
import styles from './Content.module.scss';

import {
    setCurrentIndex,
    setDurationMusic,
    setNextMusic,
    setPlayingMusic,
    setSeekChange,
} from '../../../../store/UseReducer/actions';
import { getAudio, setGetInfoMusic } from '../../../../redux/action';

const cx = classNames.bind(styles);
let random = 0;

const Content = ({ array, state, disPatch, audioRef, handleProgress, res }) => {
    const dispatchRedux = useDispatch();
    const Audio = useSelector((prev) => (prev?.audio ? prev?.audio : ''));
    const handleEndedSong = () => {
        disPatch(setPlayingMusic(true));
        disPatch(setSeekChange(0));
        if (state.isRandom) {
            do {
                random = Math.floor(Math.random() * array.length);
            } while (random === state.currentIndex);
            state.currentIndex = random;
            dispatchRedux(setGetInfoMusic(array[random].song));
            dispatchRedux(getAudio(array[state.currentIndex].song.streamUrls[0].streamUrl));

            disPatch(
                setNextMusic(
                    state.currentIndex + 1 < array.length
                        ? array[state.currentIndex + 1].song
                        : array[state.currentIndex - array.length + 1].song,
                ),
            );
        } else {
            disPatch(setCurrentIndex((state.currentIndex += 1)));
            if (state.currentIndex === array.length) {
                state.currentIndex = 0;
            }
            dispatchRedux(setGetInfoMusic(array[state.currentIndex].song));
            dispatchRedux(getAudio(array[state.currentIndex].song.streamUrls[0].streamUrl));

            disPatch(
                setNextMusic(
                    state.currentIndex + 1 < array.length
                        ? array[state.currentIndex + 1].song
                        : array[state.currentIndex - array.length + 1].song,
                ),
            );
        }
    };

    const getDurationSong = (e) => {
        disPatch(setDurationMusic(e));
    };
    return (
        <div
            className={cx('content-playControl-pc', {
                add: state.moreList,
            })}
        >
            <span
                className={cx('title', {
                    add: state.moreList,
                })}
            >
                Danh sách bài hát
            </span>
            <ReactPlayer
                url={Audio}
                ref={audioRef}
                playing={state.isPlaying}
                volume={state.volume}
                onDuration={getDurationSong}
                onProgress={handleProgress}
                onEnded={handleEndedSong}
                loop={state.isRepeat}
            />
            <Scrollbars autoHide thumbMinSize={30} universal={true}>
                <div
                    className={cx('list', {
                        add: state.moreList,
                    })}
                >
                    <ListSong res={res} array={array} disPatch={disPatch} state={state} />
                </div>
            </Scrollbars>
        </div>
    );
};

Content.propTypes = {
    array: PropTypes.array,
    audioRef: PropTypes.object,
    handleProgress: PropTypes.func,
    res: PropTypes.object,
};

export default Content;
