import React, {Component} from 'react'
import Router from './navigators/Router';
import {Provider,connect} from 'react-redux'
import persist from "./src/config/store"
import { PersistGate } from 'redux-persist/integration/react'

const persistStore = persist()
export default class App extends Component {
    render() {

        const {createUser} = this.props


        return (
            <Provider store={persistStore.store}>
                <PersistGate loading={null} persistor={persistStore.persistor}>
                    <Router isLoggedin={this.props.createUser} />
                </PersistGate>
            </Provider>
        );
    }
}
mapStateToProps = state => ({
    createUser: state.authReducer.createUser
})

connect(mapStateToProps,null)(App)