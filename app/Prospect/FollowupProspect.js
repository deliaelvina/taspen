import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput
    

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
    Card,
    Content,
    Accordion,
    Label,
    Picker,
    CardItem,
    Left,
   
    Item,
} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
import { Input } from "react-native-elements";


// import styles, { colors } from "./styles/index";



    
   


class FollowupProspect extends Component {

    render() {
        return (
            <Container style={Style.bgMain}>
                 <View>
                    <ScrollView>
                        <View style={Styles.overview}>
                        
                           
                            <View  >
                                
                            
                                <TouchableOpacity  onPress={() => alert('tes')}
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
                                          tes
                                            
                                            </Text>
                                            <Text style={Styles.infoDesc}>
                                          tes
                                            </Text>
                                            <View style={Styles.badge}>
                                              <Text style={{color: '#fff',fontSize: 15}}>tes </Text>
                                            </View>
                                            
                                        </View>
                                        <View>
                                            
                                        </View>

                                </View>
                            </Card>
                            </TouchableOpacity>
                           
                                
                            </View>
                        
                        </View>
                    </ScrollView>
                </View>
            </Container>

        );
    }
}
export default FollowupProspect;

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