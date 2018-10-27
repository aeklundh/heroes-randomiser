import React, { Component } from 'react';

//Style
import styled from 'styled-components';
import { media } from '../style/_mediaTemplates';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
    width: 100%;
    background-color: ${props => props.theme.colours.footerBase};
    color: ${props => props.theme.colours.footerText};
    box-shadow: 0px -1px 3px 0px ${props => props.theme.colours.footerSecondary};
    z-index: 2;

    a {
        color: ${props => props.theme.colours.footerText};
    }
`;

const InnerFooter = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    padding: 10px 0 10px 0;
    align-items: center;
    justify-content: space-evenly;

    ${media.desktop`
        width: 60%;
        margin: auto;
    `}
`;

const InnerFooterColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

const FooterList = styled.nav`
    display: flex;
    align-self: flex-end;
`;

const FooterItem = styled(Link)`
    display: flex;
    font-size: 0.9em;
    line-height: 0.6em;
    justify-content: flex-end;
    padding: 0.5em;
    margin-right: 0.5em;
    color: ${props => props.theme.colours.footerText};
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px ${props => props.theme.colours.footerText};

    &:last-child{
        margin-right: 0;
    }
`;

class Footer extends Component {
    render() {
        return (
            <StyledFooter>
                <InnerFooter>
                    <InnerFooterColumn />
                    <InnerFooterColumn>
                        <FooterList>
                            <FooterItem href="https://github.com/aeklundh/heroes-randomiser" as={"a"} target="_blank">GitHub</FooterItem>
                            <FooterItem to="/about" as={Link}>About</FooterItem>
                        </FooterList>
                    </InnerFooterColumn>
                </InnerFooter>
            </StyledFooter>
        );
    }
}

export default Footer;
