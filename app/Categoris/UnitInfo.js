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
      descs : 'Saya tertarik reservasi ' +this.props.prevItems.project_descs+ '\n\nLantai ' +this.props.items.level_no+ ' | ' +this.props.items.descs+ ' | ' +this.props.items.lot_no+'\n\nHubungi saya untuk info detail.',
      
      // descs : this.props.prevItems.project_descs,
    }

    console.log('dataImInterested',data);

    this.setState(data,()=>{
        this.getPrice()
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
            style={{ marginTop:16 }} >
            <Text>Send Email</Text>
          </Button>
            <Button rounded warning iconRight full
            style={{ marginTop:16 }}>
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
