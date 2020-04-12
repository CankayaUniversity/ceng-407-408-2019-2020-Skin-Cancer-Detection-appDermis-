import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Button} from 'native-base';
import {Alert, Text} from 'react-native';

export default class EditProfileForm extends Component {
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
        newAge: '',
        newGender: '',
        newSkinColor: '',
        newEmail: '',
        newPhoto: '',
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#8bad9d'}}>
                    <Button style={{marginLeft: 325, borderRadius: 10, backgroundColor: '#e3c6bd'}}
                            onPress={this.goBack} light>
                        <Text> Geri</Text>
                    </Button>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>E-Mail</Label>
                            <Input value={}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
};


