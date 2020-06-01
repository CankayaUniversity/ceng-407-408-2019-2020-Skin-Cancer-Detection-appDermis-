'use strict';
import React, {Component} from 'react';
import {Button, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Dialog} from 'react-native-simple-dialogs';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import setAuthToken from "../utils/setAuthToken";

class Camera extends Component {
    savePhoto = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            this.setState({
                photo: data.base64,
                photoDate: new Date().getDate(),
                dialogVisible: true,
            });
            let gonderilcekData = {
                photo: data.base64
            }
            this.send(gonderilcekData);
        }
    }
    state = {
        photoLocation: '',
        dialogVisible: false,
        photo: '',
        photoDate: '',
    }
    sendDb = () => {
        console.log(this.state.photo)
        try {
            this.setState({dialogVisible: false})
            let kaydedilcek = {
                img: {
                    data: this.state.photo,
                    contentType: 'png'
                },
                photoDate: this.state.photoDate,
                photoLocation: this.state.photoLocation,
            }
            let photoData = JSON.stringify({kaydedilcek});
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            }
            axios.post('http://192.168.0.20:3333/api/photos/save', photoData, config)
                .then(r => r.json())
                .then((responseJson) => console.log('getting data from post', responseJson))
                .catch(err => console.log(err));

        } catch (err) {
            console.log(err.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    <View
                        style={{
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            width: Dimensions.get('window').width * 0.5,
                            height: Dimensions.get('window').width * 0.5,
                            borderColor: '#fbdcce',
                            borderWidth: 3,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                    </View>
                </RNCamera>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.savePhoto.bind(this)} style={styles.capture}>
                        <Text style={{fontSize: 14}}> Fotoğraf Çek! </Text>
                    </TouchableOpacity>
                    <Modal visible={this.state.dialogVisible}>
                        <Text>Fotoğrafınızın lokasyonunu giriniz.</Text>
                        <TextInput onChangeText={(photoLocation) => this.setState({photoLocation})}/>
                        <Button title="Kaydet" onPress={this.sendDb}/>

                    </Modal>
                </View>
            </View>
        );
    }

    async componentDidMount(): void {
        const token = await AsyncStorage.getItem('x-auth-token');
        setAuthToken(token);
    }

    send = async (gonderilcekData) => {
        const body = JSON.stringify(gonderilcekData)
        await fetch("http://192.168.0.20:3333/sendPhoto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gonderilcekData),
        }).then(response => response.json()).then((responseJson) => {
            console.log('getting data from fetch', responseJson)
        }).catch(error =>
            console.log(error))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#8bad9d',
    },
    dialog: {
        backgroundColor: '#e3c6bd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    circle: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderRadius: 50,
        borderColor: '#fbdcce'
    }
});
export default Camera;
