import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Style
import styled from 'styled-components';
import { media } from '../style/_mediaTemplates';

const StyledHeader = styled.header`
    background-color: ${props => props.theme.colours.headerBase};
    box-shadow: 0px 1px 3px 0px ${props => props.theme.colours.headerSecondary};
    z-index: 2;
`;

const InnerHeader = styled.div`
    display: flex;
    padding: 10px 0 10px 0;
    align-items: center;
    justify-content: center;

    ${media.desktop`
        width: 60%;
        margin: auto;
    `}
`;

const HeaderLogo = styled(Link)`
    display: inline-block;
    background-image: url(/logo.svg);
    background-size: cover;
    background-position: center;
    width: 350px;
    height: 150px;
    filter: drop-shadow( -5px -5px 5px #f2f2f2 );
    stroke: #fff;
`;

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <InnerHeader>
                    <HeaderLogo to="/"/>
                </InnerHeader>
            </StyledHeader>
        );
    }
}

export default Header;
