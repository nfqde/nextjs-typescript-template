import {useCallback, useRef} from 'react';

const DEFAULT_TIMEOUT = 100;

/**
 * Creates an debounced version of the provided func where the wait time.
 *
 * @param func    Function to debounce.
 * @param timeout The timeout.
 * @returns Debounced function.
 */
export const useDebounce = (func: (...args: any[]) => void, timeout = DEFAULT_TIMEOUT) => {
    // eslint-disable-next-line no-undef
    const timer = useRef<NodeJS.Timeout>();

    return useCallback((...args: unknown[]) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => func(...args), timeout);
    }, [func, timeout]);
};