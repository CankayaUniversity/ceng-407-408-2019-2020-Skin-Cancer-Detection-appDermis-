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
import RegisterForm from './RegisterForm'

export default class Register extends Component {
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
                                <Text style={styles.loginAreaTitle}>Kaydol</Text>
                                <Text style={styles.loginAreaDescription}>
                                    Lütfen hesabınızı oluşturun.
                                </Text>
                                <RegisterForm/>
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
        paddingVertical: 80
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
    }
})
