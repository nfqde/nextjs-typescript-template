import React, {useEffect, useRef} from 'react';

import {reportAccessibility} from './axeCore';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

/**
 * AxeCoreHelper.
 *
 * @returns The component.
 */
const AxeCoreHelper = () => {
    const observer = useRef(new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            // eslint-disable-next-line @nfq/no-magic-numbers
            await reportAccessibility(React);
        }, 1000);
    }));

    useEffect(() => {
        void reportAccessibility(React);

        const currentObserver = observer.current;

        currentObserver.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });

        return () => currentObserver.disconnect();
    }, []);

    return null;
};

AxeCoreHelper.displayName = 'AxeCoreHelper';

export default AxeCoreHelper;