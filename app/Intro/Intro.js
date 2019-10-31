/*This is an example of React Native App Intro Slider */
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
    I18nManager
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
    Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "../Intro/styles";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import FBLoginButton from "../components/LoginFB";
import GoogleLoginButton from "../components/LoginGoogle";
import { Colors } from "../Themes";

let isMount = false;

//import AppIntroSlider to use it
export default class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: true, //To show the main page of the app
            isLoaded: true,

            email: "",
            password: "",
            isHide: false,
            isLogin: false,
            userDetails: "",
            GoogleLogin: false
        };
    }
    async componentWillMount() {
        isMount = true;

        this.requestStorage();
    }

    requestStorage = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "IFCA S + want to acces your storage",
                    message: "Please be careful with agreement permissions ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } 
        } catch (err) {
            console.warn(err);
        }
    };

    async componentDidMount() {
        const isIntro = await _getData("@isIntro");
        this.setState({ showRealApp: isIntro });
    }

    componentWillUnmount() {
        isMount = false;
    }

    clickHome() {
        Actions.tabbar();
        this.setState({ click: true });
    }

    _onDone = () => {
        this.setState({ showRealApp: true }, () => {
            _storeData("@isIntro", true);
        });
    };

    _onSkip = () => {
        this.setState({ showRealApp: true }, () => {
            _storeData("@isIntro", true);
        });
    };

    btnLoginClick = async () => {
        const mac = await DeviceInfo.getMACAddress().then(mac => {
            return mac;
        });
        const formData = {
            email: this.state.email,
            password: this.state.password,
            token: "",
            token_firebase: "",
            device: Platform.OS,
            mac: mac
        };
        var lengthPass = this.state.password.length;
        if (lengthPass < 4) {
            alert("Wrong password !!!");
        } else {
            this.setState({ isLogin: true }, () => {
                this.doLogin(formData);
            });
        }
    };

    doLogin(value) {
        this.setState({ isLoaded: !this.state.isLoaded });
        data = JSON.stringify(value);

        fetch(urlApi + "c_auth/Login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: data
        })
            .then(response => response.json())
            .then(res => {
                if (!res.Error) {
                    if (res.Data.isResetPass != 1) {
                        this.getTower(res);
                    } else {
                        this.setState({ isLoaded: !this.state.isLoaded });
                        Actions.ResetPass({ email: res.Data.user });
                    }
                } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        alert(res.Pesan);
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    alert(error);
                });
            });
    }

    doLoginSosMed = async data => {

        data.ipAddress = await DeviceInfo.getIPAddress().then(mac => mac);

        console.log('data',data);

        fetch(urlApi + "c_auth/LoginWithSosmed", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                try {
                    if (res.Error) {
                        Actions.SignupGuest({ sosmed: true, data });
                    } else {
                        this.setState({ isLogin: true }, () => {
                            this.getTower(res);
                        });
                    }
                } catch (error) {
                    console.log('error',error);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ isLoaded: !this.state.isLoaded }, () => {
                    alert(error);
                });
            });
    };

    getTower = res => {
        let result = res.Data;
        const email = result.user;
        fetch(urlApi + "c_product_info/getData/IFCAMOBILE/" + email + "/S", {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log("res", res);
                if (res.Error === false) {
                    let resData = res.Data;
                    let data = [];
                    resData.map(item => {
                        let items = {
                            ...item,
                            illustration: item.picture_url,
                            title: item.project_descs,
                            subtitle: item.db_profile + item.project_no
                        };
                        data.push(items);
                    });

                    result["UserProject"] = data;
                    this.signIn(result);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    signIn = async res => {
        try {
            _storeData("@DashMenu", res.DashMenu);
            _storeData("@UserId", res.UserId);
            _storeData("@Name", res.name);
            _storeData("@Token", res.Token);
            _storeData("@User", res.user);
            _storeData("@Group", res.Group);
            _storeData("@Handphone", res.handphone);
            _storeData("@isLogin", this.state.isLogin);
            _storeData("@isReset", res.isResetPass);
            _storeData("@AgentCd", res.AgentCd);
            _storeData("@Debtor", res.Debtor_acct);
            _storeData("@rowID", res.rowID);
            _storeData("@RefreshProfile", false);
            _storeData("@UserProject", res.UserProject);
        } catch (err) {
            console.log("error:", err);
        } finally {
            this.setState({ isLoaded: true }, () => {
                Actions.reset("tabbar");
            });
        }
    };

    skipLogin = async () => {
        const mac = await DeviceInfo.getMACAddress().then(mac => {
            return mac;
        });

        const formData = {
            email: "guest@ifca.co.id",
            password: "pass1234",
            token: "",
            token_firebase: "",
            device: Platform.OS,
            mac: mac
        };
        this.setState({ isLogin: false }, () => {
            this.doLogin(formData);
        });
    };

    signInGoogle = (data) => {
        this.doLoginSosMed(data);
    };

    signInFacebook = async data => {
        this.doLoginSosMed(data);
    };
    _renderNextButton = () => {
        return (
            <View>
                <Text style={styles.title_next}>
                    Next
                </Text>
            </View>
       
        );
      };
      _renderSkipButton = () => {
        return (
            <View>
                <Text style={styles.title_skip}>
                    Skip
                </Text>
            </View>
       
        );
      };
      _renderDoneButton = () => {
        return (
            <View>
                <Text style={styles.title_done}>
                    Done
                </Text>
            </View>
       
        );
      };

    render() {
        // let BG_Image = { uri : 'https://antiqueruby.aliansoftware.net/Images/signin/ic_main_bg_stwo.png'};
        StatusBar.setBarStyle("dark-content", true);

        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("transparent", true);
            StatusBar.setTranslucent(true);
        }
        //If false show the Intro Slides
        if (this.state.showRealApp) {
            //Real Application
            return (
                <Container>
                    <ImageBackground style={styles.backgroundImage}>
                        <Header style={styles.header}>
                            <Left style={styles.left}></Left>
                            <Body style={styles.body}></Body>
                            <Right style={styles.right}>
                                <TouchableOpacity
                                    style={styles.textRight}
                                    onPress={() =>
                                        this.props.navigation.navigate("Guest")
                                    }
                                >
                                    <Text
                                        style={styles.textTitle}
                                        onPress={() => this.skipLogin()}
                                    >
                                        Skip Login
                                    </Text>
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={styles.inputFieldStyles}>
                            <Image
                                style={styles.images}
                                source={require("../Images/logo.jpg")}
                            />

                            <View style={styles.containEmail}>
                                <Input
                                    ref="email"
                                    style={styles.inputEmail}
                                    editable={true}
                                    onChangeText={val =>
                                        this.setState({ email: val })
                                    }
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Email"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                />
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.containPassword}>
                                <Input
                                    ref="password"
                                    style={styles.inputEmail}
                                    editable={true}
                                    onChangeText={val =>
                                        this.setState({ password: val })
                                    }
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    textAlign={
                                        I18nManager.isRTL ? "right" : "left"
                                    }
                                    placeholder="Password"
                                    placeholderTextColor="rgba(0,0,0,0.20)"
                                    secureTextEntry={!this.state.isHide}
                                    value={this.state.password}
                                />
                                <Icon
                                    name={this.state.isHide ? "eye-off" : "eye"}
                                    style={styles.eye}
                                    onPress={() =>
                                        this.setState({
                                            isHide: !this.state.isHide
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View
                            style={styles.signbtnSec}
                            pointerEvents={
                                this.state.isLoaded ? "auto" : "none"
                            }
                        >
                            <Button
                                style={styles.signInBtn}
                                onPress={() => this.btnLoginClick()}
                            >
                                {!this.state.isLoaded ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.signInBtnText}>
                                        Sign In
                                    </Text>
                                )}
                            </Button>
                        </View>
                        <Text
                            style={styles.forgotPassword}
                        >
                            OR
                        </Text>
                        <View style={styles.signInGoogle}>
                            <GoogleLoginButton onPress={this.signInGoogle} />
                            <FBLoginButton onPress={this.signInFacebook} />
                        </View>
                        <View style={styles.socialSec}>
                            <TouchableOpacity onPress={() => Actions.SignupAgent()}>
                                <Text style={styles.fbButtonText}>
                                    New here? Register Agent
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Container>
            );
        } else {
            return (
                <AppIntroSlider
                    slides={slides}
                    
                    onDone={this._onDone}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                    renderSkipButton={this._renderSkipButton}
                    showSkipButton={true}
                    onSkip={this._onSkip}
                />
            );
        }
    }
}

const slides = [
    {
        key: "s1",
        text: "Find information and update project from \n PT Urban Jakarta Propertindo",
        title: "Get Info Project",
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
        image: require('@Asset/images/walktrough/urban_sky.png'),
        // image:  require('@Asset/icon/save_file.png'),
        // imageStyle: styles.image,
        imageStyle: styles.images_urban,
        backgroundColor: Colors.white
        // backgroundColor: Colors.grey
    },
    {
        key: "s2",
        title: "See unit type",
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
        text: "Get detailed info about units currently being marketed",
        image: require('@Asset/images/walktrough/unit_plan.png'),
        // image: {
        //     uri:
        //         "http://aboutreact.com/wp-content/uploads/2018/08/flight_ticket_booking.png"
        // },
        imageStyle: styles.image,
        // backgroundColor: "#febe29"
        backgroundColor: Colors.white
    },
    {
        key: "s3",
        title: "Easy Registration NUP",
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
        text:
            "Nup purchases and payments are more practical via online",
            image: require('@Asset/images/walktrough/nup_regis.png'),
        // image: {
        //     uri:
        //         "http://aboutreact.com/wp-content/uploads/2018/08/discount1.png"
        // },
        imageStyle: styles.image,
        // backgroundColor: "#22bcb5"
        backgroundColor: Colors.white
    },
    {
        key: "s4",
        title: "Installment illustration",
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
        text: 
        "Choose the type of payment unit with updated interest rates",
        // image: {
        //     uri:
        //         "http://aboutreact.com/wp-content/uploads/2018/08/best_deals1.png"
        // },
        image: require('@Asset/images/walktrough/instalment.png'),
        imageStyle: styles.image,
        backgroundColor: Colors.white
        // backgroundColor: "#3395ff"
    },
    {
        key: "s5",
        title: "Real time unit check",
       
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
        text:
            "Check the available status directly from your mobile and the specifications of unit type, view and others",
        // image: {
        //     uri:
        //         "http://aboutreact.com/wp-content/uploads/2018/08/bus_ticket_booking.png"
        // },
        image: require('@Asset/images/walktrough/realtime_unit.png'),
        imageStyle: styles.image,
        backgroundColor: Colors.white
    },
    {
        key: "s6",
        title: "About PT Urban Jakarta Propertindo",
        titleStyle: styles.title_urban,
        textStyle: styles.text_urban,
       
        text:
            "PT Urban Jakarta Propertindo brings a new concept of residence, as is the paradigm that occurs in all major cities in the world",
        // image: {
        //     uri:
        //         "http://aboutreact.com/wp-content/uploads/2018/08/train_ticket_booking.png"
        // },
        image: require('@Asset/images/walktrough/about.png'),
        imageStyle: styles.image,
        backgroundColor: Colors.white
        // backgroundColor: "#febe29"
    }
];
