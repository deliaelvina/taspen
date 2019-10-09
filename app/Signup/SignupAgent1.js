import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Kohana } from "react-native-textinput-effects";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
class SignupAgent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textWrap}>
                    <Kohana
                        style={{ backgroundColor: "#f9f5ed" }}
                        label={"Line"}
                        iconClass={MaterialIcons}
                        iconName={"directions-bus"}
                        iconColor={"#f4d29a"}
                        inputPadding={16}
                        labelStyle={{ color: "#91627b" }}
                        inputStyle={{ color: "#91627b" }}
                        labelContainerStyle={{ padding: 20 }}
                        iconContainerStyle={{ padding: 20 }}
                        useNativeDriver
                    />
                </View>
            </View>
        );
    }
}
export default SignupAgent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textWrap : {
        width : 200,
        height : 90
    }
});
