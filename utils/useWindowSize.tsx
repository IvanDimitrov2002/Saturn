import { useLayoutEffect, useState } from 'react';

const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([
                Math.max(
                    document.documentElement.clientWidth || 0,
                    window.innerWidth || 0
                ),
                Math.max(
                    document.documentElement.clientHeight || 0,
                    window.innerHeight || 0
                ),
            ]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

export default useWindowSize;
