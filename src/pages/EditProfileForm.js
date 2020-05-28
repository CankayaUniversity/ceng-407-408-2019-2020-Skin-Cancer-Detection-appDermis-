import React, {Component} from 'react';
import {Container, Content, DatePicker, Header} from 'native-base';
import {Alert, ScrollView, StyleSheet, Text, TextInput, Picker, View, Image} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

class EditProfileForm extends Component {


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

    setDate(newDate) {
        this.setState({birthdate: newDate.toString().substr(4, 12)});
    }

    updateUser = () => {
        let updatedProfile = JSON.stringify({
            gender: this.state.gender ? this.state.gender : this.state.initialGender,
            birthdate: this.state.birthdate ? this.state.birthdate : this.state.initialBirthdate,
        });
        let updatedUser = JSON.stringify({
            name: this.state.name ? this.state.name : this.state.initialName,
            surname: this.state.surname ? this.state.surname : this.state.initialSurname,
            email: this.state.email ? this.state.email : this.state.initialEmail,
        });
        try {
            if (!this.state.initialGender | !this.state.initialBirthdate) {
                Alert.alert(
                    'Hata',
                    'Lütfen cinsiyet ve doğum tarihi bilgilerinizi eksiksiz giriniz...',
                    [
                        {
                            text: 'Tamam',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    {cancelable: true},
                );
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            AsyncStorage.getItem('x-auth-token').then(r => setAuthToken(r));
            const res = axios.post('http://192.168.1.106:3333/api/profile/', updatedProfile, config);
            console.log(res);
            const res2 = axios.post('http://192.168.1.106:3333/api/users/update', updatedUser, config);
            console.log(res2);
            Alert.alert(
                'Bilgileriniz güncellendi!',
                'Profil bilgileriniz güncellendi. Profil sayfasına yönlendiriliyorsunuz...',
                [
                    {text: 'Tamam', onPress: () => this.props.navigation.navigate('Profile')},

                ],
                {cancelable: false},
            );
        } catch (err) {
            console.log(err);
        }

    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            birthdate: '',
            gender: '',
            initialName: '',
            initialSurname: '',
            initialEmail: '',
            initialBirthdate: '',
            initialGender: '',
            token: ''
        }

        this.setUserProfile = this.setUserProfile.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.setDate = this.setDate.bind(this);

    }

    setUserProfile = (profile) => {
        console.log(profile.data);
        this.setState({
            initialGender: profile.data.gender,
            initialBirthdate: profile.data.birthdate,
        });

    };
    setUserInfo = (user) => {
        this.setState({
            initialName: user.data.name,
            initialSurname: user.data.surname,
            initialEmail: user.data.email,
        });

    };

    async componentWillMount(): void {
        const token = await AsyncStorage.getItem('x-auth-token');
        setAuthToken(token);
        await axios.get('http://192.168.1.106:3333/api/auth/')
            .then(r => this.setUserInfo(r)).catch(err => console.log(err));
        await axios.get('http://192.168.1.106:3333/api/profile/me/')
            .then(r => this.setUserProfile(r)).catch(err => console.log(err));
        this.setState({ token });
    }
    render() {
        return (
            <ScrollView>
                <Container>
                    <Header style={{backgroundColor: '#8bad9d'}}>
                        <Button
                            buttonStyle={{marginLeft: 325, marginTop: 10, borderRadius: 10, backgroundColor: '#e3c6bd'}}
                            onPress={this.goBack} title="Geri"/>
                    </Header>
                    <Content>
                        <View style={styles.loginArea}>
                            <Text style={styles.textStyle}>E-Mail: </Text>
                            <TextInput placeholder={this.state.initialEmail} onChangeText={text => {
                                this.setState({email: text})
                            }}/>
                            <Text style={styles.textStyle}>Ad: </Text>
                            <TextInput placeholder={this.state.initialName} onChangeText={text => {
                                this.setState({name: text})
                            }}/>
                            <Text style={styles.textStyle}>Soyad: </Text>
                            <TextInput placeholder={this.state.initialSurname} onChangeText={text => {
                                this.setState({surname: text})
                            }}/>
                            <Text style={styles.textStyle}>Cinsiyet: </Text>
                            <Picker
                                selectedValue={this.state.initialGender}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }>
                                <Picker.Item label="Kadın" value="female"/>
                                <Picker.Item label="Erkek" value="male"/>
                                <Picker.Item label="Diğer" value="other"/>
                            </Picker>
                            <Text style={styles.textStyle}>Doğum Tarihi: </Text>
                            <DatePicker
                                defaultDate={this.state.initialBirthdate}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Doğum tarihinizi seçiniz..."
                                textStyle={{color: "green"}}
                                placeHolderTextStyle={{color: "#d3d3d3"}}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                            <Button
                                buttonStyle={{
                                    backgroundColor: '#e3c6bd',
                                    marginTop: 10,
                                    borderRadius: 10,
                                    width: 150,
                                    marginLeft: 160
                                }}
                                onPress={this.updateUser}
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
        padding: 20,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: '#fff6ea',
        borderRadius: 20,
        elevation: 4,
    },
})


export default EditProfileForm;
