import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Style
import styled from 'styled-components';
import { media } from '../style/_mediaTemplates';

//Actions
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

const HeroList = styled.ul`
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

class TeamContainer extends Component {
    componentDidMount = () => {
        if (shouldFetchStandardReducable(this.props.team, "team")) {
            this.props.fetchRandomTeam(this.props.clientOptions.teamSize);
        }
    }

    render() {
        const { team } = this.props.team;
        return (
            <section>
                <HeroList>
                    {team.map(hero => {
                        return <li key={hero.id}>{hero.name}</li>
                    })}
                </HeroList>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomTeam: bindActionCreators(fetchRandomTeam, dispatch)
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions,
        team: state.team
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);
