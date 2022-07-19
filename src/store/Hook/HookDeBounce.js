import { useEffect, useState } from 'react';

const HookDeBounce = (value, times) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const clear = setTimeout(() => {
            setDebounce(value);
        }, times);
        return () => {
            clearTimeout(clear);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounce;
};

export default HookDeBounce;
