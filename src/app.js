import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './redux/reducer/message';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';
import RouterComponent from './router/RouterComponent';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Router>
                        {/* <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/favorite">Favorite</Link>
                                </li>
                                <li>
                                    <Link to="/video">video</Link>
                                </li>
                            </ul>
                        </nav> */}
                        <RouterComponent />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default hot(App);