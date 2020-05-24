import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Style
import { MainBodyInner } from '../style/pageLayout';

//Components
import RandomiserModeSelectorBar from '../components/RandomiserModeSelectorBar';
import RandomiserOptionControlsContainer from '../components/RandomiserOptionControlsContainer';
import Spinner from '../components/Spinner';
import RandomisationResultContainer from '../components/RandomisationResultContainer';

//Actions
import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

class StartPage extends Component {
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

    renderLoading = () => {
        return (
            <MainBodyInner>
                <h1>Heroes Randomiser</h1>
                <Spinner />
            </MainBodyInner>
        );
    }

    renderFailed = () => {
        return (
            <MainBodyInner>
                <h1>Heroes Randomiser</h1>
                <p>Could not fetch hero data</p>
            </MainBodyInner>
        );
    }
    
    componentDidMount = () => {
        document.title = "Heroes Randomiser";
        this.initialise();
    }

    render() {
        if (this.props.heroes.isLoading) {
            this.renderLoading();
        }

        if (this.props.heroes.isFailed) {
            this.renderFailed();
        }

        return (
            <MainBodyInner>
                <h1>Heroes Randomiser</h1>
                <RandomiserModeSelectorBar />
                <RandomisationResultContainer />
                <RandomiserOptionControlsContainer />
            </MainBodyInner>
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
