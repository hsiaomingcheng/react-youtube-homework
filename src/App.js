import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Buttons from './component/Buttons';

class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            inputText: '',
            sign: null,
            firstNumber: '',
            secondNumber: '',
        };

        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleSignClick = this.handleSignClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSignClick(e) {
        const {
            sign, firstNumber, secondNumber,
        } = this.state;

        if (e) {
            this.setState(() => ({ sign: e }));
        }

        if (firstNumber && secondNumber) {
            const fNum = parseFloat(firstNumber);
            const sNum = parseFloat(secondNumber);
            let result = '';

            switch (sign) {
                case '+':
                    result = fNum + sNum;
                    break;
                case '-':
                    result = fNum - sNum;
                    break;
                case '×':
                    result = fNum * sNum;
                    break;
                case '÷':
                    result = fNum / sNum;
                    break;
                default:
                    break;
            }

            this.setState({
                inputText: result,
                firstNumber: result,
                secondNumber: '',
            });
        }
    }

    handleNumberClick(number) {
        const { sign } = this.state;

        if (sign) {
            this.setState((prevState) => ({
                secondNumber: prevState.secondNumber.concat(number),
                inputText: prevState.secondNumber.concat(number),
            }));
        } else {
            this.setState((prevState) => ({
                firstNumber: prevState.firstNumber.concat(number),
                inputText: prevState.firstNumber.concat(number),
            }));
        }
    }

    handleReset() {
        this.setState(() => ({
            firstNumber: '',
            secondNumber: '',
            inputText: '',
            sign: null,
        }));
    }

    render() {
        const {
            inputText, firstNumber,
        } = this.state;

        return (
            <AppContainer className="App">
                <PageBody>
                    <H1> 簡易計算機, this is made by React! </H1>

                    <Cauculator>
                        <InputContainer>
                            <ShowSpan>{firstNumber}</ShowSpan>
                            <InputSpan>{inputText}</InputSpan>
                        </InputContainer>

                        <ButtonContainer>
                            <ButtonArea>
                                <Buttons value="1" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="2" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="3" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="4" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="5" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="6" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="7" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="8" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="9" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="0" onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="." onClick={(number) => this.handleNumberClick(number)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="=" onClick={() => this.handleSignClick()} bgColor="#4285F4" bgHoverColor="#4D8BF1" />
                            </ButtonArea>

                            <CustomButtonArea>
                                <Buttons value="reset" onClick={() => this.handleReset()} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="+" onClick={(e) => this.handleSignClick(e)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="-" onClick={(e) => this.handleSignClick(e)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="×" onClick={(e) => this.handleSignClick(e)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                                <Buttons value="÷" onClick={(e) => this.handleSignClick(e)} bgColor="#F1F3F4" bgHoverColor="#E8EAEB" />
                            </CustomButtonArea>
                        </ButtonContainer>
                    </Cauculator>
                </PageBody>
            </AppContainer>
        );
    }
}

export default hot(module)(App);

const ButtonArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-self: flex-start;
`;

const CustomButtonArea = styled(ButtonArea)`
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const ShowSpan = styled.span`
    height: 50%;
    text-align: right;
    display: block;
`;

const InputSpan = styled.span`
    height: 50%;
    font-size: 24px;
    text-align: right;
    display: block;
`;

const InputContainer = styled.div`
    margin-bottom: 10px;
    border: solid 2px #9a9a9a;
    border-radius: 5px;
    padding: 5px;
    background-color: #fff;
    width: 100%;
    height: 75px;
    box-sizing: border-box;
`;

const H1 = styled.h1`
    color: red;
`;

const Cauculator = styled.div`
    margin: 0 auto;
    padding: 10px;
    background-color: #ccc;
    width: 600px;
`;

const PageBody = styled.div`
    margin: 0 auto;
    width: 620px;
    text-align: center;
`;

const AppContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
`;
