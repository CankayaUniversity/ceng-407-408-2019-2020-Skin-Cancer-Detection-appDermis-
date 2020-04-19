import React, {Component} from 'react';
 import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, CardItem, Container, List, ListItem, Content, Header, Text} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {logoutUser} from "../actions/auth.actions";

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

class Profile extends Component<{}> {

    logoutUser = () => {
        this.props.dispatch(logoutUser());
        this.props.navigation.navigate('Login');
    }

    render() {
        const {getUser: {userDetails}} = this.props;
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
                <Image style={styles.avatar}/>
                <Content style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}> {userDetails ? userDetails.name : "İsim yok"}</Text>
                        <Text style={styles.info}> {userDetails ? userDetails.email : "E-Mail yok"}</Text>
                    </View>
                    <Card style={{alignSelf: 'center', width: 350}}>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-y-box" size={35} color='#e3c6bd'/>
                            <Text>Yaş: </Text>
                        </CardItem>
                        <CardItem bordered>
                            <MaterialCommunityIcons name="alpha-c-box" size={35} color='#e3c6bd'/>
                            <Text>Cinsiyet:</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}


mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
