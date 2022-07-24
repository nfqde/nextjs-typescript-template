//@ts-nocheck
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, theme} from '../src/utils/globalStyles';
import '../src/assets/fonts/fonts.css';

export const Wrapper = ({children}) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </>
);