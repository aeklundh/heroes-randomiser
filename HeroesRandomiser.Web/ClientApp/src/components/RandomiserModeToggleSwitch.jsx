import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Style
import styled from 'styled-components';

//State
import { toggleRandomiserMode } from '../store/clientOptions/actions';
import { TEAM_MODE } from '../store/clientOptions/optionStates';

const OnOffWrapper = styled.div`
    position: relative;
    width: 95px;
    user-select: none;
`;

const OnOffLabel = styled.label`
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #999;
    border-radius: 20px;
`;

const CommonInnerPseudoClassStyles = () => {
    return `
        display: block;
        float: left;
        width: 50%;
        height: 30px;
        padding: 0;
        line-height: 30px;
        font-size: 14px;
        color: white;
        box-sizing: border-box;
        color: #fff;
    `;
};

const OnOffInner = styled.span`
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;

    &::before {
        ${CommonInnerPseudoClassStyles()}
        content: "Team";
        padding-left: 10px;
        background-color: ${props => props.theme.colours.control};
    }

    &::after {
        ${CommonInnerPseudoClassStyles()}
        content: "Single";
        padding-right: 10px;
        background-color: ${props => props.theme.colours.controlDarker};
        text-align: right;
    }
`;

const OnOffInnerSwitch = styled.span`
    display: block;
    width: 35px;
    margin: 2px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 53px;
    border: 1px solid #999999;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
`;

const OnOffCheckbox = styled.input.attrs({ type: "checkbox" })`
    display: none;

    &:checked + ${OnOffLabel} {
        ${OnOffInner} {
            margin-left: 0;
        }

        ${OnOffInnerSwitch} {
            right: 0px;            
        }
    }
`;

class RandomiserModeToggleSwitch extends Component {
    static defaultProps = {
        id: "randomiserModeToggle"
    };

    render() {
        return (
            <OnOffWrapper>
                <OnOffCheckbox id={this.props.id} checked={this.props.clientOptions.randomiserMode === TEAM_MODE} />
                <OnOffLabel htmlFor={this.props.id} onClick={() => { this.props.toggleRandomiserMode(this.props.clientOptions.randomiserMode) }} >
                    <OnOffInner />
                    <OnOffInnerSwitch />
                </OnOffLabel>
            </OnOffWrapper>
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
        toggleRandomiserMode: bindActionCreators(toggleRandomiserMode, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomiserModeToggleSwitch);
