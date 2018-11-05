import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from '../style/Spinner';
import { MainBodySection } from '../style/pageLayout';

import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';

class StartPage extends Component {
    state = {
        randomisedHero: {}
    }

    getHeroData = () => {
        this.props.fetchHeroes();
        this.props.fetchInGameCategories();
        this.props.fetchUniverses();
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
        this.getHeroData();
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
                    <Spinner/>
                </MainBodySection>
            );
        }

        if (this.props.heroes.isFailed) {
            return (
                <MainBodySection>
                    <p>Could not fetch hero data</p>
                </MainBodySection>
            );
        }

        const { name } = this.state.randomisedHero;

        return (
            <MainBodySection>
                <h1>Heroes Randomiser</h1>
                <div>
                    <p>{name}</p>
                </div>
                <button onClick={this.randomiseSingleHero}>Random me!</button>
            </MainBodySection>
        );
    }
}

const mapStateToProps = state => {
    return {
        heroes: state.heroes,
        inGameCategories: state.inGameCategories.inGameCategories,
        universes: state.universes.universes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHeroes: bindActionCreators(fetchHeroes, dispatch),
        fetchInGameCategories: bindActionCreators(fetchInGameCategories, dispatch),
        fetchUniverses: bindActionCreators(fetchUniverses, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
