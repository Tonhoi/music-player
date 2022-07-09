import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import {
    AddPlaylistIcon,
    DiscIcon,
    FolderMusicIcon,
    HomeIcon,
    LogoIcon,
    MusicIcon,
    PlaylistIcon,
    RecentIcon,
    StarIcon,
    TopicIcon,
} from '../../../components/Icons/Icon';
import { MenuItem } from './Menu';
import { router } from '../../../config';
import { Menu } from '../../../components/Popper/Menu';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <Link to={router.configRouter.home} className={cx('logo-container')}>
                <LogoIcon className={cx('logo')} />
            </Link>
            <div className={cx('list')}>
                <MenuItem title="Trang Chủ" icon={<HomeIcon />} to="/" />
                {/* <Menu title="Trang chủ" leftIcon={<HomeIcon />} to="/" navLink className={cx('text')} /> */}
                <MenuItem title="Khám phá" icon={<DiscIcon />} to="/Discovery" />
                <MenuItem title="Nhạc Mới" icon={<MusicIcon />} to="/moi-phat-hanh" />
                <MenuItem title="Thể Loại" icon={<TopicIcon />} to="/hub" />
                <MenuItem title="Top 100" icon={<StarIcon />} to="/Top100" />
                <div className={cx('list-library')}>
                    <p className={cx('title')}>THƯ VIỆN</p>
                    <MenuItem title="Bài Hát" icon={<FolderMusicIcon />} to="/a" />
                    <MenuItem title="Playlist" icon={<PlaylistIcon />} to="/playlist" />
                    <MenuItem title="Gần đây" icon={<RecentIcon />} to="/b" />
                </div>
                <div className={cx('create-playlist')}>
                    <MenuItem title="Tạo playlist mới" icon={<AddPlaylistIcon />} to="/b" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
