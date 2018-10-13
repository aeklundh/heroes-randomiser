import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';

class Layout extends Component {
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
                <section className="main-body">
                    <p>Loading</p>
                </section>
            );
        }

        if (this.props.heroes.isFailed) {
            return (
                <section className="main-body">
                    <p>Could not fetch hero data</p>
                </section>
            );
        }

        const { name } = this.state.randomisedHero;

        return (
            <section className="main-body">
                <h1>Heroes Randomiser</h1>
                <div>
                    <p>{name}</p>
                </div>
                <button onClick={this.randomiseSingleHero}>Random me!</button>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
