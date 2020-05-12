import React, {Component} from 'react'
import Router from '../navigators/Router'
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native'
import {Provider} from 'react-redux'
import persist from "./config/store"
import { PersistGate } from 'redux-persist/integration/react'
import { combineReducers } from 'redux'
import {connect} from 'react-redux'

class Main extends Component {
    render() {
        const {createUser} = this.props
        return (
              <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1c313a"
                    barStyle="light-content"
                />
        <Router isLoggedin={this.props.createUser.isLoggedIn} />
         </View>
        );
    }
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  }
}); 

mapStateToProps = state => ({
    createUser: state.authReducer.createUser
})

export default connect(mapStateToProps,null)(Main)
 
