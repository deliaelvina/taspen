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
    // Content
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
    Content
    // CheckBox
} from "native-base";
import { CheckBox } from "react-native-elements";
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



class chooseRegist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         
            isLoaded: true,

        };
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
                                {"Choose Regist"}
                            </Text>
                        </Body>
                        <Right style={styles.right}></Right>
                    </Header>

                    
                        <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => Actions.SignupPrinciple()}>
                                <View
                                    style={{height: 80, width: 300, backgroundColor: Colors.blueUrban, alignItems: "center",
                                    justifyContent: "center", alignSelf: "center",borderRadius: 10}}
                                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                                    
                                >
                                    {!this.state.isLoaded ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <Text style={styles.signInBtnText}>
                                                Principle
                                            </Text>
                                        )}
                                </View>
                            </TouchableOpacity>
                            <View style={{alignItems: "center",justifyContent: "center", marginTop: 10,marginBottom: 10}}>
                                <Text style={styles.signInBtnText}>
                                    Or
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => Actions.SignupAgent()}>
                                <View
                                    style={{height: 80, width: 300, backgroundColor: Colors.loginBlue, alignItems: "center",
                                    justifyContent: "center", alignSelf: "center",borderRadius: 10}}
                                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                                    
                                >
                                    {!this.state.isLoaded ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <Text style={styles.signInBtnText}>
                                                Agent
                                            </Text>
                                        )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    
                   
                </ImageBackground>
            </Container>
        );
    }
}
export default chooseRegist;

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
