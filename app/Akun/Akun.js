import React from 'react'
import { StatusBar,ActivityIndicator, TouchableOpacity, TextInput, StyleSheet, Image, TouchableHighlight, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList } from 'react-native'
import { Container,List,ListItem, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'

import NavigationService from '../Service/Navigation'

import MESSAGES from './Messages'
import { Fonts, Metrics, Colors,Style } from '../Themes/';
import Styles from './Style'
import Styles2 from './Style2'
import {_storeData,_getData} from '@Component/StoreAsync';
import { Actions } from "react-native-router-flux";
import {urlApi} from '@Config/services';
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Akun extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            email : '',
            name : '',
            group : '',
            dashmenu : [],
            fotoProfil : 'http://35.198.219.220:2121/alfaAPI/images/profil/avatar.png',
            isLogin : false,
            isLoaded : false
        }
    }

    async componentDidMount(){
        const data = {
          email :  await _getData('@User'),
          userId : await _getData('@UserId'),
          name :  await _getData('@Name'),
          group : await _getData('@Group'),
          token : await _getData('@Token'),
          dashmenu : await _getData('@DashMenu') ? await _getData('@DashMenu') : [],
          isLogin : await _getData('@isLogin')
        }

        console.log('datra',data);
        this.setState(data,()=>{
            if(data.isLogin){
                this.getProfile()
            }
        })

        setTimeout(()=>{
            this.setState({isLoaded : true})
        },2000)
    }

    receiveProps = async() =>{
        const data = {
          name :  await _getData('@Name'),
        }

        if(await _getData('@ProfileUpdate')){
            _storeData('@ProfileUpdate',false)
            this.setState(data)
            this.getProfile()
        }

    }

    getProfile = () => {
        
        fetch(urlApi+'c_profil/getData/IFCAMOBILE/'+this.state.email+'/'+this.state.userId,{
            method : "GET",
            headers :{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token' : this.state.token
            }
        })
        .then((response) => response.json())
        .then((res)=>{
            const resData = res.Data[0];

            // ? Agar Gambar Tidak ter cache 
            let url = resData.pict + '?random_number=' + new Date().getTime()
            this.setState({fotoProfil:url})
            console.log('res Profil',this.state);
        }).catch((error) => {
            console.log(error);
        });
    }


    goToFeed = (val) =>{
        if(val.isProject == 1){
            Actions.project({goTo : val.URL_angular})
        } else {
            Actions[val.URL_angular]()
        }
    }

    render() {
        let dashmenu = this.state.dashmenu.length % 3
        let secLoop = [0,1]

            return (
                <Container style={Style.bgMain}>

                    <Header style={Styles.profile}>
                    <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />
						<Left style={Styles.left}>
                            <Button transparent style={Style.actionBarBtn} onPress={Actions.pop} >
                                <Icon
                                    active
                                    name="arrow-left"
                                    style={Style.textBlack}
                                    type="MaterialCommunityIcons"
                                />
                            </Button>
                        </Left>
						<Body style={Styles.body}>
                            
                        </Body>
						<Right style={Styles.right}></Right>
					</Header>
                    <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                        <View style={Styles.section}>


                            <List style={Styles2.infoTab}>

                                { this.state.dashmenu.map((val,key)=>

                                    <ListItem key={key} style={Styles2.infoItem} onPress={()=>this.goToFeed(val) }>
                                        <Image source={{uri : urlApi+"images/dashPict/"+val.picture}} style={Styles2.infoIcon} />
                                        <View style={{alignSelf:'center'}} style={{alignSelf:'center'}}>
                                            <Text style={Styles2.infoHeader}>{val.Title}</Text>
                                            <Text style={Styles2.infoDesc}>{'Account Setting & Change Password'}</Text>
                                        </View>

                                        <Right style={{position:'absolute',right:10}}>
                                            <Icon name="ios-arrow-dropright" style={{fontSize: 30,}} />
                                        </Right>
                                    </ListItem>
                                )}

                                
                            </List>


                                {/* {this.state.isLogin ? 
                                    <View style={Styles.profile}>
                                        <Image source={{uri:this.state.fotoProfil}} style={Styles.avatar} />
                                        <View>
                                            <Text style={Styles.profileName}>{this.state.name}</Text>
                                            <Text style={Styles.profileLocation}>{this.state.group}</Text>
                                        </View>
                                        <Right>
                                            <TouchableOpacity style={Styles.settingBtn} onPress={() => { Actions.profile({onBack:()=>this.receiveProps()}) }}>
                                                <Icon name="cog" style={{color : "#666",fontSize: 18,}} />
                                                <Text style={Styles.sLink} > Settings</Text>
                                            </TouchableOpacity>
                                        </Right>    
                                    </View>                                    
                                :                                    
                                    <View style={[Styles.profile,{alignItems:'center',justifyContent:'center',marginHorizontal:30}]}>
                                        <View style={Styles.loginWrap}>
                                        <Text style={Styles.loginText}>Welcome Guest</Text>
                                            <TouchableOpacity style={Styles.login} onPress={() => { Actions.Login()}}>
                                                <Text style={Styles.loginLink} > Sign In or Register</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                } */}
    
    
                            {/* <View style={Styles.btnLayout}>
                            { this.state.dashmenu.map((val,key)=>
                                <TouchableOpacity key={key} style={Styles.btnBox} onPress={() => {
                                    this.goToFeed(val)
                                }}>
                                    <Image source={{uri : urlApi+"images/dashPict/"+val.picture}} style={Styles.imgBtn} />
                                    <Text style={Styles.btnText}>{val.Title}</Text>
                                </TouchableOpacity>
                            )} */}
    
                                {/* <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                    NavigationService.navigate('MemberMessages')
                                }}>
                                    <Image source={require('@Asset/images/btn-messages.png')} style={Styles.btnImg} />
                                    <Text style={Styles.btnText}>Messages</Text>
                                </TouchableOpacity>
    
                                <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                    Actions.profile()
                                }}>
                                    <Image source={require('@Asset/images/btn-boy.png')} style={Styles.btnImg} />
                                    <Text style={Styles.btnText}>Profile</Text>
                                </TouchableOpacity>
    
                                <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                    NavigationService.navigate('MemberFavorites')
                                }}>
                                    <Image source={require('@Asset/images/btn-favorites.png')} style={Styles.btnImg} />
                                    <Text style={Styles.btnText}>Favorites</Text>
                                </TouchableOpacity>
    
                                <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                    NavigationService.navigate('MemberSettings')
                                }}>
                                    <Image source={require('@Asset/images/btn-settings.png')} style={Styles.btnImg} />
                                    <Text style={Styles.btnText}>Settings</Text>
                                </TouchableOpacity> */}
                            
                            {/* <TouchableOpacity style={Styles.btnBox}
                                onPress={()=>this.goToFeed({URL_angular : "ReportNew",isProject:1})}>
                                <Image source={{uri : urlApi+"images/dashPict/profits.png"}} style={Styles.imgBtn} />
                                <Text style={Styles.btnText}>New Report</Text>
                            </TouchableOpacity> */}
    
                            {/* <TouchableOpacity style={Styles.btnBox}
                                onPress={()=>this.goToFeed({URL_angular : "NUPPage",isProject:1})}>
                                <Image source={{uri : urlApi+"images/dashPict/profits.png"}} style={Styles.imgBtn} />
                                <Text style={Styles.btnText}>NUP</Text>
                            </TouchableOpacity>
                        
                            { dashmenu == 2 ? 
                                <TouchableOpacity style={Styles.btnTrans}>
                                </TouchableOpacity>
                            : dashmenu == 1 ?
                                secLoop.map((val)=>
                                    <TouchableOpacity key={val} style={Styles.btnTrans}>
                                    </TouchableOpacity>
                                )
                            : null}
                            </View> */}
    
                            {/* <View style={Styles.message}>
                                <View style={Styles.headerBg}>
                                    <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                                    <Text style={Styles.sHeader}>{'Recent Messages'.toUpperCase()}</Text>
                                    <Right>
                                        <Button small rounded style={Styles.sBtn} onPress={() => { NavigationService.navigate('MemberMessages') }}>
                                            <Text style={Styles.sLink} >See All</Text>
                                        </Button>
                                    </Right>
                                </View>
                                <FlatList
                                    data={MESSAGES}
                                    style={Styles.item}
                                    renderItem={({ item, separators,key }) => (
                                        <TouchableHighlight key={key} underlayColor='transparent' onPress={() => { NavigationService.navigate('MemberMessages') }}>
                                            <View style={Styles.record}>
                                                <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                                <View style={Styles.itemInfo}>
                                                    <Text style={Styles.itemTitle}>{item.name}</Text>
                                                    <Text style={Styles.itemDesc}>{item.desc}</Text>
                                                </View>
                                                <Text style={Styles.itemDate}>{item.date}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )}
                                />
                            </View> */}
                        </View>
                    </Content>
                </Container>
            )
        
    }
}

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn : {
        backgroundColor : Colors.loginBlue,
        padding :10
    }
});