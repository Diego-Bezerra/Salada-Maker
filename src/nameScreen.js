import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Storage from './storeData';

export default class NameScreen extends Component {

    state = {
        name: ''
    }

    componentDidMount() {
        this.loadName();
    }

    async loadName() {
        let name = await Storage.retrieveNameData();
        this.setState({ name: name });
    }

    async saveName(text) {
        this.setState({ name: text });
        await Storage.setNameData(text);        
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Digite seu nome'
                    style={styles.textInput}
                    onChangeText={(text) => this.saveName(text)}
                    value={this.state.name}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    textInput: {
        height: 40,
        width: '85%',
        borderColor: 'gray',
        borderBottomWidth: 1
    }
});