import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Colors from './resources/colors';

export default class MyListItem extends PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.item, this.props.index);
    };

    render() {

        const backColor = this.props.selected ? Colors.ColorPrimaryDark : Colors.Transparent;
        const textColor = this.props.selected ? Colors.ColorPrimary : Colors.Gray;
        let subTitle = this.props.subTitle ? <Text style={[styles.subTitleText, { color: textColor }]}>{this.props.subTitle}</Text> : null;

        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={[styles.itemContainer, { backgroundColor: backColor }]}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                    {subTitle}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
    },
    subTitleText: {        
        fontSize: 13,
    },
    itemContainer: {        
        padding: 20,
        borderBottomColor: Colors.Gray,
        borderBottomWidth: 0.5
    }
});