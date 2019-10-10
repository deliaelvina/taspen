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


// import styles, { colors } from "./styles/index";



    
   


class FollowupProspect extends Component {
    

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
            name: '',
            addr1: '',
            post_cd: '',
            village: '',
            district: '',
            city: '',
            province_cd: '',
            tel_no: '',
            handphone: '', //handphone/wa
            hp: '', //alternate hp
            hp2: '', //alternate hp2
            email_addr: '',

            //tab 3
            // marital_status: '',
            sex: '',
            spouse_name: '',
            spouse_hp: '',
            co_name: '', //company name
            occupation: '',
            contact_person: '', //contact
            media: '',





            
            




        }
        this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
        this.renderAccordionContent = this.renderAccordionContent.bind(this)
        this.renderAccordionContentProspect = this.renderAccordionContentProspect.bind(this)
        this.renderAccordionContentDetail = this.renderAccordionContentDetail.bind(this)
        this.renderAccordionContentOther = this.renderAccordionContentOther.bind(this)
        this.renderAccordionContentInterest = this.renderAccordionContentInterest.bind(this)
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
            name: name,
            addr1: addr1,
            post_cd: post_cd,
            district: district,
            village: village,
            city: city,
            province_cd: province_cd



            

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
        let {salutation,name,addr1,post_cd,district,village,city,province,tel_no,hp,hp2,handphone,email_addr} = this.state.detail[0]
        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Salutation</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Salutation'} value={salutation} onChangeText={(val)=>{this.setState({salutation:val})}}/>
                        </View>  
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Name</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Name'} value={name} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Address</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Address'} value={addr1} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Post Code</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Post Code'} value={post_cd} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Village</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Village'} value={village} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View> 
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>District</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'District'} value={district} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>City</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'City'} value={city} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Province</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Province'} value={province} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Telephone</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Telephone'} value={tel_no} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Handphone/Whatsapp</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Handphone/Whatsapp'} value={handphone} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>

                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Alternative Handphone</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Alternative Handphone'} value={hp} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Alternative Handphone 2</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Alternative Handphone 2'} value={hp2} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Email</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Email'} value={email_addr} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                    </View>
                    }
                </View>
    }
    
    renderAccordionContentOther() {
       let {sex,spouse_name,spouse_hp,co_name,occupation,contact_person,media} = this.state.detail[0]

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Sex</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />
                        </View>  
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Spouse Name</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Spouse Name'} value={spouse_name}  onChangeText={(val)=>{this.setState({descs:val})}}/>
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Spouse Hp</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Spouse Hp'} value={spouse_hp} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Company Name</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Company Name'} value={co_name} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View> 
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Occupation</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View> 
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Contact</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Contact'} value={contact_person} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Media</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Media'} value={media} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View> 
                    </View>
                    }
                </View>
    }
    renderAccordionContentInterest() {
        let {sex,spouse_name,spouse_hp,co_name,occupation,contact_person,media} = this.state.detail[0]

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Project</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />
                        </View>  
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Property</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Spouse Name'} value={spouse_name}  onChangeText={(val)=>{this.setState({descs:val})}}/>
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Lot No</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Spouse Hp'} value={spouse_hp} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Rent</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Company Name'} value={co_name} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View> 
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Buy</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View> 
                    </View>
                    }
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
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                        
                    <View>
                        <ScrollView>
                            <View>
                                {/* <TabBar navState={navState} navScene={navScene} /> */}
                            </View>
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
                                        {
                                            type: 'interest',
                                            title: 'Interest Project'
                                        },
                                    ]}
                                    expanded={0}
                                    renderHeader={this.renderAccordionHeader}
                                    renderContent={this.renderAccordionContent}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    }
                </Content>
                <View style={{borderTopColor: '#333', borderTopWidth: 1, borderStyle: "solid"}}>
                    <CardItem style={{ height: 43, marginBottom: 4, borderColor: '#333', width: '100%', paddingRight: 0, marginTop: 2, borderTopColor: '#333' }}
                        >
                        {/* left title media */}
                        <Left>
                            
                            <Text style={Styles.positionTextInput}>Prospect Status</Text>
                        </Left>
                        {/* end left title media */}

                        {/* right picker media */}
                        <Right style={{ paddingRight: 0, marginRight: 0 }}>
                            {/* <Item rounded>
                                    <Input style={{textAlign : 'right'}} value={this.state.media} onChangeText={(media)=>this.setState({media})} placeholder="media"></Input>
                                </Item> */}
                            <Item rounded style={Styles.marginround}>
                                {/* <RNPickerSelect
                                    items={this.state.dataMedia}
                                    onValueChange={(val)=>this.chooseMedia(val)}
                                /> */}
                                <Picker

                                    iosHeader="Select one"
                                    mode="dropdown"
                                    style={{ width: 180,height: 40 }}
                                    // selectedValue={this.state.dataMedia}
                                // onValueChange={(val)=>this.setState({dataMedia:val})}
                                >
                                    {/* {this.state.dataMedia.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )} */}
                                    <Picker.Item label="tes" value="1" />
                                    <Picker.Item label="tes2" value="2" />
                                </Picker>
                            </Item>
                        </Right>
                        {/* end right picker media */}
                    </CardItem>
                </View>
                <Button full style={{ backgroundColor: Colors.navyUrban }}  onPress={() =>{
                    this.state.isLogin ? this.showModal()
                    : this.showAlert()
                    
                    }}>
                    <Text>Update</Text>
                </Button>
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