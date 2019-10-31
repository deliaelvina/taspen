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
    
    // DatePicker,
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
// import DateTimePicker from "react-native-modal-datetime-picker";
// import DatePicker from "react-native-modal-datetime-picker";
import { DateInput, MinuteInput, DatetimeInput } from "../components/Input";
import Timer from "jest-jasmine2/build/jasmine/Timer";

// import styles, { colors } from "./styles/index";



    
   


class AddFollowUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            datafollowup: [],
            project: [],
            audit_user: "",
            business_id: '',
            remarks: '',
            remarks2: '',
            contact_date: '',
            // contact_person: '',
            isDateTimePickerVisible: false,
            // time: new Date().getHours(),
            time_prospect: new Date(),
            // duration:new Date('00:00'),
            duration: new Date(Date.UTC(2018, 11, 1, 0, 0, 0)),
            contact_date: new Date(),
            
            // markedDate: moment('' .format("DD/MM/YYYY")
        
        };
        
        console.log('props follow up',props);
    }

    handleDateChange = (name, time) => {
        console.log("time", time);
        this.setState({ [name]: time });
    };
    async componentDidMount(){
        
        const dataProspect = await _getData("statusProspect");
        console.log("_getdata dari ListProspect",dataProspect);
        Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            
            //tab 1
            business_id: dataProspect.business_id,
            project : await _getData('@UserProject'),
            audit_user : await _getData('@UserId')
            
            // contact_person: dataProspect.contact_person  
        }
        console.log('componen did mount add follow up', data);
        isMount = true;
        this.setState(data, () => {
           
            // this.getDataFollowUp()
            // this.getProvince2();
            // this.getPostCode();
            
        });
    };

    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false;
        // this.props.onBack();
      }

    saveFollowUp = () => {
        const {
           
            //tab2
            // entity_cd,
            // project_cd,
            project,
            business_id,
            contact_date,
            // follow_up_date,
            time_prospect,
            contact_person,
            // duration_hour,
            // duration_minute,
            duration,
            remarks,
            remarks2,
            audit_user,
            // audit_user,
           
            
            
        } = this.state

        const formData = {
            entity_cd: project[0].entity_cd,
            project_no: project[0].project_no,
            business_id: business_id,
            audit_user: audit_user,
            // contact_date: contact_date,
            contact_person: 'null',
            contact_date: moment(contact_date).format("YYYY-MM-DD HH:mm:ss"),
            follow_up_date: moment(contact_date).format("YYYY-MM-DD HH:mm:ss"),
            time_prospect:  moment(time_prospect).format("HH:mm"),
            // time_prospect: moment(time_prospect).format("YYYY/MM/DD HH:mm:ss"),
            duration_hour: moment(duration).format("HH"),
            duration_minute: moment(duration).format("mm"),
            remarks: remarks,
            remarks2: remarks2

        }
        console.log('save follow up', formData)

        fetch(urlApi+'c_follow_up/save/IFCAPB2/',{
            method : "POST",
            body :JSON.stringify(formData),
            // headers :{
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json',
            //     'Token' : this.state.token
            // }
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                alert(res.Pesan)
                // _storeData('@Name',name)
                // _storeData('@Handphone',hp)
                // _storeData('@ProfileUpdate',true)
            }
            console.log('update other information',res)

        }).catch((error) => {
            console.log(error);
        });
       
    } 
    

    render() {
        // const contact_date = this.state.contact_date
        // const date = moment(Date(this.state.contact_date)).format("DD/MM/YYYY");
        // console.log('date',date);
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
                            Add Follow Up
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
               
           
                   <Content>
                     
                        <View style={Styles.overview}  >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles}>Prospect ID</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Prospect ID'} value={this.state.business_id} />
                        </View>
                        <View style={Styles.overview}>
                            <View style={Styles.subWrapLarge}>
                                <DatetimeInput
                                    name="contact_date"
                                    label="Date Prospect"
                                    mode="date"
                                    onChange={this.handleDateChange}
                                    value={this.state.contact_date}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                            <View style={Styles.subWrap}>
                                <DateInput
                                    name="time_prospect"
                                    label="Time Prospect"
                                    mode="time"
                                    onChange={this.handleDateChange}
                                    value={this.state.time_prospect}
                                />
                            </View>
                            <View style={Styles.subWrap}>
                                <DateInput
                                    name="duration"
                                    label="Duration hr. mn."
                                    mode="time"
                                    onChange={this.handleDateChange}
                                    value={this.state.duration}
                                />
                            </View>
                        </View>
                        <View style={Styles.overview}  >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles}>Description</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Description'} value={this.state.remarks} onChangeText={(val)=>{this.setState({remarks:val})}}  />
                        </View>
                        <View style={Styles.overview}  >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles}>Note from PIC</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Note from PIC'} value={this.state.remarks2} onChangeText={(val)=>{this.setState({remarks2:val})}} />
                        </View>
                   
                   </Content>
                   
               
                {/* <View style={Styles.overview_detail_follow}> */}
                    
                {/* </View> */}
                
                
                    

                
                <Button full style={{ backgroundColor: Colors.navyUrban}}  
                onPress={() => {
                    this.saveFollowUp();
                    // alert('save follow up')
                }}>
                    <Text>Save</Text>
                </Button>

                
                

            </Container>
            

        );
    }
}
export default AddFollowUp;

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