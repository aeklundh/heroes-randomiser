import React, { PureComponent } from 'react';
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

class Header extends PureComponent {
    render() {
        return (
            <StyledHeader>
                <HeaderLogo />
                <HeaderList>
                    <li>About</li>
                </HeaderList>
            </StyledHeader>
        );
    }
}

export default Header;
