import type {ComponentType} from 'react';

import ReactDOMServer from 'react-dom/server';

/**
 * Parses an svg icon as url image.
 *
 * @param Icon  An React svg Icon component.
 * @param props The Icon props.
 *
 * @returns An html string.
 */
export const iconAsBackground = (Icon: ComponentType, props: object): string => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    // eslint-disable-next-line react/jsx-filename-extension, react/jsx-props-no-spreading
    ReactDOMServer.renderToStaticMarkup(<Icon {...props} />)
)}`;