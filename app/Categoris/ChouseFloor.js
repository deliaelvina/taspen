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
    Badge
  } from "native-base";

  import { Actions } from "react-native-router-flux";
  import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';

let isMount = false
// create a component
class ChouseFloor extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        blok : []

    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        })
      }

      this.setState(data,()=>{
          this.getBlok()
      })
    }

    getBlok = () =>{
      const item = this.props.item
      const items = this.props.prevItems
      {isMount ?
          fetch(urlApi+'c_product_info/getBlok/'+items.db_profile+'/'+items.entity_cd+'/'+items.project_no+'/'+items.tower+'/'+item.lot_type,{
              method:'GET',
              headers : this.state.hd,
          }).then((response) => response.json())
          .then((res)=>{
              if(!res.Error){
                  const resData = res.Data
                  this.setState({blok : resData})
              } else {
                  this.setState({isLoaded: !this.state.isLoaded},()=>{
                      alert(res.Pesan)
                  });
              }
              console.log('getBlok',res);
          }).catch((error) => {
              console.log(error);
          })
      :null}
    }

    clickChouseUnit(item) {
      
        Actions.chouseunit({
          unitItems : item,
          items : this.props.item,
          prevItems : this.props.prevItems
        });
        // this.setState({ click : true})
    }
    clickUnitEnquiry() {
        Actions.UnitEnquiryProjectPage({
          items : this.props.item,
          prevItems : this.props.prevItems
        });
        this.setState({ click : true})
    }
    render() {
        const prevItem = this.props.prevItems
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
                   {"Choose Block".toUpperCase()}
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
              {/* <Image
              source={require("@Asset/images/tigabr.jpg")}
              style={{
                width: null,
                height: 168,
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8
              }}
            />  */}
              <View>
                    <View style={Styles.headerUnit}>
                        <Text style={Styles.cHeader}>{prevItem.title.toUpperCase()}</Text>
                        <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { this.clickUnitEnquiry(); 
                            }}  >
                                <Text style={Styles.sLink}>Unit Enquiry</Text>
                            </Button>
                        </Right>
                    </View>
                    <Text style={{
                        fontWeight: "300",
                        fontSize: 16,
                        paddingLeft: 16,
                        justifyContent: "center",
                        alignItems: "center",

                    }}>Unit type</Text>
                    <View style={Styles.city}>
                      {this.state.blok.map((item,key)=>
                        <TouchableOpacity key={key} style={Styles.btnCity} onPress={() => {this.clickChouseUnit(item)}} >
                          <View style={Styles.btnCityLocation}>
                              <Icon
                                  active
                                  name="floor-plan"
                                  style={Style.actionIconquiry}
                                  type="MaterialCommunityIcons"
                              />
                              <Text style={Styles.btnCityText}>{item.descs}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ChouseFloor;
