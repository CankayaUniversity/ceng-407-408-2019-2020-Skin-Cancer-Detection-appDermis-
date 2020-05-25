import React, {Component} from 'react'
import Router from '../navigators/Router'
import {StatusBar, StyleSheet, View} from 'react-native'
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
                <Router isLoggedin={this.props.createUser.isLoggedIn}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

mapStateToProps = state => ({
    createUser: state.authReducer.createUser
})

export default connect(mapStateToProps, null)(Main)

