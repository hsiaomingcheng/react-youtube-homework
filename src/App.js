import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import {
    HashRouter as Router
} from 'react-router-dom';
import RouterComponent from './router/RouterComponent';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #181818;
        color: #FFF;
    }
`;

class App extends Component {
    render() {
        return (
            <>
                <GlobalStyle />
                <div className="App">
                    <Router>
                        <RouterComponent />
                    </Router>
                </div>
            </>
        );
    }
}

export default hot(App);