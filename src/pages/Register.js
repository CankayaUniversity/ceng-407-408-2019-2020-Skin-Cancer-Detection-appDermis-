import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
	Button,
	TouchableOpacity,
    Alert
} from 'react-native'
import { Field, reduxForm } from 'redux-form'

import {connect} from 'react-redux'
import {compose} from 'redux'

import RegisterForm from './RegisterForm'
import Input from '../components/Input'
import RegisterButton from '../components/RegisterButton'
import Loader from "../components/Loader"
import {createNewUser} from "../actions/auth.actions"

class Register extends Component {
	createNewUser = async (values) =>{
        try {
		const response = await this.props.dispatch(createNewUser(values))
          if (!response.success) {
              Alert.alert(
                'Hata!',
                "Lütfen tekrar deneyiniz.",
                [
                    {
                        text: 'Tamam',
                        style: 'cancel',
                    },
                ]
            )
              throw response 
          }
          else{
               Alert.alert(
                'Kayıt Başarılı!',
                'Kaydınız başarıyla oluşturuldu.',
                [
                    {
                        text: 'Tamam',
                        onPress: () => this.props.navigation.navigate('Login'),
                        style: 'cancel',
                    },
                ]
            ) 
          }
      } catch (error) {
          console.log(error)
    }
    }
	onSubmit = (values) =>{
		this.createNewUser(values)
	}
    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field 
        return (
            <View>
              <Input
                  onChangeText={onChange}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  label={label}
                  {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        ) 
  }
    render() {
			const { handleSubmit, createUser} = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    {createUser.isLoading && <Loader/> }
                    <KeyboardAvoidingView behavior={'position'}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/logo.png')}></Image>
                        </View>
                        <ScrollView>
                            <View style={styles.loginArea}>
                                <Text style={styles.loginAreaTitle}>Kaydol</Text>
                                <Text style={styles.loginAreaDescription}>
                                    Lütfen hesabınızı oluşturun.
                                </Text>
                               <Field
                                    name="name"
                                    placeholder="Ad"
                                    component={this.renderTextInput} />
																<Field
                                    name="surname"
                                    placeholder="Soyad"
                                    component={this.renderTextInput} />																		
                                <Field
                                    name="email"
                                    placeholder="Email"
                                    component={this.renderTextInput} />
                                <Field
            												name="password"
            												placeholder="Parola"
            												secureTextEntry={true}
            												component={this.renderTextInput} />
														
																<RegisterButton
          												color={'#f1f1f1'}
          												backgroundColor={'#8bad9d'}
          												text={'Kaydol'}
																	onPress={ handleSubmit(this.onSubmit) }
        												/>
                            </View>
														
                        </ScrollView>
                        <View style={styles.loginAlani}>
                            <Text style={styles.loginDesc}>Zaten hesabınız var mı?</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Giriş Yapın</Text>
                            </TouchableOpacity>
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
        alignItems: 'center',
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
		errorText:{
			color:'#8bad9d',
			fontSize: 14,
			paddingHorizontal:10,
			paddingBottom: 5,
		}
})

const validate = (values) => {
    const errors = {} 
    if(!values.name) {
        errors.name = "Ad kısmı boş bırakılamaz!"
    }
		if(!values.surname) {
        errors.surname = "Soyad kısmı boş bırakılamaz!"
    }
    if(!values.email) {
        errors.email = "Lütfen geçerli email adresi giriniz!"
    }
    if(!values.password) {
        errors.password = "Parola kısmı boş bırakılamaz!"
    }
    return errors 
} 

mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})
mapDispatchToProps = (dispatch) => ({
	dispatch
})
export default compose(
	connect(mapStateToProps,mapDispatchToProps),
	reduxForm({
  form: 'register',
	validate
})
)(Register)

