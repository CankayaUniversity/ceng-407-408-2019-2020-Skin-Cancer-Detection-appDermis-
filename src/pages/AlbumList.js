import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    DatePicker,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Thumbnail,
    View
} from 'native-base';
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from 'react-native-modal';
import Album from "../components/Albums";
import {v4 as uuidv4} from 'uuid';

export default class AlbumList extends Component {
    state = {
        newAlbumName: '',
        newAlbumDescription: '',
        albumDate: '',
        isModalVisible: false,
    }

    generateKey = () => {
        return uuidv4();
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
        return (
            <Container>
                <Content>
                    <List>

                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square
                                           source={{uri: 'https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800'}}/>
                            </Left>
                            <Body>
                                <Text>Albüm 1</Text>
                                <Text note numberOfLines={1}>Benin konumu</Text>
                                <Text note numberOfLines={1}>Tarih</Text>

                            </Body>
                            <Right>
                                <Button onPress={() => this.props.navigation.navigate('Albums')}
                                        style={{backgroundColor: '#8bad9d'}}>
                                    <Text>Görüntüle</Text>
                                </Button>
                            </Right>
                        </ListItem>

                    </List>
                    <Button onPress={this.toggleModal}
                            style={{marginLeft: 230, marginTop: 20, backgroundColor: '#8bad9d', width: 160}} rounded>
                        <Text>New Album</Text>
                        <MaterialCommunityIcons size={20} name="plus-circle"/>
                    </Button>
                    <Modal coverScreen={false} customBackdrop={<View style={{flex: 1}}/>}
                           visible={this.state.isModalVisible}
                           animationType={"slide"} transparent={false}>
                        <TouchableOpacity onPress={this.toggleModal} style={{marginRight: 60}}>
                            <MaterialCommunityIcons name="close-circle" size={40}
                                                    color={'#8bad9d'}></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <Text style={styles.loginAreaDescription}>Lütfen albüm adını ve açıklamasını giriniz.</Text>
                        <TextInput value={this.state.newAlbumName}
                                   onChangeText={(text) => this.setState({newAlbumName: text})} style={styles.input}
                                   placeholder="Albüm adı..."/>
                        <TextInput value={this.state.newAlbumDescription}
                                   onChangeText={(text) => this.setState({newAlbumDesc: text})}
                                   style={styles.input} placeholder="Lokasyon bilgisi..."/>
                        <DatePicker
                            defaultDate={new Date().getDate()}
                            locale={"en"}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={styles.input}
                            placeHolderTextStyle={styles.input}
                            onDateChange={(text) => this.setState({albumDate: text})}
                            disabled={false}
                        />
                        <Button style={{alignItems: 'center', backgroundColor: '#8bad9d'}}
                                onPress={() => {
                                    if (this.state.newAlbumName.length == 0 || this.state.newAlbumDescription.length == 0 || this.state.albumDate.length == 0) {
                                        alert("Lütfen bilgileri tam doldurunuz!");
                                    }
                                    const newAlbum = {
                                        key: this.generateKey(),
                                        name: this.state.newAlbumName,
                                        imageUrl: '',
                                        description: this.state.newAlbumDescription,
                                        date: this.state.albumDate
                                    }

                                    //Burada datayı veri tabanına kaydedecek
                                    //Sonra listeyi refreshleyecek
                                    this.toggleModal();
                                }}>
                            <Text>Kaydet</Text>
                        </Button>
                    </Modal>
                </Content>

            </Container>

        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#f1f1f1',
        color: '#999',
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600'
    },
    loginAreaDescription: {
        fontSize: 11,
        color: '#7e868f',
        marginVertical: 10,
        textAlign: 'center'
    },
})
