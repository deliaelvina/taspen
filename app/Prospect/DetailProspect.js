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
    Label
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

    
   


class DetailProspect extends Component {
    

    constructor(props){
        super(props)

        this.state = {
            status_cd : '',
            email: '',
            detail: [],
            classCd: [],
            class_cd: '',
            
            //tab 1
            business_id: '',
            descs: '',
            vip: '',

            //tab2
            salutation: '',



        }
        this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
        this.renderAccordionContent = this.renderAccordionContent.bind(this)
        this.renderAccordionContentProspect = this.renderAccordionContentProspect.bind(this)
        this.renderAccordionContentDetail = this.renderAccordionContentDetail.bind(this)
        this.renderAccordionContentOther = this.renderAccordionContentOther.bind(this)
        console.log('props status prospesct',props);
    }
    async componentDidMount(){
        Actions.refresh({ backTitle: () => this.props.status_cd });
        const data = {
            status_cd : this.props.datas.status_cd,
            class_cd : this.props.datas.class_cd,
            email : await _getData('@User'),
            vip: this.props.datas.vip,
            
        }
        console.log('data', data);
        isMount = true;
        this.setState(data, () => {
            this.getDataListProspect(this.props.datas)
            this.getClassCode(this.props.datas)
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

    getClassCode = () => {
        const {class_cd} = this.props.datas
        // const {email} = this.state
        {isMount ?
        fetch(urlApi + 'c_class/getClass/IFCAPB2/',{
            method:'POST',
            body: JSON.stringify({class_cd})
            // headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
               
                console.log('classcode',res);
                this.setState({classCd:resData});
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            console.log('classcode',res);
        }).catch((error) => {
            console.log(error);
        })
        :null}
    }

    save = () => {
        const {business_id,descs,vip,salutation} = this.state

        const formData = {
            business_id : business_id,
            descs: descs,
            vip: vip,
            salutation: salutation,
            

        }
        console.log('form data save', formData)

        // fetch(urlApi+'c_profil/save/',{
        //     method : "POST",
        //     body :JSON.stringify(formData),
        //     headers :{
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Token' : this.state.token
        //     }
        // })
        // .then((response) => response.json())
        // .then((res)=>{
        //     if(!res.Error){
        //         alert(res.Pesan)
        //         _storeData('@Name',name)
        //         _storeData('@Handphone',hp)
        //         _storeData('@ProfileUpdate',true)
        //     }
        //     console.log('save profile',res)

        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    renderAccordionHeader(item, expanded) {
        return (
            <View style={Styles.accordionTab}>
                <Text style={Styles.accordionTabText}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={Styles.accordionTabIcon} name="minus" type="Foundation" />
                    : <Icon style={Styles.accordionTabIcon} name="plus" type="Foundation" />}
            </View>
        );
    }
    renderAccordionContent(item) {
        var fn = 'renderAccordionContent' + (item.type.charAt(0).toUpperCase() + item.type.substr(1));
        return <View style={Styles.accordionContent}>
            {this[fn]()}
        </View>
    }
    renderAccordionContentProspect() {
        let {business_id,descs,vip} = this.state.detail[0]

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Prospect ID</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Prospect ID'} value={business_id} />
                        </View>  
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Class</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Class'} value={descs}  onChangeText={(val)=>{this.setState({descs:val})}}/>
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>VIP</Text>
                            </Label>
                            {vip == 'Y'? <TextInput style={Styles.textInput} placeholder={'VIP'} value="YES" onChangeText={(val)=>{this.setState({vip:val})}} />
                            : <TextInput style={Styles.textInput} placeholder={'VIP'} value="NO" onChangeText={(val)=>{this.setState({vip:val})}} /> }
                            
                        </View> 
                        
                       
                    </View>
                    }
                </View>
                
                                
    }
    renderAccordionContentDetail() {
        let {salutation} = this.state.detail[0]
        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Salutation</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Prospect ID'} value={salutation} onChangeText={(val)=>{this.setState({salutation:val})}}/>
                        </View>  
                        
                        
                    
                    </View>
                    }
                </View>
    }
    
    renderAccordionContentOther() {
        return <View>
            <Text>tes 2</Text>
            {/* <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={2} placeholder={'Address'} />
            <View style={Styles.col}>
                <TextInput style={Styles.textInputHalf} placeholder={'City'} />
                <TextInput style={Styles.textInputHalf} placeholder={'State'} />
            </View>
            <TextInput style={Styles.textInput} placeholder={'Country'} />
            <TextInput style={Styles.textInput} placeholder={'Postcode'} />
            <Button style={Styles.btn} onPress={() => {
                NavigationService.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button> */}
        </View>
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

                {/* {this.state.detail.map((data, key) => (
                    <View key={key}>
                    <Text>{data.name}</Text>
                    </View>
                ))} */}

                {/* <Text>{this.state.detail[0].name}</Text>
                <Text>{this.state.detail[0].business_id}</Text> */}

                
                    
                    
                </View>

                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                        
                    <View>
                        <ScrollView>
                            <View style={Styles.formBg}>
                                <Accordion
                                    style={Styles.accordion}
                                    dataArray={[
                                        {
                                            type: 'prospect',
                                            title: 'Prospect Type',
                                        },
                                        
                                        {
                                            type: 'detail',
                                            title: 'Detail Information'
                                        },

                                        {
                                            type: 'other',
                                            title: 'Other Information'
                                        },
                                    ]}
                                    expanded={0}
                                    renderHeader={this.renderAccordionHeader}
                                    renderContent={this.renderAccordionContent}
                                />
                            </View>

                            <View style={Styles.overview_detail}>
                                <Card style={{
                                    width: '100%',
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
                                    marginHorizontal: 5
                                }}>

                                    <View>
                                       
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                {this.state.detail[0].name}
                                        </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                {this.state.detail[0].email_addr}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                {/* {this.state.detail[0].category} */}
                                                {this.state.detail[0].category == 'I'? <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>Individu</Text>: <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>Company</Text> }
                                           
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                {this.state.detail[0].addr1}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                {this.state.detail[0].descs}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                </Card>
                            </View>

                            
                        </ScrollView>
                    </View>
                    }
                </Content>

               
                

                    
            </Container>

        );
    }
}
export default DetailProspect;

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