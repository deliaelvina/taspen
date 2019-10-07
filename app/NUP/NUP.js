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
    Alert,
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
import CheckBox from 'react-native-check-box';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Actions } from "react-native-router-flux";
import { Style, Colors } from "../Themes";
import Styles from "./Style";
import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from '@Component/numFormat'
import moment from 'moment'

class NUPPage extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        nups : [],
        user : "",
        name : "",
        project : [],
        isVisible : false,

        selData : null,
        selNup : "yakk" 
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
      

      isMount=true

      this.setState(data,()=>{
          this.getNup()
          this.getMedia()

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

    getMedia = () => {
        {isMount ?
        // const {entity_cd,project_no} = this.props.items
        fetch(urlApi+'c_media/getMedia/',{
            method : "GET",
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
              const resData = res.Data
      
              this.setState({dataMedia:resData})
              console.log('dataMedia',resData);
            }
        }).catch((error) => {
            console.log(error);
        })
        :null}
      }

    handleBuy = (msg) => {
        // this.setModalVisible(true)
        // this.setState({selNup : msg.descs,selData : msg})
        Actions.NUPDetail({nup : msg})
    }
    // handleOk(){
    //     this.setModalVisible(false)
    //     Actions.NUPDetail({nup : this.state.selData})
    // }
    
    setModalVisible(visible) {
        this.setState({isVisible: visible});
    }

    

    render() {
        const ribbon = {
            P : {uri : urlApi+"images/ribbon/Platinum.png"},
            S : {uri : urlApi+"images/ribbon/Silver.png"},
            G : {uri : urlApi+"images/ribbon/Gold.png"},
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
                                    <Text style={Styles.itemLocation}>
                                        {item.project_name}
                                    </Text>
                                    <Text style={Styles.itemTitle}>
                                        {item.descs}
                                    </Text>
                                    <Text style={[Styles.itemLocation,{color:item.refund_type == 'Y' ? '#31e000' : '#e00000'}]}>
                                        {item.refund_type == 'Y' ? 'Refund' : 'Non Refund' }
                                    </Text>
                                    {/* <Text style={Styles.itemLocation}>
                                        Periode : {moment(item.start_date).format('DD MMM YYYY')}{" "}
                                        sd. {item.endperiode}
                                    </Text> */}
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
                                            onPress={()=>{this.handleBuy(item)}}
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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.isVisible)
                    }}>
                    <View style={{justifyContent : 'center', alignItems:'center', flex: 1, backgroundColor:'rgba(0, 0, 0, 0.15)'}}>
                        <View style={{
                            width : Dimensions.get('window').width * 0.7,
                            height : Dimensions.get('window').height * 0.40,
                            borderRadius : 8,
                            backgroundColor : '#fff',
                            elevation : 8,
                        }}>
                            <View style={{width : '100%', height : '15%'}}>
                                {/* <Image style={{alignSelf : 'flex-end', padding : 5}} /> */}
                                <Icon
                                    name="times"
                                    type="FontAwesome"
                                    style={{
                                        fontSize:25,
                                        padding: 8,
                                        alignSelf: 'flex-end',
                                    }}
                                />
                            </View>
                            <View style={{width : '100%', height : '55%', justifyContent : 'space-evenly',alignItems : 'center'}}>
                                <View>
                                    <Text>{'Project :' +this.state.selNup}</Text>
                                </View>
                                <View style={{justifyContent : 'space-evenly',flexDirection:'row'}}>
                                    <CheckBox
                                        onClick={()=>{
                                        this.setState({
                                            isChecked:!this.state.isChecked
                                        })
                                        }}
                                        isChecked={this.state.isChecked}
                                    />
                                    <Text style={{width : '80%'}}>Disclaimer Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                                </View>
                            </View>
                            <View style={{width : '100%', height : '30%',justifyContent : 'center',alignItems : 'center'}}>
                                <TouchableOpacity onPress={this.handleOk}> 
                                    <Text style={{color : Colors.loginBlue}}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default NUPPage;
