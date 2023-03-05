import type {ReactElement} from 'react';

import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

import type {DocumentContext, DocumentInitialProps} from 'next/document';

/**
 * The App document class.
 *
 * @class AppDocument
 */
export default class AppDocument extends Document {
    /**
     * Gets the initial server side props.
     *
     * @memberof AppDocument
     * @param    ctx The nextjs context object.
     *
     * @returns An props object.
     * @static
     */
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = async () => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                originalRenderPage({enhanceApp: App => props => sheet.collectStyles(<App {...props} />)})
            );

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: [
                    initialProps.styles,
                    sheet.getStyleElement()
                ]
            };
        } finally {
            sheet.seal();
        }
    }

    /**
     * Renders the document.
     *
     * @memberof AppDocument
     * @returns The document html.
     */
    render(): ReactElement {
        return (
            <Html lang="de">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}