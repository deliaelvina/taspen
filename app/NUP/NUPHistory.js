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
    Card,
    Form,
    Label
} from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Actions } from "react-native-router-flux";
import { Style, Colors } from "../Themes";
import Styles from "./Style";
import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from '@Component/numFormat'
import moment from 'moment'

class NUPHistory extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        nups : [],
        user : "",
        name : "",
        project : [],
        isVisible : false
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        nup : [],
        user : await _getData('@User'),
        name : await _getData('@UserId'),
        project : await _getData('@UserProject')
      }

      this.setState(data,()=>{
        //   this.getNup()
      })
    }

    
    getNup = (group_cd,agent_cd) =>{
        const item = this.props.items
        {isMount ?
            fetch(urlApi+'c_nup/getNup/IFCAMOBILE/',{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({nups :  resData})
                } else {
                    this.setState({comissions:[],isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getNup',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    handleBuy = (msg) => {
        Actions.NUPPay({nup_type : msg})
    }
 
    render() {
        const ribbon = {
            P : {uri : urlApi+"images/ribbon/Platinum.png"},
            S : {uri : urlApi+"images/ribbon/Silver.png?random_number=" + new Date().getTime()},
            G : {uri : urlApi+"images/ribbon/Gold.png?random_number=" + new Date().getTime()},
        }
        // const badges = (badges) =>(
        //     <Image
        //         source={ribbon}
        //         style={Styles.badges}
        //     />
        // )

        return (
            <View style={Styles.section}>
                <FlatList
                    data={this.state.nups}
                    style={Styles.item}
                    keyExtractor = {item => item.nup_type}
                    renderItem={({ item, separators }) => (
                        <TouchableHighlight underlayColor="transparent">
                            <View style={Styles.record}>
                                <View style={Styles.itemImg}>
                                    <Image
                                        source={{ uri: item.gallery_url }}
                                        style={Styles.itemImg}
                                    />
                                    <Image
                                        source={ribbon[item.badges]}
                                        style={Styles.badges}
                                    />
                                </View>
                                <View style={Styles.itemInfo}>
                                    <Text style={Styles.itemTitle}>
                                        {item.descs}
                                    </Text>
                                    <Text style={[Styles.itemLocation,{color:item.refund_type == 'Y' ? '#31e000' : '#e00000'}]}>
                                        {item.refund_type == 'Y' ? 'Refund' : 'Non Refund' }
                                    </Text>
                                    <Text style={Styles.itemLocation}>
                                        Periode : {moment(item.start_date).format('DD MMM YYYY')}{" "}
                                        {/* sd. {item.endperiode} */}
                                    </Text>
                                    <View style={Styles.itemRow}>
                                        {/* <Text
                                            style={Styles.itemDiscount}
                                        >
                                            {item.discount}{" "}
                                        </Text> */}
                                        <Image style={Styles.rupiah} source={require('@Asset/icon/rupiah.png')} />
                                        <Text
                                            style={Styles.itemLocation}
                                        >
                                            
                                            {"  "+numFormat(item.nup_amt)}
                                        </Text>
                                    </View>
                                    <View style={Styles.trash}>
                                        <Button
                                            rounded
                                            style={Styles.btnBuy}
                                            onPress={()=>{this.handleBuy(item.nup_type)}}
                                        >
                                            <Icon
                                                name="shopping-cart"
                                                type="FontAwesome"
                                                style={Styles.itemIcon}
                                            />
                                            <Text>Buy</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        );
    }
}
export default NUPHistory;
