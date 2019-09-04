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
    Spinner
  } from "native-base";

  import { Actions } from "react-native-router-flux";
  import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class MyUnitPage extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        units : [],
        email : "",
        name : "",
        project : [],

        isLoaded : false
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        email : await _getData('@User'),
        name : await _getData('@UserId'),
        project : await _getData('@UserProject')
      }

      this.setState(data,()=>{
        this.getUnit()
      })
    }

    getUnit = () =>{

        {isMount ?
            this.state.project.map((val)=>{
                fetch(urlApi+'c_myunits/myUnit/'+val.db_profile+'/'+this.state.email,{
                    method:'GET',
                    headers : this.state.hd,
                }).then((response) => response.json())
                .then((res)=>{
                    if(!res.Error){
                        const resData = res.Data
                        resData.map((data)=>{
                            data.cons = val.db_profile;
                            this.setState(prevState=>({
                                units : [...prevState.units, data]
                            }))
                        })
                        this.setState({isLoaded: !this.state.isLoaded});
                    } else {
                        this.setState({isLoaded: !this.state.isLoaded},()=>{
                            alert(res.Pesan)
                        });
                    }
                    console.log('getunits',res);
                }).catch((error) => {
                    console.log(error);
                })
            })
        :null}
    }

    handleChooseUnit(data) {
      
        Actions.MyUnitDetailPage({unit : data})
        // this.setState({ click : true})
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
                            {"Choose Unit".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                </Header>
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    <View>
                        <ScrollView>
                            {this.state.units.map((data, key) => (
                                <Card
                                    style={{
                                        height: null,
                                        backgroundColor: "white",
                                        shadowOffset: {
                                            width: 1,
                                            height: 1
                                        },
                                        shadowColor: "#37BEB7",
                                        shadowOpacity: 0.5,
                                        elevation: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 10
                                    }}
                                    key={key}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.handleChooseUnit(data)
                                        }
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent:
                                                    "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    textAlign: "left",
                                                    color: "#333",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {data.ProjectName}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "500",
                                                    textAlign: "left",
                                                    color: "green"
                                                }}
                                            >
                                                {data.StatusText}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent:
                                                    "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#333"
                                                }}
                                            >
                                                Agent :{" "}
                                                {data.agent_name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#333"
                                                }}
                                            >
                                                {data.Property +
                                                    " | " +
                                                    data.Level}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent:
                                                    "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#333"
                                                }}
                                            >
                                                {data.Name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#333"
                                                }}
                                            >
                                                {data.LotTypeDesc}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent:
                                                    "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#02da00"
                                                }}
                                            >
                                                {data.Phone}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    textAlign: "right",
                                                    color: "#ff720d"
                                                }}
                                            >
                                                {data.LotNo}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            ))}
                        </ScrollView>
                    </View>
                    {!this.state.isLoaded ? <Spinner color="green" /> :null}
                    
                </Content>
            </Container>
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
});

//make this component available to the app
export default MyUnitPage;
