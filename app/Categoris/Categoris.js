//import liraries
import React from 'react'
import { StatusBar,ActivityIndicator , TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, View, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'

import PROPERTIES from './Properties'

import {Actions} from 'react-native-router-flux';

import { Style, Colors } from "../Themes/";
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
let isMount = false

// create a component
class Categoris extends React.Component {
    constructor(props){
        super(props)

        this.state={
            hd : null,

            properties : []
        }
    }

    async componentDidMount(){
        isMount = true

        const data = {
            hd : new Headers({
              'Token' : await _getData('@Token')
            })
        }
        this.setState(data,()=>{
            this.getLotType()
        })
    }

    getLotType = () =>{
        const item = this.props.items
        {isMount ?
            fetch(urlApi+'c_product_info/getLotType/'+item.db_profile+'/'+item.entity_cd+'/'+item.project_no+'/'+item.tower,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({properties : resData})
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getLotType',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    clickUnitgoris(item) {
        Actions.unitdetail({items : item,prevItems : this.props.items});
        this.setState({ click : true})
    }

    render() {
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation}>
                    <StatusBar backgroundColor={Colors.statusBarOrange} animated barStyle="light-content" />

                    <View style={Style.actionBarLeft}>
                        <Button transparent style={Style.actionBarBtn} onPress={Actions.pop}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>{'Categoris'.toUpperCase()}</Text>
                    </View>
                    <View style={Style.actionBarRight}>
                    </View>
                </Header>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground style={Styles.homeBg}>
                    <View style={Styles.section}>
                        {this.state.properties.length == 0 ?
                            <ActivityIndicator />
                        :
                        <FlatList
                        data={this.state.properties}
                        style={Styles.item}
                        keyExtractor = {item => item.lot_type}
                        renderItem={({ item, separators }) => (
                            <TouchableHighlight underlayColor='transparent' onPress={() => this.clickUnitgoris(item)}>
                                <View style={Styles.record}>
                                    <Image source={{ uri: item.picture_url }} style={Styles.itemImg} />
                                    <View style={Styles.itemInfo}>
                                        <Text style={Styles.itemTitle}>{item.descs}</Text>
                                       
                                    </View>
                                    <View style={Styles.trash}>
                                        <Button transparent onPress={() => {
                                            NavigationService.navigate('MemberFavorites')
                                        }}>
                                            <Icon name="arrow-right" type="FontAwesome" style={Styles.itemIcon} />
                                        </Button>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}/>                        
                        }
                    </View>


                </ImageBackground>
            
            </Content>
            </Container>
        );
    }
}

//make this component available to the app
export default Categoris;
