import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { SINGLE_MODE } from '../store/clientOptions/optionStates';

//Components
import TeamSizeSelector from '../components/TeamSizeSelector';
import ControlButton from '../components/ControlButton';

//Actions
import { fetchRandomTeam } from '../store/team/actions';
import { fetchRandomHero } from '../store/single/actions';

const ControlsContainer = styled.section`
    display: flex;
    justify-content: space-around;
`;

class RandomiserOptionsControlsContainer extends Component {
    render() {
        if (this.props.clientOptions.randomiserMode === SINGLE_MODE) {
            return (
                <ControlsContainer>
                    <ControlButton onClick={this.props.fetchRandomHero.bind(this)}>Random me!</ControlButton>
                </ControlsContainer>
            );
        }

        return (
            <ControlsContainer>
                <TeamSizeSelector />
                <ControlButton onClick={this.props.fetchRandomTeam.bind(this, this.props.clientOptions.teamSize)}>Random me!</ControlButton>
            </ControlsContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomHero: bindActionCreators(fetchRandomHero, dispatch),
        fetchRandomTeam: bindActionCreators(fetchRandomTeam, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomiserOptionsControlsContainer);
