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
    Linking,

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
   Tab,
   Tabs,
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
import SearchableDropdown from 'react-native-searchable-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import Mailer from "react-native-mail";

// import styles, { colors } from "./styles/index";




var items = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'angellist' },
    { id: 2, name: 'codepen' },
    { id: 3, name: 'envelope' },
    { id: 4, name: 'etsy' },
    { id: 5, name: 'facebook' },
    { id: 6, name: 'foursquare' },
    { id: 7, name: 'github-alt' },
    { id: 8, name: 'github' },
    { id: 9, name: 'gitlab' },
    { id: 10, name: 'instagram' },
  ];
   


class DetailPage extends Component {
    

    constructor(props){
        super(props);

        this.state = {
            status_cd : '',
            email: '',
            detail: [],
            classCd: [],
            class_cd: '',
            prov: [],
            prov2: [],
            getstatus: [],
            getcity: [],
            getdistrict: [],
            getvillage: [],
            getpostcode: [],
            getmedia: [],


            salutationcd: [],
            salutation_cd: '',
            descs: '',
            
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

            selProv : '',
            selCity: '',
            selDistrict: '',
            selVillage: '',

        };
        this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
        this.renderAccordionContent = this.renderAccordionContent.bind(this)
        this.renderAccordionContentProspect = this.renderAccordionContentProspect.bind(this)
        this.renderAccordionContentDetail = this.renderAccordionContentDetail.bind(this)
        this.renderAccordionContentOther = this.renderAccordionContentOther.bind(this)
        this.renderAccordionContentInterest = this.renderAccordionContentInterest.bind(this)
        console.log('props status prospesct',props);
    }
    async componentDidMount(){
        
        const dataProspect = await _getData("statusProspect");
        console.log("_getdata dari ListProspect",dataProspect);
        Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            status_cd : dataProspect.status_cd,
            class_cd : dataProspect.class_cd,
           
            name: dataProspect.name,
            //tab 1
            business_id: dataProspect.business_id,
            descs: dataProspect.descs,
            vip: dataProspect.vip,

            //tab2
            salutation: dataProspect.salutation,
            name: dataProspect.name,
            addr1: dataProspect.addr1,
            post_cd: dataProspect.post_cd,
            village: dataProspect.village,
            district: dataProspect.district,
            city: dataProspect.city,
            province_cd: dataProspect.province_cd,
            tel_no: dataProspect.tel_no,
            handphone: dataProspect.handphone, //handphone/wa
            hp: dataProspect.hp, //alternate hp
            hp2: dataProspect.hp2, //alternate hp2
            email_addr: dataProspect.email_addr,

            //tab 3
            // marital_status: '',
            sex: dataProspect.sex,
            spouse_name: dataProspect.spouse_name,
            spouse_hp: dataProspect.spouse_hp,
            co_name: dataProspect.co_name, //company name
            occupation: dataProspect.occupation,
            contact_person: dataProspect.contact_person, //contact
            media: dataProspect.media,
            

            email : await _getData('@User'),
            
            
        }
        console.log('data', data);
        isMount = true;
        this.setState(data, () => {
            this.getDataListProspect(dataProspect)
            this.getClassCode(dataProspect)
            this.getSalutation(dataProspect)
            this.getStatus(dataProspect)
            this.getProvince(dataProspect)
            this.getCity(dataProspect,'')
            this.getDistrict(dataProspect,'','')
            this.getVillage(dataProspect,'','','')
            this.getPostCode(dataProspect,'','','','')
            this.getMedia(dataProspect)
            // this.getProvince2();
            // this.getPostCode();
            
        });
    };

    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false
      }

    getDataListProspect = async() => {
        const dataProspect = await _getData("statusProspect");
        const {status_cd} = dataProspect
        const {business_id} = dataProspect
        console.log('businessid dari _getData async',business_id);
        console.log('statuscode dari _getData async',status_cd);
        const {email} = this.state
        console.log('email getdatalistprospect', email);
        {isMount ?
        fetch(urlApi + 'c_prospect/getProspect/IFCAPB/',{
            method:'POST',
            body: JSON.stringify({status_cd,business_id,email})
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
            // console.log('datalistprospect',res);
        }).catch((error) => {
            console.log(error);
        })
        :null}
    }

    getClassCode = async() => {
        const dataProspect = await _getData("statusProspect");
        const {class_cd} = dataProspect
        console.log('classcode', class_cd);
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

    getSalutation = async() => {
        const dataProspect = await _getData("statusProspect");
        const {salutation} = dataProspect
        console.log('salutation _getdata', salutation);
        {isMount ?
            fetch(urlApi + 'c_salutation/getSalutation/IFCAPB2/',{
                method:'POST',
                body: JSON.stringify({salutation})
                // headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                   
                    console.log('getsalutation',res);
                    this.setState({salutationcd:resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                // console.log('salutation',res);
            }).catch((error) => {
                console.log(error);
            })
            :null}

    }

    getStatus = async() => {

        const dataProspect = await _getData("statusProspect");
        const {status_cd} = dataProspect
        console.log('status _getdata', status_cd);
        {isMount ?
            fetch(urlApi + 'c_status/getStatus2/IFCAPB2/',{
                method:'POST',
                body: JSON.stringify({status_cd})
                // headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                   
                    console.log('getstatus',res);
                    this.setState({getstatus:resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                // console.log('salutation',res);
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

    getProvince = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {province_cd} = dataProspect
        console.log('province _getdata 1', province_cd);
        {isMount ?
            fetch(urlApi + 'c_prospect/get_province/IFCAPB2/',{
                method: 'GET',
                // method:'POST',
                // body: JSON.stringify({province_cd})
                // headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                   
                    console.log('getprov',res);
                    this.setState({prov:resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                // console.log('salutation',res);
            }).catch((error) => {
                console.log(error);
            })
            :null}
        
    }
    
    getCity = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {province_cd} = dataProspect
        console.log('province _getdata 2', province_cd);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+'c_prospect/zoom_city/IFCAPB/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({province_cd})

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
                    this.setState({getcity:resData});
                    console.log('zoom city',res);
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
    getDistrict = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {province_cd} = dataProspect
        const {city} = dataProspect
        console.log('province _getdata 3', city);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+'c_prospect/zoom_district/IFCAPB/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({province_cd,city})

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
                    this.setState({getdistrict:resData});
                    console.log('zoom district',res);
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
    getVillage = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {province_cd} = dataProspect
        const {city} = dataProspect
        const {district} = dataProspect
        console.log('district _getdata 3', district);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+'c_prospect/zoom_village/IFCAPB/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({province_cd,city,district})

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
                    this.setState({getvillage:resData});
                    console.log('zoom village',res);
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

    getPostCode = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {province_cd} = dataProspect
        const {city} = dataProspect
        const {district} = dataProspect
        const {village} = dataProspect
        console.log('village _getdata 3', village);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+'c_prospect/zoom_postcode/IFCAPB/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({province_cd,city,district,village})

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
                    this.setState({getpostcode:resData});
                    console.log('zoom postcode',res);
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

    getMedia = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {media} = dataProspect
        
        console.log('media _getdata', media);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+'c_media/getMedia/IFCAPB/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({media})

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
                    this.setState({getmedia:resData});
                    console.log('media',res);
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

    chooseProv = (val)=>{
        if(val){
            this.setState({selProv : val},()=>{
                this.getCity(val)
                
                // this.getComission(val,'')
            })
        }
    }
    chooseCity= (val)=>{
        if(val){
            this.setState({selCity : val},()=>{
                this.getDistrict(val)
                
                // this.getComission(val,'')
            })
        }
    }
    chooseDistrict= (val)=>{
        if(val){
            this.setState({selDistrict : val},()=>{
                this.getVillage(val)
                
                // this.getComission(val,'')
            })
        }
    }
    chooseVillage= (val)=>{
        if(val){
            this.setState({selVillage : val},()=>{
                this.getPostCode(val)
                
                // this.getComission(val,'')
            })
        }
    }

    AddProspect() {
        // console.log('data status prospect',data);
        Actions.AddProspect();
        // Actions.IndexProspect
        this.setState({ click : true})
    }

    sendEmail(){
        // noHp = '';
        const email_addr = this.state.detail[0].email_addr
        // const descs = this.props.items.project_descs
        
        // alert(email_addr);
      
      console.log('email send add', email_addr)
        Mailer.mail(
          {
            // subject: "Description prospect" + descs,
            subject: "Description prospect",
            recipients: [`${email_addr}`],
            ccRecipients: [""],
            bccRecipients: [""],
            body: "",
            isHTML: true
          },
          (error, event) => {
            Alert.alert(
              error,
              event,
              [
                {
                  text: "Ok",
                  onPress: () => console.log("OK: Email Error Response")
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("CANCEL: Email Error Response")
                }
              ],
              { cancelable: true }
            );
          }
        );
    };
    sendWa(){

        // const noHp = this.state.detail[0].handphone
        const noHp = "82236203286"
        // const descs = this.state.descs
        const descs = "tes prospect"
        // alert(descs);
        Linking.openURL('https://wa.me/+62'+noHp+'?text='+descs)
        console.log('hp wa', noHp);
      
    }
    callphone(){
        const noHp = this.state.detail[0].handphone
        alert(noHp);
        // const noHp = "82236203286"
        // Linking.openURL('tel:'+noHp)
    }

    // getPostCode = () =>{
    //     const item = this.props.items
    //     {isMount ?
    //         fetch(urlApi+'c_prospect/zoom_postcode/IFCAPB/',{
    //             method:'GET',
    //             // headers : this.state.hd,
    //         }).then((response) => response.json())
    //         .then((res)=>{
    //             if(!res.Error){
    //                 const resData = res.Data
    //                 // resData.map((data)=>{
    //                 //     this.setState(prevState=>({
    //                 //         postCode : [...prevState.postCode, {label: data.post_cd, value:data.post_cd}]
    //                 //     }))
    //                 // })
    //                 this.setState({postCode:resData});
    //                 console.log('postcode',res);
    //             } else {
    //                 this.setState({isLoaded: !this.state.isLoaded},()=>{
    //                     alert(res.Pesan)
    //                 });
    //             }
    //             console.log('postcode',res);
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    //     :null}
        
    // }

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
        let {business_id,descs,vip,class_cd} = this.state

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Name</Text>
                     </View> */}
                            
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Prospect ID</Text>
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Prospect ID'} value={business_id} />
                        </View>  
                        <View style={{paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Class</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Class Type'} value={descs} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.class_cd}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({descs:val})}
                                >
                                     {this.state.classCd.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }

                            {/* <TextInput style={Styles.textInput} placeholder={'Class'} value={class_cd}  onChangeText={(val) => this.setState({ class_cd: val })}/> */}
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>VIP</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'VIP Status'} value={vip} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.vip}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({vip:val})}>
                                    <Item label="Yes" value="Y" />
                                    <Item label="No" value="N" />
                                </Picker>
                            </Item>
                            }
                            
                            
                        </View> 
                        
                       
                    </View>
                    }
                </View>
                
                                
    }
    renderAccordionContentDetail() {
        let {salutation,name,addr1,post_cd,district,village,city,province_cd,tel_no,hp,hp2,handphone,email_addr,salutation_cd} = this.state
        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                {/* <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" /> */}
                                <Text style={Styles.overviewTitles_Small}>Salutation</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Salutation'} value={salutation} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Salutation"
                                selectedValue={this.state.salutation}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({salutation:val})}
                                >
                                     {this.state.salutationcd.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                            <TextInput style={Styles.textInput} placeholder={'Salutation'} value={salutation} onChangeText={(val)=>{this.setState({salutation:val})}}/>
                        </View>  
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Name</Text>
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Name'} value={name} onChangeText={(val)=>{this.setState({name:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Address</Text>
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Address'} value={addr1} onChangeText={(val)=>{this.setState({addr1:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Province</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={province_cd} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.province_cd}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // onValueChange={(val)=>this.setState({province_cd:val})}
                                onValueChange={(val)=>this.chooseProv(val)}
                                >
                                     {this.state.prov.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={province} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>City</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={city} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.city}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // onValueChange={(val)=>this.setState({city:val})}
                                onValueChange={(val)=>this.chooseCity(val)}
                                >
                                     {this.state.getcity.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>City</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={district} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.district}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // onValueChange={(val)=>this.setState({city:val})}
                                onValueChange={(val)=>this.chooseCity(val)}
                                >
                                     {this.state.getdistrict.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            <TextInput style={Styles.textInput} placeholder={'Province'} value={district} onChangeText={(val)=>{this.setState({province:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Village</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={village} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.village}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({village:val})}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                     {this.state.getvillage.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View>
                       
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Post Code</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={post_cd} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.post_cd}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({post_cd:val})}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                     {this.state.getpostcode.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Telephone</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Telephone'} value={tel_no} onChangeText={(val)=>{this.setState({tel_no:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Handphone/Whatsapp</Text>
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Handphone/Whatsapp'} value={handphone} onChangeText={(val)=>{this.setState({handphone:val})}}/>
                        </View>

                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Alternative Handphone</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Alternative Handphone'} value={hp} onChangeText={(val)=>{this.setState({hp:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Alternative Handphone 2</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Alternative Handphone 2'} value={hp2} onChangeText={(val)=>{this.setState({hp2:val})}}/>
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Email</Text>
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Email'} value={email_addr} onChangeText={(val)=>{this.setState({nemail_addrame:val})}}/>
                        </View>
                    </View>
                    }
                </View>
    }
    
    renderAccordionContentOther() {
       let {sex,spouse_name,spouse_hp,co_name,occupation,contact_person,media} = this.state

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Sex</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.sex}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({sex:val})}>
                                    <Item label="Male" value="Male" />
                                    <Item label="Female" value="Female" />
                                </Picker>
                            }
                            {/* <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} /> */}
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
                            <TextInput style={Styles.textInput} placeholder={'Spouse Hp'} value={spouse_hp} onChangeText={(text) => this.setState({ username: text })} />
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
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Media</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Media'} value={media} />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.media}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({media:val})}>
                                    {this.state.getmedia.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                    {/* <Item label="Male" value="Male" />
                                    <Item label="Female" value="Female" /> */}
                                </Picker>
                            }
                            {/* <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} /> */}
                        </View> 
                    </View>
                    }
                </View>
    }
    renderAccordionContentInterest() {
        let {sex,spouse_name,spouse_hp,co_name,occupation,contact_person,media} = this.state

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                    <View>
                            <List >
                                <ListItem >                               
                                    <View style={{alignSelf:'flex-start',width: '100%'}} >
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Project</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Property</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Lot No</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Rent</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Buy</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                       
                                      

                                        
                                    </View>
                                    
                                    
                                </ListItem>

                                <ListItem >                               
                                    <View style={{alignSelf:'flex-start',width: '100%'}} >
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Project</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Property</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Lot No</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Rent</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View>
                                        <View>
                                            <Label>
                                                <Text style={{fontSize: 12}}>Buy</Text>
                                            </Label>
                                            <TextInput style={Styles.textInput} placeholder={'Gendre'} value={sex} />

                                        </View> 
                                    </View>
                                    
                                    
                                </ListItem>

                                <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 30, marginVertical: 10}} onPress={()=>this.AddProspect() }>
                                       {/* <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 30, marginVertical: 10}} onPress={()=>alert('add project') }> */}
                                           <Text style={{fontSize: 12}}>Add Project</Text>
                                       </Button>
                                
                            </List>
                        
                    </View>
                    }
                </View>
    }

    
    
    render() {
        return (
            <Container style={Style.bgMain}>
                {/* <Header style={Style.navigation}>
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
                            {"Low".toUpperCase()}
                            {this.state.status_cd.toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header> */}
                {/* <TabBar navState={navState} navScene={navScene} /> */}
                <Content
                    style={Style.layoutInner}
                    contentContainerStyle={Style.layoutContent}
                >
                    

                    {/* content tab 1 */}
                    {this.state.detail.length == 0 ?
                        <ActivityIndicator />
                    :
                                        
                        <View> 
                            <ScrollView>
                                
                                <View style={{flexDirection: 'row', paddingTop: 15}}>
                                    <Button onPress={()=>this.sendEmail()} style={Styles.buttonContact}>
                                        <Text style={{color: Colors.blueUrban }}>Email</Text>
                                    </Button>
                                    <Button onPress={()=>this.callphone()} style={Styles.buttonContact}>
                                        <Text style={{color: Colors.blueUrban }}>Call Phone</Text>
                                    </Button>
                                    <Button onPress={()=>this.sendWa()} style={Styles.buttonContact}>
                                        <Text style={{color: Colors.blueUrban }}>Whatsapp</Text>
                                    </Button>
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
                <View>
                    <View style={{borderTopColor: '#333', borderTopWidth: 1, borderStyle: "solid",}}>
                        <CardItem style={{ height: 43, marginBottom: 4, borderColor: '#333', width: '100%', paddingRight: 0, marginTop: 2, borderTopColor: '#333' }}
                            >
                            {/* left title media */}
                            <Left>
                                
                                <Text style={Styles.positionTextInput}>Prospect Status</Text>
                            </Left>
                            {/* end left title media */}

                            {/* right picker media */}
                            <Right style={{ paddingRight: 0, marginRight: 0 }}>
                                
                                {/* <RNPickerSelect
                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'Football', value: 'football' },
                                        { label: 'Baseball', value: 'baseball' },
                                        { label: 'Hockey', value: 'hockey' },
                                    ]}
                                /> */}
                                {/* <Item rounded>
                                        <Input style={{textAlign : 'right'}} value={this.state.media} onChangeText={(media)=>this.setState({media})} placeholder="media"></Input>
                                    </Item> */}
                                {/* <Item rounded style={Styles.marginround}> */}
                                   
                                    <Picker

                                        iosHeader="Select one"
                                        mode="dropdown"
                                        style={{ width: 180,height: 40 }}
                                        selectedValue={this.state.status_cd}
                                        onValueChange={(val)=>this.setState({status_cd:val})}
                                    >
                                        {this.state.getstatus.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                        {/* <Picker.Item label="tes" value="1" />
                                        <Picker.Item label="tes2" value="2" /> */}
                                    </Picker>
                                {/* </Item> */}
                            </Right>
                            {/* end right picker media */}
                        </CardItem>
                    </View>
                    <Button full style={{ backgroundColor: Colors.navyUrban}}  onPress={() =>{
                        this.state.isLogin ? this.showModal()
                        : this.showAlert()
                        
                        }}>
                        <Text>Update</Text>
                    </Button>

                </View>
                
            </Container>

        );
    }
}
export default DetailPage;

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