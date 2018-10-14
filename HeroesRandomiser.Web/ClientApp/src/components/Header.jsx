import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const HeaderLogo = styled.div`
    display: inline-block;
    background-image: url(https://via.placeholder.com/350x150);
    background-size: cover;
    background-position: center;
    width: 80px;
    height: 50px;
`;

const StyledHeader = styled.header`
    height: 200px;
    background-color: #4639bf;
`;

const HeaderList = styled.ul`
    display: inline-block;
`;

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <Link to="/">
                    <HeaderLogo />
                </Link>
                <HeaderList>
                    <Link to="/about">About</Link>
                </HeaderList>
            </StyledHeader>
        );
    }
}

export default Header;
