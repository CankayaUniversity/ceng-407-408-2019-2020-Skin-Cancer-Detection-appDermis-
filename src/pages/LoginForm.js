import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Input from '../components/Input'
import LoginButton from '../components/LoginButton'

export default class LoginForm extends Component {
  render () {
    return (
      <View>
        <Input autoCapitalize='none' placeholder='Username or E-Mail' />

        <Input secureTextEntry={true} placeholder='Password' />

        <LoginButton
          color={'#f1f1f1'}
          backgroundColor={'#46b4a6'}
          text={'Sign In Now'}
        />
      </View>
    )
  }
}
