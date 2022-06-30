import { useEffect, useRef, useState } from 'react';
import images from '../../assets/images';
const Image = ({ src, debounce, all, ...props }) => {
    const [fallback, setFallback] = useState('');
    const imageErrorRef = useRef();
    const handleError = (e) => {
        setFallback(images.noImage);
    };

    useEffect(() => {
        if (!imageErrorRef.current.src) {
            imageErrorRef.current.src = images.noImage;
        }
    }, [debounce]);
    return <img src={fallback || src} alt={all} ref={imageErrorRef} {...props} onError={handleError} />;
};

export default Image;
