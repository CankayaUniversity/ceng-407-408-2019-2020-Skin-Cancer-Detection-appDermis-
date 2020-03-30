import React, {Component} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login'

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
