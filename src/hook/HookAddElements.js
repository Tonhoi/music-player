import { useEffect, useRef } from 'react';

const HookAddElements = (className) => {
    const ShowListRef = useRef();
    const headerPlayControlRef = useRef();
    const wrapperHeaderImageRef = useRef();
    const ulElementsPlayControlRef = useRef();
    const titleUlElementsPlayControlRef = useRef();
    const wrapperNameMusic = useRef();
    const contentPlayControlPc = useRef();
    useEffect(() => {
        const showListRef = ShowListRef.current;
        if (showListRef) {
            const handleShowList = () => {
                headerPlayControlRef.current.classList.toggle(className);
                wrapperHeaderImageRef.current.classList.toggle(className);
                ulElementsPlayControlRef.current.classList.toggle(className);
                wrapperNameMusic.current.classList.toggle(className);
                titleUlElementsPlayControlRef.current.classList.toggle(className);
                contentPlayControlPc.current.classList.toggle(className);
                if (showListRef.textContent === 'Mở rộng danh sách') {
                    showListRef.innerHTML = 'Thu gọn danh sách';
                } else {
                    showListRef.innerHTML = 'Mở rộng danh sách';
                }
            };
            showListRef.addEventListener('click', handleShowList);
            return () => {
                showListRef.removeEventListener('click', handleShowList);
            };
        }
    }, []);
    return {
        ShowListRef,
        headerPlayControlRef,
        wrapperHeaderImageRef,
        ulElementsPlayControlRef,
        titleUlElementsPlayControlRef,
        wrapperNameMusic,
        contentPlayControlPc,
    };
};

export default HookAddElements;
