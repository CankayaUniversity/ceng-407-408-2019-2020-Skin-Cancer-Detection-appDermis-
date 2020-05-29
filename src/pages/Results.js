import React, {Component} from 'react';
import {View,StyleSheet} from "react-native";
import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
class Results extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Separator bordered style={styles.separator}>
                        <Text>LESION ID</Text>
                    </Separator>
                    <ListItem>
                        <Text>Analyzed at : 05/05/2020</Text>
                        <Text> Risk Status : NO RISK </Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Analyzed at : 10/05/2020</Text>
                        <Text> Risk Status : RISKY </Text>
                    </ListItem>
                    <Separator bordered style={styles.separator}>
                        <Text>LESION ID2</Text>
                    </Separator>
                    <ListItem>
                        <Text>Analyzed at : 13/08/2019</Text>
                        <Text> Risk Status : NO RISK </Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Analyzed at : 28/01/2020</Text>
                        <Text> Risk Status : NO RISK </Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
const styles=StyleSheet.create({
    separator:{
        backgroundColor:'#e3c6bd'
    }
})
export default Results;
