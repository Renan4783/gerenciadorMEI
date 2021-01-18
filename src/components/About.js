import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function About() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/calculator-icon128.png')}/>
            <Text style={{color:"#404040", fontSize: 30, fontWeight: "bold", padding: 20}}>Calculadora CLT x MEI</Text>
            <Text style={{color:"#404040", fontSize: 20, fontWeight: "bold"}}>Cálculos de custo MEI</Text>
            <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>Ferramenta de auxílio para microempreendedores e autônomos</Text>
            <View class="information" style={{width:'90%', flexDirection:'row', marginTop: 10, alignItems: 'center'}}>
                    <View class="frame" style={{width:'50%', alignItems: 'center', justifyContent: 'center', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>Desenvolvido em React Native</Text>
                    </View>
                    <View class="frame" style={{width:'50%', flexDirection:'row', padding: 10}}>
                        <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold"}}>Contato: rdodeveloper@gmail.com</Text>
                    </View>
            </View>
            <View style={{postion:'absolute', bottom:0}}>
                <Text style={{color:"#404040", fontSize: 12, fontWeight: "bold", padding: 20}}>Versão 1.0.1</Text>
            </View>     
        </View>
    );
}