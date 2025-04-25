/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import {Container} from '@nfq/react-grid';

import type {NextPageWithLayout} from 'types/global';

/**
 * The `HomePage` component is a Next.js page component.
 * It is used as a route and can be accessed throught the nextjs router.
 *
 * @returns A ReactNode representing the `HomePage` page.
 */
const HomePage: NextPageWithLayout = () => (
    <Container as="main">
        <P>HomePage</P>
    </Container>
);

/**
 * `getLayout` is a static property of the `HomePage` component that is a function designed to wrap the component with a specified layout.
 * It receives the router object, page properties, and the PageComponent and returns the PageComponent wrapped with the necessary layout and properties.
 * This property is essential for applying consistent layouts across different pages in the application.
 *
 * @param route         The base path of current route.
 * @param pageProps     The page properties object representing the properties of the current page.
 * @param PageComponent The PageComponent representing the current page.
 * @returns A ReactNode representing the PageComponent wrapped with the necessary layout and properties.
 *
 * @example
 * ```tsx
 * const LayoutWrappedComponent = HomePage.getLayout(router, pageProps, PageComponent);
 * ```
 */
HomePage.getLayout = (route, pageProps, PageComponent) => <PageComponent route={route} {...pageProps} />;

/**
 * `getLayoutKey` is a static property of the `HomePage` component that is a function designed to return the layout key string.
 * It is used to determine if the layout changed between pages to apply transitions between different layouts.
 * This property is crucial for managing different layouts within the application and for providing a specific layout key for the `HomePage` component.
 *
 * @returns A string representing the layout key.
 *
 * @example
 * ```tsx
 * const layoutKey = HomePage.getLayoutKey();
 * ```
 */
HomePage.getLayoutKey = () => '';

export default HomePage;

const P = styled.p`
    font-family: ${({theme}) => theme.fonts.Lato};
`;