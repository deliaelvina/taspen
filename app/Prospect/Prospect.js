import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    Right,
    Card
} from "native-base";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
// import styles, { colors } from "./styles/index";

// const navState = {
//     index: 0,
//     routes: [
//       { key: 'nup', title: 'NUP Online' },
//       { key: 'status', title: 'Status' },
//       { key: 'history', title: 'History' },
//     ]
// }

// const navScene = {
//     nup: NUP,
//     status: NUPStatus,
//     history : NUPHistory
// }



class ProspectPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            menuStatus : []
        }
    }
    async componentDidMount(){
        const data = {
        
            menuStatus : await _getData('@MenuStatus') ? await _getData('@MenuStatus') : []
        
        }
        goToFeed = (val) =>{
            // if(val.isProject == 1){
            //     Actions.project({goTo : val.URL_angular})
            // } else {
            //     Actions[val.URL_angular]()
            // }
            console.log('menu',val);
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
                            {"My Prospect".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>

                {/* <Button
                    small
                    rounded
                    style={Styles.sBtnHead}
                    onPress={()=>Actions.ListingProjectPage()}>
                    <Text style={Styles.sLinkHead}>ALL PROJECT</Text>
                </Button> */}

                {/* <View
                    style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        flex: 1,
                        paddingLeft: 16,
                        // paddingBottom: 20,
                        // marginBottom: -10
                    }}
                    >
                    <Button
                        small
                        rounded
                        style={Styles.sBtnHead}
                        onPress={()=>Actions.ListingProjectPage()}>
                        <Text style={Styles.sLinkHead}>All Prospect</Text>
                    </Button>
                </View> */}

            


                <View
                    style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        right: 5,
                        top: 10,
                        marginBottom: 20,
                    }}
                    >
                    <Button
                        small
                        rounded
                        style={Styles.sBtnHeadAdd}
                        onPress={()=>Actions.AddProspect()}>
                        {/* <Text style={Styles.sLinkHead}>Add Prospect</Text> */}
                        <Icon name='user-plus' type="FontAwesome5" style={{color: '#fff', fontSize: 18}}/>
                        {/* plus */}
                    </Button>
                </View>

                <View style={{borderBottomWidth: 1}}> 
                </View> 
               
                
                <ListItem
                    style={Styles.infoItem}
                    // onPress={() => Actions.SimulasiPage()}
                    onPress={() => alert('Dalam pembuatan')}
                    >
                    <Image
                        source={require("@Asset/icon/calculator.png")}
                        style={Styles.infoIcon}
                    />
                    <View style={{ alignSelf: "center" }}>
                        <Text style={Styles.infoHeader}>
                        {"Low".toUpperCase()}
                        </Text>
                        <Text style={Styles.infoDesc}>
                        {"Low Prospect"}
                        </Text>
                    </View>

                    <Right style={{ position: "absolute", right: 10 }}>
                        <Icon name="ios-arrow-dropright" style={{ fontSize: 30 }} />
                    </Right>
                </ListItem>
                <ListItem
                    style={Styles.infoItem}
                    // onPress={() => Actions.SimulasiPage()}
                    onPress={() => alert('Dalam pembuatan')}
                    >
                    <Image
                        source={require("@Asset/icon/calculator.png")}
                        style={Styles.infoIcon}
                    />
                    <View style={{ alignSelf: "center" }}>
                        <Text style={Styles.infoHeader}>
                        {"Medium".toUpperCase()}
                        </Text>
                        <Text style={Styles.infoDesc}>
                        {"Medium Prospect"}
                        </Text>
                    </View>

                    <Right style={{ position: "absolute", right: 10 }}>
                        <Icon name="ios-arrow-dropright" style={{ fontSize: 30 }} />
                    </Right>
                </ListItem>
                <ListItem
                    style={Styles.infoItem}
                    // onPress={() => Actions.SimulasiPage()}
                    onPress={() => alert('Dalam pembuatan')}
                    >
                    <Image
                        source={require("@Asset/icon/calculator.png")}
                        style={Styles.infoIcon}
                    />
                    <View style={{ alignSelf: "center" }}>
                        <Text style={Styles.infoHeader}>
                        {"Hard".toUpperCase()}
                        </Text>
                        <Text style={Styles.infoDesc}>
                        {"Hard Prospect"}
                        </Text>
                    </View>

                    <Right style={{ position: "absolute", right: 10 }}>
                        <Icon name="ios-arrow-dropright" style={{ fontSize: 30 }} />
                    </Right>
                </ListItem>
                
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
                                        flex: 1, 
                                        alignItems: "flex-start",
                                    }}>
                                    <View style={{flexDirection: "row"}}>
                                        <Image
                                                source={require("@Asset/icon/calculator.png")}
                                                style={Styles.infoIcon}
                                            />
                                            <View style={{ alignSelf: "center" }}>
                                                <Text style={Styles.infoHeader}>
                                                {"Low".toUpperCase()}
                                                </Text>
                                                <Text style={Styles.infoDesc}>
                                                {"Low Prospect"}
                                                </Text>
                                            </View>

                                    </View>
                                        

                                        {/* <Right style={{ position: "absolute", right: 10 }}>
                                            <Icon name="ios-arrow-dropright" style={{ fontSize: 30 }} />
                                        </Right> */}
                                </Card>

                            </View>
                    </ScrollView>
                </View>
                

                    
            </Container>

        );
    }
}
export default ProspectPage;

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