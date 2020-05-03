import styled  from 'styled-components';

export default styled.button`
    background-color: ${props => props.theme.colours.control};
    color: #fff;
    border: 2px solid #9568ec;
    border-radius: 3px;
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colours.controlDarker};
        border: 2px solid #855cd6;
    }

    &:focus {
        outline: none;
    }
`;
