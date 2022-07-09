import React, { useEffect, useRef, useState, memo, useReducer } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import styles from './PlayControl.module.scss';
import {
    NextMusicIcon,
    OptionMusicIcon,
    PauseMusicIcon,
    PlayMusicIcon,
    PrevMusicIcon,
    RepeatMusicIcon,
    ShowPlayControlPcIcon,
    ShuffleMusicIcon,
    VolumeHighIcon,
    VolumeMediumicon,
    VolumeLowIcon,
    VolumeMuteIcon,
} from '../../../components/Icons/Icon';
import {
    setDurationMusic,
    setNextMusic,
    setPlayingMusic,
    setRandomMusic,
    setRepeatMusic,
    setThumnail,
    setTimePlayed,
    setVolumeMusic,
} from './actions';
import { getChart, getSong } from 'nhaccuatui-api-full';
import HookAddElements from '../../../hook/HookAddElements';
import Menu from '../../../components/Popper/Menu/Menu';
import Image from '../../../components/Images/Image';
import { getAudio, setData, setGetInfoMusic } from '../../../redux/action';
import reducer, { initialState } from './reducer';

const cx = classNames.bind(styles);
let currentIndex = 0;
let minutes = 0;
let second = 0;
let random = 0;
let res;
const PlayControl = () => {
    const dispatchRedux = useDispatch();
    const [state, disPatch] = useReducer(reducer, initialState);
    // const [data, setData] = useState([]);

    const audioRef = useRef();
    let array = [];

    const Audio = useSelector((prev) => (prev?.audio ? prev?.audio : ''));
    const getInfoMusic = useSelector((prev) => (prev?.getInfoMusic ? prev?.getInfoMusic : []));
    const data = useSelector(
        (prev) => res?.ranking?.song && prev.data.length > res?.ranking?.song?.length - 1 && prev?.data && prev?.data,
    );
    // console.log(data);
    const {
        ShowListRef,
        headerPlayControlRef,
        wrapperHeaderImageRef,
        contentPlayControlPc,
        ulElementsPlayControlRef,
        titleUlElementsPlayControlRef,
        wrapperNameMusic,
    } = HookAddElements(cx('add'));

    useEffect(() => {
        const fetchData = async () => {
            res = await getChart();

            res.ranking.song.map(async (item, index) => {
                const data = await getSong(item.songKey);
                // text.push(await getSong(item.songKey));
                // setData((prev) => [...prev, data]);
                dispatchRedux(setData(data));
            });
        };

        fetchData();
    }, []);
    const handlePlayMusic = () => {
        if (Array.isArray(getInfoMusic)) {
            toast('Bạn chưa chọn bài hát nào', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (state.isPlaying) {
                disPatch(setThumnail(false));
                disPatch(setPlayingMusic(false));
            } else {
                disPatch(setThumnail(true));

                disPatch(setPlayingMusic(true));
            }
        }
    };

    const handleNextMusic = () => {
        disPatch(setPlayingMusic(true));
        currentIndex++;
        if (currentIndex >= array.length) {
            currentIndex = 0;
        }
        dispatchRedux(setGetInfoMusic(array[currentIndex].song));
        dispatchRedux(getAudio(array[currentIndex].song.streamUrls[0].streamUrl));

        disPatch(
            setNextMusic(
                currentIndex + 1 < array.length
                    ? array[currentIndex + 1].song
                    : array[currentIndex - array.length + 1].song,
            ),
        );
    };
    const handlePrevMusic = () => {
        disPatch(setPlayingMusic(true));
        currentIndex--;
        if (currentIndex < 0 || currentIndex > array.length) {
            currentIndex = array.length - 1;
        }

        dispatchRedux(setGetInfoMusic(array[currentIndex].song));
        dispatchRedux(getAudio(array[currentIndex].song.streamUrls[0].streamUrl));

        disPatch(
            setNextMusic(
                currentIndex + 1 < array.length
                    ? array[currentIndex + 1].song
                    : array[currentIndex - array.length + 1].song,
            ),
        );
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

    const handleEndedSong = () => {
        disPatch(setPlayingMusic(true));
        if (state.isRandom) {
            do {
                random = Math.floor(Math.random() * array.length);
            } while (random === currentIndex);
            currentIndex = random;
            dispatchRedux(setGetInfoMusic(array[random].song));
            dispatchRedux(getAudio(array[currentIndex].song.streamUrls[0].streamUrl));

            disPatch(
                setNextMusic(
                    currentIndex + 1 < array.length
                        ? array[currentIndex + 1].song
                        : array[currentIndex - array.length + 1].song,
                ),
            );
        } else {
            currentIndex++;
            dispatchRedux(setGetInfoMusic(array[currentIndex].song));
            dispatchRedux(getAudio(array[currentIndex].song.streamUrls[0].streamUrl));

            disPatch(
                setNextMusic(
                    currentIndex + 1 < array.length
                        ? array[currentIndex + 1].song
                        : array[currentIndex - array.length + 1].song,
                ),
            );
        }
        if (currentIndex === array.length) {
            currentIndex = 0;
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

    const handleProgress = (e) => {
        minutes = Math.floor(e.playedSeconds / 60);
        second =
            Math.floor(e.playedSeconds - minutes * 60) < 10
                ? `0${Math.floor(e.playedSeconds - minutes * 60)}`
                : Math.floor(e.playedSeconds - minutes * 60);

        disPatch(setTimePlayed(e.playedSeconds));
    };

    const getDurationSong = (e) => {
        disPatch(setDurationMusic(e));
    };

    const handleSeekChange = (e) => {
        audioRef.current.seekTo(Number(e.target.value));
    };

    return (
        <>
            <ToastContainer />
            <input type="checkbox" style={{ textColor: 'white' }} id="check" hidden />
            <div className={cx('wrapper-pc')}>
                <div className={cx('header-playControl-pc')} ref={headerPlayControlRef}>
                    <div
                        className={cx('wrapper-image', { thumbnailRotate: state.isThumbnailRotate })}
                        ref={wrapperHeaderImageRef}
                    >
                        <Image src={getInfoMusic && getInfoMusic.thumbnail} alt="" className={cx('img')} />
                    </div>

                    <div className={cx('wrapper-name-music')} ref={wrapperNameMusic}>
                        <div>
                            <span className={cx('name-music')}>{getInfoMusic.title || 'tên bài hát'}</span>
                            <p className={cx('name-artists')}>
                                {getInfoMusic.artists ? getInfoMusic?.artists[0]?.name : 'tên ca sĩ'}
                            </p>
                        </div>
                        <span>{getInfoMusic.duration || 'Thời gian'}</span>
                    </div>
                </div>

                <div className={cx('content-playControl-pc')} ref={contentPlayControlPc}>
                    <span className={cx('title')} ref={titleUlElementsPlayControlRef}>
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
                        <div className={cx('list')} ref={ulElementsPlayControlRef}>
                            {data &&
                                data.length > 0 &&
                                data.map((data, index) => {
                                    console.log('re-render');
                                    array.push(data);
                                    return (
                                        <Menu
                                            key={index}
                                            title={data?.song?.title}
                                            nameArtist={data?.song ? data?.song?.artists[0]?.name : []}
                                            time={data?.song?.duration}
                                            className={cx('custom')}
                                            itemRight={cx('item-right')}
                                            optionIcon={<OptionMusicIcon />}
                                            to="/"
                                            navLink
                                            onClick={(e) => {
                                                currentIndex = index;
                                                disPatch(setThumnail(true));

                                                dispatchRedux(setGetInfoMusic(array[index].song));
                                                disPatch(
                                                    setNextMusic(
                                                        currentIndex + 1 < array.length
                                                            ? array[currentIndex + 1].song
                                                            : array[currentIndex - array.length + 1].song,
                                                    ),
                                                );
                                                disPatch(setPlayingMusic(true));
                                                dispatchRedux(
                                                    getAudio(
                                                        array[index].song
                                                            ? array[index].song.streamUrls[0].streamUrl
                                                            : '',
                                                    ),
                                                );
                                            }}
                                        />
                                    );
                                })}
                        </div>
                    </Scrollbars>
                </div>
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

                        <span ref={ShowListRef}>Mở rộng danh sách</span>
                        <div>
                            <OptionMusicIcon />
                        </div>
                    </div>
                    <div className={cx('wrapper-control-pc-content')}>
                        <span>
                            {minutes}:{second}
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={state.durationSong}
                            step="any"
                            onChange={handleSeekChange}
                            value={state.timePlayed}
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
                                            <img
                                                src={state.nextMusic && state.nextMusic?.thumbnail}
                                                alt=""
                                                className={cx('img')}
                                            />
                                        </div>
                                        <div className={cx('wrapper-content-next-music')}>
                                            <span className={cx('title')}>
                                                {state.nextMusic && state.nextMusic?.title}
                                            </span>
                                            <span className={cx('artists')}>
                                                {state?.nextMusic?.artists
                                                    ? state?.nextMusic?.artists[0]?.name
                                                    : 'tên ca sĩ'}
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
            </div>
            <label htmlFor="check" className={cx('overlay')}></label>
            <div className={cx('wrapper-tablet')}>
                <label htmlFor="check" className={cx('header')}>
                    <p className={cx('title')}>Chỉ Bằng Cái Gật Đầu</p>
                </label>
                <div className={cx('control')}>
                    <div className={cx('wrapper-control-icon')}>
                        <div className={cx('control-icon')}>
                            <NextMusicIcon />
                        </div>
                        <div className={cx('control-icon')}>
                            <PlayMusicIcon />
                        </div>
                    </div>
                    <div className={cx('wrapper-control-icon')}>
                        <div className={cx('control-icon')}>
                            <OptionMusicIcon />
                        </div>
                        <label htmlFor="check" className={cx('control-icon')}>
                            <ShowPlayControlPcIcon />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(PlayControl);
