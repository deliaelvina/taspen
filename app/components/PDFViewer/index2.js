import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Pdf from 'react-native-pdf';
import {styles} from './style';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

export default class PDFViewer extends React.Component {
    render() {
        const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};

        return (
            <WebView style={{flex:1}} source={source} />

        )
  }
}

// define your styless
const styless = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    buttonUpload: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        height: 80,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        backgroundColor : '#333',
        height : 600
    }

});