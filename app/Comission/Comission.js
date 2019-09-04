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
import RNPickerSelect from 'react-native-picker-select';
import numFormat from '@Component/numFormat';

let isMount = false
// create a component
class Comission extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        comissions : [],
        agentHD : [],
        agentDT : [],
        selHd : "",
        user : "",
        name : "",
        project : []
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        user : await _getData('@User'),
        name : await _getData('@UserId'),
        project : await _getData('@UserProject')
      }

      this.setState(data,()=>{
        this.getComission('','')
        this.getAgentHD()
      })
    }

    getAgentHD = () =>{
        const item = this.props.items
        {isMount ?
            fetch(urlApi+'c_comission/getAgentHD/'+item.db_profile,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    resData.map((data)=>{
                        this.setState(prevState=>({
                            agentHD : [...prevState.agentHD, {label: data.group_name, value:data.group_cd}]
                        }))
                    })
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getAgentHD',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    getAgentDT = (group_cd) =>{
        const item = this.props.items
        {isMount ?
            fetch(urlApi+'c_comission/getAgentDT/'+item.db_profile+'/'+group_cd,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    resData.map((data)=>{
                        this.setState(prevState=>({
                            agentDT : [...prevState.agentDT, {label: data.agent_name, value:data.agent_cd}]
                        }))
                    })
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getAgentDT',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    getComission = (group_cd,agent_cd) =>{
        const item = this.props.items
        {isMount ?
            fetch(urlApi+'c_comission/getComission/'+item.db_profile+'/'+group_cd+'/'+agent_cd,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({comissions :  resData})
                } else {
                    this.setState({comissions:[],isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getComission',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    chooseHD = (val)=>{
        if(val){
            this.setState({selHd : val},()=>{
                this.getAgentDT(val)
                this.getComission(val,'')
            })
        }
    }

    chooseDT = (val) =>{
        if(val){
            this.getComission(this.state.selHd,val)
        }
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
                   {"Comission".toUpperCase()}
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

                        <RNPickerSelect
                        items={this.state.agentHD}
                        onValueChange={(val)=>this.chooseHD(val)}
                        />
                        <RNPickerSelect
                        items={this.state.agentDT}
                        onValueChange={(val)=>this.chooseDT(val)}
                        />
                    {
                        this.state.comissions.map((data,key)=>
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
                                            {data.comm_doc_no}
                                            </Text>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            textAlign: 'left',
                                            color: 'green'
                                        }}>
                                            {moment(data.trx_date).format("DD MMM YYYY")}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#333'
                                        }}>
                                            Lot {data.lot_no}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#333'
                                        }}>
                                            Name {data.name}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#333'
                                        }}>
                                            Sell Price {numFormat(data.sell_price)}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#333'
                                        }}>
                                            Com Percent {data.comm_percen}%
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#02da00'
                                        }}>
                                            Com Amt {numFormat(data.comm_amount_dtl)}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '500',
                                            textAlign: 'right',
                                            color: '#ff720d'
                                        }}>
                                            Status {data.status}
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
export default Comission;
