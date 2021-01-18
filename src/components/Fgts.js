import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import { v1 as uuidv1 } from 'uuid';
import NumberFormat from 'react-number-format';
import DataService from '../services/DataService.js';


export default function Fgts() {

    const [valueTwo, onChangeTextTwo] = React.useState('');
    const [fgtsValue, onChangeTextFgts] = React.useState(0);
    const [checked, setChecked] = React.useState('first');

    const sender = (percentValue) => {
        const value = percentValue;
        DataService.setValueBuffer(value);
    }

    const handleClick = (value) => {
        let percent = 0;
        switch(value){
            case "Selecionar":
                if (checked == 'first'){
                    percent = 0.08;
                    onChangeTextFgts(8);
                    onChangeTextTwo(valueTwo + 'Categoria: Trabalhador\n');
                } else if (checked == 'second') {
                    percent = 0.02;
                    onChangeTextFgts(2);
                    onChangeTextTwo(valueTwo + 'Categoria: Contrato de Aprendizagem\n');
                } else if (checked == 'third') {
                    percent = 0.112;
                    onChangeTextFgts(11.2);
                    onChangeTextTwo(valueTwo + 'Categoria: Trabalhador doméstico\n');
                } else {   
                    Alert.alert('Opção Inválida!');
                }
                sender(percent);
                break;
            case "clr":
                percent = 0;
                setChecked('first');
                onChangeTextFgts(0);
                sender(percent);
                break;
            case "Del":
                onChangeTextTwo('');
                break;
            default:
                Alert.alert('Opção Inválida!');
        }
    }

    return (
        <ScrollView>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <View class="information" style={{width:'100%', flexDirection:'row', marginTop: 10, alignItems: 'center'}}>
                    <View class="frame" style={{width:'100%', backgroundColor:'#429E3C', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Porcentagem FGTS:</Text>
                        <NumberFormat value={fgtsValue} displayType={'text'} decimalScale={'2'} renderText={ value => 
                            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold", marginRight: 10}}>{value}%</Text>
                        }/>
                    </View>
                </View>

                <View class="information" style={{width:'90%', flexDirection:'row', alignItems: 'center', marginRight: 5, marginTop: 10}}>
                    <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                    />
                    <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>
                        O valor será o correspondente a 8% (oito por cento) do salário bruto pago ao trabalhador
                    </Text>
                </View>
                <View class="information" style={{width:'90%', flexDirection:'row', alignItems: 'center', marginRight: 5, marginTop: 10}}>
                    <RadioButton
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                    />
                    <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>
                        Para os contratos de trabalho firmados nos termos da lei nº 11.180/05 (Contrato de Aprendizagem), o percentual é reduzido para 2%
                    </Text>
                </View>
                <View class="information" style={{width:'90%', flexDirection:'row', alignItems: 'center', marginRight: 5, marginTop: 10}}>
                    <RadioButton
                        value="third"
                        status={ checked === 'third' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('third')}
                    />
                    <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>
                    No caso de trabalhador doméstico, o recolhimento é correspondente a 11,2 %, sendo 8% a título de depósito mensal e 3,2% a título de antecipação do recolhimento rescisório
                    </Text>
                </View>
                
                <View class="keyboard" style={{flexDirection:'row', padding: 10}}>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Selecionar" color="#429E3C" onPress={() => {handleClick('Selecionar')} }/>
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Clr" color="#429E3C" onPress={() => {handleClick('clr')}} />
                    </View>
                    <View class="itemKeyboard" style={{padding:3}}>
                        <Button title="Del" color="#429E3C" onPress={() => {handleClick('Del')}} />
                    </View>
                </View>

                <View class="information" style={{width:'80%', flexDirection:'row', alignItems: 'center', padding: 5}}>
                    <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>
                        É importante ressaltar que o FGTS não é descontado do salário, pois é uma obrigação do empregador.
                    </Text>
                </View>
                <View class="annotation" 
                style={{
                    width: "90%",
                    backgroundColor: "orange",
                    padding: 20,
                    marginTop: 10,
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