import React, { Component } from 'react';
import { StatusBar, Alert, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Button, Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import SaladData, { StepEnum, PortionEnum } from './data';
import MyListItem from './myListItem';
import Colors from './resources/colors';
import Toast from 'react-native-simple-toast';

const stepLabels = SaladData.map((item) => { return item.description });

export default class Main extends Component {

    state = {
        listData: SaladData[StepEnum.SIZE].list,
        currentPosition: StepEnum.SIZE,
        selected: [],
        nextText: 'Próximo',
        total: 0
    }

    getResult() {
        if (this.state.currentPosition !== SaladData.length) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.listData}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
            )
        } else {
            return <Text style={{ flex: 1 }}>Anaguas</Text>
        }

    }

    getAmountText() {
        let currentPosition = this.state.currentPosition;
        return 'Escolha no máximo: ' + SaladData[currentPosition].amount;
    }

    getTitleComponent() {
        let currentPosition = this.state.currentPosition;
        let title = SaladData[this.state.currentPosition].description;
        if (currentPosition !== SaladData.length) {
            let amount = this.getAmountText();
            return (
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.subTitleText}>{amount}</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            )
        }
    }

    getTotalText() {
        return 'Total: R$: ' + this.state.total.toFixed(2);
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

    keyExtractor = (item, index) => item.id.toString();

    onItemPress(item, index) {

        let id = item.id;
        let price = this.getPrice(item, index);
        let total = price ? this.state.total + price : this.state.total;
        let currentPosition = this.state.currentPosition;
        let selected = this.state.selected;
        let selectedStep = selected[currentPosition];
        let dataStep = SaladData[currentPosition];

        if (!selectedStep) {
            selectedStep = Object.assign({}, dataStep, { list: {} });
        }
        if (selectedStep.list[id]) {
            delete selectedStep.list[id]; //remove
        } else {

            if (selected !== undefined &&
                selected[currentPosition] !== undefined &&
                Object.values(selected[currentPosition].list).length === SaladData[currentPosition].amount) {
                
                Toast.show('Desculpa! Você já escolheu a quantidade máxima.');
                return;
            }
            if (currentPosition === StepEnum.SIZE) {
                this.selectedPortion = dataStep.list[index];
            }

            selectedStep.list[id] = dataStep.list[index]; //add
        }

        selected[currentPosition] = selectedStep;
        this.setState({ selected: selected, total: total });
    }

    getSubTitle(item, currentPosition) {
        switch (currentPosition) {
            case StepEnum.PROTEIN:
                if (this.selectedPortion.id === PortionEnum.SMALL) {
                    return item.subTitle + item.priceSmall;
                } else {
                    return item.subTitle + item.priceBig;
                }
            default:
                return item.subTitle;
        }
    }

    getPrice(item, currentPosition) {
        switch (currentPosition) {
            case StepEnum.PROTEIN:
                if (this.selectedPortion.id === PortionEnum.SMALL) {
                    return item.priceSmall;
                } else {
                    return item.priceBig;
                }
            default:
                return item.price;
        }
    }

    renderItem({ item, index }) {

        let selected = this.state.selected;
        let currentPosition = this.state.currentPosition;
        let subTitle = this.getSubTitle(item, currentPosition);
        let isSelected = selected[currentPosition] !== undefined &&
            selected[currentPosition].list !== undefined &&
            selected[currentPosition].list[item.id] !== undefined;

        return (
            <MyListItem
                index={index}
                selected={isSelected}
                item={item}
                title={item.title}
                subTitle={subTitle}
                onPressItem={(item, index) => { this.onItemPress(item, index) }}
            />
        );

    }

    validateBeforeGo(position) {

        let currentPosition = this.state.currentPosition;
        if (position < currentPosition) {
            return true;
        }
        if (position < 0 || position > SaladData.length) {
            return false;
        }

        let selected = this.state.selected;
        let step = SaladData[currentPosition];

        let validate = step.validate;
        if (validate) {

            let validate2 = selected === undefined ||
                selected[currentPosition] === undefined ||
                selected[currentPosition].list === undefined;
            let listSize = Object.values(selected[currentPosition].list).length;
            validate2 = validate && listSize === 0;

            if (validate2) {                
                Toast.show('Escolha pelo menos um item nesse passo :)');
                return false;
            }
        }

        return true;
    }

    onPageChange(position) {
        if (!this.validateBeforeGo(position)) {
            return;
        }
        let nextButtonText = 'Próximo';
        if (position === SaladData.length) {
            nextButtonText = 'Finalizar';
            //this.finalize();
        }
        this.setState({ nextText: nextButtonText, currentPosition: position, listData: SaladData[position].list });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <StatusBar backgroundColor={Colors.ColorPrimaryDark} barStyle="light-content" />
                <View style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                    <StepIndicator
                        stepCount={SaladData.length}
                        customStyles={customStyles}
                        currentPosition={this.state.currentPosition}
                        labels={stepLabels}
                    />
                </View>
                <View style={styles.titleContainer}>
                    {this.getTitleComponent()}
                    <Text style={styles.totalText}>{this.getTotalText()}</Text>
                </View>
                {this.getResult()}
                <View style={styles.buttonsContainer}>
                    <View style={styles.navButtons}>
                        <Button
                            onPress={() => { this.onPageChange(this.state.currentPosition - 1) }}
                            title="Anterior"
                            color="#841584"
                            accessibilityLabel="Anterior"
                        />
                    </View>
                    <View style={styles.navButtons}>
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
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.ColorPrimary,
        flex: 1,
        justifyContent: 'space-between'
    },
    titleContainer: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomColor: Colors.ColorAccent,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalText: {
        fontSize: 18,
        color: Colors.Black
    },
    buttonsContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: Colors.ColorAccent,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    navButtons: {        
        flex: 1,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.Black
    },
    subTitleText: {
        color: Colors.Gray,
        fontSize: 13,
    }
});

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.ColorAccent,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.ColorAccent,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.ColorAccent,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.ColorAccent,
    stepIndicatorUnFinishedColor: Colors.ColorPrimary,
    stepIndicatorCurrentColor: Colors.ColorPrimary,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.ColorAccent,
    stepIndicatorLabelFinishedColor: Colors.ColorPrimary,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: Colors.ColorPrimary,
    labelSize: 0,
    currentStepLabelColor: Colors.ColorPrimary
}