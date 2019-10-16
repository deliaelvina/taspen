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
import InterestProjectProspect from './InterestProjectProspect';

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
            getocupation: [],
            

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
            occupation_cd: '',
            contact_person: '', //contact
            media: '',
            media_cd: '',

            selProv : '',
            selCity: '',
            selDistrict: '',
            selVillage: '',
            zoomprovince: '',
            zoomcity: '',
            zoomdistrict: '',
            zoomvillage: '',

            //tab Interest
            datainterest: [],
            property_cd : '',
            project_name: '',
            lot_no: '',
            rent: '',
            buy: '',

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
            media_cd: dataProspect.media_cd,
            

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
            this.getCity()
            this.getDistrict()
            this.getVillage()
            this.getPostCode()
            this.getMedia(dataProspect)
            this.getOccupation(dataProspect)
            this.getInterest()
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
            fetch(urlApi + 'c_prospect/zoom_province/IFCAPB2/',{
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
    
    getCity = async(zoomprovince) =>{

        // console.log('zoom province when getcity', {province_cd:zoomprovince})
        if(zoomprovince == '' || zoomprovince == null){
            const dataProspect = await _getData("statusProspect");
            const {province_cd} = dataProspect
            console.log('zoom province when getcity null', {province_cd})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_city/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({province_cd})
    
                    // headers : this.state.hd,
                }).then((response) => response.json())
                .then((res)=>{
                    if(!res.Error){
                        const resData = res.Data
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
        }else{
            // const {province_cd} = zoomprovince
            console.log('zoom province when getcity not null', {province_cd:zoomprovince})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_city/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({province_cd:zoomprovince})
    
                    // headers : this.state.hd,
                }).then((response) => response.json())
                .then((res)=>{
                    if(!res.Error){
                        const resData = res.Data
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
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // console.log('province _getdata 2', province_cd);
        // const province = this.props.items
        
    }
    getDistrict = async(zoomcity) =>{
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // const {city} = dataProspect
        // console.log('city _getdata 3', city);
        // const province = this.props.items
        
        if(zoomcity == '' | zoomcity == null){
            const dataProspect = await _getData("statusProspect");
            const {province_cd} = dataProspect
            const {city} = dataProspect
            console.log('zoom city when getdistrict null', {province_cd,city})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_district/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({city,province_cd})
    
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
        }else{
            console.log('zoom city when getdistrict not null', {city:zoomcity,province_cd:this.state.province_cd})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_district/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({city:zoomcity,province_cd:this.state.province_cd})
    
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
        
    }
    getVillage = async(zoomdistrict) =>{
        if(zoomdistrict=='' || zoomdistrict== null){
            const dataProspect = await _getData("statusProspect");
            const {province_cd} = dataProspect
            const {city} = dataProspect
            const {district} = dataProspect
            console.log('zoom district when getvillage null', {province_cd,city,district})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_village/IFCAPB2/',{
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
        }else{
            console.log('zoom district when getvillage not null', {province_cd:this.state.province_cd,city:this.state.city,district:zoomdistrict})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_village/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({province_cd:this.state.province_cd,city:this.state.city,district:zoomdistrict})
    
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
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // const {city} = dataProspect
        // const {district} = dataProspect
        // console.log('district _getdata 3', district);
        // const province = this.props.items
        
    }
    getPostCode = async(zoomvillage) =>{

        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // const {city} = dataProspect
        // const {district} = dataProspect
        // const {village} = dataProspect
        // console.log('village _getdata 3', village);
        // const province = this.props.items
        if(zoomvillage=='' || zoomvillage== null){
            const dataProspect = await _getData("statusProspect");
            const {province_cd} = dataProspect
            const {city} = dataProspect
            const {district} = dataProspect
            const {village} = dataProspect
            console.log('zoom village when getpostcode null', {province_cd,city,district,village})
                {isMount ?
                    fetch(urlApi+'c_prospect/zoom_postcode/IFCAPB2/',{
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
        }else{
            console.log('zoom village when getpostcode null', {province_cd:this.state.province_cd,city:this.state.city,district:this.state.district,village:zoomvillage})
            {isMount ?
                fetch(urlApi+'c_prospect/zoom_postcode/IFCAPB2/',{
                    // method:'GET',
                    method:'POST',
                    body: JSON.stringify({province_cd:this.state.province_cd,city:this.state.city,district:this.state.district,village:zoomvillage})
    
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
        
    }

    getMedia = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {media_cd} = dataProspect
        
        console.log('media _getdata', media_cd);
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+ 'c_media/getMedia/IFCAPB2/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({media_cd})

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

    getOccupation = async() =>{
        const dataProspect = await _getData("statusProspect");
        const {occupation} = dataProspect
        // const {occupation_cd} = this.state
        
        console.log('occupation _getdata', {occupation});
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+ 'c_ocupation/getOcupation/IFCAPB2/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({occupation})

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
                    this.setState({getocupation:resData});
                    console.log('ocupation',res);
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

    getInterest = async() => {

        const dataProspect = await _getData("statusProspect");
        const {business_id} = dataProspect
        // const {occupation_cd} = this.state
        
        console.log('busines_id _getdata', {business_id});
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+ 'c_prospect_lot/getTable/IFCAPB2/',{
                // method:'GET',
                method:'POST',
                body: JSON.stringify({business_id})

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
                    this.setState({datainterest:resData});
                    console.log('data interest',res);
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

    chooseProv = (zoomprovince)=>{
        console.log('prov change',zoomprovince);
        
        // alert(val);
        
        
        // alert(val);
        if(zoomprovince){
            this.setState({province_cd : zoomprovince},()=>{
                // alert(selProv);
                this.getCity(zoomprovince);
                
                // this.getComission(val,'')
            })
        }
       
    }
    chooseCity= (zoomcity)=>{
        console.log('city change',zoomcity);
        // alert(val);
        if(zoomcity){
            
            this.setState({city: zoomcity},()=>{
                // alert(val);
                this.getDistrict(zoomcity);
                // this.getComission(val,'')
            })
        }
    }
    chooseDistrict= (zoomdistrict)=>{
        if(zoomdistrict){
            this.setState({district : zoomdistrict},()=>{
                this.getVillage(zoomdistrict)
                
                // this.getComission(val,'')
            })
        }
    }
    chooseVillage= (zoomvillage)=>{
        if(zoomvillage){
            this.setState({village : zoomvillage},()=>{
                this.getPostCode(zoomvillage)
                
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
    AddProject(){

        Actions.AddProject();
        // Actions.IndexProspect
        this.setState({ click : true})
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
                                onValueChange={(val)=>this.setState({class_cd:val})}
                                // onValueChange={(val)=>alert(val)}
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
                            {/* <TextInput style={Styles.textInput} placeholder={'Salutation'} value={salutation} onChangeText={(val)=>{this.setState({salutation:val})}}/> */}
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
                                // onValueChange={(val)=>alert(val)}
                                onValueChange={(zoomprovince)=>this.chooseProv(zoomprovince)}
                                // onValueChange={this.chooseProv}
                                >
                                     {this.state.prov.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={province_cd} onChangeText={(val)=>{this.setState({province_cd:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>City</Text>
                            </Label>
                            
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'City'} value={city} onChangeText={(val)=>{this.setState({city:val})}}/>
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="City"
                                selectedValue={this.state.city}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // onValueChange={(val)=>this.setState({city:val})}
                                // onValueChange={(val)=>alert(val)}
                                onValueChange={(zoomcity)=>this.chooseCity(zoomcity)}
                                >
                                     {this.state.getcity.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'City'} value={city} onChangeText={(val)=>{this.setState({city:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>District</Text>
                            </Label>
                           
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'District'} value={district} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.district}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                // onValueChange={(val)=>this.setState({district:val})}
                                onValueChange={(zoomdistrict)=>this.chooseDistrict(zoomdistrict)}
                                >
                                     {this.state.getdistrict.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                               {/* <TextInput style={Styles.textInput} placeholder={'District'} value={district} onChangeText={(val)=>{this.setState({district:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Village</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Village'} value={village} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.village}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                
                                // onValueChange={(zoomvillage)=>this.setState({village:zoomvillage})}
                                onValueChange={(zoomvillage)=>this.chooseVillage(zoomvillage)}
                                >
                                     {this.state.getvillage.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Village'} value={village} onChangeText={(val)=>{this.setState({village:val})}}/> */}
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Post Code</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Post Code'} value={post_cd} />
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
                                // onValueChange={(zoompostcd)=>this.choosePostcd(zoompostcd)}
                                >
                                     {this.state.getpostcode.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Post Code'} value={post_cd} onChangeText={(val)=>{this.setState({post_cd:val})}}/> */}
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
       let {sex,spouse_name,spouse_hp,co_name,occupation,contact_person,media,media_cd} = this.state

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
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Province'} value={sex} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Gender"
                                selectedValue={this.state.sex}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({sex:val})}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                     <Item label="Male" value="Male" />
                                    <Item label="Female" value="Female" />
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
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
                        <View style={{ paddingVertical: 10}}>
                            <Label style={{bottom: 5}}>
                                <Text style={{fontSize: 12}}>Occupation</Text>
                            </Label>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Media"
                                selectedValue={this.state.occupation}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({occupation:val})}
                                // onValueChange={(val)=>alert(val)}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                     {this.state.getocupation.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Occupation'} value={occupation} onChangeText={(val)=>{this.setState({occupation:val})}}/> */}
                        </View>
                        
                        <View style={{paddingVertical: 10}}>
                            <Label>
                                <Text style={{fontSize: 12}}>Contact</Text>
                            </Label>
                            <TextInput style={Styles.textInput} placeholder={'Contact'} value={contact_person} onChangeText={(val)=>{this.setState({vip:val})}} />
                        </View>
                        <View style={{ paddingVertical: 10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                <Text style={Styles.overviewTitles_Small}>Media</Text>
                            </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Media'} value={media} />
                                    </View>
                                </TouchableOpacity>
                            :
                            <Item rounded style={{height: 35}}>
                                <Picker 
                                placeholder="Media"
                                selectedValue={this.state.media_cd}
                                style={{width: '100%',marginHorizontal:10}} 
                                textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                onValueChange={(val)=>this.setState({media_cd:val})}
                                // onValueChange={(val)=>alert(val)}
                                // onValueChange={(val)=>this.chooseDistrict(val)}
                                >
                                     {this.state.getmedia.map((data, key) =>
                                        <Picker.Item key={key} label={data.label} value={data.value} />
                                    )}
                                </Picker>
                               
                            </Item>
                            }
                               
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={media_cd} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                        </View>
                        
                    </View>
                    }
                </View>
    }
    renderAccordionContentInterest() {
        let {project_name, property_name, lot_no, rent, buy} = this.state

        return <View style={Styles.overview_detail}>
                    {this.state.detail.length == 0 ?
                            <ActivityIndicator />
                        :
                        
                    <View>
                        <View
                            style={{
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                right: 5,
                                top: 0,
                                marginBottom: 5,
                            }}
                            >
                            <Button
                                small
                                rounded
                                style={Styles.sBtnHeadAdd}
                                onPress={()=>Actions.AddProject()}>
                                {/* <Text style={Styles.sLinkHead}>Add Prospect</Text> */}
                                <Icon name='plus' type="FontAwesome5" style={{color: '#fff', fontSize: 13}}/>
                                {/* plus */}
                            </Button>
                        </View>
                           
                        <ScrollView>
                            <View style={Styles.overview_padhorizontal}>
                            {/* {this.state.status.length == 0 ?  */}
                                    {/* <View style={Styles.city}>
                                    <Shimmer autoRun={true} style={Styles.btnCity} />
                                        
                                    </View> */}
                                {/* : */}
                            
                                <View  >
                                    
                                {this.state.datainterest.map((data, key) => (
                                    <TouchableOpacity  onPress={() => alert('tes')}
                                    key={key}
                                    >
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
                                    <View style={{flexDirection: "row"}}>
                                            {/* <Image
                                                source={require("@Asset/icon/calculator.png")}
                                                style={Styles.infoIcon}
                                            /> */}
                                            <View style={{ alignSelf: "center",width: '100%' }}>
                                                <Text style={Styles.infoHeader}>
                                                {/* {data.descs} */}
                                                Project Name : Project Name
                                                </Text>
                                                <Text style={Styles.infoHeader}>
                                                {data.property_cd}
                                                {/* Property Name : Property Name */}
                                                </Text>
                                                <Text style={Styles.infoHeader}>
                                                {/* {data.status_cd} */}
                                                Lot No : Lot No
                                                </Text>
                                                <Text style={Styles.infoHeader}>
                                                {/* {data.status_cd} */}
                                                Rent : Rent
                                                </Text>
                                                <Text style={Styles.infoHeader}>
                                                {/* {data.status_cd} */}
                                                Buy : Buy
                                                </Text>

                                                {/* <View style={Styles.badge}>
                                                <Text style={{color: '#fff',fontSize: 15}}> 
                                                
                                                </Text>
                                                </View> */}
                                                
                                            </View>
                                    </View>
                                    </Card>
                                    </TouchableOpacity>
                             ))}
                                    
                                </View>
                            {/* // } */}
                            </View>
                        </ScrollView>
                
                            {/* <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 30, marginVertical: 10}} onPress={()=>this.AddProject() }>
                            <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 30, marginVertical: 10}} onPress={()=>alert('add project') }>
                                <Text style={{fontSize: 12}}>Add Project</Text>
                            </Button> */}
                        
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