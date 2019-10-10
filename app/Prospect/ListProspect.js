import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView
    

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

    
   


class ListProspect extends Component {
    

    constructor(props){
        super(props)

        this.state = {
            status_cd : '',
            email: '',
            detail: []


        }
        console.log('props status prospesct',props);
    }
    async componentDidMount(){
        Actions.refresh({ backTitle: () => this.props.status_cd });
        const data = {
            status_cd : this.props.datas.status_cd,
            email : await _getData('@User'),
        }
        console.log('data', data);
        isMount = true;
        this.setState(data, () => {
            this.getDataListProspect(this.props.datas)
        });
    };

    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false
      }

    getDataListProspect = () => {
        const {status_cd} = this.props.datas
        const {email} = this.state
        {isMount ?
        fetch(urlApi + 'c_prospect/getProspect/IFCAPB/',{
            method:'POST',
            body: JSON.stringify({status_cd,email})
            // headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
               
                console.log('datalistprospect',res);
                this.setState({detail:resData});
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            console.log('datalistprospect',res);
        }).catch((error) => {
            console.log(error);
        })
        :null}
    }

    DetailProspect(data) {
        console.log('data status prospect',data);
        Actions.Detail({datas : data});
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
                            {this.state.status_cd.toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>

                <View>
                
                    <List style={{paddingVertical: 8}} >

                        {this.state.detail.map((data, key) => (
                            <ListItem onPress={()=>this.DetailProspect(data) } key={key}>                               
                                <View style={{alignSelf:'flex-start'}} >
                                    <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>{data.name}</Text>
                                    <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>{data.handphone}</Text>
                                    <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>{data.business_id}</Text>
                                    <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>Follow Up Date : 08-09-2019</Text>
                                </View>
                                <Right style={{position:'absolute',right:30}} >
                                    <Icon color="green" name="phone" style={{fontSize: 30,color: 'green'}} type="FontAwesome" onPress={()=>alert('tlp') }/>
                                </Right>
                            </ListItem>
                        ))}


                    </List>
                    
                </View>

               
                

                    
            </Container>

        );
    }
}
export default ListProspect;

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