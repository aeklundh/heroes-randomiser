import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { media } from '../style/_mediaTemplates';

const StyledHeroList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0;

    ${media.desktop`
        justify-content: space-between;
    `}

    li {
        display: inline-block;
        background-color: #b7b7b7;
        margin-bottom: 20px;
        padding: 1em;
        box-shadow: 0px 0px 5px 0px #292828;
        min-width: 125px;
        text-align: center;
    }
`;

class HeroList extends PureComponent {
    render() {
        const { heroes } = this.props;

        if (!heroes?.length) {
            return <></>;
        }

        return(
            <StyledHeroList>
                    {heroes.map(hero => {
                        return <li key={hero.id}>{hero.name}</li>
                    })}
            </StyledHeroList>
        );
    }
}

export default HeroList;
