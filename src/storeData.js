import { AsyncStorage } from 'react-native';

let _nameData;

export default class Storage {

    static get nameData() {
        return _nameData;
    }
    
    static setNameData(name) {
        _nameData = name;
        this.storeNameData(_nameData);
    }

    static async storeNameData(name) {        
        this.storeData('name', name);        
    }

    static async retrieveNameData() {
        _nameData = await this.retrieveData('name');
        return _nameData;
    }

    static storeData = async (dataKey, value) => {
        try {
            await AsyncStorage.setItem(dataKey, value);
        } catch (error) {            
            console.log(error);
        }
    };

    static retrieveData = async (dataKey) => {
        try {            
            const value = await AsyncStorage.getItem(dataKey);            
            if (value !== null) {                
                console.log(value);
            }
            return value;
        } catch (error) {
            console.log(error);
        }
    }
}    