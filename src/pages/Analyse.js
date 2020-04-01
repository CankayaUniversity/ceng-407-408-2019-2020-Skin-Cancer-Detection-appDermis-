import React, {Component} from 'react';
import {Text, View} from "react-native";

class Camera extends Component {
    render() {
        return (
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text>Choose an album or photo to analyze!</Text>
            </View>
        );
    }
}

export default Camera;