import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ThemeProvider } from 'styled-components';
import theme from '../style/_theme';
import { Viewport, MainBody } from '../style/pageLayout';
import Header from '../components/Header'
import Footer from '../components/Footer'

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
                <ThemeProvider theme={theme}>
                    <Viewport>
                        <Header />
                        <MainBody>
                            <p>Loading</p>
                        </MainBody>
                        <Footer />
                    </Viewport>
                </ThemeProvider>
            );
        }

        if (this.props.heroes.isFailed) {
            return (
                <ThemeProvider theme={theme}>
                    <Viewport>
                        <Header />
                        <MainBody>
                            <p>Could not fetch hero data</p>
                        </MainBody>
                        <Footer />
                    </Viewport>
                </ThemeProvider>
            );
        }

        const { name } = this.state.randomisedHero;

        return (
            <ThemeProvider theme={theme}>
                <Viewport>
                    <Header />
                    <MainBody>
                        <h1>Heroes Randomiser</h1>
                        <div>
                            <p>{name}</p>
                        </div>
                        <button onClick={this.randomiseSingleHero}>Random me!</button>
                    </MainBody>
                    <Footer />
                </Viewport>
            </ThemeProvider>
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
