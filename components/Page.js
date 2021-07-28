import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Scanline from './Scanline';

const GlobalStyles = createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
        text-rendering: geometricPrecision;
    }

    html {
        margin: auto;
        overflow: hidden;

        --font-family: 'Hack', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --background-color: #1e1e1e;
        --global-font-size: 14px;
        --global-line-height: 1.4em;
        --global-space: 10px;
        --page-width: 60em;
        --subtitle-color: #f975f7;
        --font-color: #e8e9ed;
        --invert-font-color: #222225;
        --secondary-color: #a3abba;
        --tertiary-color: #a3abba;
        --primary-color: #62c4ff;
        --error-color: #ff3c74;
        --progress-bar-background: #3f3f44;
        --progress-bar-fill: #62c4ff;
        --code-bg-color: #3f3f44;
        --quote-color: #9ca2ab;
        --input-style: solid;
        --display-h1-decoration: none;
        --global-scale-factor: 1;
    }

    *::-moz-selection {
        background: var(--primary-color);
        color: var(--invert-font-color);
    }

    *::selection {
        background: var(--primary-color);
        color: var(--invert-font-color);
    }

    body {
        background-color: var(--background-color);
        font-family: var(--font-family), monospace;
        font-size: var(--global-font-size);
        line-height: var(--global-line-height);
        color: var(--font-color);
        margin: 0;
        word-wrap: break-word;
    }

    @media screen and (max-width: 620px) {
    :root {
        --global-scale-factor: 0.666;
    }
}`;

const PageStyles = styled.div`
    /* grid container settings */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: calc(var(--global-scale-factor) * 150px) 1fr auto;
    grid-template-areas: //
        'header' // header section
        'main' // content will be rendered by the routes
        'footer'; // footer section
`;

const MainStyles = styled.main`
    grid-area: main;
    overflow: auto;
    margin: 10%;
`;

const Page = ({ children }) => (
    <PageStyles>
        <GlobalStyles />
        <Scanline />
        <Header />
        <MainStyles>{children}</MainStyles>
    </PageStyles>
);

export default Page;

Page.propTypes = {
    children: PropTypes.any,
};
