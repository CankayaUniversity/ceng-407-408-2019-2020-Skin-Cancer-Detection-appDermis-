import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Container, Header, Button, Content, Card, CardItem, Text, Icon, Right} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class ProfilePage extends Component {
    state = {
        photo: '',
        age: '',
        gender: '',
        skinColor: '',
        email: '',
        name: ''
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
                </Header>
                <Image style={styles.avatar} source={this.state.photo}/>
                <Content style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>Ad Buraya Gelecek{this.state.name}</Text>
                        <Text style={styles.info}>Email Buraya Gelecek{this.state.email}</Text>

                    </View>
                    <Card style={{alignSelf: 'center', width: 350}}>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-y-box" size={35} color='#e3c6bd'/>
                            <Text>Yaş: {this.state.age}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-c-box" size={35} color='#e3c6bd'/>
                            <Text>Cinsiyet: {this.state.gender}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-t-box" size={35} color='#e3c6bd'/>
                            <Text>Ten Rengi: {this.state.skinColor}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        );
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
});

