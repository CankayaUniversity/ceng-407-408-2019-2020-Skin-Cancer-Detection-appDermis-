import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Left, Right, Text} from 'native-base';
import {StyleSheet, Image, ScrollView} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class PhotoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoDate: '',
            photoLocation: '',
            photoName: '',
            isModalVisible: false,
        }
    }

    // toggleModal = () => {
    //     this.setState({isModalVisible: !this.state.isModalVisible});
    // };
    render() {
        return (
            <Container>
                <Content>
                    <ScrollView>
                        <Card>
                            <CardItem style={{backgroundColor: '#e3c6bd'}}>
                                <Left>
                                    <MaterialCommunityIcons name="image"/>
                                    <Body>
                                        <Text>Lesion number #1</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/sampleLesion.jpg')}
                                       style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <MaterialCommunityIcons name="calendar-month"/>
                                    <Text>Date</Text>
                                </Left>
                                <Body>
                                    <MaterialCommunityIcons name="map-marker"/>
                                    <Text>Location of the lesion</Text>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </ScrollView>
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
export default PhotoList;
