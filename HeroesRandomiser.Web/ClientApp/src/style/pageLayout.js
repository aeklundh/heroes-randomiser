import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { media } from './_mediaTemplates';

export const Viewport = withRouter(styled.div`
    @import url('https://fonts.googleapis.com/css?family=Raleway:400,400i|Ubuntu:400,700');
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-image: url(https://prismic-io.s3.amazonaws.com/heroesrandomiser%2Ffac1e1c3-8bf2-467b-b3a2-bdbc5140206e_gabriel-garcia-marengo-6132-unsplash-shrunk.jpg);
    background-size: cover;
    background-position: center;
    font-family: ${props => props.theme.fonts.main};

    h1, h2, h3, h4, h5, h6 {
        font-family: ${props => props.theme.fonts.heading};
    }
`);

export const MainBody = withRouter(styled.main`
    flex: 1;
    margin: auto;
    min-height: 500px;
    width: 80%;
    background-color: ${props => props.theme.colours.mainBase};
    color: ${props => props.theme.colours.mainBaseText};

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
