import React, { Component } from 'react';

//Style
import styled from 'styled-components';

//Components
import ToggleSwitch from './RandomiserModeToggleSwitch';

const ModeSelectorWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

class RandomiserModeSelector extends Component {

    render() {
        return (
            <ModeSelectorWrapper>
                <ToggleSwitch id="modeSelector" isChecked="checked" onChange={(e) => { console.info(e) }} />
            </ModeSelectorWrapper>
        );
    }
}

export default RandomiserModeSelector;
