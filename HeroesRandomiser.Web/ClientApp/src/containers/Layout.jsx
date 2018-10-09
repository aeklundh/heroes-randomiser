import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUniverses } from '../store/hero-data/actions';


class Layout extends Component {
    render() {
        return (
            <section>
                <p>Layout</p>
                <button onClick={this.props.fetchUniverses}>Fetch universes</button>
                {
                    this.props.universes.length ? this.props.universes.map(x => {
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
        universes: state.heroData.universes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUniverses: bindActionCreators(fetchUniverses, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
