import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login'
import Register from "./src/pages/Register";
import Profile from "./src/pages/Profile";
import Camera from "./src/pages/Camera";
import Results from "./src/pages/Results";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import PhotoList from "./src/pages/PhotoList";
import EditProfileForm from "./src/pages/EditProfileForm";
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const App = ({navigation}) => {
    const [isloggedin, setLogged] = useState(null)

    const detectLogin = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            setLogged(true)
        } else {
            setLogged(false)
        }
    }
    useEffect(() => {
        detectLogin()
    }, [])
    return (
        <NavigationContainer>

            <Stack.Navigator headerMode={false}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Profile" component={TabNavigator}/>
                <Stack.Screen name="PhotoList" component={PhotoList}/>
                <Stack.Screen name="EditProfileForm" component={EditProfileForm}/>
                <Stack.Screen name="Camera" component={Camera}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

}

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{tabBarColor: '#8bad9d'}} initialRouteName="Profile"
                       activeColor='#f1f1f1'
                       barStyle={{backgroundColor: '#8bad9d'}}>
            <Tab.Screen options={{
                tabBarLabel: 'Profil',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                ),
            }} name="Profile Page" component={Profile}/>
            <Tab.Screen options={{
                tabBarLabel: 'Fotoğraflar',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="folder-image" color={color} size={26}/>
                ),
            }} name="PhotoList" component={PhotoList}/>
            <Tab.Screen options={{
                tabBarLabel: 'Kamera',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="camera" color={color} size={26}/>
                ),
            }} name="Camera" component={Camera}/>
            <Tab.Screen options={{
                tabBarLabel: 'Sonuçlar',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="checkbox-marked-circle" color={color} size={26}/>
                ),
            }} name="Results" component={Results}/>
        </Tab.Navigator>
    );
}

export default App;
