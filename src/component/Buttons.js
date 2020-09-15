import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {
            value, onClick, bgColor, bgHoverColor, display,
        } = this.props;

        return (
            <ButtonsContainer
                backgroundColor={bgColor}
                backgroundColorHover={bgHoverColor}
                onClick={() => onClick(value)}
                display={display}
            >
                {value}
            </ButtonsContainer>
        );
    }
}

Buttons.defaultProps = {
    bgColor: '#F1F3F4',
    bgHoverColor: '#E8EAEB',
    onClick: () => { },
    display: 'flex',
};

Buttons.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    bgColor: PropTypes.string,
    bgHoverColor: PropTypes.string,
    onClick: PropTypes.func,
    display: PropTypes.string,
};

export default Buttons;

const ButtonsContainer = styled.div`
    margin: 5px;
    background-color: ${(props) => props.backgroundColor};
    cursor: pointer;
    width: 140px;
    height: 70px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${(props) => props.backgroundColorHover};
    }
`;
