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



class ProspectPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            menuStatus : [],
            status : [],
            countstatus: '',
            agentcd : [],
            email : ''
        }
    }
    async componentDidMount(){
        isMount = true;
        const data = {
        
            menuStatus : await _getData('@MenuStatus') ? await _getData('@MenuStatus') : [],
            // agentcd : await _getData('@AgentCd') ? await _getData('@AgentCd') : [],
            email :  await _getData('@User')
            // email : await _getData('@AgentCd') ? await _getData('@AgentCd') : []

        
        }
        console.log('email prospect', data)
        goToFeed = (val) =>{
            // if(val.isProject == 1){
            //     Actions.project({goTo : val.URL_angular})
            // } else {
            //     Actions[val.URL_angular]()
            // }
            console.log('menu',val);
        }

        this.setState(data, () => {
            this.getStatus();
          
        });

       
    };

    getStatus = () => {
        {
            isMount
                ? fetch(urlApi + "c_status/getStatus/", {
                      method: "GET",
                    //   headers: this.state.hd
                  })
                      .then(response => response.json())
                      
                      .then(res => {
                          if (!res.Error) {
                              const resData = res.Data;
                            
                            console.log('getstatus',res);
                            this.setState({status:resData});
                          } else {
                              this.setState(
                                  { isLoaded: !this.state.isLoaded },
                                  () => {
                                      alert(res.Pesan);
                                  }
                              );
                          }
                          console.log("getstatus", res);
                      })
                      .catch(error => {
                          console.log(error);
                      })
                : null;
        }
    }

    ListProspect(data) {
        console.log('data status prospect',data);
        Actions.ListProspect({datas : data});
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

                {/* <View style={{borderBottomWidth: 1}}> 
                </View>  */}

               


                <View>
                    <ScrollView>
                        <View style={Styles.overview}>
                        {this.state.status.length == 0 ? 
                                <View style={Styles.city}>
                                   <Shimmer autoRun={true} style={Styles.btnCity} />
                                    
                                </View>
                            :
                           
                            <View  >
                                
                            {this.state.status.map((data, key) => (
                                <TouchableOpacity  onPress={() => this.ListProspect(data)}
                                key={key}>
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
                                            {data.descs}
                                            
                                            </Text>
                                            <Text style={Styles.infoDesc}>
                                            {data.status_cd}
                                            </Text>
                                            <View style={Styles.badge}>
                                              <Text style={{color: '#fff',fontSize: 15}}> {data.cnt} </Text>
                                            </View>
                                            
                                        </View>
                                        <View>
                                            
                                        </View>

                                </View>
                            </Card>
                            </TouchableOpacity>
                           ))}
                                
                            </View>
                        }
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