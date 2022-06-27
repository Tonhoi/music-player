import React, { useEffect, useRef, useState } from 'react';

const HookDropDown = () => {
    const [active, setActive] = useState(false);
    const searchRef = useRef();
    useEffect(() => {
        const handleToggleClass = (e) => {
            if (searchRef.current && searchRef.current.contains(e.target)) {
                setActive(true);
            } else {
                setActive(false);
            }
        };
        document.addEventListener('click', handleToggleClass);
        return () => {
            document.removeEventListener('click', handleToggleClass);
        };
    }, []);
    return {
        active,
        searchRef,
    };
};

export default HookDropDown;
