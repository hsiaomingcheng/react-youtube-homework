import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './redux/reducer/message';
import {
    hashHistory,
    BrowserRouter as Router
} from 'react-router-dom';
import RouterComponent from './router/RouterComponent';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Router history={hashHistory}>
                        <RouterComponent />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default hot(App);