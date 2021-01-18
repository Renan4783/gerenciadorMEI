import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ScrollView, Button } from 'react-native';
import NumberFormat from 'react-number-format';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataService from '../services/DataService.js';

export default function Cltmei() {

    const [value, onChangeText] = React.useState('');
    const [valueTwo, onChangeTextTwo] = React.useState('');
    const [feriasValue, onChangeTextFerias] = React.useState('');
    const [inssValue, onChangeTextInss] = React.useState('');
    const [fgtsValue, onChangeTextFgts] = React.useState('');
    const [fgtsPercent, onChangeTextFgtsPercent] = React.useState(0);
    const [resultValue, onChangeTextResult] = React.useState('');
    const [keyboardValue, onChangeTextKeyboard] = React.useState('');

    const receiver = () => {
        DataService.getValueBuffer().then( v => {
            //console.log('receiver: ' + v);
            onChangeTextFgtsPercent(v);
        });
    }

    React.useEffect (() => {
        receiver();
    });

    const checkPercent = () => {
        receiver();
        //console.log('var: ' + fgtsPercent);
        if (fgtsPercent == 0 || fgtsPercent == undefined) {
            Alert.alert('FGTS não definido!');
            return (true);
        } else {
            //Alert.alert('Test ' + fgtsPercent);
            return (false);
        }
    }

    const calculateTax = () => {
        try {
            let numberValue = parseFloat(value);
            let result = 0;
            let inss = 0;
            let inssPercent = 0;
            let fgts = 0;
            let ferias = numberValue;
            if (!checkPercent()){
                if (numberValue <= 1045) {
                    inssPercent = 0.075
                } else if (numberValue > 1045 && numberValue <= 2089.6) {
                    inssPercent = 0.09;
                } else if (numberValue > 2089.6 && numberValue <= 3134.4) {
                    inssPercent = 0.12;
                } else if (numberValue > 3134.4 && numberValue <= 6101.06) {
                    inssPercent = 0.14;
                } else if (numberValue > 6101.06 && numberValue <= 10448) {
                    inssPercent = 0.145;
                } else if (numberValue > 10448 && numberValue <= 20896) {
                    inssPercent = 0.165;
                } else if (numberValue > 20896 && numberValue <= 40747.2) {
                    inssPercent = 0.19;
                } else {
                    inssPercent = 0.22;
                }
                inss = numberValue * inssPercent;
                fgts = numberValue * fgtsPercent;
                ferias = ((ferias - inss)*0.33)/12;
                result = ferias + inss + fgts;
                onChangeTextFerias(ferias);
                onChangeTextInss(inss);
                onChangeTextFgts(fgts);
                onChangeTextResult(result);
                if (isNaN(numberValue) || isNaN(result)){
                    throw new Error('Valores nulos!')
                } else {
                    onChangeTextTwo(valueTwo + 'Resultado: ' + numberValue + ' FGTS: ' + fgtsPercent 
                                    + ' INSS: ' + inssPercent + '\n' + 'Soma dos encargos: ' + result + '\n');
                }
            }
        } catch (err) {
            Alert.alert('Operação Inválida! ' + err);
            //console.log('Invalid operation! ' + err);
        }
    }

    const doTheMath = () => {
        try{
            const expression = new String(value);
            onChangeText('' + eval(expression.toString()));
            onChangeTextTwo(valueTwo + eval(expression.toString()) + '\n');
        } catch (err) {
            Alert.alert('Operação Inválida! ' + err);
        }
    }

    const clearFields = () => {
        onChangeText('');
        onChangeTextFerias('');
        onChangeTextInss('');
        onChangeTextFgts('');
        onChangeTextResult('');
        onChangeTextKeyboard('');
    }

    const concatOperator = (keyboardValue) => {
        onChangeText(value + keyboardValue);
    }

    const handleClick = (keyboardValue) => {
        switch(keyboardValue){
            case "Calcular":
                calculateTax();
                break;
            case "Clr":
                clearFields();
                break;
            case "Del":
                onChangeTextTwo('');
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
                Alert.alert('Chave Inválida!');
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

                <View class="information" style={{width:'100%', flexDirection:'row', marginTop: 10, alignItems: 'center'}}>
                    <View class="frame" style={{width:'50%', backgroundColor:'green', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Férias:</Text>
                        <NumberFormat value={feriasValue} displayType={'text'} decimalScale={'2'} prefix={'R$'} renderText={ value => 
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>{value}</Text>
                        }/>
                    </View>
                    <View class="frame" style={{width:'50%', backgroundColor:'green', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Inss:</Text>
                        <NumberFormat value={inssValue} displayType={'text'} decimalScale={'2'} prefix={'R$'} renderText={ value =>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>{value}</Text>
                        }/>
                    </View>
                </View>

                <View class="information" style={{width:'100%', flexDirection:'row', alignItems: 'center'}}>
                    <View class="frame" style={{width:'50%', backgroundColor:'#429E3C', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>FGTS:</Text>
                        <NumberFormat value={fgtsValue} displayType={'text'} decimalScale={'2'} prefix={'R$'} renderText={ value =>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>{value}</Text>
                        }/>
                    </View>
                    <View class="frame" style={{width:'50%', backgroundColor:'#429E3C', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Soma:</Text>
                        <NumberFormat value={resultValue} displayType={'text'} decimalScale={'2'} prefix={'R$'} renderText={ value =>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>{value}</Text>
                        }/>
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
                        onChangeText={text => onChangeTextTwo(text)}
                        value={valueTwo}
                        placeholder="Anotações"
                        textAlignVertical="top"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

