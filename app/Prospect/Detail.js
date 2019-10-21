import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Platform,
    Linking,

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    List,
    Right,
    Card,
    Content,
    Accordion,
    Label,
    Picker,
    CardItem,
    Left,
    Tab,
    Tabs,
    Item,

} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import { _storeData, _getData } from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
import { Input } from "react-native-elements";
import SearchableDropdown from 'react-native-searchable-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import Mailer from "react-native-mail";
// import ListProject from './ListProspect';
import FollowupProspect from './FollowupProspect';
import DetailPage from './DetailPage';
// import styles, { colors } from "./styles/index";


const navState = {
    index: 0,
    routes: [
        { key: 'detail', title: 'Detail' },
        { key: 'follow', title: 'Follow Up' },


    ]
}

const navScene = {
    detail: DetailPage,
    follow: FollowupProspect,


}




class DetailProspect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navState: {
                index: 0,
                routes: [
                    { key: 'detail', title: 'Detail' },
                    { key: 'follow', title: 'Follow Up' },


                ]
            },

            navScene: {
                detail: DetailPage,
                follow: FollowupProspect,


            },
            status_cd:'',
            descs: '',
            business_id: '',
            name: '',
            handphone: '',
            email_addr: '',
            tel_no: ''
        }

       
    }
    async componentDidMount(){
        const dataProspect = await _getData("statusProspect");
        console.log("_getdata dari ListProspect",dataProspect);
        Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            status_cd : dataProspect.status_cd,
            descs : dataProspect.descs,
            name: dataProspect.name,
            business_id: dataProspect.business_id,
            handphone: dataProspect.handphone,
            email_addr: dataProspect.email_addr,
            tel_no: dataProspect.tel_no


        }
        console.log('ambil data statuscd', data);
        isMount = true;
        this.setState(data, () => {

        });
    }
    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false
        this.props.onBack();
      }
      sendEmail(){
        // noHp = '';
        // const email_addr = this.state.detail[0].email_addr
        const email_addr = this.state.email_addr
        // const descs = this.props.items.project_descs
        
        // alert(email_addr);
      
      console.log('email send add', email_addr)
        Mailer.mail(
          {
            // subject: "Description prospect" + descs,
            subject: "Description prospect",
            recipients: [`${email_addr}`],
            ccRecipients: [""],
            bccRecipients: [""],
            body: "",
            isHTML: true
          },
          (error, event) => {
            Alert.alert(
              error,
              event,
              [
                {
                  text: "Ok",
                  onPress: () => console.log("OK: Email Error Response")
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("CANCEL: Email Error Response")
                }
              ],
              { cancelable: true }
            );
          }
        );
    };
    sendWa(){

        // const noHp = this.state.detail[0].handphone
        const noHp = this.state.handphone
        // const noHp = "82236203286"
        // const descs = this.state.descs
        const descs = "tes prospect"
        // alert(descs);
        Linking.openURL('https://wa.me/+62'+noHp+'?text='+descs)
        console.log('hp wa', noHp);
      
    }
    callphone(){
        // const noHp = this.state.detail[0].handphone
        const noHp = this.state.handphone
        // alert(noHp);
        // const noHp = "82236203286"
        Linking.openURL('tel:'+noHp)
        console.log('tel no', noHp);
    }

    render() {
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
                            {"Detail & Follow Up".toUpperCase()}
                            {/* {dataProspect.descs.toUpperCase()} */}
                            {/* {this.state.status_cd.toUpperCase()}
                            {this.state.descs.toUpperCase()} */}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                   
                </Header>
                    
                    
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Label style={{paddingHorizontal: 10, paddingVertical: 5, bottom: 0}}>
                                <Text style={{fontWeight:'bold'}}># {this.state.business_id}</Text>
                        </Label>
                        <Label style={{paddingHorizontal: 10, paddingVertical: 5, bottom: 0}}>
                                <Text style={{fontWeight:'bold', right: 10}}>{this.state.name}</Text>
                        </Label>
                    </View>
               

                    <View style={{borderBottomColor: Colors.bluegreyUrban, borderBottomWidth: 1,marginHorizontal:15, opacity: 70, paddingBottom: 5}}>
                    </View>
                    
                    <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingTop: 10}}>
                        <TouchableHighlight onPress={()=>this.sendEmail()}>
                            <Icon color="green" name="envelope" style={{fontSize: 20,color: 'green', marginHorizontal:20}} type="FontAwesome" />

                        </TouchableHighlight>
                                               
                        <TouchableHighlight onPress={()=>this.callphone()}>
                            <Icon color="green" name="phone" style={{fontSize: 20,color: 'green', marginHorizontal:20}} type="FontAwesome" />

                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this.sendWa()}>
                            <Icon color="green" name="whatsapp" style={{fontSize: 20,color: 'green', marginHorizontal:20}} type="FontAwesome" />

                        </TouchableHighlight>
                    </View>
                <TabBar navState={this.state.navState} navScene={this.state.navScene} />
               

            </Container>

        );
    }
}
export default DetailProspect;

const navStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    tabItem: {
        // flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});