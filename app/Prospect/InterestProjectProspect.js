import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    List,
    Right,
    Card
} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
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


   


class InterestProjectProspect extends Component {

    AddProject(){

        Actions.AddProject();
        // Actions.IndexProspect
        this.setState({ click : true})
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
                            {/* {"Low".toUpperCase()} */}
                            {/* {data.descs} */}
                            {/* {this.state.status_cd.toUpperCase()} */}
                            {/* {this.state.descs.toUpperCase()} */}
                            Interest Project Prospect
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
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
                        onPress={()=>Actions.AddProject()}>
                        {/* <Text style={Styles.sLinkHead}>Add Prospect</Text> */}
                        <Icon name='plus' type="FontAwesome5" style={{color: '#fff', fontSize: 18}}/>
                        {/* plus */}
                    </Button>
                </View>

                <View>
                    <ScrollView>
                        <View style={Styles.overview_padhorizontal}>
                        {/* {this.state.status.length == 0 ?  */}
                                {/* <View style={Styles.city}>
                                   <Shimmer autoRun={true} style={Styles.btnCity} />
                                    
                                </View> */}
                            {/* : */}
                           
                            <View  >
                                
                            {/* {this.state.status.map((data, key) => ( */}
                                <TouchableOpacity  onPress={() => alert('tes')}
                                // key={key}
                                >
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
                                    // backgroundColor: 'red'
                                }} 
                               
                                >
                                <View style={{flexDirection: "row"}}>
                                        {/* <Image
                                            source={require("@Asset/icon/calculator.png")}
                                            style={Styles.infoIcon}
                                        /> */}
                                        <View style={{ alignSelf: "center",width: '100%' }}>
                                            <Text style={Styles.infoHeader}>
                                            {/* {data.descs} */}
                                            Project Name : Project Name
                                            </Text>
                                            <Text style={Styles.infoHeader}>
                                            {/* {data.status_cd} */}
                                            Property Name : Property Name
                                            </Text>
                                            <Text style={Styles.infoHeader}>
                                            {/* {data.status_cd} */}
                                            Lot No : Lot No
                                            </Text>
                                            <Text style={Styles.infoHeader}>
                                            {/* {data.status_cd} */}
                                            Rent : Rent
                                            </Text>
                                            <Text style={Styles.infoHeader}>
                                            {/* {data.status_cd} */}
                                            Buy : Buy
                                            </Text>

                                            {/* <View style={Styles.badge}>
                                              <Text style={{color: '#fff',fontSize: 15}}> 
                                              
                                               </Text>
                                            </View> */}
                                            
                                        </View>
                                 </View>
                                 </Card>
                                </TouchableOpacity>
                           {/* ))} */}
                                
                            </View>
                        {/* // } */}
                        </View>
                    </ScrollView>
                </View>     
            </Container>

        );
    }
}
export default InterestProjectProspect;

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