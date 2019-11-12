//import liraries
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
    Alert,
    PixelRatio,
    Modal
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Picker,
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
    CardItem,
    Form,
    Label
} from "native-base";

import { Actions } from "react-native-router-flux";

import { Style, Colors } from "../Themes";
import Styles from "./Style";
import ImagePicker from 'react-native-image-crop-picker';
import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import numFormat from "@Component/numFormat";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import WebView from '@Component/WebView';
import { existsTypeAnnotation } from "@babel/types";
import RNFetchBlob from "rn-fetch-blob";

let isMount = false;
const buttonStepStyle = {

}

const sports = [
    {
        label: 'Football',
        value: 'football',
    },
    {
        label: 'Baseball',
        value: 'baseball',
    },
    {
        label: 'Hockey',
        value: 'hockey',
    },
];
// create a component
class NUPPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // ? Section 1
            email: "",
            name: "",
            no_hp: "",
            no_hp_alt: "",
            no_telp_alt: "",
            ktp: "",
            npwp: "",
            cons: "",

            // ? Section 2
            fotoKtp: '',
            fotoNpwp: '',
            // buktibayar: require('@Asset/images/upload.png'),
            buktibayar: '',

            // ? Section 3
            property: "",
            nuptype: "",
            descs: "",
            nupprice: "",
            paymentMethod: "",
            nupqty: "",
            media: "",
            token: "",
            project_name: "",

            isVisible: false,
            isValid: false,
            errors: false,
            group:'',

            selMedia: "",
            dataMedia: [],
            getMedia: []
        };

        this.onSubmit = this.onSubmit.bind(this)

        console.log("props cf", props);
    }

    async componentDidMount() {
        const nup = this.props.nup
        isMount = true;
        const data = {
            email: await _getData("@User"),
            name: await _getData("@Name"),
            no_hp: await _getData("@Handphone"),
            token: await _getData("@Token"),
            audit_user : await _getData('@UserId'),
            group: await _getData('@Group'),
            // audit_user: await _getData('@UserId'),
            property: nup.project_no,
            project_name: nup.project_name,

            nuptype: nup.nup_type,
            nupprice: nup.nup_amt,
            nupqty: nup.qty,
            cons: nup.db_profile,
            descs: nup.descs,
            media: "",
            // audit_user: '',
           
        };
        console.log('data nup',data);
        this.setState(data, () => {
            this.getMedia()
        });
    }

    showAlert = (key) => {
        Alert.alert(
            'Select a Photo',
            'Choose the place where you want to get a photo',
            [
                { text: 'Gallery', onPress: () => this.fromGallery(key) },
                { text: 'Camera', onPress: () => this.fromCamera(key) },
                { text: 'Cancel', onPress: () => console.log('User Cancel'), style: 'cancel' },
            ],
            { cancelable: false },
        );
    }

    // fromCamera(key) {

    //     ImagePicker.openCamera({
    //         cropping: true,
    //         width: 200,
    //         height: 200,
    //     }).then(image => {
    //         console.log('received image', image);

    //         this.setState({ [key]: { uri: image.path } })

    //     }).catch(e => console.log('tag', e));
    // }
    fromCamera(key) {
        ImagePicker.openCamera({
            cropping: true,
            width: 600,
            height: 400
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
                
            })
            .catch(e => console.log("tag", e));
    }

    // fromGallery(key) {

    //     ImagePicker.openPicker({
    //         multiple: false,
    //         width: 200,
    //         height: 200,
    //     }).then(image => {
    //         console.log('received image', image);

    //         this.setState({ [key]: { uri: image.path } })

    //     }).catch(e => console.log('tag', e));
    // }
    fromGallery(key) {
        ImagePicker.openPicker({
            multiple: false,
            width: 600,
            height: 400
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    onNext(step) {
        const { name, email, no_hp, ktp, fotoKtp, fotoNpwp, npwp, buktibayar } = this.state

        if (step == 1) {
            if (name && email && no_hp && ktp && npwp && buktibayar ) {
                this.setState({ errors: false })
            } else {
                this.setState({ errors: true })
                alert("Please fill red star form")
            }
        } 
        if (step==2) {
            if ( fotoKtp || fotoNpwp ) {
                this.setState({ errors: false })
            } else {
                this.setState({ errors: true })
                alert("Please upload attachments")
            }
        }
    }

    onSubmit() {
        let fileNameKtp = "ktp.png";
        let fileNameNpwp = "npwp.png";
        let fileNameBill = "payment.png";

        let filektp = RNFetchBlob.wrap(
            this.state.fotoKtp.uri.replace("file://", "")
        );
        let filenpwp = RNFetchBlob.wrap(
            this.state.fotoNpwp.uri.replace("file://", "")
        );
        let filebill = RNFetchBlob.wrap(
            this.state.buktibayar.uri.replace("file://", "")
        );

        
        const {
            
            email,
            name,
            no_hp,
            no_hp_alt,
            no_telp_alt,
            property,
            nupqty,
            nupprice,
            nuptype,
            ktp,
            npwp,
            audit_user,

            media,
            fotoKtp,
            fotoNpwp
        } = this.state

        const formData = {
            audit_user: audit_user,
            no_hp_alt: no_hp_alt,
            no_telp_alt: no_telp_alt,
            property: property,
            nupqty: nupqty,
            nupprice: nupprice,
            nuptype: nuptype,
            email: email,
            no_hp: no_hp,
            name: name,
            ktp: ktp,
            npwp: npwp,
            audit_user: audit_user,
            // audit_user : await _getData('@UserId'),

            cons: 'IFCAPB',

            media: media,


            // fotoKtp: require('@Asset/images/upload.png'),
            // fotoNpwp: require('@Asset/images/upload.png'),
            fotoKtp: filektp,
            fotoNpwp: filenpwp,
            buktibayar: filebill
        }
        console.log('saveFormNUP', formData);

        RNFetchBlob.fetch(
            "POST",
            urlApi + "c_nup/insertNup/IFCAPB2/",
            {
                "Content-Type": "multipart/form-data",
                Token: this.state.token
            },
            
            [{ name: "photoktp", filename: fileNameKtp, data: filektp },
            { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
            { name: "photobill", filename: fileNameBill, data: filebill },
            { name: "data", data: JSON.stringify(formData)}]
        )
        .then(resp => {
            
            let res = JSON.stringify(resp.data);
            // alert('Success')
            // if(resp=="OK"){
            //     alert('ok')
            // }else{alert('error')}
            console.log("res", resp);
            Alert.alert(
                'Alert',
                'Submit Success',
                [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                //   {
                //     text: 'Cancel',
                //     onPress: () => console.log('Cancel Pressed'),
                //     style: 'cancel',
                //   },
                  {text: 'OK', onPress: () => Actions.home()},
                ],
                {cancelable: false},
              );
           
            
            // _storeData("@ProfileUpdate", true);
        })

        // this.setState({isVisible : true})
        // fetch(urlApi + 'c_nup/insertNup/IFCAPB2/', {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     // headers: {
        //     //     Accept: 'application/json',
        //     //     'Content-Type': 'application/json',
        //     //     'Token': this.state.token
        //     // }
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (!res.Error) {
        //             // Alert.alert(res.Pesan)
        //             Alert.alert(
        //                 'Alert',
        //                 'Submit Success',
        //                 [
        //                 //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //                 //   {
        //                 //     text: 'Cancel',
        //                 //     onPress: () => console.log('Cancel Pressed'),
        //                 //     style: 'cancel',
        //                 //   },
        //                   {text: 'OK', onPress: () => Actions.home()},
        //                 ],
        //                 {cancelable: false},
        //               );
        //             // if(confirm(res.Pesan)) {Actions.home()}
                    
        //             // if (alert.onPress)
        //             // onPress: 
                    
        //         }
        //         // Actions.home()
        //         console.log('saveSuksesNUP', res)
                

        //     }).catch((error) => {
        //         // alert(res.Pesan)
        //         console.log(error);
        //     });

           
    }

    onValueChange(value: string) {
        this.setState({
            selMedia: value
        });
    }

    selectPhotoTapped() {
        console.log('oke');
    }

    getMedia = () => {
        {
            isMount ?
                // const {entity_cd,project_no} = this.props.items
                fetch(urlApi + 'c_media/getMedia/', {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((res) => {
                        if (!res.Error) {
                            const resData = res.Data
                            //   resData.map((data)=>{
                            //     this.setState(prevState=>({
                            //         dataMedia : [...prevState.dataMedia, {label: data.label, value:data.value}]
                            //     }))
                            //   })
                            this.setState({ dataMedia: resData })
                            console.log('dataMedia', res);
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                : null
        }
    }

    chooseMedia = (val) => {

        if (val) {
            this.setState(this.state.selMedia, val)
        }
        // if(val){
        //     this.setState({selMedia : val},()=>{
        //         this.getAgentDT(val)
        //         this.getComission(val,'')
        //     })
        // }
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
                            {"NUP".toUpperCase()}
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
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <ProgressSteps>
                        <ProgressStep label={`Profile`} onNext={() => this.onNext(1)} errors={this.state.errors}
                        nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                        nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        // previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} 
                        // previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center'}}
                        >
                            <View>
                                {/* <Item>
                                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>

                                <Text style={{fontSize: 20, lineHeight: 30}}>Time is 10</Text>
                               
                                <Text style={{fontSize: 15, lineHeight: 18}}>am</Text>
                                <Text style={{fontSize: 20, lineHeight: 30}}> and I am late or the class</Text>
                                </View>
                                </Item> */}

                                <Item rounded style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Icon name='user' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>
                                    {this.state.group == 'AGENT' ? 
                                        <Input placeholder='Enter Your Name' value={this.state.name} style={Styles.positionTextInput} onChangeText={(val) => this.setState({ name:val })}/> 
                                        :
                                        <Input placeholder='Enter Your Name' value={this.state.name} style={Styles.positionTextInput} editable={false} /> 
                                    }
                                    
                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Icon name='envelope' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>
                                    <Input placeholder='Email' value={this.state.email} onChangeText={(email) => this.setState({ email })} style={Styles.positionTextInput} />
                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Icon name='mobile' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>
                                    <Input placeholder='No Handphone' value={this.state.no_hp} onChangeText={(no_hp) => this.setState({ no_hp })} style={Styles.positionTextInput} />

                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />  */}
                                        <Icon name='mobile-alt' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>
                                    <Input placeholder='No Hp Alternative' value={this.state.no_hp_alt} onChangeText={(no_hp_alt) => this.setState({ no_hp_alt })} style={Styles.positionTextInput} />
                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />  */}
                                        <Icon name='phone' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 15, fontSize: 18 }} />
                                    </View>

                                    <Input placeholder='No Telp Alternative' value={this.state.no_telp_alt} onChangeText={(no_telp_alt) => this.setState({ no_telp_alt })} style={Styles.positionTextInput} />
                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>
                                    <Input placeholder='ID Card(KTP)' value={this.state.ktp} onChangeText={(ktp) => this.setState({ ktp })} style={Styles.positionTextInput} />
                                </Item>

                                <Item rounded style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={Styles.iconColor} />
                                    </View>

                                    <Input placeholder='NPWP' value={this.state.npwp} onChangeText={(npwp) => this.setState({ npwp })} style={Styles.positionTextInput} />

                                </Item>
                               
                                    {/* <Text>{this.state.progress}</Text> */}
                                   
                                {/* <Item rounded  style={styles.nbInput} style={Styles.marginround}>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                        
                                        <Icon name='newspaper' type="FontAwesome5" style={{color: Colors.navyUrban, left: 15,fontSize: 23}}/>
                                    </View>
                                    
                                    
                                    <Input value={this.state.media} onChangeText={(media)=>this.setState({media})} placeholder="Media" style={Styles.positionTextInput}></Input>
                                    
                                </Item> */}

                                <CardItem style={{ height: 40, marginBottom: 4, borderColor: '#333', width: '100%', paddingRight: 0, marginTop: 2 }}


                                >

                                    {/* left title media */}
                                    <Left>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon name='newspaper' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 10, fontSize: 23 }} />
                                        </View>
                                        <Text style={Styles.positionTextInput}>Media</Text>
                                    </Left>
                                    {/* end left title media */}

                                    {/* right picker media */}
                                    
                                    <Right style={{ paddingRight: 0, marginRight: 0 }}>
                                        {/* <Item rounded>
                                                <Input style={{textAlign : 'right'}} value={this.state.media} onChangeText={(media)=>this.setState({media})} placeholder="media"></Input>
                                            </Item> */}
                                        <Item rounded style={Styles.marginround}>
                                            {/* <RNPickerSelect
                                                items={this.state.dataMedia}
                                                onValueChange={(val)=>this.chooseMedia(val)}
                                            /> */}
                                            <Picker

                                                iosHeader="Select one"
                                                mode="dropdown"
                                                style={{ width: 200 }}
                                                selectedValue={this.state.media}
                                                onValueChange={(val)=>this.setState({media:val})}
                                                // onValueChange ={(val)=> alert(val)}
                                            >
                                                {this.state.dataMedia.map((data, key) =>
                                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                                )}
                                            </Picker>
                                        </Item>
                                    </Right>
                                    {/* end right picker media */}
                                </CardItem>
                                
                                <View>
                                <CardItem style={{ height: 40, marginBottom: 4, borderColor: '#333', width: '100%', paddingRight: 0, marginTop: 2 }}>

                                        {/* left title media */}
                                        <Left>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                                <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 13, fontSize: 23 }} />
                                            </View>
                                            <Text style={Styles.positionTextInput}>Bill Payment</Text>
                                        </Left>
                                        {/* end left title media */}

                                        {/* right picker media */}
                                        
                                        
                                        {/* end right picker media */}
                                    </CardItem>
                                   
                                    <View style={styles.container2}>
                                
                                        <TouchableOpacity
                                            onPress={() => this.showAlert("buktibayar")}
                                        >
                                            
                                            <View
                                                style={[
                                                    styles.avatar,
                                                    styles.avatarContainer,
                                                ]}
                                            >
                                                
                                                {this.state.buktibayar == null || this.state.buktibayar == '' ?
                                                    <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 10, fontSize: 50}} />
                                                    :
                                                    <Image
                                                        resizeMode="cover"
                                                        style={styles.avatar}
                                                        source={
                                                            this.state.buktibayar
                                                        }
                                                    />
                                                   
                                                 }
                                                <Text style={styles.label}>
                                                    Upload Bill Payment
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                
                                
                                </View>  
                                    
                            </View>
                        </ProgressStep>
                        <ProgressStep label={`File Attachment`} onNext={() => this.onNext(2)} errors={this.state.errors}
                         nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                         nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                         previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} 
                         previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center'}}
                        >
                            <ScrollView
                                contentContainerStyle={{ alignItems: "center" }}
                            >

                                <View style={styles.container}>
                                    {/* <Text>{this.state.progress}</Text> */}
                                    <TouchableOpacity
                                        onPress={() => this.showAlert("fotoKtp")}
                                    >
                                        <View
                                            style={[
                                                styles.avatar,
                                                styles.avatarContainer,
                                            ]}
                                        >
                                            {/* <Image
                                                resizeMode="cover"
                                                style={styles.avatar}
                                                source={
                                                    this.state.fotoKtp
                                                }
                                            /> */}
                                                {this.state.fotoKtp == null || this.state.fotoKtp == '' ?
                                                    <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 10, fontSize: 50}} />
                                                    :
                                                    <Image
                                                        resizeMode="cover"
                                                        style={styles.avatar}
                                                        source={
                                                            this.state.fotoKtp
                                                        }
                                                    />
                                                 }
                                            <Text style={styles.label}>
                                                Upload ID Card (KTP)
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                <View style={[styles.container, { marginTop: 5 }]}>
                                    {/* <Text>{this.state.progress}</Text> */}
                                    <TouchableOpacity
                                        onPress={() => this.showAlert("fotoNpwp")}
                                    >
                                        <View
                                            style={[
                                                styles.avatar,
                                                styles.avatarContainer,
                                            ]}
                                        >
                                            {/* <Image
                                                resizeMode="cover"
                                                style={styles.avatar}
                                                source={
                                                    this.state.fotoNpwp
                                                }
                                            /> */}
                                                {this.state.fotoNpwp == null || this.state.fotoNpwp == '' ?
                                                    <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban, left: 10, fontSize: 50}} />
                                                    :
                                                    <Image
                                                        resizeMode="cover"
                                                        style={styles.avatar}
                                                        source={
                                                            this.state.fotoNpwp
                                                        }
                                                    />
                                                 }
                                            <Text style={styles.label}>Upload NPWP</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </ProgressStep>
                        {/* <ProgressStep label={`Product & Payment`} onSubmit={this.onSubmit} finishBtnText={`Checkout`} > */}
                        <ProgressStep label={`Summary`} onSubmit={this.onSubmit} finishBtnText={`Submit`} 
                         nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                         nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                         previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} 
                         previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center'}}
                         >
                            <View style={{ marginHorizontal: 10 }}>
                                <Card>
                                    <CardItem header style={{ borderBottomWidth: 1 / PixelRatio.get() }}>
                                        <Text>Product Detail</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Project</Text>
                                        </Left>
                                        <Right>
                                            <Text>{this.state.project_name}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>NUP Type</Text>
                                        </Left>
                                        <Right>
                                            <Text>{this.state.descs}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Price</Text>
                                        </Left>
                                        <Right>
                                            <Text>Rp. {numFormat(Math.round(this.state.nupprice))}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Quantity</Text>
                                        </Left>
                                        <Right>
                                            <Text>{this.state.nupqty}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Total</Text>
                                        </Left>
                                        <Right>
                                            <Text>Rp. {numFormat(this.state.nupprice * this.state.nupqty)}</Text>
                                        </Right>
                                    </CardItem>

                                </Card>

                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </Content>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.setState({ isVisible: !this.state.isVisible })
                    }}>
                    <View style={{ flex: 1 }}>
                        <WebView item={this.state} />
                    </View>
                </Modal>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
    },
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        // height: 20

    },
    nbInput: {
        marginTop: 5
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 10
    },
    label: {
        paddingLeft: 8,
        marginLeft: 8
    },
    picker: {
        borderColor: "gray",
        borderBottomWidth: 1,
        borderRadius: 10,
        marginHorizontal: 8
    },
    avatarContainer: {
        borderColor: "#9B9B9B",
        borderWidth: 2 / PixelRatio.get(),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 10,
        width: 250,
        height: 200
    },
    avatar: {
        // borderRadius: 75,
        flex: 1,
        width: null,
        height: null,
        aspectRatio: 1.5,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});

//make this component available to the app
export default NUPPage;
