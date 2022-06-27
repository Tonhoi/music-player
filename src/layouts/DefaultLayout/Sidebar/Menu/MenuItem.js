import React from 'react';
import className from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.scss';

const cx = className.bind(styles);
const MenuItem = ({ icon, title, to, ...props }) => {
    const className = (nav) => cx('item', { active: nav.isActive });
    return (
        <div className={cx('wrapper')}>
            <NavLink className={className} to={to} {...props}>
                <span>{icon}</span>
                {title}
            </NavLink>
        </div>
    );
};

export default MenuItem;
