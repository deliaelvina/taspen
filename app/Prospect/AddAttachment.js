import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Platform,
    Modal,
    Animated,
    FlatList,
    Alert,
    // PixelRatio,
   

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    List,
    Right,
    Card,
    Content,
    Accordion,
    Label,
    Picker,
    
    // DatePicker,
    CardItem,
    Left,
    
   
    Item,
} from "native-base";
import {SearchBar} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
import { Input } from "react-native-elements";
import moment from "moment";
// import DateTimePicker from "react-native-modal-datetime-picker";
// import DatePicker from "react-native-modal-datetime-picker";
import { DateInput, MinuteInput, DatetimeInput } from "../components/Input";
import Timer from "jest-jasmine2/build/jasmine/Timer";
import { isIfStatement } from "@babel/types";
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from "rn-fetch-blob";
import DeviceInfo from "react-native-device-info";
// import { FlatList } from "react-native-gesture-handler";
// import {RNPicker} from "rn-modal-picker";

// import styles, { colors } from "./styles/index";



    
   


class AddAttachment extends Component {
    constructor(props){
        super(props);

        this.state = {
            document_descs: '',
            business_id: '',
            file_url: require('@Asset/images/upload.png'),
            
            // fotoNpwp: require('@Asset/images/upload.png'),
        };
        
        console.log('props follow up',props);
    }

    async componentDidMount(){
        // Actions.refresh({ backTitle: () => this.props.datas.business_id });
        // const project = await _getData('@UserProject');
        const dataProspect = await _getData("statusProspect");
        // const audit_user = await _getData('@UserId');
        // const name = await _getData('@Name');
        console.log('data prospect',dataProspect);
        // console.log('usrid',audit_user);
        // console.log('nameid', name);
        
        // console.log(tpm);
        const data = {
            business_id : dataProspect.business_id,
            audit_user : await _getData('@UserId'),
          
        }
        isMount = true;
        this.setState(data, () => {
            console.log('data di list', data);
            
        });
    };


    showAlert = () => {
        Alert.alert(
            "Select a Photo",
            "Choose the place where you want to get a photo",
            [
                { text: "Gallery", onPress: () => this.fromGallery() },
                { text: "Camera", onPress: () => this.fromCamera() },
                {
                    text: "Cancel",
                    onPress: () => console.log("User Cancel"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    fromCamera() {
        ImagePicker.openCamera({
            cropping: true,
            width: 600,
            height: 400
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ file_url: { uri: image.path } });
                
            })
            .catch(e => console.log("tag", e));
    }

    fromGallery(cropping, mediaType = "photo") {
        ImagePicker.openPicker({
            multiple: false,
            width: 600,
            height: 400
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ file_url: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    // uploadPhoto = async () => {
    //     let fileName = this.state.document_descs;
    //     let fileImg = RNFetchBlob.wrap(
    //         this.state.file_url.uri.replace("file://", "")
    //     );
    //     // let name = 'photo';

        

    //     RNFetchBlob.fetch(
    //         "POST",
    //         urlApi + "/c_attachment/upload/" + this.state.business_id,
    //         {
    //             "Content-Type": "multipart/form-data",
    //             Token: this.state.token
    //         },
    //         [{ name: "photo", filename: fileName, data: fileImg }]
    //     ).then(resp => {
    //         let res = JSON.stringify(resp.data);
    //         console.log("res", resp);
    //         _storeData("@ProfileUpdate", true);
    //     });
    //     // console.log(name,fileName,fileImg);
    // };
    
    uploadPhoto = async () => {
        let fileName = "profile.png";
        let fileImg = RNFetchBlob.wrap(
            this.state.file_url.uri.replace("file://", "")
        );

        RNFetchBlob.fetch(
            "POST",
            // urlApi + "/c_profil/upload/" + this.state.business_id,
            // {
            //     "Content-Type": "multipart/form-data",
            //     Token: this.state.token
            // },
            [{ name: "photo", filename: fileName, data: fileImg }]
        ).then(resp => {
            let res = JSON.stringify(resp.data);
            console.log("res", resp);
            _storeData("@ProfileUpdate", true);
        });
    };


    save = async() => {

        let fileName = this.state.document_descs+".png";
        let fileImg = RNFetchBlob.wrap(
            this.state.file_url.uri.replace("file://", "")
        );


        // alert('tes');
        const {
            //tab1
            business_id,
            doc_no,
            project_no,
            entity_cd,
            line_no,
            audit_user,
            file_url,
            document_descs,
            
            // fileName,
            // fileImg
            
 
        } = this.state

        const formData = {
            
            // salutation_cd: salutation_cd,
            
            //tab 1
            business_id : business_id,
       
            // descs: descs, //class
            document_descs: document_descs,
            // file_url: fileImg,
            file_url: file_url,
            audit_user: audit_user,
            // name: 'photo',
            // filename: fileName,
            // data: fileImg,

        }
        console.log('save attach', formData)
       

           RNFetchBlob.fetch(
            "POST",
            urlApi + "c_attachment/save/IFCAPB2/",
            {
                "Content-Type": "multipart/form-data",
                Token: this.state.token
            },
            
            [{ name: "photo", filename: fileName, data: fileImg },
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
           
            
            _storeData("@ProfileUpdate", true);
        })
        // .then((data)=>{
        //         if(resp=='OK'){
        //             alert(resp.Pesan)
    
        //             // let res = JSON.stringify(res.data);
        //             // _storeData('@Name',name)
        //             // _storeData('@Handphone',hp)
        //             // _storeData('@ProfileUpdate',true)
        //         }
        //         console.log('update prospect type',res)
    
        //     }).catch((error) => {
        //         console.log(error);
        //     });
    
    }

    render() {
       
      
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation} >
                    
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
                            {/* {"Low".toUpperCase()} */}
                            {/* {data.descs} */}
                            {/* {this.state.status_cd.toUpperCase()} */}
                            {/* {this.state.descs.toUpperCase()} */}
                            Add Attachment
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>

                <Content>
                    <View>                       
                        <View style={{ paddingVertical: 10}} >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Description</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Description'} value={this.state.document_descs} onChangeText={(val)=>{this.setState({document_descs:val})}} />
                        </View>

                        <View style={Styles.containers}>
                            {/* <Text>{this.state.progress}</Text> */}
                            <TouchableOpacity
                                onPress={() => this.showAlert()}
                            >
                                <View
                                    style={Styles.avatar, Styles.avatarContainer}
                                >
                                    <Image
                                        resizeMode="cover"
                                        style={Styles.avatar}
                                        source={
                                            this.state.file_url
                                        }
                                    />
                                    <Text style={Styles.label}>
                                        Upload Attachment
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        


                       
                    </View>
                    {/* {this.state.props == 0 ?
                            <ActivityIndicator />
                        : 
                    
                    } */}

                     
                </Content>
               
                
                <Button full style={{ backgroundColor: Colors.navyUrban}}  
                onPress={() => {
                    this.save();
                    // alert('update follow up')
                }}>
                    <Text>Submit</Text>
                </Button>

                
                

            </Container>
            

        );
    }
}

export default AddAttachment;

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