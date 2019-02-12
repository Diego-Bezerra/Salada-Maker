import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default class MyListItem extends PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    render() {

        const backColor = this.props.selected ? '#841584' : 'transparent';
        const textColor = this.props.selected ? 'white' : 'gray';
        let subTitle = this.props.item.subTitle ? <Text style={{ color: textColor, fontSize: 13, }}>{this.props.item.subTitle}</Text> : null;

        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{ backgroundColor: backColor, padding: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                    <Text style={{ flex: 1, color: textColor, fontWeight: 'bold', fontSize: 20 }}>
                        {this.props.item.title}
                    </Text>
                    {subTitle}
                </View>
            </TouchableOpacity>
        );
    }
}