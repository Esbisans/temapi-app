import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = (callback) => {
    const ref = useRef(null);
    
    const handleClick = useCallback((e) => {
        const isCallbackValid = callback && typeof callback === 'function';

        if (!isCallbackValid) {
            return;
        }

        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }

    } , [callback]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
        document.removeEventListener("click", handleClick);
        };
    }, []);
    
    return { 
        ref, 
    };
    
}

