import React, { Component } from 'react';
import { StatusBar, Alert, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Button, Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const saladData = {
  size: {
    step: 0,
    amount: 1,
    description: 'Tamanho',
    list: [{ description: 'Pequeno', subTitle: 'Pote de 500g' }, { description: 'Grande', subTitle: 'Pote de 1kg' }]
  },
  protein: {
    step: 1,
    amount: 1,
    description: 'Proteína',
    list: [{ description: 'Atum', priceSmall: 9.99, priceBig: 17.99 }, { description: 'Camarão', priceSmall: 14.99, priceBig: 27.99 },
    { description: 'Frango', priceSmall: 9.99, priceBig: 17.99 }, { description: 'Sardinha', priceSmall: 8.99, priceBig: 16.99 },
    { description: 'Soja', priceSmall: 7.99, priceBig: 13.99 }, { description: 'Ovos', priceSmall: 7.99, priceBig: 12.99 }]
  },
  ingredients: {
    step: 2,
    amount: 4,
    description: 'Ingredientes',
    list: ['Abacaxi', 'Abobrinha', 'Acelga', 'Alface', 'Arroz Integral', 'Batata Doce', 'Beterraba', 'Cebola Roxa', 'Cenoura', 'Couve',
      'Inhame', 'Jerimum', 'Maçã', 'Macarrão Integral', 'Manga', 'Melão', 'Pepino', 'Pimentão', 'Repolho Verde', 'Repolho Roxo', 'Tomate']
  },
  sauce: {
    step: 3,
    amount: 1,
    description: 'Molho',
    list: ['Molho Balsâmico', 'Molho Iogurte', 'Molho Mostarda com Mel', 'Molho Oriental', 'Molho Vinagrete']
  },
  grain: {
    step: 4,
    amount: 1,
    description: 'Grão',
    list: ['Ervilha', 'Grão de Bico', 'Milho Verde']
  },  
  seeds: {
    step: 5,
    amount: 2,
    description: 'Sementes',
    list: ['Amendoim', 'Castanha de Cajú', 'Chia', 'Gergilim', 'Granola', 'Linhaça', 'Passas']
  },
  greenSmell: {
    step: 6,
    amount: 2,
    description: 'Cheiro Verde',
    list: ['Cebolinha', 'Coentro', 'Hortelã Desidratada', 'Manjericão Desidratado', 'Salsa']
  },
  additional: {
    step: 7,
    amount: 7,
    description: 'Adicionais',
    list: [{ description: 'Azeitonas', price: 1 }, { description: 'Creme Cheese', price: 2 },
    { description: 'Morango', price: 2 }, { description: 'Ovo de Codorna', price: 1 },
    { description: 'Ovo Cozido', price: 1 }, { description: 'Queijo', price: 2 },
    { description: 'Torradinhas', price: 1 }]
  }
}

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

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item, this.props.price);
  };

  render() {

    const backColor = this.props.selected ? '#841584' : 'transparent';
    const textColor = this.props.selected ? 'white' : 'gray';
    let subTitle = this.props.subTitle ? <Text style={{ color: textColor, fontSize: 13, }}>
      {this.props.subTitle}
    </Text> : null;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ backgroundColor: backColor, padding: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
          <Text style={{ flex: 1, color: textColor, fontWeight: 'bold', fontSize: 20 }}>
            {this.props.title}
          </Text>
          {subTitle}
        </View>
      </TouchableOpacity>
    );
  }
}

export default class App extends Component {

  state = {
    listData: saladData.size.list,
    currentPosition: 0,
    selected: {},
    nextText: 'Próximo',
    total: 0
  }

  // componentDidMount() {
  //   alert(stepLabels.length);
  // }  
  
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

    let currentPos = this.state.currentPosition;    
    let selected = this.state.selected;    

    if (!selected[currentPos]) {
      selected[currentPos] = {};
      selected[currentPos][index] = {};
    }    
    if (!selected[currentPos][index]) {      
      selected[currentPos][index] = {};
    }    
    let itemStrings = { title: '', subTitle: '', price: 0 };
    let isPortionSmall = selected[saladData.size.step][0] === true;

    switch (currentPos) {
      case saladData.size.step:
        itemStrings.title = item.description;
        itemStrings.subTitle = item.subTitle;
        break;
      case saladData.protein.step:
        itemStrings.title = item.description;        
        itemStrings.subTitle = isPortionSmall ? 'R$ ' + item.priceSmall.toFixed(2) : 'R$ ' + item.priceBig.toFixed(2);
        itemStrings.price = isPortionSmall ? item.priceSmall : item.priceBig;
        break;
      case saladData.additional.step:
        itemStrings.title = item.description;
        itemStrings.subTitle = 'R$ ' + item.price.toFixed(2);
        itemStrings.price = item.price;
        break;

      default:
        itemStrings.title = item;
    }

    return (
      <MyListItem
        selected={selected[currentPos][index].selected}
        onPressItem={(item, price) => {
          //alert(JSON.stringify(item));
           let listSize = this.selectedSizeByPosition(currentPos);
           let amount = this.getDataByPosition(currentPos).amount;
           if (listSize < amount || selected[currentPos][index].selected == true) {
            selected[currentPos][index].selected = !selected[currentPos][index].selected;
            selected[currentPos][index].item = item;
            let total = selected[currentPos][index].selected ? this.state.total + price : this.state.total - price;          
            this.setState({ selected: selected, total: total });
           }
        }}
        title={itemStrings.title}
        subTitle={itemStrings.subTitle}
        price={itemStrings.price}
        item={item} />
    )
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
