import React, { useEffect, useRef, memo, useReducer } from 'react';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import { getChart, getSong } from 'nhaccuatui-api-full';

import 'react-toastify/dist/ReactToastify.css';
import styles from './PlayControl.module.scss';
import {
    NextMusicIcon,
    OptionMusicIcon,
    PauseMusicIcon,
    PlayMusicIcon,
    ShowPlayControlPcIcon,
} from '../../../components/Icons/Icon';

import {
    setCurrentIndex,
    setNextMusic,
    setPlayingMusic,
    setThumnail,
    setTimePlayed,
} from '../../../store/UseReducer/actions';
import { getAudio, setTopSong, setGetInfoMusic } from '../../../redux/action';
import reducer, { initialState } from '../../../store/UseReducer/reducer';

import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

const cx = classNames.bind(styles);
let minutes = 0;
let second = 0;
let res;
const PlayControl = () => {
    const dispatchRedux = useDispatch();
    const [state, disPatch] = useReducer(reducer, initialState);

    const audioRef = useRef();
    let array = [];
    const getInfoMusic = useSelector((prev) => (prev?.getInfoMusic ? prev?.getInfoMusic : []));

    useEffect(() => {
        const fetchData = async () => {
            res = await getChart();

            res?.ranking?.song.map(async (item, index) => {
                const topSong = await getSong(item.songKey);
                dispatchRedux(setTopSong(topSong));
            });
        };

        fetchData();
    }, [dispatchRedux]);
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
        disPatch(setThumnail(true));
        disPatch(setCurrentIndex((state.currentIndex += 1)));

        if (state.currentIndex >= array.length) {
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
    };
    const handleProgress = (e) => {
        minutes = Math.floor(e.playedSeconds / 60);
        second = Math.floor(e.playedSeconds - minutes * 60);

        disPatch(setTimePlayed(e.playedSeconds));
    };

    return (
        <>
            <ToastContainer />
            <input type="checkbox" style={{ textColor: 'white' }} id="check" hidden />
            <div className={cx('wrapper-pc')}>
                {/* header, phần show thumnail và thông tin bài hát hiện tại đang phát */}
                <Header state={state} />

                {/* content, phần danh sách nhạc */}
                <Content
                    state={state}
                    disPatch={disPatch}
                    array={array}
                    res={res}
                    audioRef={audioRef}
                    handleProgress={handleProgress}
                />

                {/* footer, phần điều khiển nhạc */}
                <Footer
                    state={state}
                    disPatch={disPatch}
                    minutes={minutes}
                    second={second}
                    audioRef={audioRef}
                    array={array}
                    handlePlayMusic={handlePlayMusic}
                    handleNextMusic={handleNextMusic}
                />
            </div>
            <label htmlFor="check" className={cx('overlay')}></label>
            <div className={cx('wrapper-tablet')}>
                <label htmlFor="check" className={cx('header')}>
                    <p className={cx('title')}>{getInfoMusic.title || 'tên bài hát'}</p>
                </label>
                <div className={cx('control')}>
                    <div className={cx('wrapper-control-icon')}>
                        <div className={cx('control-icon')} onClick={handlePlayMusic}>
                            {!state.isPlaying ? <PlayMusicIcon /> : <PauseMusicIcon />}
                        </div>

                        <div className={cx('control-icon')} onClick={handleNextMusic}>
                            <NextMusicIcon />
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
