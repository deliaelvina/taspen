import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
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
} from "native-base";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
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



class AddProspect extends Component {

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
                            {"Add Prospect".toUpperCase()}
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
               
                
                
                

                    
            </Container>

        );
    }
}
export default AddProspect;

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