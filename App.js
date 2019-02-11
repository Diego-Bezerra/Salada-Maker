import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Button, Text, View } from 'react-native';
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
        <View>
          <Text style={{ color: textColor, backgroundColor: backColor, fontWeight: 'bold', fontSize: 20, padding: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
            {this.props.text}
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
    let selected = this.state.selected[index].selected;        
    return (
      <MyListItem
        selected={selected}
        onPressItem={() => {                    
          this.state.selected[index].selected = true;
          this.state.selected[index].text = item;
          this.setState({ selected: this.state.selected });
        }}
        text={item} />
    )
  }

  render() {
    return (
      <View style={{ padding: 10, flex: 1, justifyContent: 'space-between' }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              onPress={() => { this.onPageChange(this.state.currentPosition - 1) }}
              title="Anterior"
              color="#841584"
              accessibilityLabel="Anterior"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => { this.onPageChange(this.state.currentPosition + 1) }}
              title="Próximo"
              color="#841584"
              accessibilityLabel="Próximo"
            />
          </View>
        </View>
      </View>
    )
  }

  onPageChange(position) {
    if (position < 0 || position > labels.length) {
      return;
    }
    this.setState({ currentPosition: position, data: content[position] });
  }

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
