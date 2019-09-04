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
    Modal,
    NativeModules,
    PermissionsAndroid
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
    Textarea,
    Picker
} from "native-base";
import RNFetchBlob from 'rn-fetch-blob'
import { Actions } from "react-native-router-flux";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from '@Component/StoreAsync';
import { urlApi } from '@Config/services';
import moment from 'moment'
const DocumentInteractionController = NativeModules.RNDocumentInteractionController;

let isMount = false
// create a component
class ReportNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hd: null,

            files: [],
            user: "",
            name: "",
            project: [],
            selected: "",

            accesStorage :false
        }

        console.log('props cf', props);
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
            this.getFile("TB")
            this.requestStorage()
        })
    }

    requestStorage = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                title: 'IFCA S + want to acces your storage',
                message:
                    'Please be careful with agreement permissions ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({accesStorage : granted})
            } else {
                this.setState({accesStorage : false})
            }
        } catch (err) {
          console.warn(err);
        }
    }

    getFile = (type) =>{
        const items = this.props.items

        {isMount ?
            
            fetch(urlApi+'c_download2/getReportNew/'+items.db_profile+'/'+type,{
                method:'POST',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({files:resData})
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getFiles',res);
            }).catch((error) => {
                console.log(error);
            })
            
        :null}
    }

    downloadFile = (item) =>{
        const android = RNFetchBlob.android

        if(this.state.accesStorage){
            RNFetchBlob
            .config({
                fileCache : true,
                addAndroidDownloads: {
                    path: RNFetchBlob.fs.dirs.SDCardDir +'/downloads/'+item.descs+'.pdf',
                    useDownloadManager: true,
                    notification: true,
                    overwrite: true,
                    description: 'downloading content...',
                    mime: 'application/pdf',
                    mediaScannable: true
                }
            })
            .fetch('GET', item.file_url)
            .then((res) => {
                console.log('The file saved to ', res.path())
                alert(res.path())
                // this.openFile(RNFetchBlob.fs.dirs.SDCardDir +'/Download/laporan.pdf')
                android.actionViewIntent(res.path(), 'application/pdf')
                // android.actionViewIntent(RNFetchBlob.fs.dirs.SDCardDir +'/Download/laporan.pdf','application/pdf')
            })
        } else {
            this.requestStorage()
        }
        
    }

    openFile = (url) =>{
        DocumentInteractionController.open(url)
    }

    onValueChange(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        const item = this.props.items
        let { bookedby, name, email, hp } = this.state
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
                            {"Report New".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <View>
                        

                        <ScrollView>
                            <View style={Styles.overview}>
                                <Text style={Styles.projectTitle}>{item.title}</Text>
                            </View>

                            <View style={Styles.overview}>
                                <Image
                                    style={[Styles.picWidth,{ height: 190, borderRadius: 10, marginTop: 5 }]}
                                    source={{uri : item.picture_path}}
                                />
                            </View>

                            <ScrollView horizontal style={Styles.optionWrap}>
                                <TouchableOpacity style={Styles.btnOption}
                                onPress={()=>this.getFile('TB')}>
                                    <Text style={Styles.btnOptionText}>Trial Balance</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.btnOption}
                                    onPress={()=>this.getFile('DA')}>
                                    <Text style={Styles.btnOptionText}>Debtor Aging</Text>
                                </TouchableOpacity>
                            </ScrollView>

                            {this.state.files.map((val,key)=>
                                <View key={key} style={Styles.overviewButton}>
                                    <Button rounded warning full
                                        style={{ marginTop: 16, borderRadius: 10 }}
                                        onPress={()=>this.downloadFile(val)}>
                                        <Icon
                                            active
                                            name="file-pdf"
                                            style={Style.textWhite}
                                            type="MaterialCommunityIcons"
                                        />
                                        <Text style={Styles.textButton}>{val.descs}</Text>
                                    </Button>
                                </View>
                            )}

                        </ScrollView>
                    </View>
                </Content>
            </Container >
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
    buttonUpload: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        height: 80,
    },

});

//make this component available to the app
export default ReportNew;
