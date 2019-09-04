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
  Badge
} from "native-base";

import { Actions } from "react-native-router-flux";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";

import { Style, Colors } from "../Themes";
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
let isMount = false
// create a component
class ChouseUnit extends Component {
  constructor(props){
    super(props)

    this.state={
      hd : null,

      unit : []
    }

    console.log('props CU',props);

  }

  async componentDidMount(){
    isMount = true

    const data = {
      hd : new Headers({
        'Token' : await _getData('@Token')
      })
    }

    this.setState(data,()=>{
      this.getUnit()
    })
    
  }

  getUnit = () =>{
    const item = this.props.prevItems
    const items = this.props.items
    const unit = this.props.unitItems
    {isMount ?
        fetch(urlApi+'c_product_info/getUnit/'+item.db_profile+'/'+item.entity_cd+'/'+item.project_no+'/'+item.tower+'/'+unit.level_no+'/'+items.lot_type,{
            method:'GET',
            headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
                this.setState({unit : resData})
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            console.log('getUnit',res);
        }).catch((error) => {
            console.log(error);
        })
    :null}
  }
  
  clickUnitInfo(item) {
    if(item.status == 'A'){
      Actions.unitinfo({
        items : item,
        prevItems : this.props.prevItems,
        unitItems : this.props.unitItems
      });
    } else {
      alert('This Unit is Not Available')
    }
    // this.setState({ click: true });
  }
  clickUnitEnquiry() {
    Actions.unitenquiry();
    this.setState({ click: true });
  }
  render() {

    const item = this.props.prevItems
    const items = this.props.items
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
            <Text style={Style.actionBarText}>
              {"Chouse Unit".toUpperCase()}
            </Text>
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
          <View>
            <View style={Styles.headerUnit}>
              <Text style={Styles.sHeader}>
                {item.title.toUpperCase()}
              </Text>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:20}}>
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap : 'wrap',
                  flex :1
                }}
              >
                {item.towerDescs} | {unit.descs} | {items.descs}
              </Text>
            </View>
            <View style={Styles.city}>

            {this.state.unit.map((item,key)=>
              <TouchableOpacity key={key} style={[Styles.btnCity,{backgroundColor : item.status !== 'A' ? '#a30000' :'#1faa00'}]} onPress={() => { this.clickUnitInfo(item) }} >
                <View style={Styles.btnCityLocation}>
                  <Icon
                    active
                    name="floor-plan"
                    style={[Style.actionIconquiry,{color : '#fff'}]}
                    type="MaterialCommunityIcons"
                  />
                  <Text style={[Styles.btnCityText,{color : '#fff'}]}>{item.lot_no} </Text>
                  <Text style={[Styles.btnCityText,{color : '#fff'}]}>{item.descs} </Text>
                </View>
              </TouchableOpacity>
            )}

            </View>
          </View>
        </Content>
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
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default ChouseUnit;
