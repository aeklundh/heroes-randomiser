import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Actions
import { setTeamSize } from '../store/clientOptions/actions';

//Style
import styled from 'styled-components';

const StyledTeamSizeSelector = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const TeamSizeControl = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;
    width: 3em; 

    span {
        margin-right: 0.3em;
    }
`;


class TeamSizeSelector extends Component {
    onTeamSizeChanged = (event) => {
        this.props.setTeamSize(parseInt(event.target.value, 10));
    }

    render() {
        return (
            <StyledTeamSizeSelector onChange={this.onTeamSizeChanged.bind(this)}>
                <TeamSizeControl>
                    <span>2</span>
                    <input type="radio" value={2} name="teamSize" defaultChecked={this.props.clientOptions.teamSize === 2} />
                </TeamSizeControl>
                <TeamSizeControl>
                    <span>3</span>
                    <input type="radio" value={3} name="teamSize" defaultChecked={this.props.clientOptions.teamSize === 3} />
                </TeamSizeControl>
                <TeamSizeControl>
                    <span>4</span>
                    <input type="radio" value={4} name="teamSize" defaultChecked={this.props.clientOptions.teamSize === 4} />
                </TeamSizeControl>
                <TeamSizeControl>
                    <span>5</span>
                    <input type="radio" value={5} name="teamSize" defaultChecked={this.props.clientOptions.teamSize === 5} />
                </TeamSizeControl>
            </StyledTeamSizeSelector>
        );
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTeamSize: bindActionCreators(setTeamSize, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSizeSelector);
