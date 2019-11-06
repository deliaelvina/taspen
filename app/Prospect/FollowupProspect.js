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
import moment from "moment";


// import styles, { colors } from "./styles/index";



    
   


class FollowupProspect extends Component {
    constructor(props){
        super(props);

        this.state = {
            datafollowup: [],
            business_id: '',
            remarks: '',
            contact_date: '',
            // markedDate: moment('' .format("DD/MM/YYYY")
        
        };
        
        console.log('props follow up',props);
    }
    async componentDidMount(){
        
        const dataProspect = await _getData("statusProspect");
        console.log("_getdata dari ListProspect",dataProspect);
        Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            
            //tab 1
            business_id: dataProspect.business_id,
            
            
            
        }
        console.log('componen did mount follow up', data);
        isMount = true;
        this.setState(data, () => {
            this.getDataFollowUp(this.props.datas)
            // this.getProvince2();
            // this.getPostCode();
            
        });
    };

    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false;
        // this.props.onBack();
      }
    getDataFollowUp = () => {
       
        const business_id = this.state.business_id
        // const {status_cd} = this.props.datas
        // const {email} = this.state
        // // alert(isMount);
        {isMount ?
        fetch(urlApi + 'c_follow_up/getTable/IFCAPB2/',{
            method:'POST',
            body: JSON.stringify({business_id})
            // headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
               
                console.log('data follow up',res);
                this.setState({datafollowup:resData});
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            
        }).catch((error) => {
            console.log(error);
        })
        :null}
    }

    AddFollowUp() {
        // console.log('data status prospect',data);
        Actions.AddFollowUp();
        // Actions.IndexProspect
        this.setState({ click : true})
    }

    receiveProps = () =>{
        // this.tes();
        isMount=true;
        // alert('refresh');
        this.getDataFollowUp(this.props.datas);
    }

    async DetailFollowUp (data) {
        // _storeData("datafollowup", data);
        console.log('all data follow up', data);
        Actions.DetailFollowUp({datas: data, onBack: () => this.receiveProps()});
        this.setState({click : true})
    }

    render() {
        // const contact_date = this.state.contact_date
        const date = moment(Date(this.state.contact_date)).format("DD/MM/YYYY");
        // console.log('date',date);
        return (
            
            <Container style={Style.bgMain}>
                 <View>
                    <ScrollView>
                        <View style={Styles.overview}>
                        
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
                                onPress={()=>Actions.AddFollowUp()}>
                                <Text style={{color: '#fff', fontSize: 12}}>Add Follow Up</Text>
                                {/* <Icon name='user-plus' type="FontAwesome5" style={{color: '#fff', fontSize: 18}}/> */}
                                {/* plus */}
                            </Button>
                        </View>
                        
                        {this.state.datafollowup.length == 0 ?
                            <ActivityIndicator />
                        : 
                            <View  >
                                
                            {this.state.datafollowup.map((data, key) => (
                                <TouchableOpacity  onPress={() => this.DetailFollowUp(data) }
                                key={key} >
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
                                    <View>
                                        <Text style={{fontSize: 12, color: '#222',textAlign: 'left'}}>
                                            Description
                                        </Text>
                                        <Text style={{fontSize: 17, color: '#222',fontWeight: 'bold'}}>
                                            {data.remarks}
                                        </Text>
                                    </View>

                                    <View style={{paddingTop: 5}}>
                                        <Text style={{fontSize: 12, color: '#222',textAlign: 'left'}}>
                                            Note from PIC
                                        </Text>
                                        <Text style={{fontSize: 17, color: '#222',fontWeight: 'bold'}}>
                                            {data.remarks2}
                                        </Text>
                                    </View>
                                   
                                    
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between',width: '100%',paddingTop: 5}}>
                                        <View style={{justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 12, color: '#222'}}>
                                                Date
                                            </Text>
                                            <Text style={{fontSize: 15, color: '#222',textAlign: 'left'}}>
                                                {date}
                                            </Text>
                                            
                                        </View>


                                        <View>
                                            <Text style={{fontSize: 12, color: '#222'}}>
                                                Time
                                            </Text>
                                            <Text style={{fontSize: 15, color: '#222',textAlign: 'left'}}>
                                                {/* {date} */}
                                                {data.time_prospect}
                                            </Text>
                                        </View>
                                        <View style={{justifyContent: 'flex-end', right: 5}}>
                                            <Text style={{fontSize: 12, color: '#222'}}>
                                                Duration
                                            </Text>
                                            <Text style={{fontSize: 15, color: '#222',textAlign: 'left'}}>
                                                {data.duration_hour} h {data.duration_minute} m
                                            </Text>
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