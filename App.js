import React, {Component} from 'react'
import Router from './navigators/Router';
import {Provider,connect} from 'react-redux'
import persist from "./src/config/store"
import { PersistGate } from 'redux-persist/integration/react'

const persistStore = persist()
export default class App extends Component {
    render() {
        return (
            <Provider store={persistStore.store}>
                <PersistGate loading={null} persistor={persistStore.persistor}>
                    <Router/>
                </PersistGate>
            </Provider>
        );
    }
}

connect(null,null)(App)