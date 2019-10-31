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
    TextInput,
    Platform
    

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



    
   


class DetailInterest extends Component {

    constructor(props){
        super(props)

        this.state = {
            business_id: '',
            property_cd: '',
            lot_no: '',
            project_no: '',
            rent_flag: '',
            buy_flag: '',
            descs: '',
            entity_cd: '',
            project_no: '',
            getproperty: [],
            project: [],
           

        }
        console.log('props detail follow up',props);
    }
   
    
    async componentDidMount(){
        Actions.refresh({ backTitle: () => this.props.datas.business_id });

        
        // console.log(tpm);
        const data = {
            business_id : this.props.datas.business_id,
            descs : this.props.datas.descs,
            lot_no : this.props.datas.lot_no,
            property_cd: this.props.datas.property_cd,
            buy_flag: this.props.datas.buy_flag,
            rent_flag : this.props.datas.rent_flag,
            // rowID: this.props.datas.rowID,
            project : await _getData('@UserProject'),
            entity_cd: this.props.datas.entity_cd,
            project_no: this.props.datas.project_no
        }
        isMount = true;
        this.setState(data, () => {
            console.log('data di list', data);
            this.getProperty()
            // this.getDataListProspect(this.props.datas)
            // this.getDataFollowUp(this.props.datas)
            // this.getStatus()
        });
    };

    getProperty = async() =>{
        // const project = await _getData('@UserProject');
        // const dataProspect = await _getData("statusProspect");
        // const {occupation} = dataProspect
        // const {occupation_cd} = this.state
        const {entity_cd} = this.state
        const {project_no} = this.state
        // const {project_no} = project[0].project_no
        // const {entity_cd} = this.state
        
        // console.log('array project', project);
        console.log('entity_cd _getdata', entity_cd);
        console.log('project_no _getdata', project_no);
        // console.log('this state property', property_cd);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+ 'c_property/getProperty/IFCAPB2/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({entity_cd,project_no})

                // headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    // resData.map((data)=>{
                    //     this.setState(prevState=>({
                    //         agentDT : [...prevState.agentDT, {label: data.agent_name, value:data.agent_cd}]
                    //     }))
                    // })
                    this.setState({getproperty:resData});
                    console.log('getproperty',res);
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
                    {this.state.props == 0 ?
                            <ActivityIndicator />
                        : 
                    <View>
                        
                        <View style={Styles.overview}  >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles}>Prospect ID</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Prospect ID'} value={this.state.business_id} />
                        </View>
                        <View style={{ paddingVertical: 10}}  >
                             <Label style={{bottom: 5}}>
                                 <Text style={{fontSize: 12}}>Property Name</Text>
                             </Label>
                             {Platform.OS == "ios" ?
                                 <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                     <View pointerEvents="none">
                                         <TextInput style={Styles.textInput}  placeholder={'Property Name'} value={this.state.property_cd} />
                                     </View>
                                 </TouchableOpacity>
                             :
                             <Item rounded style={{height: 35}}>
                                 <Picker 
                                 placeholder="Media"
                                 selectedValue={this.state.property_cd}
                                 style={{width: '100%',marginHorizontal:10}} 
                                 textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}}
                                //  enabled={this.state.disableothercompany ? this.state.makafalse  : this.state.makatrue}  
                                 onValueChange={(val)=>this.setState({property_cd:val})}
                                //  onValueChange={(val)=>{
                                //     const descs_occu = this.state.getocupation.filter(item=>item.value==val)
                                //     // console.log('status change', this.state.getstatus.filter(item=>item.value==val));
                                //     this.setState({occupation:val,occupation:statuspros})
                                // }}
                                 // onValueChange={(val)=>alert(val)}
                                 // onValueChange={(val)=>this.chooseDistrict(val)}
                                 >
                                      {this.state.getproperty.map((data, key) =>
                                         <Picker.Item key={key} label={data.label} value={data.value} />
                                     )}
                                 </Picker>
                                
                             </Item>
                             }
                                
                             {/* <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({occupation:val})}}/> */}
                         </View>
                        
                    </View>
                    }
                </Content>
               
                
                <Button full style={{ backgroundColor: Colors.navyUrban}}  
                onPress={() => {
                    this.updateFollowUp();
                    // alert('update follow up')
                }}>
                    <Text>Update</Text>
                </Button>

                
                

            </Container>
            

        );
    }
}
export default DetailInterest;

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