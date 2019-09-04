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
    Card
  } from "native-base";

import { Actions } from "react-native-router-flux";
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import moment from 'moment'

let isMount = false
// create a component
class MyBillingPage extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        units : [],
        user : "",
        name : "",
        project : [],
        dataRow : []
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        user : await _getData('@User'),
        name : await _getData('@UserId'),
        project : await _getData('@UserProject'),
        debtor : await _getData('@Debtor'),
        group : await _getData('@Group')
      }

      this.setState(data,()=>{
        this.getBilling('','',data.debtor,'')
      })
    }

    getBilling = (date_start,date_end, debtor,name) =>{
        const items = this.props.items
        const data = {
            entity : items.entity_cd,
            project : items.project_no,
            date_start : date_start,
            date_end : date_end,
            name : name
        }

        {isMount ?
            
            fetch(urlApi+'c_bill_history/getDataTicket/'+items.db_profile+'/'+this.state.group+'/'+debtor,{
                method:'POST',
                headers : this.state.hd,
                body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res
                    const data =[]
                    resData.map((val)=>{
                        data.push([
                            moment(val.doc_date).format('DD MMM YYYY'),
                            val.descs,
                            val.fdoc_amt,
                            val.status
                        ])
                    })

                    this.setState({dataRow:data})
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getBillings',res);
            }).catch((error) => {
                console.log(error);
            })
            
        :null}
    }

    render() {

        const tables = {
            tableHead: ['Date', 'Description', 'Amount','Status'],
        }

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
                            {"My Billing".toUpperCase()}
                            </Text>
                        </View>
                    <View style={Style.actionBarRight}></View>
                </Header>
                <Content
               style={Style.layoutInner}
               contentContainerStyle={Style.layoutContent}
             >
              {/* <Image
              source={require("@Asset/images/tigabr.jpg")}
              style={{
                width: null,
                height: 168,
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8
              }}
            />  */}
                <View>
                    <Table>
                        <Row data={tables.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={this.state.dataRow} textStyle={styles.text} />
                    </Table>
                    
                </View>
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
    text : {
        textAlign : "center",
        fontWeight: 'bold',
    }
});

//make this component available to the app
export default MyBillingPage;
