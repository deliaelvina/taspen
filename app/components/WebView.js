import React, { Component } from "react";
import { View,Text,StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

export default class WebViewPage extends React.PureComponent {
    render() {
        const state = {...this.props.item}
        console.log('state',state);

        return (
            <WebView style={{flex:1}} source={{ 
                uri: 'http://35.198.219.220:3000/simple_checkout',
                body : 'data='+JSON.stringify(state),
                method:'POST'
            }} />
        );
    }
}
