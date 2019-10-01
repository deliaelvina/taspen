//import liraries
import React, { Component } from "react";
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
    Modal,
    Alert
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
    Form,
    Label,
    Spinner
} from "native-base";


import { Actions } from "react-native-router-flux";
import {_storeData,_getData} from '@Component/StoreAsync';
import { Style, Colors } from "../Themes";
import {urlApi} from '@Config/services';

// create a component
class UnitEnquiry extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

          email : "",
          name : "",
          hd : null,
          dataTower : [],

          dataLevel :[],
          dataUnit : [],

          isLoaded : false
        };

        console.log('props',props);
    }

    async componentDidMount(){
    //   console.log('Data Project',await _getData('@UserProject'));
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        email :  await _getData('@User'),
        name : await _getData('@Name'),
        dataTower : await _getData('@UserProject'),
      }
  
      this.setState(data,()=>{
        this.getLevel()
        this.getEnquiry()
      })
    }

    getLevel = () => {
        let {db_profile, entity_cd, project_no, tower} = this.props.prevItems ? this.props.prevItems : this.props.items;        
        !tower ? tower=1 : tower;
        fetch(urlApi+'c_product_info/getLevelEnquiry/'+db_profile+'/'+entity_cd+'/'+project_no+'/'+tower ,{
            method : "GET",
            headers : this.state.hd,
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data

                this.setState({dataLevel : resData});
    
                // console.log('getLevel',resData);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getEnquiry = () => {
        let {db_profile, entity_cd, project_no, tower, lot_type} = this.props.prevItems ? this.props.prevItems : this.props.items;
        !tower ? tower=1 : tower;
        !lot_type ? lot_type="" : lot_type;
        
        fetch(urlApi+'c_product_info/getAllUnit/'+db_profile+'/'+entity_cd+'/'+project_no+'/'+tower+'/'+lot_type ,{
            method : "GET",
            headers : this.state.hd,
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
                console.log(resData);
    
                // var arr2 = resData.reduce( (a,b) => {
                //     var i = a.findIndex( x => x.id === b.id);
                //     return i === -1 ? a.push({ level_no : b.id, times : 1 }) : a[i].times++, a;
                // }, []);
            
                this.setState({dataUnit : resData, isLoaded : true})
                // console.log('getEnquiry',resData);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    GetGridViewItem(item) {
        Alert.alert(item);
    }

    clickUnitInfo(item) {
        // console.log('item',item);
        if(item.status == 'A'){
          Actions.unitinfo({
            items : item,
            prevItems : this.props.prevItems,
            unitItems : this.props.unitItems
          });
        } else {
          alert('This Unit is Not Available')
        }
        // this.setState({ click: true });
    }

    state = {
        isVisible: false,
        //state of modal default false
    };

    render() {
        const {project_descs} = this.props.prevItems ? this.props.prevItems :this.props.items;
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation}>
                    <StatusBar
                        backgroundColor={Colors.statusBarOrange}
                        animated
                        barStyle="dark-content"
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
                            {"Unit Enquiry".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <View style={{ padding: 16 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "#000000"
                        }}
                    >
                        {project_descs}                        
                    </Text>

                    <Text style={{ fontSize: 15, color: "#000000" }}>
                        Apartment
                    </Text>
                </View>

                {/* <Header style={{backgroundColor:'#fff'}}>
          <View style={Style.actionBarLeft}>
            <Text>Block /Tower</Text>
          </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>{"Unit".toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header> */}
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <View style={styles.container}></View>
                    <View style={styles.MainContainer}>
                        {/* head */}

                        {/* end head */}

                        {/* top fixed */}

                        <View
                            style={{
                                backgroundColor: "#ffffff",
                                width: "100%",
                                height: 50
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ padding: 10, width: "30%" }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: 15
                                        }}
                                    >
                                        Block / Floor
                                    </Text>
                                </View>
                                <View style={{ padding: 10, width: "70%" }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: 15,
                                            textAlign: "center"
                                        }}
                                    >
                                        Unit
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {!this.state.isLoaded ? <Spinner color={Colors.headerOrange} /> : 

                        this.state.dataLevel.map((level, key)=>
                            <View key={key} style={{flexDirection:'row',justifyContent:'space-around',flex :1}}>
                                <View style={[{width :'45%'},styles.GridViewBlockStyle_Left]}>
                                    <Text style={{color: "#ffffff"}}>{level.descs}</Text>
                                </View>
                                <ScrollView style={{width:'55%'}} horizontal showsHorizontalScrollIndicator={false}>
                                    {this.state.dataUnit.map((unit,key)=>{
                                        if(unit.level_no == level.level_no){
                                            return (
                                                <View style={ styles.GridViewBlockStyle } key={key}>
                                                    <TouchableOpacity
                                                        style={[{backgroundColor : unit.status !=="A" ? '#eb4034' :'#34eb6e'},styles.childGridView]}
                                                        onPress={()=>this.clickUnitInfo(unit)}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 10,
                                                                color: "#ffffff"
                                                            }}
                                                            
                                                        >
                                                            {" "}
                                                            {unit.lot_no}{" "}
                                                        </Text>
                                                        <Text style={{
                                                                fontSize: 10,
                                                                color: "#ffffff"
                                                            }}>{unit.descs}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </ScrollView>
                            </View>
                        )}

                        {/* <View
                            style={{
                                backgroundColor: "#ffffff",
                                width: "100%",
                                height: 50
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ padding: 10, width: "30%" }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: 15
                                        }}
                                    >
                                        Block / Floor
                                    </Text>
                                </View>
                                <View style={{ padding: 10, width: "70%" }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: 15,
                                            textAlign: "center"
                                        }}
                                    >
                                        Unit
                                    </Text>
                                </View>
                            </View>
                        </View> */}
                        {/* end top fixed */}

                        {/* <ScrollView>
                            <View style={{ flexDirection: "row" }}>
                                <FlatList
                                    style={{ width: "35%" }}
                                    data={dataLevel}
                                    keyExtractor= {item => item.level_no}
                                    renderItem={({ item }) => (
                                        <View style={ styles.GridViewBlockStyle_Left }>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: "#ffffff"
                                                }}
                                                onPress={this.GetGridViewItem.bind(
                                                    this,
                                                    item.level_no
                                                )}
                                            >
                                                {" "}
                                                {item.descs}{" "}
                                            </Text>
                                        </View>
                                    )}
                                    numColumns={1}
                                />

                                <ScrollView horizontal>
                                    <FlatList
                                        style={{ width: "65%" }}
                                        data={dataUnit}
                                        keyExtractor={item => item.level_no}
                                        renderItem={({ item }) => (
                                            <View style={ styles.GridViewBlockStyle }>
                                                <TouchableOpacity
                                                    style={[{backgroundColor : item.status !=="A" ? '#eb4034' :'#34eb6e'},styles.childGridView]}
                                                    onPress={()=>this.clickUnitInfo(item)}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: "#ffffff"
                                                        }}
                                                        
                                                    >
                                                        {" "}
                                                        {item.lot_no}{" "}
                                                    </Text>
                                                    <Text style={{
                                                            fontSize: 10,
                                                            color: "#ffffff"
                                                        }}>{item.descs}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        numColumns={23}
                                    />
                                </ScrollView>
                            </View>
                        </ScrollView> */}
                    </View>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexibleContainer: {
        flex: 1
    },
    text: {
        textAlign: "center",
        color: "#02326b",
        fontSize: 40,
        lineHeight: 80
    },
    MainContainer: {
        justifyContent: "center",
        flex: 1,
        margin: 10,
        paddingTop: Platform.OS === "ios" ? 20 : 0
    },

    GridViewBlockStyle_Left: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        height: 55,
        // marginTop: 5,
        // backgroundColor: "#ff720d",
        backgroundColor: Colors.navyUrban,
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },

    GridViewBlockStyle: {
        justifyContent: "center",
        // start: 'left',
        flex: 1,
        // alignItems: 'center',
        height: 55,
        width: 90,
        // borderRadius: 20,
        // margin: 5,
        padding: 1,
        backgroundColor: "white",
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },

    GridViewInsideTextItemStyle: {
        color: "#fff",
        //  padding: 10,
        fontSize: 18,
        justifyContent: "center"
    },
    childGridView: {
        borderRadius: 10,
        paddingLeft: 5,
        borderWidth: 3,
        borderColor: "#c1c1c0",
        elevation: 2,
        height: null,
        width: null,
        justifyContent: "center",
        alignItems: "center",
        padding: 2
    }
});

//make this component available to the app
export default UnitEnquiry;
