import React from "react";
//import react in project
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
    Alert
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
    ListItem,
    CheckBox
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
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
            isLoaded: true,

            email: "",
            fullname: "",
            nik: "",
            nohp: "",
            pictUrl: require("../../assets/images/ktp.png"),

            selectedType: ""
        };
    }

    componentDidMount() {
        this.getProject();
    }

    chooseType = val => {
        this.setState({ selectedType: val });
    };

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

    submit = () => {
        const {
            selectedType,
            email,
            fullname,
            nik,
            nohp,
            pictUrl,
            dataProject
        } = this.state;

        const frmData = {
            group_type: selectedType,
            user_email: email,
            full_name: fullname,
            nomor_induk: nik,
            phone_no: nohp,
            pictUrl: pictUrl,
            projek: dataProject,
            filename: "KTP_RegisAgent.png"
        };

        let fileName = "KTP_RegisAgent.png";
        let fileImg = "";

        if (pictUrl.uri) {
            fileImg = RNFetchBlob.wrap(
                this.state.pictUrl.uri.replace("file://", "")
            );

            RNFetchBlob.fetch(
                "POST",
                urlApi + "/c_auth/SignUpAgent",
                {
                    "Content-Type": "multipart/form-data"
                },
                [
                    { name: "photo", filename: fileName, data: fileImg },
                    { name: "data", data: JSON.stringify(frmData) }
                ]
            ).then(resp => {
                const res = JSON.parse(resp.data);
                console.log("res", res);
                alert(res.Pesan);
                if (!res.Error) {
                    Actions.pop();
                }
            });
        } else {
            alert("Please assign your ID Picture")
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

        this.setState({ dataProject }, () =>
            console.log("dataProject", this.state.dataProject)
        );
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
            width: 200,
            height: 200
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ pictUrl: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    fromGallery(cropping, mediaType = "photo") {
        ImagePicker.openPicker({
            multiple: false,
            width: 200,
            height: 200
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ pictUrl: { uri: image.path } });
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
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Full Name"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.fullname}
                                    />
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
                                </View>
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
                                </View>
                                <View style={[styles.containMid]}>
                                    <RNPickerSelect
                                        style={pickerSelectStyles}
                                        items={userType}
                                        onValueChange={val =>
                                            this.chooseType(val)
                                        }
                                        placeholder={{
                                            key: 0,
                                            label: "Select User Type"
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                    />
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
                                                    style={{ width: 20 }}
                                                    onPress={() =>
                                                        this.handleCheck(data)
                                                    }
                                                    checked={data.checked}
                                                />
                                                <Text
                                                    style={{
                                                        paddingLeft: 18,
                                                        fontSize: 16
                                                    }}
                                                >
                                                    {data.descs}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                                <View style={[styles.containPassword]}>
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
                                        onPress={this.showAlert}
                                    >
                                        <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrl}
                                        />
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
