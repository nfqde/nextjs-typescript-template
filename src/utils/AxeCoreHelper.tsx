import React, {useEffect, useRef} from 'react';

import {reportAccessibility} from './axeCore';

/**
 * AxeCoreHelper.
 *
 * @returns The component.
 */
const AxeCoreHelper = () => {
    const observer = useRef(new MutationObserver(async () => reportAccessibility(React)));

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