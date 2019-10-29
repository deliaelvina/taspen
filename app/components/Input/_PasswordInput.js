import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Icon } from "native-base";

const PasswordInput = props => {
    const { value, onChanges, name, styles, showEye } = props;
    const [hide, setHide] = useState(true);

    return (
        <View style={basicStyles.container}>
            <TextInput
                value={value}
                onChangeText={value => onChanges(name, value)} //... Bind the name here
                style={[basicStyles.input, styles]}
                secureTextEntry={hide}
                {...props}
            />
            {showEye && (
                <Icon
                    onPress={() => setHide(!hide)}
                    active
                    name={hide ? "eye" : "eye-off"}
                    type="MaterialCommunityIcons"
                    style={basicStyles.eye}
                />
            )}
        </View>
    );
};

export default PasswordInput;

const basicStyles = {
    container: {
        marginTop: 5,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        elevation: 10,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowColor: "grey",
        shadowOpacity: 0.1,
        shadowRadius: 0,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        borderColor: "#DDD",
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        width: "90%",
        borderRadius: 5,
        fontFamily: "Montserrat-Regular"
    },
    eye: {
        color: "black",
        fontSize: 24,
        position: "absolute",
        right: 10,
        fontSize: 28
    }
};
