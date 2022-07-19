import { useEffect, useRef, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import images from '../../assets/images';
const Image = forwardRef(({ src, debounce, alt, ...props }, ref) => {
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
    return <img src={fallback || src} alt={alt} ref={imageErrorRef} {...props} onError={handleError} />;
});

Image.propTypes = {
    src: PropTypes.string,
    debounce: PropTypes.string,
    alt: PropTypes.string,
    props: PropTypes.node,
};

export default Image;
