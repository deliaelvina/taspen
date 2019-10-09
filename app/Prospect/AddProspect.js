import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    Right,
    Content,
    Picker,
    DatePicker
} from "native-base";
import Styles from "./Style";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {_storeData,_getData} from '@Component/StoreAsync';
import TabBar from '@Component/TabBar';

let isMount = false;

class AddProspect extends Component {

    constructor(props){
        super(props)

        this.state = {
            errors: false,
            selected: "",

            business: "",
            classess: "",
            vips: "",
        }
    }


    onValueChange(value) {
        this.setState({
            selected: value
        })
    }

    onNext(step) {
        const { business, classess, vips } = this.state

        if (step == 1) {
            if (business && classess && vips) {
                this.setState({ errors: false })
            } else {
                this.setState({ errors: true })
                alert("Please fill red star form")
            }
        }
    }

 
    render() {
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation}>
                    <StatusBar
                        backgroundColor={Colors.statusBarOrange}
                        animated
                        barStyle="light-content"
                    />

                    <View style={Style.actionBarLeft}>
                        <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                style={Style.textWhite}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                            {"Add Prospect".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
                


                <Content
                 style={Style.layoutInner}
                 contentContainerStyle={Style.layoutContent}
                >

    <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep label="Prospect Type" onNext={this.onNextStep} errors={this.state.errors}>
            {/* <View style={{ alignItems: 'center' }}> */}
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Business Type</Text>
                     </View>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Company" value="C" />
                            <Picker.Item label="Individu" value="I" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Class</Text>
                     </View>
                        <Picker note 
                            mode="dropdown"
                            style={Styles.textInput}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Apartement" value="A" />
                            <Picker.Item label="Ruko" value="R" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>VIP</Text>
                     </View>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Yes" value="Y" />
                            <Picker.Item label="No" value="N" />
                        </Picker>
                </View>
            {/* </View> */}
          </ProgressStep>
          <ProgressStep label="Detail Information">
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Salutation</Text>
                     </View>
                     <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Bapak" value="B" />
                            <Picker.Item label="Ibu" value="P" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Name</Text>
                     </View>
                    <TextInput style={Styles.textInput} />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Address</Text>
                     </View>
                    <TextInput 
                        style={Styles.textInputArea}
                        numberOfLines={7}
                        multiline={true} />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Post Code</Text>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="-" value="code" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Village</Text>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="-" value="vill" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>District</Text>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="-" value="distr" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>City</Text>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="-" value="city" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Province</Text>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="-" value="prov" />
                        </Picker>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Telephone</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Handphone / Whatsapp</Text>
                     </View>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Alternatif Handphone</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Alternatif Handphone 2</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Email</Text>
                     </View>
                    <TextInput keyboardType="email-address" style={Styles.textInput} />
                </View>
          </ProgressStep>
        
        <ProgressStep label="Other Information">
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Birth Date</Text>
                <View style={Styles.dateInput}>
                <DatePicker />
                </View>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Married</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Sex</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Spouse Name</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Company Name</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Occupation</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Contact</Text>
                <TextInput style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Media</Text>
                </View>
                <TextInput style={Styles.textInput} />
            </View>
        </ProgressStep>

        </ProgressSteps>
      </View>
                    
                </Content>
                    
            </Container>

        );
    }
}
export default AddProspect;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      paddingTop: 20,
    },
    tabItem: {
      // flex: 1,
      alignItems: 'center',
      padding: 16,
    },
});