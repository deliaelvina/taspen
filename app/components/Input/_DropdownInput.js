import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Style from "../../Themes/Style";

const DropdownInput = props => {
    return (
        <View>
            {props.label && (
                <Text style={Style.textBlack}>{`Select ${props.label}`}</Text>
            )}
            <ModalSelector
                data={props.data}
                optionTextStyle={{ color: "#333" }}
                selectedItemTextStyle={{ color: "#3C85F1" }}
                accessible={true}
                keyExtractor={item => item.id}
                labelExtractor={item => item.name}
                cancelButtonAccessibilityLabel={"Cancel Button"}
                onChange={option => {
                    props.onChange(option);
                }}
            >
                <TextInput
                    style={[Style.textBlack, styles.input]}
                    onFocus={() => this.selector.open()}
                    placeholder={props.label}
                    editable={false}
                    placeholderTextColor="#a9a9a9"
                    value={props.value}
                />
            </ModalSelector>
        </View>
    );
};

export default DropdownInput;

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: "#f5f5f5",
        color: "black",
        paddingHorizontal: 10,
        marginBottom: 16,
        width: null,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});
