import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import { Style, Colors } from "../../Themes";
import { Icon } from "native-base";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from "react-native-google-signin";

export default class GoogleLoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }

    handleEnable = () => {
        this.setState({ disabled: !this.state.disabled });
    };

    handleLogin = async () => {
        this.handleEnable();

        try {
            await GoogleSignin.configure({
                webClientId:
                    "945884059945-0treh3o5vujr85pba419nb9dqttt310m.apps.googleusercontent.com",
                offlineAccess: true,
                forceConsentPrompt: true
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            this._responseInfoCallback(userInfo);
        } catch (error) {
            this.handleEnable();            
            console.log("Error ", error);
        }
    };

    _responseInfoCallback = userInfo => {
        this.handleEnable();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        const data = {
            Email: userInfo.user.email,
            Medsos: 1,
            LoginId: userInfo.user.id,
            device: Platform.OS,
            Token: userInfo.idToken,
            Name: userInfo.user.givenName + " " + userInfo.user.familyName
        };
        this.props.onPress(data);
    };

    render() {
        return (
            <TouchableOpacity
                disabled={this.state.disabled}
                style={styles.container}
                onPress={this.handleLogin}
            >
                <Icon name="google" style={styles.icon} type="FontAwesome5" />
                <Text style={[Style.textBlack, styles.text]}>
                    Sign in with Google
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        width: 185,
        height: 42,
        padding: 12,
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        elevation: 2
    },
    text: {
        // fontFamily: "Montserrat-Regular.ttf",
        fontSize: 12,
        color: "#333"
    },
    icon: {
        fontSize: 24,
        color: Colors.fire
    }
});
