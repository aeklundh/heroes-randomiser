import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SINGLE_MODE } from '../store/clientOptions/optionStates';

import SingleResult from './SingleResult';
import TeamContainer from './TeamContainer';

class RandomisationResultContainer extends Component {
    render() {
        const { randomiserMode } = this.props.clientOptions;
        if (randomiserMode === SINGLE_MODE) {
            return <SingleResult />;
        }

        return <TeamContainer />;
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions
    }
}

export default connect(mapStateToProps)(RandomisationResultContainer);
