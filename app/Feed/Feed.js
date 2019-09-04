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

let isMount = false

class Feed extends Component {

    constructor(props){
        super(props)
  
        this.state={
            hd : null,
    
            news : [],
            type : "",
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
            this.getNews()
        })
    }
  
    getNews = () =>{
  
        {isMount ?
            fetch(urlApi+'c_newsandpromo/getDataNewsAndPromo/IFCAMOBILE/'+this.state.type,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({news : resData})
                    console.log('res',res);
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getNews',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    changeType(type){
        let settedType = type == this.state.type ? "" : type

        this.setState({type : settedType},()=>{
            this.getNews()
        })
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
                            {"News & Promo".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}>
                        {/* <TouchableOpacity
                            onPress={() => this.setState({ isVisible: true })}
                        >
                            <Icon name="add" style={Style.textWhite} />
                        </TouchableOpacity> */}
                    </View>
                </Header>
                <Content style={[Style.layoutContent,{backgroundColor:'#f3f3f3'}]} >
                    <ScrollView
                    scrollEventThrottle={200}
                    directionalLockEnabled={true}
                    >
                        <View style={Styles.sectionGrey}>
                            <View style={Styles.headerBg}>
                                {/* <Icon name="newspaper" type="FontAwesome5" style={Styles.headerIcon} />
                                <Text style={Styles.sHeader}>{'News And Promo'.toUpperCase()}</Text> */}
                                <TouchableOpacity onPress={()=>this.changeType('news')} style={[Styles.btnSelect,{borderBottomColor:this.state.type=="news" ? Colors.headerOrange : '#f3f3f3'}]}>
                                    <Text style={{color:this.state.type=="news" ? Colors.headerOrange : '#333'}}>News</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.changeType('promo')} style={[Styles.btnSelect,{borderBottomColor:this.state.type=="promo" ? Colors.headerOrange : '#f3f3f3'}]}>
                                    <Text style={{color:this.state.type=="promo" ? Colors.headerOrange : '#333'}}>Promo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginTop:5}}>
                            {this.state.news.map((data,key)=>
                                <TouchableOpacity key={key} style={Styles.newsContainer} onPress={()=>Actions.NewsAndPromoDetail({items : data})}>
                                    <View style={Styles.newsTextWrap}>
                                        <Text style={Styles.newsTitle}>{data.subject}.</Text>
                                        <Text style={Styles.newsLocation}>{data.descs}</Text>
                                    </View>
                                    <View style={Styles.newsImageWrap}>
                                        <Image style={Styles.newsImage} source={{uri : data.picture}} />
                                    </View>
                                    <View style={[Styles.newsBadge,{backgroundColor : data.content_type=="news" ? '#f5ef42' : '#f56822'}]}>
                                        <Text>{data.content_type.charAt(0).toUpperCase()+data.content_type.slice(1)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>


                    </ScrollView>
                </Content>


            </Container>
        );
    }
}
export default Feed;
