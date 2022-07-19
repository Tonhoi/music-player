import React from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';

import styles from './Footer.module.scss';
import {
    NextMusicIcon,
    OptionMusicIcon,
    PauseMusicIcon,
    PlayMusicIcon,
    PrevMusicIcon,
    RepeatMusicIcon,
    ShuffleMusicIcon,
    VolumeHighIcon,
    VolumeMediumicon,
    VolumeLowIcon,
    VolumeMuteIcon,
} from '../../../../components/Icons/Icon';

import { Image } from '../../../../components/Images';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    setCurrentIndex,
    setNextMusic,
    setPlayingMusic,
    setRandomMusic,
    setRepeatMusic,
    setSeekChange,
    setVolumeMusic,
    setMoreList,
} from '../../../../store/UseReducer/actions';
import { getAudio, setGetInfoMusic } from '../../../../redux/action';

const cx = classNames.bind(styles);
const Footer = ({ state, disPatch, minutes, second, audioRef, array, handlePlayMusic, handleNextMusic }) => {
    const dispatchRedux = useDispatch();

    const getInfoMusic = useSelector((prev) => (prev?.getInfoMusic ? prev?.getInfoMusic : []));

    const getValueOfSeekChange = (e) => {
        audioRef.current.seekTo(state.seekChange);
        state.seekChange = 0;
    };

    const handleRandomMusic = () => {
        if (state.isRepeat) {
            toast('Hãy tắt tính năng repeat bài hát để thực hiện được tính năng này 😅', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            disPatch(setRandomMusic(!state.isRandom));
        }
    };

    const handleVolumeChange = (e) => {
        disPatch(setVolumeMusic(Number(e.target.value)));
    };

    const handleMuteVolume = (e) => {
        if (state.volume !== 0) {
            disPatch(setVolumeMusic(0));
        } else {
            disPatch(setVolumeMusic(1));
        }
    };

    const handleSeekChange = (e) => {
        disPatch(setSeekChange(Number(e.target.value)));
    };

    const handleRepeatMusic = () => {
        if (state.isRandom) {
            toast('Hãy tắt tính năng random bài hát để thực hiện được tính năng này 😅', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            disPatch(setRepeatMusic(!state.isRepeat));
        }
    };
    const handlePrevMusic = () => {
        disPatch(setPlayingMusic(true));
        disPatch(setCurrentIndex((state.currentIndex -= 1)));

        if (state.currentIndex < 0 || state.currentIndex > array.length) {
            state.currentIndex = array.length - 1;
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
    };

    // handle show list

    const handleShowList = () => {
        disPatch(setMoreList(!state.moreList));
    };
    return (
        <div className={cx('wrapper-control-pc')}>
            <div className={cx('wrapper-control-pc-heading')}>
                <div className={cx('wrapper-volume')}>
                    <div className={cx('volume')}>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={state.volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                    <div onClick={handleMuteVolume}>
                        {state.volume > 0.7 ? (
                            <VolumeHighIcon />
                        ) : state.volume > 0.4 && state.volume < 0.7 ? (
                            <VolumeMediumicon />
                        ) : state.volume > 0.1 && state.volume < 0.4 ? (
                            <VolumeLowIcon />
                        ) : (
                            <VolumeMuteIcon />
                        )}
                    </div>
                </div>

                <span onClick={handleShowList}>Mở rộng danh sách</span>
                <div>
                    <OptionMusicIcon />
                </div>
            </div>
            <div className={cx('wrapper-control-pc-content')}>
                <span>
                    {minutes}:{second < 10 ? `0${second}` : second}
                </span>
                <input
                    type="range"
                    min={0}
                    max={state.durationSong}
                    step="any"
                    onChange={handleSeekChange}
                    onMouseUp={getValueOfSeekChange}
                    value={state.seekChange || state.timePlayed}
                />
                <span>{getInfoMusic.duration || '0:00'}</span>
            </div>
            <div className={cx('wrapper-control-pc-footer')}>
                <Tippy content={`${state.isRandom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}`}>
                    <div
                        className={cx('icon-control', {
                            isRandom: state.isRandom,
                        })}
                        onClick={handleRandomMusic}
                    >
                        <ShuffleMusicIcon />
                    </div>
                </Tippy>
                <div className={cx('icon-control')} onClick={handlePrevMusic}>
                    <PrevMusicIcon />
                </div>
                <div className={cx('icon-control')} onClick={handlePlayMusic}>
                    {!state.isPlaying ? <PlayMusicIcon /> : <PauseMusicIcon />}
                </div>
                <Tippy
                    content={
                        <div className={cx('wrapper-next-music')}>
                            <span>Phát kế tiếp</span>
                            <div className={cx('next-music')}>
                                <div className={cx('wrapper-image-next-music')}>
                                    <Image
                                        src={state.nextMusic?.artists && state.nextMusic?.artists[0].imageUrl}
                                        alt=""
                                        className={cx('img')}
                                    />
                                </div>
                                <div className={cx('wrapper-content-next-music')}>
                                    <span className={cx('title')}>{state.nextMusic && state.nextMusic?.title}</span>
                                    <span className={cx('artists')}>
                                        {state?.nextMusic?.artists ? state?.nextMusic?.artists[0]?.name : 'tên ca sĩ'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className={cx('icon-control')} onClick={handleNextMusic}>
                        <NextMusicIcon />
                    </div>
                </Tippy>
                <Tippy content={`${state.isRepeat ? 'Tắt phát lại' : 'Bật phát lại một bài'}`}>
                    <div
                        className={cx('icon-control', {
                            isRepeat: state.isRepeat,
                        })}
                        onClick={handleRepeatMusic}
                    >
                        <RepeatMusicIcon />
                    </div>
                </Tippy>
            </div>
        </div>
    );
};
Footer.propTypes = {
    minutes: PropTypes.number,
    second: PropTypes.number,
    audioRef: PropTypes.object,
    array: PropTypes.array,
    handlePlayMusic: PropTypes.func,
    handleNextMusic: PropTypes.func,
};

export default Footer;
