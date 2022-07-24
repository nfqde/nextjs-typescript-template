import {Component} from 'react';

import {ScreenClassProvider} from '@nfq/react-grid';
import {LazyMotion} from 'framer-motion';
import PropTypes from 'prop-types';
import styled, {ThemeProvider} from 'styled-components';

import {GlobalStyle} from './globalStyles';
import {theme} from 'Utils/globalStyles';

/**
 * Loads the framer-motion features.
 *
 * @returns {Promise} The loading promise.
 */
const loadMotionFeatures = async () => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        'Utils/motionFeatures'
    );

    return module.default;
};

/**
 * TestWrapper
 *
 * @class TestWrapper
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class TestWrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        testId: PropTypes.string.isRequired,
        bgColor: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        padding: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        bgColor: '#ffffff',
        height: '100%',
        padding: '0',
        width: '100%'
    };

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof TestWrapper
     */
    render() {
        const {bgColor, children, height, padding, testId, width} = this.props;

        return (
            <TestWrapperElement bgColor={bgColor} data-cy={testId} height={height} padding={padding} width={width}>
                <GlobalStyle />
                <ThemeProvider theme={theme}>
                    <ScreenClassProvider>
                        <LazyMotion features={loadMotionFeatures} strict>
                            {children}
                        </LazyMotion>
                    </ScreenClassProvider>
                </ThemeProvider>
            </TestWrapperElement>
        );
    }
}

export default TestWrapper;

const TestWrapperElement = styled.div`
    background-color: ${({bgColor}) => bgColor};
    height: ${({height}) => ((Number.isInteger(height)) ? `${height}px` : height)};
    padding: ${({padding}) => padding};
    width: ${({width}) => ((Number.isInteger(width)) ? `${width}px` : width)};
`;