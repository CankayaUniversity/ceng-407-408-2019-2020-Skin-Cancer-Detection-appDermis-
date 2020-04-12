import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../src/pages/Login';
import React, {Component} from "react";
import Register from "../src/pages/Register";
import ProfilePage from "../src/pages/ProfilePage";
import Camera from "../src/pages/Camera";
import Analyze from "../src/pages/Analyze";
import Results from "../src/pages/Results";
import Albums from "../src/components/Albums";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import AlbumList from "../src/pages/AlbumList";
import EditProfileForm from "../src/pages/EditProfileForm";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={false}  initialRouteName="Profile">
                    <Stack.Screen  name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Profile" component={TabNavigator}/>
                    <Stack.Screen name="AlbumList" component={AlbumList}/>
                    <Stack.Screen name="Albums" component={Albums}/>
                    <Stack.Screen  name="EditProfileForm" component={EditProfileForm}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{tabBarColor:'#8bad9d'}} initialRouteName="Profile"
                       activeColor='#f1f1f1'
                       barStyle={{ backgroundColor: '#8bad9d' }}>
            <Tab.Screen options={{
                tabBarLabel: 'Profil',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                ),
            }} name="Profile Page" component={ProfilePage}/>
            <Tab.Screen options={{
                tabBarLabel: 'Albümler',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="folder-image" color={color} size={26}/>
                ),
            }} name="Albums" component={AlbumList}/>
            <Tab.Screen options={{
                tabBarLabel: 'Kamera',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                ),
            }} name="Camera"   component={Camera}/>
            <Tab.Screen options={{
                tabBarLabel: 'Sonuçlar',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="checkbox-marked-circle" color={color} size={26}/>
                ),
            }} name="Results" component={Results}/>
            <Tab.Screen options={{
                tabBarLabel: 'Analiz',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="image-search" color={color} size={26}/>
                ),
            }} name="Analyze" component={Analyze}/>

        </Tab.Navigator>
    );
}
