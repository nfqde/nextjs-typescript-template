import type {ReactNode} from 'react';

import type {NextComponentType, NextPage, NextPageContext} from 'next';
import type {AppProps as NextAppProps} from 'next/app';
import type {NextRouter} from 'next/router';

type NextComponentWithLayout = NextComponentType<NextPageContext, any, any> & Partial<NextPageWithLayout>;
type NextPageWithLayout<T = any> = NextPage<T> & Layout;

export type AppProps<P = any> = Omit<NextAppProps<P>, 'pageProps'> & {
    Component: NextComponentWithLayout;
    pageProps: P;
};
export interface Layout {
    static getLayout?: GetLayout;
    static getLayoutKey?: GetLayoutKey;
}

export type GetLayout = (router: NextRouter, pageProps: object, PageComponent: NextComponentWithLayout) => ReactNode;
export type GetLayoutKey = () => string;

export type WithChildren<T = object> = T & {children?: ReactNode};