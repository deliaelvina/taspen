import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    Image,
    Dimensions
} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    Content
} from "native-base";
import { Style, Colors } from "../Themes";
import Styles from "./Style";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';
import moment from 'moment';
import numFormat from '@Component/numFormat';


class NUPDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            qty : 1
        };

        console.log('prop',props);
        this.handleBuyNow = this.handleBuyNow.bind(this);
    };

    handleQty(type){
        let {qty} = this.state;
        
            type == "minus" ? 
                qty > 1 ? 
                    this.setState({qty : qty - 1}) 
                : null
            : 
            this.setState({qty : qty + 1});
    };

    handleBuyNow(){
        Actions.NUPTerm({nup : {...this.props.nup, ...this.state}});
    }
 
    render() {
        const {project_name,descs,refund_type,end_date,nup_amt,info_nup,gallery_url} = this.props.nup;

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
                            {"NUP Detail".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                </Header>
                <Content contentContainerStyle={{padding:18}}>
                    <View style={lstyles.container}>
                        <View style={lstyles.topContent}>
                            <View style={lstyles.imageWrap}>
                                <Image resizeMode="cover" source={{uri : gallery_url}} style={lstyles.image} />
                            </View>
                            <View style={lstyles.topTextWrap}>
                                <Text style={Styles.itemLocation}>{project_name}</Text>
                                <Text style={Styles.itemTitle}>{descs}</Text>
                                <Text style={[Styles.itemLocation,{color:refund_type == 'Y' ? '#31e000' : '#e00000'}]}>
                                    {refund_type == 'Y' ? 'Refund' : 'Non Refund' }
                                </Text>
                                <Text style={Styles.itemLocation}>
                                    Periode : {moment(end_date).format('DD MMM YYYY')}
                                </Text>
                                <View style={Styles.itemRow}>
                                    <Image style={Styles.rupiah} source={require('@Asset/icon/rupiah.png')} />
                                    <Text style={Styles.itemLocation}>  {numFormat(nup_amt)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lstyles.midContent}>
                            <View style={lstyles.midText}>
                                <HTML html={info_nup} baseFontStyle={{fontFamily: "Montserrat-SemiBold"}} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>
                        </View>
                    </View>
                </Content>
                <View style={lstyles.botContent}>
                    
                    <View style={lstyles.qtyWrap}>
                        <Text style={{fontSize : 20}}>Quantity</Text>
                        <View style={lstyles.btnQty}>
                            <Icon name="minus" type="FontAwesome5" style={lstyles.icon} onPress={()=>this.handleQty("minus")} />
                            <Text style={lstyles.qty}>
                                {this.state.qty.toString()}
                            </Text>
                            <Icon name="plus" type="FontAwesome5" style={lstyles.icon} onPress={()=>this.handleQty("plus")} />
                        </View>
                    </View>
                    <View style={lstyles.btnBuyWrap}>
                        <Text style={[Style.actionBarText,{fontSize:20}]} onPress={this.handleBuyNow}>Buy Now</Text>
                    </View>
                </View>
            </Container>

        );
    };
};
export default NUPDetail;

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

const lstyles = StyleSheet.create({
    container : {
        flex : 1,
    },
    topContent:{
        flexDirection : 'row',
    },
    midContent : {
        marginTop : 10
    },
    botContent : {
        position : 'absolute',
        bottom : 0,
        left :0,
        width : '100%',
        height : 60,
        backgroundColor : '#333',
        flexDirection : 'row',
        elevation : 10,
        // justifyContent : 'center',
        // alignItems : 'center',
        // paddingHorizontal : 30
    },
    imageWrap : {
        width : '50%',
        backgroundColor : "#333"
    },
    image : {
        flex:1, width: null, height: null,
        aspectRatio : 1
    },  
    topTextWrap : {
        width : '50%',
        backgroundColor : "#fff",
        paddingHorizontal: 15,
    },

    qtyWrap : {
        flexDirection : 'row',
        width : '50%',
        backgroundColor : '#f3f3f3',
        justifyContent : 'space-evenly',
        alignItems :'center'
    },
    btnQty : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        width : '50%',
        // borderColor: Colors.headerOrange,
        // borderWidth : 1,
    },
    btnBuyWrap : {
        width : '50%',
        backgroundColor : Colors.headerOrange,
        justifyContent : 'center',
        alignItems:'center'
    },  
    icon : {
        fontSize : 18
    }
});