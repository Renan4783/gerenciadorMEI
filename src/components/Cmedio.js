import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Cmedio() {

    const [value, onChangeText] = React.useState('');
    const [valueTwo, onChangeTextTwo] = React.useState('');
    const [valueThree, onChangeTextThree] = React.useState('');
    const [valueFour, onChangeTextFour] = React.useState('');
    const [keyboardValue, onChangeTextKeyboard] = React.useState('');

    const calculateFields = () => {
        try {
            var calc = valueTwo / valueThree;
            if (isNaN(calc)) {
                throw new Error('Campos vazios!');
            }
            onChangeText('' + calc);
            onChangeTextFour(valueFour + 'Custo de Operação: R$' + calc + '\n');
        } catch (err) {
            Alert.alert('Operação Inválida! ' + err);
        }
    }

    const doTheMath = () => {
        try{
            const expression = new String(value);
            onChangeText('' + eval(expression.toString()));
            onChangeTextFour(valueFour + eval(expression.toString()) + '\n');
        } catch (err) {
            Alert.alert('Invalid operation! ' + err);
        }
    }

    const clearFields = () => {
        onChangeText('');
        onChangeTextTwo('');
        onChangeTextThree('');
        onChangeTextKeyboard('');
    }

    const concatOperator = (keyboardValue) => {
        onChangeText(value + keyboardValue);
    }

    const handleClick = (keyboardValue) => {
        switch(keyboardValue){
            case "Calcular":
                calculateFields();
                break;
            case "Clr":
                clearFields();
                break;
            case "Del":
                onChangeTextFour('');
                break;
            case "+":
                concatOperator(keyboardValue);
                break;
            case "-":
                concatOperator(keyboardValue);
                break;
            case "*":
                concatOperator(keyboardValue);
                break;
            case "/":
                concatOperator(keyboardValue);
                break;
            case "=":
                doTheMath();
                break;
            default:
                Alert.alert('Invalid key!');
        }
    }

    return (
        <ScrollView>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <View class="textField" style={{flexDirection:'row', marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color:"gray", fontSize: 40, fontWeight: "bold", marginRight: 10}}>R$</Text>
                    <TextInput 
                        class="money"
                        keyboardType="numeric" 
                        style={{ width: '80%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                        onChangeText={text => onChangeText(text)}
                        placeholder="Valor"
                        value={value}
                    />
                </View>

                <View class="lineWrap" style={{flexDirection:'row', padding: 5}}>
                    <View class="stockValue" style={{backgroundColor:'#429E3C', padding: 20, marginHorizontal:5}}>
                    <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>R$ Estoque</Text>
                        <TextInput 
                            class="value"
                            keyboardType="numeric" 
                            style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                            onChangeText={text => onChangeTextTwo(text)}
                            placeholder="Valor"
                            value={valueTwo}
                            />
                    </View>
                    <View class="stockQuantity" style={{backgroundColor:'#429E3C', padding: 20, marginHorizontal:5}}>
                    <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Qtd. Estoque</Text>
                        <TextInput 
                            class="quantity"
                            keyboardType="numeric"  
                            style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                            onChangeText={text => onChangeTextThree(text)}
                            placeholder="Valor"
                            value={valueThree}
                            />
                    </View>
                </View>

                <View class="keyboard" style={{flexDirection:'row', padding: 10}}>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Calcular" color="#429E3C" onPress={() => {handleClick('Calcular')} }/>
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Clr" color="#429E3C" onPress={() => {handleClick('Clr')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Del" color="#429E3C" onPress={() => {handleClick('Del')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="+" color="#429E3C" onPress={() => {handleClick('+')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="-" color="#429E3C" onPress={() => {handleClick('-')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="*" color="#429E3C" onPress={() => {handleClick('*')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="/" color="#429E3C" onPress={() => {handleClick('/')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="=" color="#429E3C" onPress={() => {handleClick('=')}} />
                    </View>
                </View>

                <View class="annotation" 
                style={{
                    width: "90%",
                    backgroundColor: "orange",
                    padding: 20,
                }}>
                    <TextInput
                        multiline
                        editable
                        numberOfLines={10}
                        onChangeText={text => onChangeTextFour(text)}
                        value={valueFour}
                        placeholder="Anotações"
                        textAlignVertical="top"
                    />
                </View>

            </View>
        </ScrollView>
    );
}