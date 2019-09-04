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
    Card
  } from "native-base";

  import { Actions } from "react-native-router-flux";
  import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import moment from 'moment'
import numFormat from "@Component/numFormat";

let isMount = false
// create a component
class MyUnitDetailPage extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        units : [],
        email : "",
        name : "",
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        email : await _getData('@User'),
        name : await _getData('@UserId'),
      }

      this.setState(data,()=>{
        this.getUnitDetail()
      })
    }

    getUnitDetail = () =>{
        const {cons,LotNo} = this.props.unit

        {isMount ?
            fetch(urlApi+'c_myunits/myUnitDetail/'+cons+'/'+LotNo,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({units : resData})
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getunits',res);
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
        Actions.unitenquiry();
        this.setState({ click : true})
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
                   {"Unit Detail".toUpperCase()}
                 </Text>
               </View>
               <View style={Style.actionBarRight}></View>
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
                    <ScrollView>
                    {
                        this.state.units.map((data,key)=>
                            <Card style={{
                                height: null,
                                backgroundColor: 'white',
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: "#37BEB7",
                                shadowOpacity: 0.5,
                                elevation: 5,
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }} key={key}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            fontSize: 12,
                                            textAlign: 'left',
                                            color: '#333',
                                            fontWeight : "bold"
                                        }}>
                                            {moment(data.bill_date).format('DD MM YYYY')}
                                            </Text>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            textAlign: 'left',
                                            color: 'green'
                                        }}>
                                            {numFormat(data.trx_amt)}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        )
                    }
                    </ScrollView>
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
export default MyUnitDetailPage;
