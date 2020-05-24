import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Style
import { MainBodySection } from '../style/pageLayout';

//Components
import RandomiserModeSelectorBar from '../components/RandomiserModeSelectorBar';
import RandomiserOptionControlsContainer from '../components/RandomiserOptionControlsContainer';
import Spinner from '../components/Spinner';
import TeamContainer from '../components/TeamContainer';

//Actions
import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

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

    renderLoading = () => {
        return (
            <MainBodySection>
                <h1>Heroes Randomiser</h1>
                <Spinner />
            </MainBodySection>
        );
    }

    renderFailed = () => {
        return (
            <MainBodySection>
                <h1>Heroes Randomiser</h1>
                <p>Could not fetch hero data</p>
            </MainBodySection>
        );
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
            this.renderLoading();
        }

        if (this.props.heroes.isFailed) {
            this.renderFailed();
        }

        return (
            <MainBodySection>
                <h1>Heroes Randomiser</h1>
                <RandomiserModeSelectorBar />
                <TeamContainer />
                <RandomiserOptionControlsContainer />
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
