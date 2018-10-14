import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { media } from './_mediaTemplates';

export const Viewport = withRouter(styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-image: url(https://prismic-io.s3.amazonaws.com/heroesrandomiser%2Ffac1e1c3-8bf2-467b-b3a2-bdbc5140206e_gabriel-garcia-marengo-6132-unsplash-shrunk.jpg);
    background-size: cover;
    background-position: center;   
`);

export const MainBody = withRouter(styled.main`
    flex: 1;
    margin: auto;
    min-height: 500px;
    width: 80%;
    padding: 10px;
    background-color: ${props => props.theme.colours.mainBase};
    color: ${props => props.theme.colours.mainBaseText};

    ${media.desktop`
        width: 60% 
    `}
`);
