import React, { Component } from 'react';
import { StatusBar, Alert, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Button, Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import saladData from './data';
import MyListItem from './myListItem';

const bigIndex = 0;
const smallIndex = 1;
const values = Object.values(saladData);
const stepLabels = values.map((item) => { return item.description });

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: 'white',
    labelSize: 0,
    currentStepLabelColor: 'white'
}

export default class Main extends Component {

    state = {
        listData: saladData.size.list,
        currentPosition: 0,
        selected: {},
        nextText: 'Próximo',
        total: 0
    }

    getListData(currentPosition) {
        let data = this.getDataByPosition(currentPosition);
        return data ? this.getDataByPosition(currentPosition).list : null;
    }

    getResult() {
        if (this.state.currentPosition !== 8) {
            return <FlatList
                data={this.state.listData}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem.bind(this)}
            />
        } else {

            let selected = Object.values(this.state.selected);
            selected.map((step) => {
                let vals = Object.keys(step);
                let items = vals.filter((item) => { return item === true ? item : null; });
                alert(JSON.stringify(items));
            });

            return <Text style={{ flex: 1 }}>Anaguas</Text>
        }

    }

    getDataByPosition(currentPosition) {
        switch (currentPosition) {
            case saladData.size.step:
                return saladData.size;
            case saladData.ingredients.step:
                return saladData.ingredients;
            case saladData.sauce.step:
                return saladData.sauce;
            case saladData.grain.step:
                return saladData.grain;
            case saladData.protein.step:
                return saladData.protein;
            case saladData.seeds.step:
                return saladData.seeds;
            case saladData.greenSmell.step:
                return saladData.greenSmell;
            case saladData.additional.step:
                return saladData.additional;

            default:
                return null;
                break;
        }
    }

    selectedSizeByPosition(currentPos) {
        let selected = this.state.selected;
        return Object.values(selected[currentPos]).filter((item) => { return item == true }).length;
    }

    getAmountText() {
        let data = this.getDataByPosition(this.state.currentPosition);
        return data ? 'Escolha no máximo: ' + data.amount : '';
    }

    getTitleComponent() {
        let title = stepLabels[this.state.currentPosition];
        if (!title) {
            title = 'Confira o Pedido';
            return <View><Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{title}</Text></View>
        }

        let amount = this.getAmountText();
        return <View><Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{title}</Text>
            <Text style={{ color: 'gray', fontSize: 13, }}>{amount}</Text></View>
    }

    keyExtractor = (item, index) => index.toString();

    renderItem({ item, index }) {

        return (
            <MyListItem />
        );
        
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'space-between' }}>
                <StatusBar backgroundColor="#841584" barStyle="light-content" />
                <View style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                    <StepIndicator
                        stepCount={8}
                        customStyles={customStyles}
                        currentPosition={this.state.currentPosition}
                        labels={stepLabels}
                    />
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 8, borderBottomColor: '#fe7013', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {this.getTitleComponent()}
                    <Text style={{ fontSize: 18, color: 'black' }}>{'Total: R$: ' + this.state.total.toFixed(2)}</Text>
                </View>
                {this.getResult()}
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderTopColor: '#fe7013', borderTopWidth: 1, alignItems: 'center', }}>
                    <View style={{ flex: 1, marginRight: 10, justifyContent: 'center', aligItems: 'center', }}>
                        <Button
                            onPress={() => { this.onPageChange(this.state.currentPosition - 1) }}
                            title="Anterior"
                            color="#841584"
                            accessibilityLabel="Anterior"
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', aligItems: 'center', }}>
                        <Button
                            onPress={() => { this.onPageChange(this.state.currentPosition + 1) }}
                            title={this.state.nextText}
                            color="#841584"
                            accessibilityLabel="Próximo"
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    onPageChange(position) {
        let nextButtonText = 'Próximo';
        if (position < 0 || position > stepLabels.length + 1) {
            return;
        }
        if (position == stepLabels.length) {
            nextButtonText = 'Finalizar';
        }
        if (position == stepLabels.length + 1) {
            this.finalize();
            return;
        }
        this.setState({ nextText: nextButtonText, currentPosition: position, listData: this.getListData(position) });
    }

    finalize() {
        Alert.alert(
            'Finalizar',
            'Enviar seu pedido?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    createSaladText() {

    }
}