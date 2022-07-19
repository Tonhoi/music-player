import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Popper.module.scss';

const cx = className.bind(styles);

const Wrapper = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
