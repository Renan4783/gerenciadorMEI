import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Formular() {

    const [percCmedio, onChangeField] = React.useState(0);
    const [percServ, onChangeFieldTwo] = React.useState(0);
    const [percDesloc, onChangeFieldThree] = React.useState(0);
    const [percAdd, onChangeFieldFour] = React.useState(0);
    const [value, onChangeText] = React.useState('');
    const [valueTwo, onChangeTextTwo] = React.useState('');
    const [valueThree, onChangeTextThree] = React.useState('');
    const [valueFour, onChangeTextFour] = React.useState('');
    const [valueFive, onChangeTextFive] = React.useState('');
    const [valueSix, onChangeTextSix] = React.useState('');
    const [keyboardValue, onChangeTextKeyboard] = useState('');


    const calculateFields = () => {
        try {
            var calc = parseFloat(valueTwo) + parseFloat(valueThree) + parseFloat(valueFour) + parseFloat(valueFive);
            if (isNaN(calc)) {
                throw new Error('Campos vazios!');
            }
            onChangeField((valueTwo*100)/calc);
            onChangeFieldTwo((valueThree*100)/calc);
            onChangeFieldThree((valueFour*100)/calc);
            onChangeFieldFour((valueFive*100)/calc);
            onChangeText('' + calc);
            onChangeTextSix(valueSix + 'Custo de Operação: R$' + calc + '\n' + 'Composição do preço: ' 
                            + 'Custo Médio: ' + percCmedio + '%' + ' Serviço: ' + percServ + '% '
                            + 'Deslocamento: '+ percDesloc + '% ' + 'Adicionais: ' + percAdd + '%\n'); 
        } catch (err) {
            Alert.alert('Operação Inválida! ' + err);
        }
    }

    const doTheMath = () => {
        try{
            const expression = new String(value);
            onChangeText('' + eval(expression.toString()));
            onChangeTextSix(valueSix + eval(expression.toString()) + '\n');
        } catch (err) {
            Alert.alert('Invalid operation! ' + err);
        }
    }

    const clearFields = () => {
        onChangeText('');
        onChangeTextTwo('');
        onChangeTextThree('');
        onChangeTextFour('');
        onChangeTextFive('');
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
                onChangeTextSix('');
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
                <View class="textField" style={{flexDirection:'row', marginTop: 10, marginBottom: 10, alignItems: 'center'}}>
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

                <View class="lineWrap" style={{width:'100%', flexDirection:'row'}}>
                        <View class="avgValue" style={{width:'50%', backgroundColor:'green', padding: 10}}>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>C. Medio {percCmedio}%</Text>
                            <TextInput 
                                class="cMedio"
                                keyboardType="numeric" 
                                style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                                onChangeText={text => onChangeTextTwo(text)}
                                placeholder="Valor"
                                value={valueTwo}
                                />
                        </View>
                        <View class="serviceValue" style={{width:'50%', backgroundColor:'green', padding: 10}}>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Serviço {percServ}%</Text>
                            <TextInput 
                                class="Serv"
                                keyboardType="numeric" 
                                style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                                onChangeText={text => onChangeTextThree(text)}
                                placeholder="Valor"
                                value={valueThree}
                                />
                        </View>
                </View>
                <View class="lineWrap" style={{width:'100%', flexDirection:'row'}}>
                        <View class="moveValue" style={{width:'50%', backgroundColor:'#429E3C', padding: 10}}>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Desloc. {percDesloc}%</Text>
                            <TextInput 
                                class="Desloc"
                                keyboardType="numeric" 
                                style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                                onChangeText={text => onChangeTextFour(text)}
                                placeholder="Valor"
                                value={valueFour}
                                />
                        </View>
                        <View class="addValue" style={{width:'50%', backgroundColor:'#429E3C', padding: 10}}>
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Adicionais {percAdd}%</Text>
                            <TextInput 
                                class="Add"
                                keyboardType="numeric" 
                                style={{ width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: "gray"}} 
                                onChangeText={text => onChangeTextFive(text)}
                                placeholder="Valor"
                                value={valueFive}
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
                        onChangeText={text => onChangeTextSix(text)}
                        value={valueSix}
                        placeholder="Anotações"
                        textAlignVertical="top"
                    />
                </View>
            </View>
        </ScrollView>
    );
}