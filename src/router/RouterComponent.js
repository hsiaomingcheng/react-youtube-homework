import React, { Component } from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from '../page/Home';
import Video from '../page/Video';
import Favorite from '../page/Favorite';

class RouterComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Switch>
                <Route path="/video" component={Video} />
                <Route path="/favorite" component={Favorite} />
                <Route path="/" component={Home} />
            </Switch>
        );
    }
}

export default RouterComponent;