import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import HeroList from './HeroList';

//Actions
import { fetchRandomHero } from '../store/single/actions';

class SingleResult extends Component {
    componentDidMount = () => {
        const { isLoading, isFailed, single } = this.props.single;
        if (!single && !isLoading && !isFailed) {
            this.props.fetchRandomHero();
        }
    }

    render() {
        const { single } = this.props.single;
        if (!single) {
            return null;
        }

        return (
            <section>
                <HeroList heroes={[single]} />
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomHero: bindActionCreators(fetchRandomHero, dispatch)
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions,
        single: state.single
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleResult);
