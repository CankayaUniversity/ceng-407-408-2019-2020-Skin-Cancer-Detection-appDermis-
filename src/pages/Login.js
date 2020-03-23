import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import LoginForm from './LoginForm'

export default class Login extends Component {
    render() {
        return (
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

                            <LoginForm/>
                        </View>
                    </ScrollView>
                    <View style={styles.signupAlani}>
                        <Text style={styles.signupDesc}>Hesabınız yok mu?</Text>
                        <TouchableOpacity>
                            <Text style={styles.signupText}>Hesap Oluştur</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
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
        alignItems: 'center'
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
})
