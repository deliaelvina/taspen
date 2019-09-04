import React from 'react'
import { StatusBar,Alert ,ActionSheetIOS, WebView, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView,  FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, Accordion, View, FooterTab, Badge, List, ListItem, Tab, Tabs,Picker, } from 'native-base'

import NavigationService from '@Service/Navigation'

import Styles from './Style'
import Icons from 'react-native-vector-icons/FontAwesome';
import {urlApi} from '@Config/services';
import { Actions } from 'react-native-router-flux';
import {_storeData,_getData,_getAllData,_removeData} from '@Component/StoreAsync';
import { Style, Colors } from "../Themes/";
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob'
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            gender: null,
            email : '',
            name : '',
            group : '',
            userId : '',
            token : '',
            gender : '',
            hp : '',

            newPass : '',
            curPass : '',
            conPass : '',

            dataProfile : [],
            fotoProfil : require('@Asset/images/1.png'),
            fotoHeader : require('@Asset/images/1.png'),
        }

        this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
        this.renderAccordionContent = this.renderAccordionContent.bind(this)
        this.renderAccordionContentBasic = this.renderAccordionContentBasic.bind(this)
        this.renderAccordionContentAddress = this.renderAccordionContentAddress.bind(this)
        this.renderAccordionContentContact = this.renderAccordionContentContact.bind(this)
        this.renderAccordionContentSocial = this.renderAccordionContentSocial.bind(this)


    }

    async componentDidMount(){
        const data = {
          email :  await _getData('@User'),
          userId : await _getData('@UserId'),
          name :  await _getData('@Name'),
          group : await _getData('@Group'),
          token : await _getData('@Token'),
          hp : await _getData('@Handphone')
        }
    
        this.setState(data,()=>{
            this.getProfile()
        })
    }

    componentWillUnmount() {
        this.props.onBack()
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
            let urlHeader = resData.pict_header + '?random_number=' + new Date().getTime()
            this.setState({
                dataProfile:resData,
                fotoProfil:{uri:url},
                fotoHeader:{uri:urlHeader},
                gender : resData.gender
            })
            console.log('res Profil',res);
        }).catch((error) => {
            console.log(error);
        });
    }

    save = () => {
        const {email,name,hp,gender} = this.state

        const formData = {
            UserName : email,
            Name : name,
            Handphone : hp,
            Gender : gender,
            wherename : name,

        }

        fetch(urlApi+'c_profil/save/',{
            method : "POST",
            body :JSON.stringify(formData),
            headers :{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token' : this.state.token
            }
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                alert(res.Pesan)
                _storeData('@Name',name)
                _storeData('@Handphone',hp)
                _storeData('@ProfileUpdate',true)
            }
            console.log('save profile',res)

        }).catch((error) => {
            console.log(error);
        });
    }

    changePassPress = () =>{
        const {newPass,curPass,conPass} = this.state

        if(newPass != '' && curPass != '' && conPass != ''){
            if(newPass == conPass){
                this.changePass()
            } else {
                alert('Password does not match')
            }
        } else {
            alert('Password can not be null')
        }

    }

    changePass = () =>{
        const {email,newPass,curPass} = this.state

        const formData = {
            email : email,
            password : newPass,
            cpassword : curPass
        }

        fetch(urlApi+'c_profil/changePassReact/',{
            method : "POST",
            body :JSON.stringify(formData),
            headers :{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token' : this.state.token
            }
        })
        .then((response) => response.json())
        .then((res)=>{
            alert(res.Pesan)
            console.log('save profile',res)

        }).catch((error) => {
            console.log(error);
        });
    }

    renderAccordionHeader(item, expanded) {
        return (
            <View style={Styles.accordionTab}>
                <Text style={Styles.accordionTabText}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={Styles.accordionTabIcon} name="minus" type="Foundation" />
                    : <Icon style={Styles.accordionTabIcon} name="plus" type="Foundation" />}
            </View>
        );
    }
    renderAccordionContent(item) {
        var fn = 'renderAccordionContent' + (item.type.charAt(0).toUpperCase() + item.type.substr(1));
        return <View style={Styles.accordionContent}>
            {this[fn]()}
        </View>
    }
    renderAccordionContentBasic() {
        let {gender,name,email,hp,group} = this.state

        return <View>
            <TextInput style={Styles.textInput} placeholder={'Email'} value={email} />
            <TextInput style={Styles.textInput} placeholder={'Group'} value={group} />
            <TextInput style={Styles.textInput} placeholder={'First Name'} value={name} onChangeText={(val)=>{this.setState({name:val})}}/>
            {Platform.OS == "ios" ?
                <TouchableOpacity onPress={()=>this.showActionSheet()}>
                    <View pointerEvents="none">
                        <TextInput style={Styles.textInput} placeholder={'Gender'} value={gender} />
                    </View>
                </TouchableOpacity>
            :
                <Picker 
                placeholder="Gender"
                selectedValue={this.state.gender}
                style={{width: '100%',marginHorizontal:10}} 
                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                onValueChange={(val)=>this.setState({gender:val})}>
                    <Item label="Male" value="Male" />
                    <Item label="Female" value="Female" />
                </Picker>
            }
            
            <TextInput style={Styles.textInput} placeholder={'Handphone'} value={hp} onChangeText={(val)=>{this.setState({hp:val})}} />
            {/* <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={8} placeholder={'About You'} /> */}
            <Button style={Styles.btn} onPress={() => {this.save()}}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentAddress() {
        return <View>
            <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={2} placeholder={'Address'} />
            <View style={Styles.col}>
                <TextInput style={Styles.textInputHalf} placeholder={'City'} />
                <TextInput style={Styles.textInputHalf} placeholder={'State'} />
            </View>
            <TextInput style={Styles.textInput} placeholder={'Country'} />
            <TextInput style={Styles.textInput} placeholder={'Postcode'} />
            <Button style={Styles.btn} onPress={() => {
                NavigationService.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentContact() {
        return <View>
            <TextInput style={Styles.textInput} placeholder={'Your Mobile No.'} />
            <TextInput style={Styles.textInput} placeholder={'Your Telephone No.'} />
            <TextInput style={Styles.textInput} placeholder={'Your Email Address'} />
            <TextInput style={Styles.textInput} placeholder={'Your Website url'} />
            <Button style={Styles.btn} onPress={() => {
                NavigationService.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentSocial() {
        return <View>
            <TextInput style={Styles.textInput} placeholder={'Current Password'} onChangeText={(val)=>this.setState({curPass:val})} value={this.state.curPass} />
            <TextInput style={Styles.textInput} placeholder={'New Password'} onChangeText={(val)=>this.setState({newPass:val})} value={this.state.newPass} />
            <TextInput style={Styles.textInput} placeholder={'Confirm Password'} onChangeText={(val)=>this.setState({conPass:val})} value={this.state.conPass} />
            <Button style={Styles.btn} onPress={() => {this.changePassPress()}}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }

    signOut = async () => {
        const data = await _getAllData();
        data.map((val)=>{
            if(val != "@isIntro"){
                _removeData(val)
            }
        })
        Actions.reset('Login')
    }

    showAlert = () => {
        Alert.alert(
            'Select a Photo',
            'Choose the place where you want to get a photo',
            [
              {text: 'Gallery',onPress: () => this.fromGallery()},
              {text: 'Camera', onPress: () => this.fromCamera()},
              {text: 'Cancel', onPress: () => console.log('User Cancel'),style: 'cancel'},
            ],
            {cancelable: false},
        );
    }

    fromCamera() {

        ImagePicker.openCamera({
          cropping: true,
          width : 200,
          height : 200,
        }).then(image => {
          console.log('received image', image);

          this.setState({fotoProfil:{uri:image.path}},()=>
            this.uploadPhoto()
          )
      
        }).catch(e => console.log('tag', e));
    }

    fromGallery(cropping, mediaType='photo') {

        ImagePicker.openPicker({
        multiple : false,
        width : 200,
        height : 200,
        }).then(image => {
          console.log('received image', image);

          this.setState({fotoProfil:{uri:image.path}},()=>
            this.uploadPhoto()
          )
      
        }).catch(e => console.log('tag', e));
    }

    uploadPhoto =  async() =>{
        let fileName = 'profile.png';
        let fileImg = RNFetchBlob.wrap(this.state.fotoProfil.uri.replace('file://',''));

        RNFetchBlob.fetch('POST', urlApi+'/c_profil/upload/'+this.state.email, {
            'Content-Type' : 'multipart/form-data',
            'Token' : this.state.token
        }, [
            { name : 'photo', filename : fileName, data: fileImg},
        ]).then((resp) => {
            let res = JSON.stringify(resp.data);
            console.log('res',resp);
            _storeData('@ProfileUpdate',true)
        })
       
    }

    logout = () => {
        Alert.alert(
            '',
            'Are you want to Logout',
            [
                {text: 'Cancel',onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                {text: 'OK', onPress: () => this.signOut()},
            ],
            {cancelable: false},
        );
    }

    showActionSheet(){
        const data = ['Cancel','Male','Female']
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: data,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex !== 0) {
                    this.setState({gender : data[buttonIndex]})
                }
            },
        );
    }

    render() {
        let {fotoProfil,fotoHeader} = this.state
        
        return (<Container style={Style.bgMain}>
            <StatusBar backgroundColor={Colors.statusBarOrange} animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.profile}>
                    <ImageBackground source={fotoHeader} imageStyle={'cover'} style={Styles.coverImg}>
                    </ImageBackground>

                    <View style={Styles.bgBlue}>
                    </View>
                    <View style={[Styles.owner, Style.actionBarIn]}>
                        <View style={Styles.ownerBg}>
                            <Image source={ fotoProfil } style={Styles.ownerAvatarImg} />
                            <Icons name="camera" onPress={()=>this.showAlert()} style={Styles.iconEdit} />
                        </View>
                        <View style={Styles.ownerInfo}>
                            <Text style={Styles.ownerName}>{this.state.name}</Text>
                            <Text style={Styles.ownerLocation}>{this.state.group}</Text>
                        </View>
                    </View>
                    <View style={[Styles.back, Style.actionBarIn]}>

                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            Actions.pop()
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </View>

                <View style={Styles.formBg}>
                    <Accordion
                        style={Styles.accordion}
                        dataArray={[
                            {
                                type: 'basic',
                                title: 'Basic',
                            },
                            
                            {
                                type: 'social',
                                title: 'Change Password'
                            },
                        ]}
                        expanded={0}
                        renderHeader={this.renderAccordionHeader}
                        renderContent={this.renderAccordionContent}
                    />
                </View>

                <View style={{marginHorizontal:15,marginVertical:5,alignItems:'center'}}>
                    <TouchableOpacity style={Styles.sBtn} onPress={()=>this.logout()}>
                        <Text style={Styles.sLink} > Logout</Text>
                        <Icon name="log-out" style={{color : "#fff",fontSize: 18,}} />
                    </TouchableOpacity>
                </View>

            </Content>
        </Container>
        );
    }
}