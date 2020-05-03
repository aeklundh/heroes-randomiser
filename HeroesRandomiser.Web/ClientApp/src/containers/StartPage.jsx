import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Style
import styled from 'styled-components';
import { MainBodySection } from '../style/pageLayout';

//Components
import TeamContainer from '../components/TeamContainer';
import TeamSizeSelector from '../components/TeamSizeSelector';
import RandomiserModeSelectorBar from '../components/RandomiserModeSelectorBar';
import ControlButton from '../components/ControlButton';
import Spinner from '../components/Spinner';

//Actions
import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

const ControlsContainer = styled.section`
    display: flex;
    justify-content: space-around;
`;

class StartPage extends Component {
    state = {
        randomisedHero: {},
    }

    initialise = () => {
        const { heroes, inGameCategories, universes } = this.props;
        if (shouldFetchStandardReducable(heroes, "heroes")) {
            this.props.fetchHeroes();
        }

        if (shouldFetchStandardReducable(inGameCategories, "inGameCategories")) {
            this.props.fetchInGameCategories();
        }

        if (shouldFetchStandardReducable(universes, "universes")) {
            this.props.fetchUniverses();
        }
    }

    randomiseSingleHero = () => {
        const { heroes } = this.props.heroes;
        this.setState({
            ...this.state,
            randomisedHero: heroes[[Math.floor(Math.random() * heroes.length)]]
        });
    }

    componentDidMount = () => {
        document.title = "Heroes Randomiser";
        this.initialise();
    }

    componentDidUpdate = () => {
        if (!this.state.randomisedHero["id"] && this.props.heroes.heroes.length) {
            this.randomiseSingleHero();
        }
    }

    render() {
        if (this.props.heroes.isLoading) {
            return (
                <MainBodySection>
                    <h1>Heroes Randomiser</h1>
                    <Spinner />
                </MainBodySection>
            );
        }

        if (this.props.heroes.isFailed) {
            return (
                <MainBodySection>
                    <h1>Heroes Randomiser</h1>
                    <p>Could not fetch hero data</p>
                </MainBodySection>
            );
        }

        return (
            <MainBodySection>
                <h1>Heroes Randomiser</h1>
                <RandomiserModeSelectorBar />
                <TeamContainer />
                <ControlsContainer>
                    <TeamSizeSelector />
                    <ControlButton onClick={this.props.fetchRandomTeam.bind(this, this.props.clientOptions.teamSize)}>Random me!</ControlButton>
                </ControlsContainer>
            </MainBodySection>
        );
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions,
        heroes: state.heroes,
        inGameCategories: state.inGameCategories,
        universes: state.universes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHeroes: bindActionCreators(fetchHeroes, dispatch),
        fetchInGameCategories: bindActionCreators(fetchInGameCategories, dispatch),
        fetchUniverses: bindActionCreators(fetchUniverses, dispatch),
        fetchRandomTeam: bindActionCreators(fetchRandomTeam, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
