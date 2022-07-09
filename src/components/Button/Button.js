import React, { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';

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

export default memo(Button);
