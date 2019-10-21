import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import { Style,Colors } from "../../Themes";
import { Icon } from "native-base";
const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

export default class FBLoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }

    handleEnable = () => {
        // this.setState({ disabled: !this.state.disabled });
    };

    handleLogin = () => {
        this.handleEnable();
        LoginManager.logInWithPermissions(["email", "public_profile","user_friends"]).then(
            result => {
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const { accessToken } = data;
                        const infoRequest = new GraphRequest(
                            "/me?fields=name,picture,email",
                            null,
                            (error, result) => {
                                this._responseInfoCallback(
                                    error,
                                    result,
                                    accessToken
                                );
                            }
                        );
                        new GraphRequestManager()
                            .addRequest(infoRequest)
                            .start();
                    });
                }
                this.handleEnable();
            }
        ),
            error => alert("ERRR",error);
    };

    _responseInfoCallback = (error, result, token) => {
        if (error) {
            alert("Error fetching data: " + error.toString());
        } else {
            const data = {
                Email: result.email,
                Medsos: 1,
                LoginId: result.id,
                device: Platform.OS,
                Token: token,
                Name : result.name
            };

            this.props.onPress(data);
        }
    };

    render() {
        return (
            <TouchableOpacity
                disabled={this.state.disabled}
                style={styles.container}
                onPress={this.handleLogin}
            >
                <Icon name="facebook" style={styles.icon} type="FontAwesome5" />
                <Text style={[Style.textWhite,styles.text]}>Sign in with facebook</Text>
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
        backgroundColor: Colors.facebook,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        elevation: 2
    },
    text: {
        // fontFamily: "Montserrat-Regular.ttf",
        fontSize: 12,
        color: "#fff"
    },
    icon: {
        fontSize: 24,
        color: "#fff"
    }
});
