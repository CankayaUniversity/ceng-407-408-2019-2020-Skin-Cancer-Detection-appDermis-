import React, {Component} from 'react';
import {Container, Content, DatePicker, Form, Header, Input, Item, Picker} from 'native-base';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {updateUser} from "../actions/auth.actions";
import {connect} from "react-redux";
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import Loader from "../components/Loader"
import {fetchApi} from "../service/api";

class EditProfileForm extends Component {
    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
    }

    goBack = () => {
        Alert.alert(
            'Uyarı',
            'Bilgilerinizi kaydetmeden çıkmak istiyor musunuz?',
            [
                {text: 'Çık', onPress: () => this.props.navigation.goBack()},
                {
                    text: 'İptal',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: true},
        );
    }
    updateUser = async (values) => {
        try {
            const response = await this.props.dispatch(updateUser(values))
            if (!response.success) {
                throw response
            }
            this.props.navigation.navigate('EditProfileForm')
        } catch (error) {
            let errorText
            errorText = "Lütfen değişiklikleri kontrol ediniz."
            Alert.alert(
                'Düzenleme başarısız!',
                errorText,
                [
                    {
                        text: 'Tamam',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            )
        }
    }
    onSubmit = (values) => {
        this.updateUser(values)
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, maxLength,secureTextEntry, keyboardType, placeholder, input: {onChange, ...restInput}} = field
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
                {(touched && error) && <Text>{error}</Text>}
            </View>
        )
    }

    constructor(props) {
        super(props);
        console.log(this);
        const {getUser: {userDetails}} = this.props;
        this.state = {
            name: userDetails.name,
            surname: userDetails.surname,
            email: userDetails.email,
            birthdate: userDetails.birthdate,
            gender: userDetails.gender,
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <ScrollView>
                <Container>
                    {updateUser.isLoading && <Loader/>}
                    <Header style={{backgroundColor: '#8bad9d'}}>
                        <Button
                            buttonStyle={{marginLeft: 325, marginTop: 10, borderRadius: 10, backgroundColor: '#e3c6bd'}}
                            onPress={this.goBack} title="Geri"/>
                    </Header>
                    <Content>
                        <View style={styles.loginArea}>
                            <Text
                                style={styles.textStyle}>E-Mail: </Text>
                            <Field name="email" component={this.renderTextInput}
                                   placeholder="Lütfen E-Mail adresinizi girin..."/>
                            <Text style={styles.textStyle}>Ad: </Text>
                            <Field component={this.renderTextInput} name="name"
                                   placeholder="Lütfen adınızı girin..."/>
                            <Text style={styles.textStyle}>Soyad: </Text>
                            <Field component={this.renderTextInput} name="surname"
                                   placeholder="Lütfen soyadınızı girin..."/>
                            <Text style={styles.textStyle}>Soyad: </Text>
                            <Field component={this.renderTextInput} name="password"
                                   placeholder="Lütfen şifrenizi girin..."/>
                            <Button
                                buttonStyle={{
                                    backgroundColor: '#e3c6bd',
                                    marginTop: 10,
                                    borderRadius: 10,
                                    width: 150,
                                    marginLeft: 160
                                }}
                                onPress={handleSubmit(this.onSubmit)}
                                title="Kaydet"
                            />
                        </View>

                    </Content>
                </Container>
            </ScrollView>

        );
    }
};

const styles = StyleSheet.create({
    textStyle: {
        color: '#ce7c59',
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: 'underline',
    }, loginArea: {
        padding:20,
        flex:1,
        marginHorizontal:20,
        marginVertical:20,
        backgroundColor: '#fff6ea',
        borderRadius: 20,
        elevation: 4
    },
})

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "editprofileform",

    })
)(EditProfileForm)
