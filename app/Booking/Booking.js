//import liraries
import React, { Component } from 'react';
import {
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform,
    SafeAreaView,
    View,
    FlatList,
    Modal
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    FooterTab,
    Badge,
    Card,
    Textarea,
    Picker
} from "native-base";

import { Actions } from "react-native-router-flux";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from '@Component/StoreAsync';
import { urlApi } from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class BookingPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hd: null,

            customers: [],
            user: "",
            name: "",
            project: [],
            selected: ""
        }

        console.log('props cf', props);
    }

    onValueChange(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        let { bookedby, name, email, hp } = this.state
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
                            {"Booking".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <View>
                        <ScrollView>
                            <View style={Styles.overview}>
                                <Card style={{
                                    height: null,
                                    backgroundColor: 'white',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowColor: "#37BEB7",
                                    shadowOpacity: 0.5,
                                    elevation: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    flex: 1
                                }}>

                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                textAlign: 'left',
                                                color: '#333',
                                                fontWeight: "bold"
                                            }}>
                                                Booking Details
                                    </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                IFCA APARTEMENT
                                        </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                Apartment | Lantai 12 | 1225
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                Installment 36 X | IDR. 2.698.000
                                            </Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>

                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Booked By</Text>
                                <TextInput style={Styles.textInput} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Full Name</Text>
                                <TextInput style={Styles.textInput} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Mobile Number</Text>
                                <TextInput style={Styles.textInput} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Email Address</Text>
                                <TextInput style={Styles.textInput} keyboardType="email-address" />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Identity No.</Text>
                                <TextInput style={Styles.textInput} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Nationality</Text>
                                <Picker note
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Indonesia" value="key0" />
                                    <Picker.Item label="Malaysia" value="key1" />
                                </Picker>
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Your Address</Text>
                                <TextInput
                                    style={Styles.textInput}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Booking Type</Text>
                                <Picker note
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="-" value="key0" />
                                </Picker>
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Amount</Text>
                                <TextInput style={Styles.textInput} keyboardType="numeric" />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Your Remarks</Text>
                                <TextInput
                                    style={Styles.textInput}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Upload KTP</Text>
                                <TouchableOpacity style={styles.buttonUpload}>
                                    <Icon name="camera" type="FontAwesome" style={{ color: '#DADADA' }}></Icon>
                                    <Text style={{ color: '#DADADA', paddingTop: 10 }}>UPLOAD KTP</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Upload NPWP</Text>
                                <TouchableOpacity style={styles.buttonUpload}>
                                    <Icon name="camera" type="FontAwesome" style={{ color: '#DADADA' }}></Icon>
                                    <Text style={{ color: '#DADADA', paddingTop: 10 }}>UPLOAD NPWP</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Upload Bukti Transfer</Text>
                                <TouchableOpacity style={styles.buttonUpload}>
                                    <Icon name="camera" type="FontAwesome" style={{ color: '#DADADA' }}></Icon>
                                    <Text style={{ color: '#DADADA', paddingTop: 10 }}>UPLOAD BUKTI TRANSFER</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.overview}>
                                <Button rounded warning full
                                    style={{ marginTop: 16, borderRadius: 10 }}>
                                    <Text>CONFIRM</Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </Content>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    buttonUpload: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        height: 80,
    },

});

//make this component available to the app
export default BookingPage;
