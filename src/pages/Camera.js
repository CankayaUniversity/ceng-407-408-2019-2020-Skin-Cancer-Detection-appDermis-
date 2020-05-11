'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { savePhoto } from '../actions/photo.actions'
import { Field, reduxForm } from 'redux-form'

import {connect} from 'react-redux'
import {compose} from 'redux'
class Camera extends Component {
  	savePhoto = async (values) =>{
      if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(JSON.parse(JSON.stringify(data.base64)));
      let photo = data.base64
      const eben = { 
        img: 
      { data: data.base64, 
        contentType: "png"
      }
        }
            try {
		const response = await this.props.dispatch(savePhoto(eben))
          if (!response.success) {
              console.log("response",response)
              throw response 
          }
      } catch (error) {
          console.log("erdffddfdror",error)
    }
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
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}>
        <View style={styles.circle}></View>       
      </RNCamera>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.savePhoto.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Fotoğraf Çek! </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8bad9d',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
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
