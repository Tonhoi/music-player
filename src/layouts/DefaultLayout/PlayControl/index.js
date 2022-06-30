import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames/bind';
import styles from './PlayControl.module.scss';
import {
    NextMusicIcon,
    OptionMusicIcon,
    PlayMusicIcon,
    PrevMusicIcon,
    RepeatMusicIcon,
    ShowPlayControlPcIcon,
    ShuffleMusicIcon,
    VolumnMediumIcon,
} from '../../../components/Icons/Icon';
import HookAddElements from '../../../hook/HookAddElements';

const cx = classNames.bind(styles);

const PlayControl = () => {
    const {
        ShowListRef,
        headerPlayControlRef,
        wrapperHeaderImageRef,
        headerImageRef,
        ulElementsPlayControlRef,
        titleUlElementsPlayControlRef,
        wrapperNameMusic,
    } = HookAddElements(cx('add'));
    return (
        <>
            <input type="checkbox" style={{ textColor: 'white' }} id="check" hidden />
            <div className={cx('wrapper-pc')}>
                <div className={cx('header-playControl-pc')} ref={headerPlayControlRef}>
                    <div className={cx('wrapper-image')} ref={wrapperHeaderImageRef}>
                        <img
                            src="https://avatar-ex-swe.nixcdn.com/song/2018/08/17/3/c/6/b/1534467540095_300.jpg"
                            alt=""
                            className={cx('img')}
                            ref={headerImageRef}
                        />
                    </div>
                    <div className={cx('wrapper-name-music')} ref={wrapperNameMusic}>
                        <div>
                            <span className={cx('name-music')}>Người thương</span>
                            <p className={cx('name-artists')}>Hoàng Tôn</p>
                        </div>
                        <span>4:00</span>
                    </div>
                </div>

                <div className={cx('content-playControl-pc')}>
                    <span className={cx('title')} ref={titleUlElementsPlayControlRef}>
                        Danh sách bài hát
                    </span>
                    <Scrollbars autoHide>
                        <ul className={cx('list')} ref={ulElementsPlayControlRef}>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương 1</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                            <li className={cx('item')}>
                                <div className={cx('item-left')}>
                                    <span className={cx('first-child')}>Người Thương 9</span>
                                    <span>Hoàng Tôn</span>
                                </div>
                                <div className={cx('item-right')}>
                                    <span>
                                        <OptionMusicIcon />
                                    </span>
                                    <span>3:30</span>
                                </div>
                            </li>
                        </ul>
                    </Scrollbars>
                </div>
                <div className={cx('wrapper-control-pc')}>
                    <div className={cx('wrapper-control-pc-heading')}>
                        <div>
                            <VolumnMediumIcon />
                        </div>
                        {/* <VolumnLowicon />
                                        <VolumnMuteIcon /> */}
                        <span ref={ShowListRef}>Mở rộng danh sách</span>
                        <div>
                            <OptionMusicIcon />
                        </div>
                    </div>
                    <div className={cx('wrapper-control-pc-content')}>
                        <span>0:00</span>
                        <input type="range" />
                        <span>4:00</span>
                    </div>
                    <div className={cx('wrapper-control-pc-footer')}>
                        <div className={cx('icon-control')}>
                            <ShuffleMusicIcon />
                        </div>
                        <div className={cx('icon-control')}>
                            <PrevMusicIcon />
                        </div>
                        <div className={cx('icon-control')}>
                            <PlayMusicIcon />
                        </div>
                        <div className={cx('icon-control')}>
                            <NextMusicIcon />
                        </div>
                        <div className={cx('icon-control')}>
                            <RepeatMusicIcon />
                        </div>
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

export default PlayControl;
