import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Card, CardItem, Container, Content, Header, Text} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from "../utils/setAuthToken";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            gender: '',
            birthdate: '',
            token: '',

        };
        this.setUserProfile = this.setUserProfile.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    logoutUser = () => {
        AsyncStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        this.props.navigation.navigate('Login');
    }
    setUserProfile = (profile) => {
        if (profile.data.gender === 'female')
            this.setState({gender: 'Kadın'})
        else if (profile.data.gender === 'male')
            this.setState({gender: 'Erkek'})
        else if (profile.data.gender === 'other')
            this.setState({gender: 'Diğer'})
        this.setState({birthdate: profile.data.birthdate})
    };
    setUserInfo = (user) => {
        this.setState({
            name: user.data.name,
            surname: user.data.surname,
            email: user.data.email,
        });
    }

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
            <Container>
                <Header style={styles.header}>
                    <Button onPress={() => this.props.navigation.navigate('EditProfileForm')} style={{
                        marginBottom: 145,
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                        backgroundColor: '#e3c6bd'
                    }}>
                        <MaterialCommunityIcons name="playlist-edit" size={24}/>
                        <Text>Düzenle</Text>
                    </Button>
                    <Button onPress={this.logoutUser} style={{
                        marginLeft: 10,
                        marginBottom: 145,
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                        backgroundColor: '#e3c6bd'
                    }}>
                        <MaterialCommunityIcons name="logout" size={24}/>
                        <Text>Çıkış</Text>
                    </Button>
                </Header>
                <Content style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}> Merhaba {this.state.name}</Text>
                        <Text style={styles.info}>{this.state.email} </Text>
                    </View>
                    <Card style={{alignSelf: 'center', width: 350}}>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-y-box" size={35} color='#e3c6bd'/>
                            <Text>Doğum
                                Tarihi: {this.state.birthdate}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-c-box" size={35} color='#e3c6bd'/>
                            <Text>Cinsiyet: {this.state.gender}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#8bad9d',
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 40,
        backgroundColor:'#fff6ea'
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: '#ce7c59',
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#ce9882",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: '#696969',
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
});
export default Profile;
