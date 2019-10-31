import React from "react";
import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from "native-base";
import Style from "../../Themes/Style";

const SubmitInput = props => {
    return (
        <Button
            block
            style={styles.buttonSubmit}
            onPress={props.onPress}
            {...props}
        >
            {props.isLoading === false ? (
                <Text style={Style.textWhite}>{props.title}</Text>
            ) : (
                <View style={styles.btnLoadingWrap}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={Style.textWhite}>Loading...</Text>
                </View>
            )}
        </Button>
    );
};

export default SubmitInput;


const styles = {
    buttonSubmit: {
        borderColor: "#F8B661",
        borderWidth: 1,
        backgroundColor: "#F99B23",
        marginBottom: 16,
    },
    btnLoadingWrap: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
}