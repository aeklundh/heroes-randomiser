import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { media } from './_mediaTemplates';

export const Viewport = withRouter(styled.div`
    @import url('https://fonts.googleapis.com/css?family=Raleway:400,400i|Ubuntu:400,700');
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #131219;
    background-image: url('https://prismic-io.s3.amazonaws.com/heroesrandomiser%2Fa88e7961-10b7-4ec1-9650-d0ec52f04106_gabriel-garcia-marengo-6132-unsplash-shrunk-1920.jpg');
    background-size: cover;
    background-position: center;
    font-family: ${props => props.theme.fonts.main};

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 0;
        background-image: linear-gradient(to bottom right, #6f00ff, #5600e0);;
        opacity: 0.05;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${props => props.theme.fonts.heading};
    }

    a {
        color: ${props => props.theme.colours.mainBaseTextAccent};
        text-decoration: none;
    }
`);

export const MainBody = withRouter(styled.main`
    flex: 1;
    margin: auto;
    min-height: 500px;
    width: 80%;
    background-color: ${props => props.theme.colours.mainBase};
    color: ${props => props.theme.colours.mainBaseText};
    z-index: 1;

    ${media.desktop`
        width: 60%;
    `}
`);

export const MainBodySection = styled.main`
    padding: 5px 20px 5px 20px;

    h1 {
        text-align: center;
    }
`;
