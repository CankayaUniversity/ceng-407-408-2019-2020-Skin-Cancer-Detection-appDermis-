import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Input from '../components/Input'
import LoginButton from '../components/LoginButton'

export default class RegisterForm extends Component {
  render () {
    return (
      <View>
        <Input autoCapitalize='none' placeholder='Ad' />
        <Input autoCapitalize='none' placeholder='Soyad' />
        <Input autoCapitalize='none' placeholder='Mail' />
        <Input secureTextEntry={true} placeholder='Şifre' />
        <LoginButton
          color={'#f1f1f1'}
          backgroundColor={'#8bad9d'}
          text={'Kaydol'}
        />
      </View>
    )
  }
}
