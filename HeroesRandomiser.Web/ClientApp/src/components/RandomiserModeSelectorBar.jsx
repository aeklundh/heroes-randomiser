import React, { Component } from 'react';

//Style
import styled from 'styled-components';

//Components
import RandomiserModeToggleSwitch from './RandomiserModeToggleSwitch';

const ModeSelectorWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

class RandomiserModeSelector extends Component {

    render() {
        return (
            <ModeSelectorWrapper>
                <RandomiserModeToggleSwitch />
            </ModeSelectorWrapper>
        );
    }
}

export default RandomiserModeSelector;
