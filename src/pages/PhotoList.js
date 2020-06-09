import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Left, Right, Text} from 'native-base';
import {StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {Buffer} from 'buffer';

class PhotoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPhotos: []

        }
    }

    async componentDidMount(): void {
        const token = await AsyncStorage.getItem('x-auth-token');
        setAuthToken(token);
        await axios.get('http://192.168.1.106:3333/api/photos/')
            .then(r => this.setState({allPhotos: r.data})).catch(err => console.log(err));
    }

    isDelete = (photoID) => {
        Alert.alert(
            'Fotoğrafı silmek istediğinize emin misiniz?',
            'Sildiğiniz fotoğraf analiz işlemleri için kullanılamayacak.',
            [
                {text: 'Tamam', onPress: () => this.deletePhoto(photoID)},
                {
                    text: 'İptal',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: true},
        );
    }
    deletePhoto = (photoID) => {
        console.log(photoID)
        let deletedPhoto = JSON.stringify({
            photoId: photoID
        })
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.delete('http://192.168.1.106:3333/api/photos/delete', deletedPhoto, config).then(r => {
            Alert.alert(
                'Fotoğrafınız silindi!',
                'Değişikliklerin yansıması için tekrar giriş yapınız...',
                [
                    {text: 'Tamam', onPress: () => this.props.navigation.navigate('PhotoList')},

                ],
                {cancelable: false},
            );
        }).catch(err => console.log(err.message))
    }

    photos() {
        return (
            this.state.allPhotos.map((element, i) => (
                <Card key={i}>
                    <CardItem style={{backgroundColor: '#e3c6bd'}}>
                        <Left>
                            <MaterialCommunityIcons name="image"/>
                            <Body>
                                <Text>Lesion</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody >
                        <Image
                            source={{uri: `data:image/png;base64,${Buffer(element.img.data, 'base64').toString('ascii')}`}}
                            style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem style={{backgroundColor: '#fff6ea'}}>
                        <Left>
                            <Text>{element.photoDate}<MaterialCommunityIcons name="calendar-month"/></Text>
                        </Left>
                        <Body style={{marginLeft: 5}}>
                            <TouchableOpacity
                                onPress={() => this.isDelete(element._id)}
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 10,
                                    borderRadius: 3,
                                    alignItems: 'center'
                                }}>
                                <MaterialCommunityIcons name="trash-can"/>
                                <Text>Sil</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>

                            <Text><MaterialCommunityIcons name="map-marker"/> {element.photoLocation}</Text>
                        </Right>
                    </CardItem>
                </Card>
            ))
        );
    }

    render() {
        console.log(this.state.allPhotos);
        return (
            <Container>
                <Content>
                    <ScrollView>
                        {this.photos()}
                    </ScrollView>

                </Content>
            </Container>

        );
    }
}

export default PhotoList;
