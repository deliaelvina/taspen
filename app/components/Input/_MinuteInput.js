import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
import moment from "moment";
import Style from "../../Themes/Style";

const MinuteInput = props => {
    const [time, setTime] = useState(props.value);
    const [visible, setVisible] = useState(false);

    const handlePicker = (val) =>{
        setTime(val);
        setVisible(false);
        props.onChange( name = props.name, val)
    }

    return (
        <View>
            <Text style={Style.textBlack}>{props.label}</Text>
            <TouchableOpacity
                pointerEvents="auto"
                onPress={() => setVisible(!visible)}
            >
                <View pointerEvents="none">
                    <TextInput
                        style={[Style.textBlack,styles.input]}
                        placeholder={props.label}
                        editable={false}
                        placeholderTextColor="#a9a9a9"
                        value={
                            time == ""
                                ? ""
                                : moment(time).format(
                                      "HH:mm"
                                  )
                        }
                    />
                </View>
            </TouchableOpacity>
            <DateTimePicker
                mode={props.mode}
                is24Hour={true}
                date={time}
                isVisible={visible}
                minimumDate={new Date()}
                onConfirm={handlePicker}
                onCancel={() => setVisible(!visible)}
                timePickerModeAndroid="spinner"
            />
        </View>
    );
};

export default MinuteInput;

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
    },

    inputTime: {
        height: 40,
        backgroundColor: "#f5f5f5",
        color: "black",
        paddingHorizontal: 10,
        marginBottom: 16,
        width: deviceWidth * 0.4,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    inputUsage: {
        height: 40,
        color: "black",
        marginBottom: 16,
        // borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    inputDate: {
        height: 40,
        backgroundColor: "#f5f5f5",
        color: "black",
        paddingHorizontal: 10,
        marginBottom: 16,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left"
    },
    btnMin: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#f1f1f1",
        width: deviceWidth * 0.08
    },
    btnPlus: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#f1f1f1",
        width: deviceWidth * 0.08
    }
});
