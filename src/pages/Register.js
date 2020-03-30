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
            <View style={styles.container}>
                <KeyboardAvoidingView behavior={'position'}>
                    <ScrollView>
                        <View style={styles.loginArea}>
                            <Text style={styles.loginAreaTitle}> Kaydol </Text>
                            <RegisterForm/>
                        </View>
                    </ScrollView>
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
})
