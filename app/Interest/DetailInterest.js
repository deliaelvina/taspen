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
    Platform,
    Modal,
    Animated,
    FlatList,
   

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
import {SearchBar} from "react-native-elements";
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
import { isIfStatement } from "@babel/types";
// import { FlatList } from "react-native-gesture-handler";
// import {RNPicker} from "rn-modal-picker";

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
            getproject: [],
            project: [],
            getlot: [],
            zoomproject: '',
            zoomproperty: '',

            modalVisible: false,

            scrollY: new Animated.Value(0),
            loadMore: false,
            search: '',
            
           

        }
        console.log('props detail follow up',props);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      
    
    async componentDidMount(){
        Actions.refresh({ backTitle: () => this.props.datas.business_id });
        const project = await _getData('@UserProject');
        
        // console.log(tpm);
        const data = {
            business_id : this.props.datas.business_id,
            descs : this.props.datas.descs,
            lot_no : this.props.datas.lot_no,
            property_cd: this.props.datas.property_cd,
            buy_flag: this.props.datas.buy_flag,
            rent_flag : this.props.datas.rent_flag,
            // rowID: this.props.datas.rowID,
            
            entity_cd: this.props.datas.entity_cd,
            project_no: this.props.datas.project_no
        }
        isMount = true;
        this.setState(data, () => {
            console.log('data di list', data);
            this.zoomProperty()
            this.zoomProject()
            this.getLotNo()
            // this.updateFollowUp()
            // this.getDataListProspect(this.props.datas)
            // this.getDataFollowUp(this.props.datas)
            // this.getStatus()
        });
    };

    onChange = () => {
        this.setState({open: true});
    }
    onClose = () => {
        this.setState({open: false});
    }
    
    zoomProject = async() =>{

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
            fetch(urlApi+ 'c_project/zoomProject/IFCAPB2/',{
                method:'GET',
                // method:'POST',
                // body: JSON.stringify({entity_cd,project_no})

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
                    this.setState({getproject:resData});
                    console.log('getproject',res);
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
    chooseProject = (zoomproject)=>{
        console.log('project change',zoomproject);
        
        // alert(val);
        
        
        // alert(val);
        if(zoomproject){
            this.setState({project_no : zoomproject},()=>{
                // alert(selProv);
                this.zoomProperty(zoomproject);
                
                // this.getComission(val,'')
            })
        }
       
    }
    zoomProperty = async(zoomproject) =>{
        if(zoomproject == '' || zoomproject == null){
            // const project = await _getData('@UserProject');
            const {project_no} = this.state
            // console.log('project getdata', project);
            console.log('zoom project when project no is null', {project_no});
            {isMount ?
                fetch(urlApi+'c_property/zoomProperty/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({project_no})
    
                    // headers : this.state.hd,
                }).then((response) => response.json())
                .then((res)=>{
                    if(!res.Error){
                        const resData = res.Data
                        this.setState({getproperty:resData});
                        console.log('zoom property',res);
                    } else {
                        this.setState({isLoaded: !this.state.isLoaded},()=>{
                            alert(res.Pesan)
                        });
                    }
                    
                }).catch((error) => {
                    console.log(error);
                })
            :null}
        }else{
            // const {province_cd} = zoomprovince
            console.log('zoom project when project no is notnull', {project_no:zoomproject})
            {isMount ?
                fetch(urlApi+'c_property/zoomProperty/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({project_no:zoomproject})
    
                    // headers : this.state.hd,
                }).then((response) => response.json())
                .then((res)=>{
                    if(!res.Error){
                        const resData = res.Data
                        this.setState({getproperty:resData});
                        console.log('zoom property',res);
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
    }
    chooseProperty = (zoomproperty)=>{
        console.log('property change',zoomproperty);
        
        // alert(val);
        
        
        // alert(val);
        if(zoomproperty){
            this.setState({property_cd : zoomproperty},()=>{
                // alert(selProv);
                this.getLotNo(zoomproperty);
                
                // this.getComission(val,'')
            })
        }
       
    }
    getLotNo = async(zoomproperty) => {
        if(zoomproperty=='' || zoomproperty== null){
            // const dataProspect = await _getData("statusProspect");
            const {project_no} = this.state
            const {property_cd} = this.state
            const {entity_cd} = this.state
            
            console.log('get lotno when where null', {project_no,property_cd, entity_cd})
                {isMount ?
                    fetch(urlApi+'c_lot/getLot/IFCAPB2/',{
                        // method:'GET',
                        method:'POST',
                        body: JSON.stringify({project_no,property_cd,entity_cd})
        
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
                            this.setState({getlot:resData});
                            console.log('get lot',res);
                        } else {
                            this.setState({isLoaded: !this.state.isLoaded},()=>{
                                alert(res.Pesan)
                            });
                        }
                        
                    }).catch((error) => {
                        console.log(error);
                    })
                :null}
        }else{
            console.log('get lotno when where null', {project_no: this.state.project_no,property_cd: zoomproperty,entity_cd:this.state.entity_cd})
            {isMount ?
                fetch(urlApi+'c_lot/getLot/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({project_no: this.state.project_no,property_cd: zoomproperty,entity_cd:this.state.entity_cd})
    
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
                        this.setState({getlot:resData});
                        console.log('get lot',res);
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
    }
    selectedItem = (item)=>{
        console.log('item select lot no',item);
        
        // alert(val);
        
        
        // alert(val);
        if(item){
            this.setState({lot_no : item})
            // this.setModalVisible(!this.state.modalVisible)
        }
        this.setModalVisible(!this.state.modalVisible)
       
    }

    renderRow = ({item}) => {
        console.log('item',item);
        return(
            // <TouchableOpacity >
            <ListItem style={{height: 10}} 
            // onValueChange={(val)=>this.alert(val)}
            onPress={()=>this.selectedItem(item.value)}
            // onPress={()=>alert(item.value)}
            // onPress={(val)=>{
            // //    const valvalue = this.state.getocupation.filter(item=>item.value==val)
            //     console.log('value', this.state.getlot.filter(item=>item.value==val));
            // //    this.setState({occupation:val,occupation:statuspros})
            // }}
            >
                <Text style={{fontFamily: "Montserrat-Regular",alignSelf:'flex-start',color: "#333",marginBottom: 5,fontSize: 15}}>
                {item.value}
                </Text>
            </ListItem>

            // </TouchableOpacity>
            
            // <Text>tes</Text>
        )

    }

    updateSearch = search => {
        // console.log('input search',search)
        this.setState({ search });
    };

    updateFollowUp = () => {

        const {
           
         
           business_id,
        
           project_no,
           property_cd,
           lot_no,
           rent_flag,
           buy_flag,
           entity_cd,
        //    status,
            
            
        } = this.state

        const formData = {
            
            business_id: business_id,

            project_no: project_no,
            property_cd: property_cd,
            lot_no: lot_no,
            rent_flag: rent_flag,
            buy_flag: buy_flag,
            entity_cd: entity_cd


        }
        console.log('update follow up', formData)

        fetch(urlApi+'c_prospect_lot/updateFollowUp/IFCAPB2/',{
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
            console.log('update follow up sukses',res)

        }).catch((error) => {
            console.log(error);
        });

    }


    render() {
       
      
        return (
            <Container style={Style.bgMain}>
                <Header style={Style.navigation} >
                    
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
                            Detail Interest Project
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>

                <Content>
                    {this.state.props == 0 ?
                            <ActivityIndicator />
                        : 
                    <View>                       
                        <View style={{ paddingVertical: 10}}  pointerEvents='none'>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Prospect ID</Text>
                            </View>
                            <TextInput style={Styles.textInput_medium} placeholder={'Prospect ID'} value={this.state.business_id} />
                        </View>
                        {this.state.getproject.length == 0 ? <ActivityIndicator /> :
                        <View style={{ paddingVertical: 10}}  >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Project Name</Text>
                            </View>
                             {Platform.OS == "ios" ?
                                 <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                     <View pointerEvents="none">
                                         <TextInput style={Styles.textInput}  placeholder={'Project Name'} value={this.state.project_no} />
                                     </View>
                                 </TouchableOpacity>
                             :
                             <Item rounded style={{height: 35}}>
                                 <Picker 
                                 placeholder="Media"
                                 selectedValue={this.state.project_no}
                                 style={{width: '100%',marginHorizontal:10}} 
                                 textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}}
                                //  enabled={this.state.disableothercompany ? this.state.makafalse  : this.state.makatrue}  
                                //  onValueChange={(val)=>this.setState({project_no:val})}
                                onValueChange={(zoomproject)=>this.chooseProject(zoomproject)}
                                //  onValueChange={(val)=>{
                                //     const descs_occu = this.state.getocupation.filter(item=>item.value==val)
                                //     // console.log('status change', this.state.getstatus.filter(item=>item.value==val));
                                //     this.setState({occupation:val,occupation:statuspros})
                                // }}
                                //  onValueChange={(val)=>alert(val)}
                                 // onValueChange={(val)=>this.chooseDistrict(val)}
                                 >
                                     <Picker.Item label="Choose Project" value="" />
                                      {this.state.getproject.map((data, key) =>
                                         <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                 </Picker>
                                
                             </Item>
                             }
                                
                             {/* <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({occupation:val})}}/> */}
                         </View>
                        }
                        {this.state.getproperty.length == 0 ? <ActivityIndicator /> :
                            <View style={{ paddingVertical: 10}}  >
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Text style={Styles.overviewTitles_regular}>Property Name</Text>
                                    </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput}  placeholder={'Property Name'} value={this.state.property_cd} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Property Name"
                                    selectedValue={this.state.property_cd}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}}
                                   //  enabled={this.state.disableothercompany ? this.state.makafalse  : this.state.makatrue}  
                                   //  onValueChange={(val)=>this.setState({property_cd:val})}
                                   onValueChange={(zoomproperty)=>this.chooseProperty(zoomproperty)}
                                   //  onValueChange={(val)=>{
                                   //     const descs_occu = this.state.getocupation.filter(item=>item.value==val)
                                   //     // console.log('status change', this.state.getstatus.filter(item=>item.value==val));
                                   //     this.setState({occupation:val,occupation:statuspros})
                                   // }}
                                    // onValueChange={(val)=>alert(val)}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                        <Picker.Item label="Choose Property" value="" />
                                         {this.state.getproperty.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                   
                                </Item>
                                }
                                
                                   
                                {/* <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({occupation:val})}}/> */}
                            </View>
                        }
                        <View style={{paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Lot No</Text>
                            </View>
                            <Item rounded style={{height: 35}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(true);
                                    }}
                                    style={{width: '100%'}}>
                                        
                                        <TextInput style={Styles.textInput_nobottom} placeholder={'Lot No'} value={this.state.lot_no} onChangeText={(val)=>{this.setState({lot_no:val})}} editable={false}/>
                                        {/* <Right style={{position:'absolute',right:10}}>
                                            <Icon solid name='sort-down' type="FontAwesome5" style={{fontSize: 15,top: 3,right:1, color: '#666'}} />
                                        </Right>     */}
                                    
                                </TouchableOpacity>
                            </Item>
                            <View>
                                <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => this.alert('Modal has been closed.')}
                                >
                                    
                                    <View style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          
                                            // backgroundColor: Colors.twitter,
                                            }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            }}
                                            >
                                            <Text>Hide Modal</Text>
                                        </TouchableOpacity>
                                        
                                        <View style={{
                                                width: 300,
                                                height: 300, 
                                                backgroundColor: Colors.white,
                                                borderRadius: 8,
                                                borderColor: '#555',
                                                borderWidth: 1,
                                                
                                                }}
                                                >
                                        
                                        {/* loadmore looping in here */}
                                    
                                            <View style={{height: 300}}> 
                                                <SearchBar
                                                    placeholder="Search Here..."
                                                    onChangeText={this.updateSearch}
                                                    value={this.state.search}
                                                    containerStyle={{backgroundColor: Colors.white, height: 40, borderRadius: 8, borderWidth: 0, borderColor: Colors.white, borderBottomColor: Colors.white}}
                                                    inputContainerStyle={{height: 30, borderBottomColor: Colors.white}}
                                                />
                                                <FlatList data={this.state.getlot} 
                                                renderItem={this.renderRow}
                                                keyExtractor={(item,index)=>item.value} 
                                                
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>                       
                        <View style={{paddingVertical: 10}} >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Rent</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Rent'} value={this.state.rent_flag} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.rent_flag}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // enabled={this.state.disableotherdetail ? this.state.makafalse  : this.state.makatrue} 
                                onValueChange={(val)=>this.setState({rent_flag:val})}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                    <Item label="-- Choose Rent --" value="" />
                                    <Item label="Yes" value="Y" />
                                    <Item label="No" value="N" />
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View> 
                        <View style={{paddingVertical: 10}} >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_regular}>Buy</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Buy'} value={this.state.buy_flag} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Buy"
                                selectedValue={this.state.buy_flag}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // enabled={this.state.disableotherdetail ? this.state.makafalse  : this.state.makatrue} 
                                onValueChange={(val)=>this.setState({buy_flag:val})}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                    <Item label="-- Choose Buy --" value="" />
                                    <Item label="Yes" value="Y" />
                                    <Item label="No" value="N" />
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
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