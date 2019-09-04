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
let isMount = false;
const buttonStepStyle = {
    
}
// create a component
class NUPPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // ? Section 1
            email: "",
            name: "",
            no_hp: "",
            no_hp_alt : "",
            no_telp_alt : "",
            ktp : "",
            npwp : "",
            cons : "",

            // ? Section 2
            fotoKtp : require('@Asset/images/upload.png'),
            fotoNpwp : require('@Asset/images/upload.png'),
            
            // ? Section 3
            property : "",
            nuptype : "",
            descs : "",
            nupprice : "",
            paymentMethod : "",
            nupqty : "",
            media : "",
            token : "",

            isVisible: false,
            isValid : false,
            errors : false,

            selMedia : ""
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
            no_hp : await _getData("@Handphone"),
            token : await _getData("@Token"),
            property : nup.project_no,
            nuptype : nup.nup_type,
            nupprice : nup.nup_amt,
            nupqty : nup.qty,
            cons : nup.db_profile,
            descs : nup.descs,
            media : ""
        };

        this.setState(data);
    }

    showAlert = (key) => {
        Alert.alert(
            'Select a Photo',
            'Choose the place where you want to get a photo',
            [
              {text: 'Gallery',onPress: () => this.fromGallery(key)},
              {text: 'Camera', onPress: () => this.fromCamera(key)},
              {text: 'Cancel', onPress: () => console.log('User Cancel'),style: 'cancel'},
            ],
            {cancelable: false},
        );
    }

    fromCamera(key) {

        ImagePicker.openCamera({
          cropping: true,
          width : 200,
          height : 200,
        }).then(image => {
          console.log('received image', image);

          this.setState({[key]:{uri:image.path}},()=>
            console.log('oke')
            // this.uploadPhoto()
          )
      
        }).catch(e => console.log('tag', e));
    }

    fromGallery(key) {

        ImagePicker.openPicker({
        multiple : false,
        width : 200,
        height : 200,
        }).then(image => {
          console.log('received image', image);

          this.setState({[key]:{uri:image.path}},()=>
            // this.uploadPhoto()
            console.log('oke')
          )
      
        }).catch(e => console.log('tag', e));
    }

    onNext(step){
        const {name,email,no_hp,ktp,fotoKtp,fotoNpwp} =this.state

        if(step == 1 ){
            if(name && email && no_hp && ktp){
                this.setState({errors : false})
            } else {
                this.setState({errors : true})
                alert("Please fill red star form")
            }
        } else {
            if(fotoKtp || fotoNpwp){
                this.setState({errors : false})
            } else {
                this.setState({errors : true})
            }
        }
    }

    onSubmit(){
        this.setState({isVisible : true})
    }

    onValueChange (value: string) {
        this.setState({
            selMedia : value
        });
    }

    selectPhotoTapped(){
        console.log('oke');
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
                        <ProgressStep label={`Profile`} onNext={()=>this.onNext(1)} errors={this.state.errors}>
                            <View>
                                <Item rounded>
                                    <Icon name='user' type="FontAwesome5" />
                                    <Input placeholder='Enter Your Name' value={this.state.name} />
                                    <Icon solid name='star' style={{fontSize: 15,color : 'red'}} type="FontAwesome5" />
                                </Item>

                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='envelope' type="FontAwesome5" />
                                    <Input placeholder='Email' value={this.state.email} onChangeText={(email) => this.setState({email})} />
                                    <Icon solid name='star' style={{fontSize: 15,color : 'red'}} type="FontAwesome5" />
                                </Item>
                                
                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='mobile' type="FontAwesome5" />
                                    <Input placeholder='No Handphone' value={this.state.no_hp} onChangeText={(no_hp) => this.setState({no_hp})} />
                                    <Icon solid name='star' style={{fontSize: 15,color : 'red'}} type="FontAwesome5" />
                                </Item>

                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='mobile-alt' type="FontAwesome5" />
                                    <Input placeholder='No Hp Alternative' value={this.state.no_hp_alt} onChangeText={(no_hp_alt) => this.setState({no_hp_alt})} />
                                </Item>

                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='phone' type="FontAwesome5" />
                                    <Input placeholder='No Telp Alternative' value={this.state.no_telp_alt} onChangeText={(no_telp_alt) => this.setState({no_telp_alt})} />
                                </Item>

                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='id-card' type="FontAwesome5" />
                                    <Input placeholder='ID Card(KTP)' value={this.state.ktp} onChangeText={(ktp) => this.setState({ktp})} />
                                    <Icon solid name='star' style={{fontSize: 15,color : 'red'}} type="FontAwesome5" />
                                </Item>

                                <Item rounded  style={styles.nbInput}>
                                    <Icon name='id-card-alt' type="FontAwesome5" />
                                    <Input placeholder='NPWP' value={this.state.npwp} onChangeText={(npwp) => this.setState({npwp})} />
                                    <Icon solid name='star' style={{fontSize: 15,color : 'red'}} type="FontAwesome5" />
                                </Item>

                            </View>
                        </ProgressStep>
                        <ProgressStep label={`File Attachment`}>
                            <ScrollView
                                contentContainerStyle={{ alignItems: "center" }}
                            >
                                
                                <View style={styles.container}>
                                    {/* <Text>{this.state.progress}</Text> */}
                                    <TouchableOpacity
                                        onPress={()=>this.showAlert("fotoKtp")}
                                    >
                                        <View
                                            style={[
                                                styles.avatar,
                                                styles.avatarContainer,
                                            ]}
                                        >
                                            <Image
                                                resizeMode="cover"
                                                style={styles.avatar}
                                                source={
                                                    this.state.fotoKtp
                                                }
                                            />
                                            <Text style={styles.label}>
                                                Upload ID Card (KTP)
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                
                                <View style={[styles.container,{marginTop:5}]}>
                                    {/* <Text>{this.state.progress}</Text> */}
                                    <TouchableOpacity
                                        onPress={()=>this.showAlert("fotoNpwp")}
                                    >
                                        <View
                                            style={[
                                                styles.avatar,
                                                styles.avatarContainer,
                                            ]}
                                        >
                                            <Image
                                                resizeMode="cover"
                                                style={styles.avatar}
                                                source={
                                                    this.state.fotoNpwp
                                                }
                                            />
                                            <Text style={styles.label}>Upload NPWP</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </ProgressStep>
                        <ProgressStep label={`Product & Payment`} onSubmit={this.onSubmit} finishBtnText={`Checkout`} >
                            <View style={{marginHorizontal:10}}>
                                <Card>
                                    <CardItem header style={{borderBottomWidth : 1 / PixelRatio.get()}}>
                                        <Text>Product Detail</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Project</Text>
                                        </Left>
                                        <Right>
                                            <Text>{this.state.property}</Text>
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
                                            <Text>{numFormat(Math.round(this.state.nupprice))}</Text>
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
                                            <Text>{numFormat(this.state.nupprice * this.state.nupqty)}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>Media</Text>
                                        </Left>
                                        <Right>
                                            <Item rounded>
                                                <Input style={{textAlign : 'right'}} value={this.state.media} onChangeText={(media)=>this.setState({media})} placeholder="media"></Input>
                                            </Item>
                                            {/* <Picker
                                            iosHeader="Select one"
                                            mode="dropdown"
                                            style={{ width: 120 }}
                                            selectedValue={this.state.selMedia}
                                            onValueChange={this.onValueChange.bind(this)}>
                                                <Picker.Item label="Cats" value="key0" />
                                                <Picker.Item label="Dogs" value="key1" />
                                                <Picker.Item label="Birds" value="key2" />
                                                <Picker.Item label="Elephants" value="key3" />
                                            </Picker> */}
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
                        this.setState({isVisible: !this.state.isVisible})
                    }}>
                    <View style={{flex :1}}>
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
    nbInput :{
        marginTop  : 5
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
        marginHorizontal : 8
    },
    avatarContainer: {
        borderColor: "#9B9B9B",
        borderWidth: 2 / PixelRatio.get(),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        padding : 10,
        width : 250,
        height : 200
    },
    avatar: {
        // borderRadius: 75,
        flex :1,
        width : null,
        height : null,
        aspectRatio : 1.5,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});

//make this component available to the app
export default NUPPage;
