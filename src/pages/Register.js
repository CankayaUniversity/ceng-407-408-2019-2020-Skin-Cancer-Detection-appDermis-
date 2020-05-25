import React, { Component } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import axios from 'axios'
import RegisterButton from '../components/RegisterButton'
import AsyncStorage from '@react-native-community/async-storage'
import setAuthToken from '../utils/setAuthToken'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  onSubmit = event => {
    if (this.state.password !== this.state.password2) {
      Alert.alert(
        'Parolalar Eşleşmiyor',
        'Girdiğiniz parolalar eşleşmiyor, lütfen tekrar deneyiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => console.log('Ok Pressed')
          }
        ],
        { cancelable: true }
      )
    } else {
      event.preventDefault()
      let newUser = JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        password: this.state.password,
        email: this.state.email
      })

      try {
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios
          .post('http://192.168.1.106:3333/api/users/', newUser, config)
          .then(r => r.data)
          .then(data => {
            console.log(data)
            try {
              AsyncStorage.setItem('x-auth-token', data.token)
            } catch (err) {
              console.log(err)
            }
          })

        this.props.navigation.navigate('Login')
      } catch (err) {
        console.error(err)
      }
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={'position'}>
            <View style={styles.logo}>
              <Image source={require('../assets/logo.png')}></Image>
            </View>

            <View style={styles.loginArea}>
              <Text style={styles.loginAreaTitle}>Kaydol</Text>
              <Text style={styles.loginAreaDescription}>
                Lütfen hesabınızı oluşturun.
              </Text>
              <TextInput
                value={this.state.name}
                name='name'
                placeholder='Ad'
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                value={this.state.surname}
                name='surname'
                placeholder='Soyad'
                onChangeText={surname => this.setState({ surname })}
              />
              <TextInput
                value={this.state.email}
                name='email'
                placeholder='Email'
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                value={this.state.password}
                name='password'
                placeholder='Parola'
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                value={this.state.password2}
                name='password2'
                placeholder='Parolayı tekrar giriniz'
                secureTextEntry={true}
                onChangeText={password2 => this.setState({ password2 })}
              />
              <RegisterButton
                color={'#f1f1f1'}
                backgroundColor={'#8bad9d'}
                text={'Kaydol'}
                onPress={this.onSubmit}
              />
              <View style={styles.loginAlani}>
                <Text style={styles.loginDesc}>Zaten hesabınız var mı?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}
                >
                  <Text style={styles.loginText}>Giriş Yapın</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbdcce',
    paddingVertical: 0
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center'
  },
  text: {
    fontSize: 14
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginArea: {
    marginHorizontal: 40,
    marginVertical: 40,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 4
  },
  loginAreaTitle: {
    padding: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  loginAreaDescription: {
    fontSize: 11,
    color: '#7e868f',
    marginVertical: 10,
    textAlign: 'center'
  },
  loginAlani: {
    alignItems: 'center'
  },
  loginDesc: {
    color: '#999'
  },
  loginText: {
    color: '#666'
  },

  errorText: {
    color: '#8bad9d',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingBottom: 5
  }
})

export default Register
