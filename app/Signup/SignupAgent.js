//import react in project
import React from "react";
import {
    PermissionsAndroid,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    I18nManager,
    StyleSheet,
    Alert,
    FlatList,
    TextInput,
    Modal
} from "react-native";
import {
    Container,
    Button,
    Icon,
    Right,
    Item,
    Input,
    Header,
    Left,
    Body,
    Title,
    ListItem
    // CheckBox
} from "native-base";
import {SearchBar} from "react-native-elements";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Metrics } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
let isMount = false;
const userType = [
    {
        key: 1,
        label: "Inhouse",
        value: "I"
    },
    {
        key: 2,
        label: "Member",
        value: "M"
    }
];

class SignupGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataProject: [],
            dataProject2: [],
            isLoaded: true,

            email: "",
            fullname: "",
            nik: "",
            npwp: "",
            bank_name: "",
            acc_name: "",
            acc_no: "",
            nohp: "",
            // pictUrlKtp: require("../../assets/images/ktp.png"),
            // pictUrlNPWP: require("../../assets/images/ktp.png"),
            // pictUrlSuratAnggota: require("../../assets/images/ktp.png"),
            // pictUrlBukuTabungan: require("../../assets/images/ktp.png"),

            pictUrlKtp: '',
            pictUrlNPWP: '',
            pictUrlSuratAnggota: '',
            pictUrlBukuTabungan: '',
            pictUrl: require("../../assets/images/ktp.png"),

            selectedType: "",
            selectedProject: [],

            search: '',
            getPrin: [],
            principle_cd: '',
            modalVisible: false,
        };
    }

    componentDidMount() {
        this.getProject();
        // this.getProject2();
        this.getPrinciples();
        isMount = true;
        // const { email } = this.state.email;
        // console.log("email",email);
    }

    chooseType = val => {
        this.setState({ selectedType: val });
    };


    renderRow = ({item}) => {
        console.log('item',item);
        return(
            // <TouchableOpacity >
            <ListItem style={{height: 10}} 
            // onValueChange={(val)=>this.alert(val)}
            onPress={()=>this.selectedItem(item.value)}
            // onPress={()=>alert(item.value)}
            // onPress={(val)=>{
            // //    const valvalue = this.state.getocupation.filter(item=>item.value==val)
            //     console.log('value', this.state.getlot.filter(item=>item.value==val));
            // //    this.setState({occupation:val,occupation:statuspros})
            // }}
            >
                <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>
                {item.value}
                </Text>
            </ListItem>

            // </TouchableOpacity>
            
            // <Text>tes</Text>
        )

    }
    

    getProject = () => {
        fetch(urlApi + "c_auth/getProjects/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log("res", res);
                if (!res.Error) {
                    this.setState({ dataProject: res.Data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    getPrinciples = () => {
        fetch(urlApi+"c_principal/zoomPrincipal/IFCAPB/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log("principle", res);
                if (!res.Error) {
                    this.setState({ getPrin: res.Data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    selectedItem = (item)=>{
        console.log('item select principle',item);
        
        // alert(val);
        
        
        // alert(val);
        if(item){
            this.setState({principle_cd : item})
            // this.setModalVisible(!this.state.modalVisible)
        }
        this.setModalVisible(!this.state.modalVisible)
       
    }
    validating = validationData => {
        const keys = Object.keys(validationData);
        const errorKey = [];
        let isValid = false;

        keys.map((data, key) => {
            if (validationData[data].require) {
                let isError =
                    !this.state[data] || this.state[data].length == 0
                        ? true
                        : false;
                let error = "error" + data;
                errorKey.push(isError);
                this.setState({ [error]: isError });
            }
        });

        for (var i = 0; i < errorKey.length; i++) {
            if (errorKey[i]) {
                isValid = false;
                break;
            }
            isValid = true;
        }

        return isValid;
    };

    submit = () => {
        // const { email } = this.state.email;
        // console.log("email",email);
        let filektp = RNFetchBlob.wrap(
            this.state.pictUrlKtp.uri.replace("file://", "")
        );
        let filenpwp = RNFetchBlob.wrap(
            this.state.pictUrlNPWP.uri.replace("file://", "")
        );
        let filebukutabungan = RNFetchBlob.wrap(
            this.state.pictUrlBukuTabungan.uri.replace("file://", "")
        );
        let filesuratanggota = RNFetchBlob.wrap(
            this.state.pictUrlSuratAnggota.uri.replace("file://", "")
        );
        

        const {
            selectedType,
            email,
            fullname,
            nik,
            nohp,
            // pictUrl,
            selectedProject,
            principle_cd,
            bank_name,
            acc_name,
            acc_no,

            npwp,
            project_no
           
        } = this.state;

        const frmData = {
            // group_type: selectedType,
            group_type: 'M',
            npwp: npwp,
            user_email: email,
            full_name: fullname,
            nomor_induk: nik,
            phone_no: nohp,
            // pictUrl: pictUrl,
            projek: selectedProject[0].project_no,

            //---------foto attachment
            pictUrlKtp: filektp, //ktp
            pictUrlNPWP: filenpwp,
            pictUrlBukuTabungan: filebukutabungan,
            pictUrlSuratAnggota: filesuratanggota,
            //---------end foto attachment

            bankname: bank_name,
            accname: acc_name,
            accno: acc_no,

            principle: principle_cd,

        };
        

        const isValid = this.validating({
            email: { require: true },
            fullname: { require: true },
            nik: { require: true },
            nohp: { require: true },
            // selectedType: { require: true },
            selectedProject: { require: true }
        });

        let fileNameKtp = "KTP_RegisAgent_"+fullname+".png";
        console.log('filenamektp', fileNameKtp);
        let fileNameNpwp = "npwp_RegisAgent_" + fullname + ".png";
        let fileNameBukuTabungan = "bukutabungan_RegisAgent_" + fullname + ".png";
        let fileNameSuratAnggota= "suratanggota_RegisAgent_" + fullname + ".png";

       
        

        console.log('saveFormNUP', frmData);

        // let fileName = "KTP_RegisAgent.png";
        // let fileImg = "";

        

        if ( isValid ) {
            // fileImg = RNFetchBlob.wrap(
            //     this.state.pictUrl.uri.replace("file://", "")
            // );

            RNFetchBlob.fetch(
                "POST",
                urlApi + "c_auth/SignUpAgent",
                {
                    "Content-Type": "multipart/form-data"
                },
                [
                    // { name: "photo", filename: fileName, data: fileImg },
                    { name: "photoktp", filename: fileNameKtp, data: filektp },
                    { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
                    { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
                    { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
                    { name: "data", data: JSON.stringify(frmData) }
                ]
            ).then(resp => {
                // const res = JSON.parse(resp.data);
                let res = JSON.stringify(resp.data);
                console.log("res", res);
                if(!res.Error){
                    Alert.alert(
                        'Great!',
                        'Sign Up Success,'+'\n'+'Please wait 24hour until Account Active.',
                        [
                        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        //   {
                        //     text: 'Cancel',
                        //     onPress: () => console.log('Cancel Pressed'),
                        //     style: 'cancel',
                        //   },
                          {text: 'Ok', onPress: () => Actions.pop()},
                        ],
                        {cancelable: false},
                      );
                }else{
                    alert(res.Pesan);
                }
                
                // alert(res.Pesan);
                // if (!res.Error) {
                //     Actions.pop();
                // }
            });
        } else {
            alert("Please assign your ID Picture");
        }
    };

    handleCheck = data => {
        const { dataProject } = this.state;

        dataProject.forEach(datas => {
            if (datas.project_no === data.project_no) {
                if (datas.checked) {
                    datas.checked = false;
                } else {
                    datas.checked = true;
                }
            }
        });

        this.setState({ dataProject }, () => {
            const selectedProject = this.state.dataProject.filter(
                item => item.checked
            );
            this.setState({ selectedProject });
        });
    };

    showAlert = (key) => {
        Alert.alert(
            "Select a Photo",
            "Choose the place where you want to get a photo",
            [
                { text: "Gallery", onPress: () => this.fromGallery(key) },
                { text: "Camera", onPress: () => this.fromCamera(key) },
                {
                    text: "Cancel",
                    onPress: () => console.log("User Cancel"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    fromCamera(key) {
        ImagePicker.openCamera({
            cropping: true,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    fromGallery(key) {
        ImagePicker.openPicker({
            multiple: false,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    render() {
        return (
            <Container>
                <ImageBackground style={styles.backgroundImage}>
                    <Header style={styles.header}>
                        <Left style={styles.left}>
                            <Button
                                transparent
                                style={Style.actionBarBtn}
                                onPress={Actions.pop}
                            >
                                <Icon
                                    active
                                    name="arrow-left"
                                    style={Style.textBlack}
                                    type="MaterialCommunityIcons"
                                />
                            </Button>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={[Style.textBlack, Style.textMedium]}>
                                {"Sign Up as Agent"}
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                        <View
                            style={[
                                styles.inputFieldStyles,
                                { justifyContent: "flex-start" }
                            ]}
                        >
                            <View>
                                <View style={styles.containEmail}>
                                    <Input
                                        ref="email"
                                        style={styles.inputEmail}
                                        editable={
                                            this.props.data ? false : true
                                        }
                                        keyboardType="email-address"
                                        onChangeText={val =>
                                            this.setState({ email: val })
                                        }
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Email"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.email}
                                    />
                                    {this.state.erroremail ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Email Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="fullname"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ fullname: val })
                                        }
                                        returnKeyType="next"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Full Name"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.fullname}
                                    />
                                    {this.state.errorfullname ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Full Name Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="nik"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ nik: val })
                                        }
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="NIK"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.nik}
                                    />
                                    {this.state.errornik ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! NIK Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="npwp"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ npwp: val })
                                        }
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="NPWP"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.npwp}
                                    />
                                    {this.state.errornik ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! NPWP Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="bankname"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ bank_name: val })
                                        }
                                        returnKeyType="next"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Bank Name"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.bank_name}
                                    />
                                    
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="accname"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ acc_name: val })
                                        }
                                        returnKeyType="next"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Account Name"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.acc_name}
                                    />
                                    
                                </View>
                                <View style={styles.containMid}>
                                    <Input
                                        ref="accno"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ acc_no: val })
                                        }
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Account No"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.acc_no}
                                    />
                                    
                                </View>

                                <View style={styles.containMid}>
                                    <Item style={styles.containMid}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setModalVisible(true);
                                            }}
                                            style={{width: '100%'}}>
                                                <Input
                                                        ref="principle_cd"
                                                        style={styles.inputEmailPrinciple}
                                                        editable={false}
                                                        onChangeText={val =>
                                                            this.setState({ principle_cd: val })
                                                        }
                                                        // keyboardType="numeric"
                                                        returnKeyType="next"
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        underlineColorAndroid="transparent"
                                                        textAlign={
                                                            I18nManager.isRTL ? "right" : "left"
                                                        }
                                                        placeholder="Principle Code"
                                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                                        value={this.state.principle_cd}
                                                    />
                                                {/* <TextInput  placeholder={'Lot No'} value={this.state.principle_cd} onChangeText={(val)=>{this.setState({principle_cd:val})}} editable={false}/> */}
                                                {/* <Right style={{position:'absolute',right:10}}>
                                                    <Icon solid name='sort-down' type="FontAwesome5" style={{fontSize: 15,top: 3,right:1, color: '#666'}} />
                                                </Right>     */}
                                            
                                        </TouchableOpacity>
                                    </Item>
                                    <View>
                                        <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={this.state.modalVisible}
                                        onRequestClose={() => this.alert('Modal has been closed.')}
                                        >
                                            
                                            <View style={{
                                                    flex: 1,
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                
                                                    // backgroundColor: Colors.twitter,
                                                    }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible);
                                                    }}
                                                    style={{backgroundColor: Colors.twitter, paddingVertical: 2, paddingHorizontal: 2, borderRadius: 5}}
                                                    >
                                                    <Text style={{color: '#000'}}>Close</Text>
                                                </TouchableOpacity>
                                                
                                                <View style={{
                                                        width: 300,
                                                        height: 300, 
                                                        backgroundColor: Colors.white,
                                                        borderRadius: 8,
                                                        borderColor: '#555',
                                                        borderWidth: 1,
                                                        
                                                        }}
                                                        >
                                                
                                                {/* loadmore looping in here */}
                                            
                                                    <View style={{height: 300}}> 
                                                        <SearchBar
                                                        placeholder="Search Here..."
                                                        onChangeText={this.updateSearch}
                                                        value={this.state.search}
                                                        containerStyle={{backgroundColor: Colors.white, height: 40, borderRadius: 8, borderWidth: 0, borderColor: Colors.white, borderBottomColor: Colors.white}}
                                                        inputContainerStyle={{height: 30, borderBottomColor: Colors.white}}
                                                        />
                                                        <FlatList data={this.state.getPrin} 
                                                        renderItem={this.renderRow}
                                                        keyExtractor={(item,index)=>item.value} 
                                                        
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                   
                                    
                                </View>
                              

                                
                               
                                {/* <View style={[styles.containMid]}>
                                    <RNPickerSelect
                                        style={pickerSelectStyles}
                                        items={userType}
                                        onValueChange={val =>
                                            this.chooseType(val)
                                        }
                                        placeholder={{
                                            key: 0,
                                            label: "Select Principle"
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                    {this.state.errorselectedType ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Select User Type Required
                                        </Text>
                                    ) : null} */}
                                {/* </View> */}
                                <View style={styles.containMid}>
                                    <Input
                                        ref="nohp"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ nohp: val })
                                        }
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        lkk
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Handphone"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.nohp}
                                    />
                                    {this.state.errornohp ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! No Hp Required
                                        </Text>
                                    ) : null}
                                </View>                               
                                <View
                                    style={[
                                        styles.containMid,
                                        { height: null, paddingBottom: 10 }
                                    ]}
                                >
                                    {this.state.dataProject.map((data, key) => {
                                        return (
                                            <View
                                                style={styles.checkboxWrap}
                                                key={key}
                                            >
                                                <CheckBox
                                                    onPress={() =>
                                                        this.handleCheck(data)
                                                    }
                                                    checked={data.checked}
                                                    title={data.descs}
                                                    iconType="material"
                                                    checkedIcon="check-circle"
                                                    uncheckedIcon="check-circle"
                                                    checkedColor="green"
                                                />
                                                {/* <Text
                                                    style={{
                                                        fontSize: 16
                                                    }}
                                                >
                                                    {data.descs}
                                                </Text> */}
                                            </View>
                                        );
                                    })}
                                    {this.state.errorselectedProject ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Select Project Required
                                        </Text>
                                    ) : null}
                                </View>
                                <View style={[styles.containImageTop]}>
                                    <Text
                                        style={[
                                            Style.textBlack,
                                            { paddingTop: 5 }
                                        ]}
                                    >
                                        Upload Photo KTP
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: "#d3d3d3",
                                            margin: 10
                                        }}
                                        onPress={() => this.showAlert("pictUrlKtp")}
                                    >
                                        {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                                        {this.state.pictUrlKtp == null || this.state.pictUrlKtp == '' ?
                                             <View >
                                             {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                <Image
                                                    style={{ width: 200, height: 130 }}
                                                    source={uri = require("../../assets/images/ktp.png")}
                                                />
                                            </View>
                                            :
                                            <Image
                                                // resizeMode="cover"
                                                style={{ width: 200, height: 130 }}
                                                source={
                                                    this.state.pictUrlKtp
                                                }
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.containImageTop]}>
                                    <Text
                                        style={[
                                            Style.textBlack,
                                            { paddingTop: 5 }
                                        ]}
                                    >
                                        Upload Photo NPWP
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: "#d3d3d3",
                                            margin: 10
                                        }}
                                        onPress={() => this.showAlert("pictUrlNPWP")}
                                    >
                                        {this.state.pictUrlNPWP == null || this.state.pictUrlNPWP == '' ?
                                            <View >
                                                {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                <Image
                                                    style={{ width: 200, height: 130 }}
                                                    source={uri = require("../../assets/images/ktp.png")}
                                                />
                                            </View>
                                            :
                                            <Image
                                                // resizeMode="cover"
                                                style={{ width: 200, height: 130 }}
                                                source={
                                                    this.state.pictUrlNPWP
                                                }
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.containImageTop]}>
                                    <Text
                                        style={[
                                            Style.textBlack,
                                            { paddingTop: 5 }
                                        ]}
                                    >
                                        Upload Photo Member File
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: "#d3d3d3",
                                            margin: 10
                                        }}
                                        onPress={() => this.showAlert("pictUrlSuratAnggota")}
                                    >
                                        {this.state.pictUrlSuratAnggota == null || this.state.pictUrlSuratAnggota == '' ?
                                            <View >
                                                {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                <Image
                                                    style={{ width: 200, height: 130 }}
                                                    source={uri = require("../../assets/images/ktp.png")}
                                                />
                                            </View>
                                            :
                                            <Image
                                                // resizeMode="cover"
                                                style={{ width: 200, height: 130 }}
                                                source={
                                                    this.state.pictUrlSuratAnggota
                                                }
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.containImage]}>
                                    <Text
                                        style={[
                                            Style.textBlack,
                                            { paddingTop: 5 }
                                        ]}
                                    >
                                        Upload Photo Saving Book
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: "#d3d3d3",
                                            margin: 10
                                        }}
                                        onPress={() => this.showAlert("pictUrlBukuTabungan")}
                                    >
                                        {this.state.pictUrlBukuTabungan == null || this.state.pictUrlBukuTabungan == '' ?
                                            <View >
                                                {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                                                <Image
                                                    style={{ width: 200, height: 130 }}
                                                    source={uri = require("../../assets/images/ktp.png")}
                                                />
                                            </View>
                                            :
                                            <Image
                                                // resizeMode="cover"
                                                style={{ width: 200, height: 130 }}
                                                source={
                                                    this.state.pictUrlBukuTabungan
                                                }
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                    </ScrollView>
                    <View
                        style={styles.signbtnSec}
                        pointerEvents={this.state.isLoaded ? "auto" : "none"}
                    >
                        <Button
                            style={styles.signInBtn}
                            onPress={() => this.submit()}
                        >
                            {!this.state.isLoaded ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signInBtnText}>
                                    Register Now
                                </Text>
                            )}
                        </Button>
                    </View>
                </ImageBackground>
            </Container>
        );
    }
}
export default SignupGuest;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        ...styles.inputEmail,
        fontSize: 17
    }
});
