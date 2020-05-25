import React, {Component} from 'react'
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import RegisterButton from '../components/RegisterButton'
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from "../utils/setAuthToken";

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    onSubmit = event => {
        event.preventDefault();
        let loginUser = JSON.stringify({
            email: this.state.email,
            password: this.state.password
        });
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post('http://192.168.1.106:3333/api/auth/', loginUser, config).then(r => r.data).then(data => {
                try {
                    AsyncStorage.getItem('x-auth-token').then(r => setAuthToken(r));
                   // AsyncStorage.setItem('x-auth-token', data.token);
                    this.props.navigation.navigate('Profile');
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior={'position'}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/logo.png')}></Image>
                        </View>
                        <ScrollView>
                            <View style={styles.loginArea}>
                                <Text style={styles.loginAreaTitle}>Giriş</Text>
                                <Text style={styles.loginAreaDescription}>
                                    Kullanıcı adı veya E-Mail adresinizle giriş yapınız.
                                </Text>
                                <TextInput
                                    name="email"
                                    value={this.state.email}
                                    placeholder="Email"
                                    onChangeText={email => this.setState({email})}
                                />
                                <TextInput
                                    name="password"
                                    value={this.state.password}
                                    placeholder="Parola"
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry={true}
                                />
                                <RegisterButton
                                    color={'#f1f1f1'}
                                    backgroundColor={'#8bad9d'}
                                    text={'Giriş Yap'}
                                    onPress={this.onSubmit}
                                />
                            </View>
                        </ScrollView>
                        <View style={styles.signupAlani}>
                            <Text style={styles.signupDesc}>Hesabınız yok mu?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={styles.signupText}>Hesap Oluştur</Text>
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
        paddingVertical: 80
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoDescription: {
        textAlign: 'center',
        color: '#f2f2f2'
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
        fontSize: 20,
        textAlign: 'center'
    },
    loginAreaDescription: {
        fontSize: 11,
        color: '#7e868f',
        marginVertical: 10,
        textAlign: 'center'
    },
    signupAlani: {
        alignItems: 'center'
    },
    signupDesc: {
        color: '#999'
    },
    signupText: {
        color: '#666'
    }
});
export default Login;
