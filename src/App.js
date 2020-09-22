import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import {
    HashRouter as Router
} from 'react-router-dom';
import RouterComponent from './router/RouterComponent';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <RouterComponent />
                </Router>
            </div>
        );
    }
}

export default hot(App);