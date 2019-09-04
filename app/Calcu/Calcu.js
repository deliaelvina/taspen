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
import numFormat from '@Component/numFormat'
import {Fonts, Metrics, Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class Calcu extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        customers : [],
        user : "",
        name : "",
        project : [],
        isCount:false,

        totalCredit : '',
        bunga : '',
        time : '',
        angsuran : ''
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
        // this.getCustomers()
      })
    }

    count = () =>{
        const {totalCredit,bunga,time} = this.state
        let kredit = this.unFormat(totalCredit)
        let bunga1 = bunga / 1200
        let waktu = time * 12

        const angsuran1 = Math.round((kredit * bunga1) * (1/(1-(1/(Math.pow((1+bunga1),waktu))))))

        this.setState({isCount:true,angsuran:this.format(angsuran1)})
    }

    format = (angka) =>{
        const data = Math.floor(angka)
        if(angka==null){
            return '-';
        }
        let val = this.unFormat(angka)
        return val.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }

    unFormat = (value)=>{
        let a = value.toString().replace(/^0+/, '').replace(/\D/g,'')
        return a
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
                        onPress={Actions.pop}>
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
                        {"Simulasi Perhitungan KPA/R".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <Content
                style={Style.layoutInner}
                contentContainerStyle={Style.layoutContent}>
                <View>
                    <View style={styles.overview}>

                        <TextInput
                            style={styles.textInput}
                            placeholder={"Total Credit ( IDR )"}
                            keyboardType="numeric"
                            value={this.state.totalCredit}
                            onChangeText={(val)=>this.setState({totalCredit:this.format(val)})}
                        />

                        <View style={styles.col}>
                            <TextInput
                            style={styles.textInputHalf}
                            placeholder={"Bunga (%)"}
                            keyboardType="numeric" 
                            value={this.state.bunga}
                            onChangeText={(val)=>this.setState({bunga:val})}
                            />
                            <TextInput
                            style={styles.textInputHalf}
                            placeholder={"Time (years)"}
                            keyboardType="numeric" 
                            value={this.state.time}
                            onChangeText={(val)=>this.setState({time:val})}
                            />
                        </View>

                        <Button style={styles.btn} onPress={()=>this.count()}>
                            <Text style={styles.formBtnText}>{"Hitung".toUpperCase()}</Text>
                            <Icon active name="calculator" type="FontAwesome" style={styles.formBtnIcon} />
                        </Button>

                    </View>
                    {this.state.isCount ?
                        <View style={styles.overviewResult}>

                            <Text style={styles.countText}>
                                JUMLAH ANGSURAN (PERBULAN)
                            </Text>
                            <Text style={styles.numResultText}>
                                {this.state.angsuran}
                            </Text>
                        </View>
                    :null}
                    <View style={styles.overview}>

                        <Text style={styles.countText}>
                        * Angka di atas merupakan angka estimasi, untuk lebih akuratnya mohon hubungi bank terkait.
                        </Text>
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
    overview: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor : '#fff'
    },
    overviewResult: {
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius:5,
        backgroundColor : '#f3f3f3'
    },
    overviewTitle: {
        flex: 1,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
    },
    textInput: {
		fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    textInputHalf: {
		fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '48.5%',
        marginBottom: 10,
        borderRadius: 5,
    },
    btn: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#FCC300',
        paddingVertical: 15,
        paddingLeft: 5,
      },
    btnText: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        color: '#333',
        fontSize: 14,
        alignSelf: 'center',
    },
    formBtnText: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        color: '#333',
        fontSize: 12,
    },
    formBtnIcon: {
        color: '#333',
        fontSize: 24,
    },
    countText: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        fontSize: 12,
        color: '#999',
        flexWrap: 'wrap',
        flex :1,
        textAlign : 'center'
    },
    numResultText: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        fontSize: 15,
        color: '#000',
        flexWrap: 'wrap',
        flex :1,
        textAlign : 'center'
    },
    col: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

//make this component available to the app
export default Calcu;
