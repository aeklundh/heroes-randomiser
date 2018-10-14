import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.colours.base1};
    color: ${props => props.theme.colours.baseText1};
`;

class Footer extends PureComponent {
    render() {
        return (
            <StyledFooter>
                <p>Footer</p>
            </StyledFooter>
        );
    }
}

export default Footer;
