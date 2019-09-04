//import liraries
import React, { Component } from 'react';
import {
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform,
    SafeAreaView,
    View,
    FlatList,
    Modal
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    FooterTab,
    Badge,
    Card,
    Textarea,
    Picker
} from "native-base";

import { Actions } from "react-native-router-flux";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Style, Colors } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from '@Component/StoreAsync';
import { WebView } from 'react-native-webview';
import { urlApi } from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hd: null,

            customers: [],
            user: "",
            name: "",
            project: [],
            selected: ""
        }

        console.log('props cfs', props);
    }

    
    render() {
        const item = this.props.url
        return (
            <WebView style={{flex:1}} source={{ uri: this.props.url }} />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
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

});

//make this component available to the app
export default Dashboard;
