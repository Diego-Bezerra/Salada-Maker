import React, { Component } from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Button, Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const ingredients = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track", "Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const rosetas = ["nada", "Delivery Address", "Order Summary", "Payment Method", "Track", "Cart", "Delivery Address", "Order Summary", "Payment Method", "tudo"];
const content = [ingredients, rosetas];

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
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.text);
  };

  render() {
    const backColor = this.props.selected ? '#841584' : 'transparent';
    const textColor = this.props.selected ? 'white' : 'gray';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, color: textColor, backgroundColor: backColor, fontWeight: 'bold', fontSize: 20, padding: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
            {this.props.text}
          </Text>
          <Text style={{ color: textColor, backgroundColor: backColor, fontWeight: 'bold', fontSize: 20, padding: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
            >
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class App extends Component {

  state = {
    data: content[0],
    currentPosition: 0,
    selected: {}
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem({ item, index }) {

    let currentPos = this.state.currentPosition;
    let selected = this.state.selected[currentPos] ? this.state.selected[currentPos].index === index : false;

    return (
      <MyListItem
        selected={selected}
        onPressItem={() => {
          if (!this.state.selected[currentPos]) {
            this.state.selected[currentPos] = {};
          }
          this.state.selected[currentPos].index = index;
          this.state.selected[currentPos].text = item;
          this.setState({ selected: this.state.selected });
          this.onPageChange(this.state.currentPosition + 1);
        }}
        text={item} />
    )
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'white', padding: 10, flex: 1, justifyContent: 'space-between' }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={this.state.currentPosition}
          labels={labels}
        />
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem.bind(this)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopColor: 'gray', borderTopWidth: 0.5, alignItems: 'center', }}>
          <View style={{ flex: 1, marginRight: 10, justifyContent: 'center', aligItems: 'center', }}>
            <Button
              onPress={() => { this.onPageChange(this.state.currentPosition - 1) }}
              title="Anterior"
              color="#841584"
              accessibilityLabel="Anterior"
            />
          </View>          
        </View>
      </SafeAreaView>
    )
  }

  onPageChange(position) {    
    if (position < 0 || position > labels.length) {
      return;
    }
    if (position == labels.length) {
      alert('Compartilhar');
      return;
    }    
    this.setState({ currentPosition: position, data: content[position] });
  }
}

finalize() {
  Alert.alert(
    'Finalizar',
    'Enviar seu pedido?',
    [
      {text: '', onPress: () => console.log('Ask me later pressed')},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
