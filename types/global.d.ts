import type {ReactNode} from 'react';

import type {
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
    NextComponentType,
    NextPage,
    NextPageContext
} from 'next';
import type {AppProps as NextAppProps} from 'next/app';
import type {NextRouter} from 'next/router';

type NextComponentWithLayout = NextComponentType<NextPageContext, any, any> & Partial<NextPageWithLayout>;
type NextPageWithLayout<T = any> = NextPage<T> & Layout<T>;
type NextSSRPageWithLayout<P = any> = NextPage<InferGetServerSidePropsType<P>> & Layout<InferGetServerSidePropsType<P>>;
type NextSSGPageWithLayout<P = any> = NextPage<InferGetStaticPropsType<P>> & Layout<InferGetStaticPropsType<P>>;

export type AppProps<P = any> = Omit<NextAppProps<P>, 'pageProps'> & {
    Component: NextComponentWithLayout;
    pageProps: P;
};
export interface Layout<T> {
    static getLayout?: GetLayout<T>;
    static getLayoutKey?: GetLayoutKey;
}

export type GetLayout<T> = (router: NextRouter, pageProps: T, PageComponent: NextComponentWithLayout) => ReactNode;
export type GetLayoutKey = () => string;

export type WithChildren<T = object> = T & {children?: ReactNode};