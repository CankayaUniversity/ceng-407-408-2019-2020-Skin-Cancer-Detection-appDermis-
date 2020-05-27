'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Dimensions,TouchableHighlight} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { savePhoto } from '../actions/photo.actions'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import {compose} from 'redux'
class Camera extends Component {
  	savePhoto = async () =>{
      if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //console.log(JSON.parse(JSON.stringify(data.base64)));
       let gonderilcekData = {
          photo: data.base64
       }
      const eben = { 
        img: 
        { data: data.base64, 
          contentType: "png"
        }
        }
        console.log(data)
        this.send(gonderilcekData)
           /*try {
		        const response = await this.props.dispatch(savePhoto(eben))
          if (!response.success) {
              console.log("response",response)
              throw response 
          }
      } catch (error) {
          console.log("erdffddfdror",error)
    }*/
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
      style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderColor:'#fbdcce',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    </View>
      </RNCamera>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.savePhoto.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }} onPress={() => alert("Lütfen Bekleyiniz")}> Fotoğraf Çek! </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

mapStateToProps = (state) => ({
    savePhoto: state.photoReducer.savePhoto
})
mapDispatchToProps = (dispatch) => ({
	dispatch
})
export default compose(
	connect(mapStateToProps,mapDispatchToProps)
)(Camera)
