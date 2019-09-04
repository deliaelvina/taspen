import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Dimensions
} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    Content
} from "native-base";
import {CheckBox} from 'react-native-elements';
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import HTML from 'react-native-render-html';


class NUPTerm extends Component {

    constructor(props){
        super(props);

        this.state = {
            checked : false
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.handleBuy = this.handleBuy.bind(this);

        console.log('prope',this.props);
    }
    handleCheck(){
        this.setState({checked : !this.state.checked});
    }

    handleBuy(){
        Actions.NUPPay({nup : this.props.nup});
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
                            {"Term & Condition".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                </Header>
                <Content contentContainerStyle={{justifyContent : 'center'}}>
                    <ScrollView style={lStyles.textBox} >
                        {/* <Text style={{textAlign : 'justify',fontFamily:'Montserrat-Regular'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text> */}
                        <HTML html={this.props.nup.terms_descs} baseFontStyle={{fontFamily: "Montserrat-SemiBold"}} imagesMaxWidth={Dimensions.get('window').width} />
                    </ScrollView>
                    <View style={lStyles.checkBoxWrap}>
                        <CheckBox
                        title={`I have read and accept the terms & conditions`}
                        checked= {this.state.checked}
                        onPress = {this.handleCheck}
                        />
                    </View>
                    <Button onPress={this.handleBuy} disabled={!this.state.checked} style={{alignSelf : 'center', marginTop : 20}}>
                        <Text style={{fontFamily :'Montserrat-Regular'}}>Accept</Text>
                    </Button>
                </Content>

            </Container>

        );
    }
}
export default NUPTerm;

const navStyles = StyleSheet.create({
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

const lStyles = StyleSheet.create({
    textBox : {
        flex : 1,
        height : Dimensions.get('window').height * 0.6,
        backgroundColor:'#fff', 
        marginHorizontal : 30,
        paddingHorizontal : 20, 
        marginTop : 20,
        paddingTop : 10,
        borderColor : '#333',
        borderWidth : 1
    },
    checkBoxWrap : {
        marginHorizontal : 10
    }
})