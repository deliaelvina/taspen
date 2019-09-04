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
import {WebView} from 'react-native-webview';
import base64 from 'react-native-base64'
import { Style, Colors } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from '@Component/StoreAsync';
import { urlApi } from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class ReportProject extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hd: null,

            customers: [],
            user: "",
            name: "",
            project: [],
            selected: "",
            token : ""
        }

        console.log('props cf', props);
    }

    async componentDidMount(){
        isMount = true
        const data = {
          hd : new Headers({
            'Token' : await _getData('@Token')
          }),
          token : await _getData('@Token')
        }

        this.setState(data)

      }

    goToDash = (type) => {
        const item = this.props.items

        const token = base64.encode(item.db_profile+'-$-'+item.entity_cd+'-$-'+item.project_no+'-$-'+this.state.token)
        const data = urlApi+"dash_"+type+"/index/"+token
        console.log('data',data);
        Actions.Dashboard({url:data})
    }

    onValueChange(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        const item = this.props.items
        let { bookedby, name, email, hp } = this.state
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation}>
                    <StatusBar
                        backgroundColor={Colors.statusBarOrange}
                        animated
                        barStyle="light-content"
                    />

                    <View style={Style.actionBarLeft}>
                        <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                style={Style.textWhite}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                            {"Management Dashboard".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <View>
                        <ScrollView>
                            <View style={Styles.overview}>
                                <Text style={Styles.projectTitle}>{item.title}</Text>
                            </View>

                            <View style={Styles.overview}>
                                <Image
                                    style={[Styles.picWidth,{ height: 190, borderRadius: 10, marginTop: 5 }]}
                                    source={{uri : item.picture_path}}
                                />
                            </View>

                            <View style={Styles.viewButton}>
                                <TouchableOpacity
                                    onPress={()=>this.goToDash("nup")}
                                    style={Styles.buttonStyle}>
                                    <Image style={Styles.imgButton} source={require('@Asset/images/notebook.png')} />
                                    <Text style={Styles.buttonTitle}>Dashboard {"\n"} NUP</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>this.goToDash("sales")}
                                    style={Styles.buttonStyle}>
                                    <Image style={Styles.imgButton} source={require('@Asset/images/piechart.png')} />
                                    <Text style={Styles.buttonTitle}>Dashboard {"\n"} Sales</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>this.goToDash("finance")}
                                    style={Styles.buttonStyle}>
                                    <Image style={Styles.imgButton} source={require('@Asset/images/bars.png')} />
                                    <Text style={Styles.buttonTitle}>Dashboard Finance</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </Content>
            </Container >
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
export default ReportProject;
