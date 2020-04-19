import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Field, reduxForm} from 'redux-form';
import {loginUser} from "../actions/auth.actions";
import Loader from "../components/Loader";
import Input from "../components/Input";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import RegisterButton from '../components/RegisterButton'

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
})


class Login extends Component<{}> {


    loginUser = async (values) => {
        try {
            const response = await this.props.dispatch(loginUser(values));
            console.log(response);
            if (!response.success) {
                throw response;
            }
            this.props.navigation.navigate('Profile');
        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody;
            Alert.alert(
                'Login Error!',
                errorText,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    onSubmit = (values) => {
        this.loginUser(values);
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
        );
    }

    render() {
        const {handleSubmit, loginUser} = this.props;
        console.log(loginUser);
        return (
            <ScrollView>
                <View style={styles.container}>
                    {(loginUser && loginUser.isLoading) && <Loader/>}
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
                                <Field
                                    name="email"
                                    placeholder="Email"
                                    component={this.renderTextInput}/>
                                <Field
                                    name="password"
                                    placeholder="Parola"
                                    secureTextEntry={true}
                                    component={this.renderTextInput}/>
                                <RegisterButton
                                    color={'#f1f1f1'}
                                    backgroundColor={'#8bad9d'}
                                    text={'Giriş Yap'}
                                    onPress={handleSubmit(this.onSubmit)}
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

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Lütfen geçerli email adresi giriniz!"
    }
    if (!values.password) {
        errors.password = "Parola kısmı boş bırakılamaz!"
    }
    return errors;
};

mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "login",
        validate
    })
)(Login);
