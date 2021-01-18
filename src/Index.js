import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Separator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Adbanner from './components/Adbanner.js';

import Cltmei from "./components/Cltmei.js";
import Fgts from "./components/Fgts.js";
import Cmedio from "./components/Cmedio.js";
import Formular from "./components/Formular.js";
import About from "./components/About.js";
import NumberFormat from 'react-number-format';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();



//Drawer Button
const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
  
    return (
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          {/*Donute Button Image */}
          <Image
            source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
            style={{
              width: 25,
              height: 25,
              marginLeft: 5
            }}
          />
        </TouchableOpacity>
      </View>
    );
}

function CltmeiStack({navigation}) {
    return(
        <Stack.Navigator initialRouteName="Cltmei" screenOptions={{
            headerRight: ()=>
              <NavigationDrawerStructure navigationProps={navigation} />, 
            headerStyle: {
                backgroundColor: '#429E3C', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            }
        }}>
            <Stack.Screen name="CltMei" options={{title: 'Clt x Mei'}}>
                {props => <Cltmei />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function FgtsStack({navigation}) {

    return(
        <Stack.Navigator initialRouteName="Fgts" screenOptions={{
            headerRight: ()=>
              <NavigationDrawerStructure navigationProps={navigation} />, 
            headerStyle: {
                backgroundColor: '#429E3C', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            }
        }}>
            <Stack.Screen name="Fgts" component={Fgts} options={{title: 'FGTS'}}/>
        </Stack.Navigator>
    );
}

function CmedioStack({navigation}) {
    return(
        <Stack.Navigator initialRouteName="Cmedio" screenOptions={{
            headerRight: ()=>
              <NavigationDrawerStructure navigationProps={navigation} />, 
            headerStyle: {
                backgroundColor: '#429E3C', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            }
        }}>
            <Stack.Screen name="Cmedio" component={Cmedio} options={{title: 'Custo Medio'}}/>
        </Stack.Navigator>
    );
}

function FormularStack({navigation}) {
    return(
        <Stack.Navigator initialRouteName="Formular" screenOptions={{
            headerRight: ()=>
              <NavigationDrawerStructure navigationProps={navigation} />, 
            headerStyle: {
                backgroundColor: '#429E3C', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            }
        }}>
            <Stack.Screen name="Formular" component={Formular} options={{title: 'Formular'}}/>
        </Stack.Navigator>
    );
}

function AboutStack({navigation}) {
    return(
        <Stack.Navigator initialRouteName="Sobre" screenOptions={{
            headerRight: ()=>
              <NavigationDrawerStructure navigationProps={navigation} />, 
            headerStyle: {
                backgroundColor: '#429E3C', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            }
        }}>
            <Stack.Screen name="Sobre" component={About} options={{title: 'Sobre'}}/>
        </Stack.Navigator>
    );
}

export default function Index() {

    return (    
        <NavigationContainer>
            <Drawer.Navigator drawerContentOptions={{activeTintColor: '#7FBF3F', itemStyle: { marginVertical: 5 }, }}>
                <Drawer.Screen name="Cltmei" component={CltmeiStack} options={{title: 'Clt x Mei'}} />
                <Drawer.Screen name="Fgts" component={FgtsStack} options={{title: 'FGTS'}} />
                <Drawer.Screen name="Cmedio" component={CmedioStack} options={{title: 'Custo Medio'}} />
                <Drawer.Screen name="Formular" component={FormularStack} options={{title: 'Formular'}} />
                <Drawer.Screen name="About" component={AboutStack} options={{title: 'Sobre'}} /> 
            </Drawer.Navigator>
            <View class="footerBanner" style={{alignItems:'center', backgroundColor:'transparent'}}>
                <Adbanner/>
            </View> 
        </NavigationContainer>        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  