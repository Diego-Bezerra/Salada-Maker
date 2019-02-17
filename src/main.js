import React, { Component } from 'react';
import { StatusBar, Alert, ScrollView, SafeAreaView, Share, FlatList, StyleSheet, Button, Text, View, Keyboard } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import SaladData, { StepEnum, PortionEnum } from './data';
import MyListItem from './myListItem';
import Colors from './resources/colors';
import Toast from 'react-native-simple-toast';
import NameScreen from './nameScreen';
import Storage from './storeData';

const stepLabels = SaladData.map((item) => { return item.description });

export default class Main extends Component {

    state = {
        listData: SaladData[StepEnum.NAME].list,
        currentPosition: StepEnum.NAME,
        selected: [],
        nextText: 'Próximo',
        total: 0
    }

    getResult() {

        if (this.state.currentPosition === StepEnum.NAME) {
            return (
                <NameScreen />
            )
        }

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
        }

        this.finalText = '*' + Storage.nameData.toUpperCase() + '*\n\n';
        return (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.Black, marginBottom: 10 }}>{Storage.nameData.toUpperCase()}</Text>
                    {this.state.selected.map((item, index) => {
                        this.finalText = this.finalText + '*' + item.description.toUpperCase() + '*' + '\n';
                        return (
                            <View key={index} style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, color: Colors.Black }}>
                                    {item.description}
                                </Text>
                                {Object.values(item.list).map((childItem, index) => {
                                    let subTitle = this.getSubTitle(childItem, item.step);
                                    subTitle = subTitle ? ' (' + subTitle + ')' : '';
                                    this.finalText = this.finalText + '\t' + '-' + childItem.title + subTitle + '\n';
                                    return <Text key={index} style={{ fontSize: 13, color: Colors.Gray }}>{'\t-' + childItem.title + subTitle}</Text>
                                })}
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }

    getAmountText() {
        let currentPosition = this.state.currentPosition;
        return 'Escolha no máximo: ' + SaladData[currentPosition].amount;
    }

    getTitleComponent() {
        let currentPosition = this.state.currentPosition;

        if (currentPosition === StepEnum.NAME) {
            let title = SaladData[this.state.currentPosition].description;
            return (
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            )
        }

        if (currentPosition !== SaladData.length) {
            let amount = this.getAmountText();
            let title = SaladData[this.state.currentPosition].description;
            return (
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.subTitleText}>{amount}</Text>
                </View>
            )
        }
        return (
            <View>
                <Text style={styles.titleText}>Finalizar</Text>
            </View>
        )

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
        let currentPosition = this.state.currentPosition;
        let total = this.state.total;
        let price = this.getPrice(item, currentPosition);
        let selected = this.state.selected;
        let selectedStep = selected[currentPosition];
        let dataStep = SaladData[currentPosition];
        let amount = SaladData[currentPosition].amount;

        let removeItem = () => {
            total = price ? total - price : total;
            delete selectedStep.list[id];
        }

        let addItem = () => {
            if (selected !== undefined &&
                selected[currentPosition] !== undefined &&
                Object.values(selected[currentPosition].list).length === amount) {

                Toast.show('Desculpa! Você já escolheu a quantidade máxima.');
                return;
            }
            if (currentPosition === StepEnum.SIZE) {
                this.selectedPortion = dataStep.list[index];
            }

            total = price ? total + price : total;
            selectedStep.list[id] = dataStep.list[index]; //add
        }

        if (currentPosition === StepEnum.SIZE) {
            total = 0;
        }
        if (!selectedStep) {
            selectedStep = Object.assign({}, dataStep, { list: {} });
        }

        if (amount === 1) {
            if (price) {
                total = 0;
            }
            if (Object.values(selectedStep.list).length > 0) {
                selectedStep.list = {};
            }
            addItem();
        } else {
            if (selectedStep.list[id]) {
                removeItem();
            } else {
                addItem();
            }
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
        if (position === SaladData.length + 1) {
            return true;
        }
        if (position < currentPosition && position >= 0) {
            return true;
        }
        if (position < 0 || position > SaladData.length) {
            return false;
        }

        if (this.state.currentPosition === StepEnum.NAME) {
            Keyboard.dismiss();
            let name = Storage.nameData;
            if (!name || name.trim().length === 0) {
                Toast.show('Preencha seu nome.');
                return false;
            }
            return true;
        }

        let selected = this.state.selected;
        let step = SaladData[currentPosition];

        let validate = step.validate;
        if (validate) {

            let validate2 = selected === undefined ||
                selected[currentPosition] === undefined ||
                selected[currentPosition].list === undefined ||
                Object.values(selected[currentPosition].list).length === 0;

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
        if (position === SaladData.length + 1) {
            this.share('Enviar pedido', this.finalText);
            return;
        }
        let nextButtonText = 'Próximo';
        if (position === SaladData.length) {
            nextButtonText = 'Finalizar';
            this.setState({ nextText: nextButtonText, currentPosition: position });
            return;
        }
        this.setState({ nextText: nextButtonText, currentPosition: position, listData: SaladData[position].list });
    }

    share(title, message) {
        try {
            Share.share({
                title: title,
                message: message,
            });            
        } catch (error) {
            alert(error.message);
        }
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
                <View style={{ flex: 1 }}>
                    {this.getResult()}
                </View>
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