import React, {Component} from 'react';
import {Container, Content, DatePicker, Form, Header, Input, Item, Label, Picker} from 'native-base';
import {Alert, StyleSheet, Text,AsyncStorage,AppRegistry} from 'react-native';
import {Button} from 'react-native-elements';
import {logoutUser} from "../actions/auth.actions";
import {connect} from "react-redux";

export default class EditProfileForm extends Component {
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
                {text: 'Tamam', onPress: () => this.props.navigation.goBack()},
            ],
            {cancelable: true},
        );
    }
    state = {
        name:'',
        surname:'',
        birthdate: '',
        gender: '',
        email: '',
        profilePhoto: '',
    }
    onPressSubmit = () => {
        alert("KAydetdilfiii");
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#8bad9d'}}>
                    <Button buttonStyle={{marginLeft: 325, marginTop:10, borderRadius: 10, backgroundColor: '#e3c6bd'}}
                            onPress={this.goBack} title="Geri"/>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Text style={styles.textStyle}>E-Mail</Text>
                            <Input/>
                        </Item>
                        <Item>
                            <Text style={styles.textStyle}>Ad</Text>
                            <Input/>
                        </Item>
                        <Item>
                            <Text style={styles.textStyle}>Soyad</Text>
                            <Input/>
                        </Item>
                        <Item>
                            <Text style={styles.textStyle}>Doğum Tarihi</Text>
                            <DatePicker defaultDate={new Date().getDate()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Seçiniz..."
                                        textStyle={{color: '#8bad9d'}}
                                        placeHolderTextStyle={{color: "#d3d3d3"}}
                                        onDateChange={this.setDate}
                                        disabled={false}/>
                        </Item>
                        <Item>
                            <Text style={styles.textStyle}>Cinsiyet</Text>
                            <Picker
                                mode="dropdown"
                                style={{width: undefined}}
                                selectedValue={this.state.gender}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item color="#d3d3d3" label="Seçiniz" value="key0"/>
                                <Picker.Item label="Kadın" value="key1"/>
                                <Picker.Item label="Erkek" value="key2"/>
                                <Picker.Item label="Belirtmek istemiyorum." value="key3"/>
                            </Picker>
                        </Item>

                    </Form>
                    <Button
                        buttonStyle={{
                            backgroundColor: '#e3c6bd',
                            marginTop: 10,
                            borderRadius: 10,
                            width: 150,
                            marginLeft: 245
                        }}

                        title="Kaydet"
                    />
                </Content>
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    textStyle: {
        color: '#ce7c59',
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: 'underline',
    }
})
