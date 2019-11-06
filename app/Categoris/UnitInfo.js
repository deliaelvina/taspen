//import liraries
import React, { Component } from "react";
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
  Modal,
  Linking
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
  Form,
  Label
} from "native-base";

import Interested from "./Interested"

import { Actions } from "react-native-router-flux";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import RBSheet from "react-native-raw-bottom-sheet";
import numFormat from '@Component/numFormat'
import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import Mailer from "react-native-mail";
let isMount = false
// create a component
class UnitInfo extends Component {

  constructor(props){
    super(props)

    this.state = {
      hd : null,
      price : null,
      isVisible : false,
      descs : '',
      // project: '',
      email_add: '',
      wa_no: '',
      projects:[],
      amenities  : null,
      feature : null,
      overview : null,
      project : null,
      gallery : null,
      plans : null,
      detail: [],
      descs_wa: '',
      

    }
    console.log('props UI',props);
  }

  async componentDidMount(){
    isMount = true
    const data = {
      hd : new Headers({
        'Token' : await _getData('@Token')
      }),
      email : await _getData('@User'),
      userId : await _getData('@UserId'),
      name : await _getData('@Name'),
      handphone : await _getData('@Handphone'),
      projects : await _getData('@UserProject'),
      descs : 'Saya tertarik reservasi ' +this.props.prevItems.project_descs+ '\n\nLantai ' +this.props.items.level_no+ ' | ' +this.props.items.descs+ ' | ' +this.props.items.lot_no+'\n\nHubungi saya untuk info detail.',
      descs_wa : 'Saya tertarik reservasi ' +this.props.prevItems.project_descs+ '\n\nLantai ' +this.props.items.level_no+ ' | ' +this.props.items.descs+ ' | ' +this.props.items.lot_no,
      // projects: await _getData('@UserProject')
      // descs : this.props.prevItems.project_descs,
    }

    console.log('dataImInterested',data);

    this.setState(data,()=>{
        this.getPrice()
       this.getDetailProject()
    })
  }

  getPrice = () =>{
    const item = this.props.items
    const items = this.props.prevItems
    {isMount ?
        fetch(urlApi+'c_product_info/getPrice/'+items.db_profile+'/'+items.entity_cd+'/'+items.project_no+'/'+item.lot_no,{
            method:'GET',
            headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.DataHC
                this.setState({price : resData})
            }
            console.log('getPrice',res);
        }).catch((error) => {
            console.log(error);
        })
    :null}
  }

  getDetailProject = async() => {
          const project = await _getData('@UserProject');
        // console.log('project detail',project);
        const entity_cd = project[0].entity_cd
        const project_no = project[0].project_no
        console.log('entity dan project no',{entity_cd, project_no});
        {isMount ?
        fetch(urlApi + 'c_project/getProject2/IFCAPB2/',{
            method:'POST',
            body: JSON.stringify({entity_cd,project_no})
            // headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
               
                console.log('data project',res);
                this.setState({detail:resData});
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            // console.log('datalistprospect',res);
        }).catch((error) => {
            console.log(error);
        })
        :null}

  }

  sendWa(){
    // alert('wa');
    const noHp = this.state.detail[0].wa_no
    // const noHp = this.state.projects[0].handphone
    // const noHp = this.state.handphone
    const descs_ = this.state.descs_wa
    Linking.openURL('https://wa.me/+62'+noHp+'?text='+descs_)
    console.log('hp wa', noHp);
    console.log('desc', descs_);
  
  }
  
  sendEmail(){
    // alert('email');
    const email_add = this.state.detail[0].email_add
    const descs_ = this.state.descs_wa
    // noHp = '';
    // const email_add = this.state.projects[0].email_add
    // const descs = this.props.items.project_descs
    
    // alert(email_add);
  
    console.log('email send add', email_add)
    Mailer.mail(
      {
        subject: "Saya tertarik reservasi " + descs_,
        recipients: [`${email_add}`],
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
  

  render() {
    const item = this.props.items
    const prevItems = this.props.prevItems
    const unit = this.props.unitItems

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
            <Text style={Style.actionBarText}>{"Unit Info".toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight}>
            {/* <Button
              transparent
              style={Style.actionBarBtnRight}
              onPress={Actions.categoris}
            >
              <Icon
                active
                name="action-undo"
                style={Style.actionIcon}
                type="SimpleLineIcons"
              />
            </Button> */}
          </View>
        </Header>
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <Image
            source={require("@Asset/images/tigabr.jpg")}
            style={{
              width: null,
              height: 168,
              resizeMode: "cover",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8
            }}
          />
          <Text
            style={{
              fontSize: 12,
              paddingTop: 16,
              marginLeft: 16,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {prevItems.title}
          </Text>
          <Text style={{ fontSize: 12, marginLeft: 16 }}>{prevItems.towerDescs} | Lantai {item.level_no}</Text>
          <Text style={{ fontSize: 12, marginLeft: 16 }}>{item.descs} | {item.lot_no}</Text>
          <Text style={{ fontSize: 12, marginLeft: 16 }}>
            By Request : IDR, {numFormat(this.state.price)}
          </Text>
        </Content>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <Header style={Style.navigationModal}>
          <StatusBar
            backgroundColor={Colors.statusBarNavy}
            animated
            barStyle="light-content"
          />
           <View style={Style.actionBarLeft}>
               </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>
              {"I'm Interested".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}>
            <Button
              transparent
              style={Style.actionBtnRight}
              onPress={() => {
                this.setState({ isVisible: !this.state.isVisible });
              }}            >
              <Icon
                active
                name="close"
                style={Style.actionIcon}
                type="FontAwesome"
              />
            </Button>
          </View>
        </Header>
        <ScrollView>
        <Form>
            <Item floatingLabel>
              <Label>Nama Anda</Label>
              <Input value={this.state.name} onChangeText={(val)=>this.setState({name : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Handphone</Label>
              <Input value={this.state.handphone} onChangeText={(val)=>this.setState({handphone : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Deskripsi</Label>
              <Input multiline value={this.state.descs} onChangeText={(val)=>this.setState({descs : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Reference Email</Label>
              <Input value={this.state.refEmail} onChangeText={(val)=>this.setState({refEmail : val})} />
            </Item>
            <Body style={{ paddingVertical:32 }} >
            <Button rounded success full
            style={{ marginTop:16, backgroundColor: Colors.blueUrban }} onPress={()=>this.sendEmail()} >
            <Text>Send Email</Text>
          </Button>
            <Button rounded warning iconRight full
            style={{ marginTop:16, backgroundColor: Colors.loginGreen }} onPress={()=>this.sendWa()}>
            <Text>Send via WhatsApp</Text>
            <Icon name='whatsapp' 
            type="FontAwesome5"/>
          </Button>
          </Body>
          </Form>
          </ScrollView>
        </Modal>
        <Button full style={{ backgroundColor: "#fb5f26" }}   onPress={() => {
            this.setState({ isVisible: true });
          }}>
          <Text>Reserve Now</Text>
        </Button>
      </Container>
    );
  }
}



// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

//make this component available to the app
export default UnitInfo;
