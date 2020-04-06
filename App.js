import React, {Component} from 'react'
import Router from './navigators/Router';
import {Provider} from 'react-redux'

import store from "./src/config/store"
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
