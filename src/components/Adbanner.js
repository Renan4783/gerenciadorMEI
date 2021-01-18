import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, setTestDeviceIDAsync,} from 'expo-ads-admob';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Adbanner() {
    return(
        <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-4904377971595846/6288505514" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} 
        />
    );
}