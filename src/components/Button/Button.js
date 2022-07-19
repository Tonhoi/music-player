import React, { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ children, to, href, navLink, onClick, ...props }, className = () => {}) => {
    let Comp = 'div';
    const prop = {
        onClick,
        ...props,
    };
    if (navLink) {
        prop.to = to;
        Comp = NavLink;
    } else if (to) {
        prop.to = to;
        Comp = Link;
    } else if (href) {
        prop.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={className} {...prop}>
            {children}
        </Comp>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    navLink: PropTypes.bool,
    onClick: PropTypes.func,
    props: PropTypes.node,
};

export default memo(Button);
