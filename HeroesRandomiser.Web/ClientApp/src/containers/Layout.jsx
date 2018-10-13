import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHeroes } from '../store/heroes/actions';
import { fetchInGameCategories } from '../store/inGameCategories/actions';
import { fetchUniverses } from '../store/universes/actions';



class Layout extends Component {
    getHeroData = () => {
        this.props.fetchHeroes();
        this.props.fetchInGameCategories();
        this.props.fetchUniverses();
    }

    render() {
        return (
            <section>
                <p>Layout</p>
                <button onClick={this.getHeroData}>Fetch universes</button>
                {
                    this.props.universes.length ? this.props.universes.map(x => {
                        return (
                            <div key={x.id}>
                                <p>{x.name}</p>
                            </div>
                        )
                    }) : false
                }
                {
                    this.props.inGameCategories.length ? this.props.inGameCategories.map(x => {
                        return (
                            <div key={x.id}>
                                <p>{x.name}</p>
                            </div>
                        )
                    }) : false
                }
                {
                    this.props.heroes.length ? this.props.heroes.map(x => {
                        return (
                            <div key={x.id}>
                                <p>{x.name}</p>
                            </div>
                        )
                    }) : false
                }
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        heroes: state.heroes.heroes,
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
