import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const SpinnerWrap = styled.div`
    position: absolute;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    perspective: 800px;
`;

const InnerBase = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const RotateOne = keyframes`
    0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
`;

const RotateTwo = keyframes`
    0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
`;

const RotateThree = keyframes`
    0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
`;

const InnerOne = styled(InnerBase)`
    left: 0%;
    top: 0%;
    animation: ${RotateOne} 1s linear infinite;
    border-bottom: 3px solid #222;
`;

const InnerTwo = styled(InnerBase)`
    right: 0%;
    top: 0%;
    animation: ${RotateTwo} 1s linear infinite;
    border-right: 3px solid #222;
`;

const InnerThree = styled(InnerBase)`
    right: 0%;
    bottom: 0%;
    animation: ${RotateThree} 1s linear infinite;
    border-top: 3px solid #222;
`;

class Spinner extends PureComponent {
    render() {
        return (
            <SpinnerWrap>
                <InnerOne />
                <InnerTwo />
                <InnerThree />
            </SpinnerWrap>
        )
    }
};

export default Spinner;
