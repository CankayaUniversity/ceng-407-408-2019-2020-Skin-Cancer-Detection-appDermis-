import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../src/pages/Login';
import React, {Component} from "react";
import Register from "../src/pages/Register";
import ProfilePage from "../src/pages/ProfilePage";
import Camera from "../src/pages/Camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Profile" component={TabNavigator}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Profile"
                       activeColor="#fbdcce"
                       style={{backgroundColor: "#ce7c59"}}>
            <Tab.Screen options={{
                tabBarLabel: 'ProfilePage',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                ),
            }} name="ProfilePage" component={ProfilePage}/>
            <Tab.Screen options={{
                tabBarLabel: 'Camera',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                ),
            }} name="Camera" component={Camera}/>
        </Tab.Navigator>
    );
}
