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
    
    DatePicker,
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



    
   


class AddFollowUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            datafollowup: [],
            business_id: '',
            remarks: '',
            contact_date: '',
            contact_person: '',
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
            contact_person: dataProspect.contact_person
            
            
            
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


                <View style={Styles.overview_detail}>
                    <View style={{ paddingVertical: 10}}  >
                        <Label>
                            <Text style={{fontSize: 12}}>Prospect ID</Text>
                        </Label>
                        <TextInput style={Styles.textInput} placeholder={'Prospect ID'} value={this.state.business_id} />
                    </View>
                    <View style={{ paddingVertical: 10}}  >
                        <Label>
                            <Text style={{fontSize: 12}}>Contact Person</Text>
                        </Label>
                        <TextInput style={Styles.textInput}  placeholder={'Name Contact Person'} value={this.state.contact_person} />
                    </View>

                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>Date</Text>
                        </View>
                        {/* <View style={Styles.dateInput}> */}
                            <Item rounded  style={{height: 35}}>
                                <DatePicker rounded
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select Date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                /></Item>
                        
                        {/* </View> */}
                    </View>


                </View>
                

                
                <View>
                    <Text>contact_person : ngambil dari dataprospect bisa </Text>
                </View>

                <View>
                    <Text>Date : calender </Text>
                </View>
                <View>
                    <Text>Time Prospect : bisa pake jam, bisa pake picker hour</Text>
                </View>
                <View>
                    <Text>Duration Hour : pake picker 1-24</Text>
                </View>
                <View>
                    <Text>duration minute : pake picker 1-60</Text>
                </View>
                <View>
                    <Text>
                        Description : text area
                    </Text>
                </View>
                <View>
                    <Text>
                        note from pic : text area
                    </Text>
                </View>

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