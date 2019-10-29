import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    Right,
    Content,
    Picker,
    DatePicker,
    Item,
    Label,
    Input
} from "native-base";
import Styles from "./Style";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {_storeData,_getData} from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import TabBar from '@Component/TabBar';

let isMount = false;

class AddProspect extends Component {

    constructor(props){
        super(props)

        this.state = {
            errors: false,
            individu: true,
            classCd: [],
            salutationcd: [],

            prov: [],
            getcity: [],
            getdistrict: [],
            getvillage: [],
            getpostcode: [],
            getocupation: [],
            getmedia: [],
            selected: "",


            zoomprovince: '',
            zoomcity: '',
            zoomdistrict: '',
            zoomvillage: '',

            business: '',
            
            vips: '',


            class_cd: '',
            category: '',
            salutation: '',
            salutation_cd: '',
            name: '',
            addr1: '',
            province_cd: '',
            city: '',
            district: '',
            village: '',
            post_cd: '',
            tel_no: '',
            handphone: '',
            hp: '',
            hp2: '',
            email: '',
            contact_person: '',

            co_name: '',
            co_addr1: '',
            co_post_cd: '',
            occupation: '',
            occupation_cd: '',
            media: '',
            media_cd: ''



        };
        this.onSubmitIndividu = this.onSubmitIndividu.bind(this)
        this.onSubmitCompany = this.onSubmitCompany.bind(this)
    }
    componentDidMount(){
        
        // const dataProspect = await _getData("statusProspect");
        // console.log("_getdata dari ListProspect",dataProspect);
        // Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            // class_cd: this.state.class_cd,
            // category: '',
            // salutation: this.state.salutation,
            // salutation_cd: '',
            // name: '',
            // addr1: '',
            // province_cd: '',
            // city: '',
            // district: '',
            // village: '',
            // post_cd: '',
            // tel_no: '',
            // handphone: '',
            // hp: '',
            // hp2: '',
            // email: '',
            // contact_person: '',

            // co_name: '',
            // co_addr1: '',
            // co_post_cd: '',
            // occupation: '',
            // occupation_cd: '',
            // media: '',
            // media_cd: ''
            
            
        }
        console.log('data', data);
        isMount = true;
        this.setState(data, () => {
            this.getSalutation()
            this.getClassCode()
           
            this.getProvince()
            this.getCity()
            this.getDistrict()
            this.getVillage()
            this.getPostCode()
            this.getOccupation()
            this.getMedia()
            
            
        });
    };
    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false;
        // this.props.onBack();
      }

    getClassCode = () => {
       
        {isMount ?
        fetch(urlApi + 'c_class/getClass/IFCAPB2/',{
            method:'POST',
            // method: 'GET',
            // body: JSON.stringify({class_cd})
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

    getSalutation = () => {

        const salutation_cd = this.state.salutation_cd
       
        {isMount ?
        fetch(urlApi + 'c_salutation/getSalutation/IFCAPB2/',{
            method:'POST',
            // method: 'GET',
            body: JSON.stringify({salutation_cd})
            // headers : this.state.hd,
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                const resData = res.Data
               
                console.log('salutation',res);
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
    // getSalutation = () => {
       
    //     {isMount ?
    //         fetch(urlApi + 'c_salutation/getSalutation/IFCAPB2/',{
    //             method:'POST',
    //             // body: JSON.stringify({salutation})
    //             // headers : this.state.hd,
    //         }).then((response) => response.json())
    //         .then((res)=>{
    //             if(!res.Error){
    //                 const resData = res.Data
                   
    //                 console.log('getsalutation',res);
    //                 this.setState({salutationcd:resData});
    //             } else {
    //                 this.setState({isLoaded: !this.state.isLoaded},()=>{
    //                     alert(res.Pesan)
    //                 });
    //             }
    //             // console.log('salutation',res);
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    //         :null}

    // }

    getProvince = () =>{
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // console.log('province _getdata 1', province_cd);
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
    chooseProv = (zoomprovince)=>{
        console.log('prov change',zoomprovince);
        
        // alert(val);
        
        
        // alert(val);
        if(zoomprovince){
            this.setState({province_cd : zoomprovince},()=>{
                // alert(zoomprovince);
                this.getCity(zoomprovince);
                
                // this.getComission(val,'')
            })
        }
       
    }

    getCity = (zoomprovince) =>{
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
        
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // console.log('province _getdata 2', province_cd);
        // const province = this.props.items
        
    }
    chooseCity= (zoomcity)=>{
        console.log('city change',zoomcity);
        // alert(val);
        if(zoomcity){
            
            this.setState({city: zoomcity},()=>{
                // alert(zoomcity);
                this.getDistrict(zoomcity);
                // this.getComission(val,'')
            })
        }
    }
    
    getDistrict = (zoomcity) =>{
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // const {city} = dataProspect
        // console.log('city _getdata 3', city);
        // const province = this.props.items
        // const province_cd = this.state.province_cd
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
    chooseDistrict= (zoomdistrict)=>{
        if(zoomdistrict){
            this.setState({district : zoomdistrict},()=>{
                // alert(zoomdistrict);
                this.getVillage(zoomdistrict)
                
                // this.getComission(val,'')
            })
        }
    }

    getVillage = (zoomdistrict) =>{
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
        
        // const dataProspect = await _getData("statusProspect");
        // const {province_cd} = dataProspect
        // const {city} = dataProspect
        // const {district} = dataProspect
        // console.log('district _getdata 3', district);
        // const province = this.props.items
        
    }
    chooseVillage= (zoomvillage)=>{
        if(zoomvillage){
            this.setState({village : zoomvillage},()=>{
                // alert(zoomvillage);
                this.getPostCode(zoomvillage)
                
                // this.getComission(val,'')
            })
        }
    }

    getPostCode = (zoomvillage) =>{
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

    getOccupation = () =>{
        // const dataProspect = await _getData("statusProspect");
        // const {occupation} = dataProspect
        // const {occupation_cd} = this.state
        
        // console.log('occupation _getdata', {occupation});
        // const province = this.props.items
        {isMount ?
            fetch(urlApi+ 'c_ocupation/getOcupation/IFCAPB2/',{
                method:'GET',
                // method:'POST',
                // body: JSON.stringify({occupation})

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
    getMedia = () =>{
        // const dataProspect = await _getData("statusProspect");
        // const {media_cd} = dataProspect
        
        // console.log('media _getdata', media_cd);
        // const province = this.props.items
        const media_cd = this.state.media_cd
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

    changeform = (cat) => {
        // alert(cat);
        // const dataProspect = await _getData("statusProspect");
        // const {category} = dataProspect
        console.log('kategori yang terpilih', cat);
        if(cat == 'C'){
            // alert(individu);
            this.setState({category:cat})
            // this.setState(previousState=>({company: previousState.company}))
            this.setState({individu: false})
        }
        else{
            this.setState({category:cat})
            this.setState({individu: true})
            // this.setState(previousState=>({company: !previousState.company}))
        }
        
        // this.renderAccordionContentDetail = this.renderAccordionContentDetail.bind(this)
    }


        
    

    onValueChange(value) {
        this.setState({
            selected: value
        })
    }

    onNext(step) {
        const { business, classess, vips } = this.state

        if (step == 1) {
            if (business && classess && vips) {
                this.setState({ errors: false })
            } else {
                this.setState({ errors: true })
                alert("Please fill red star form")
            }
        }
    }

    onSubmitIndividu() {
        alert('save individu');
        const {
            //step 1
            category,
            class_cd,
            vip,

            //step 2 (individu)
            salutation,
            // salutation_cd,
            name,
            addr1,
            province_cd,
            city,
            district,
            village,
            post_cd,
            tel_no,
            handphone,
            hp,
            hp2,
            email_addr,

            //step 3 (individu)
            dob,
            marital_status,
            spouse_name,
            spouse_hp,
            sex,
            occupation,
            media,
            media_cd,

  

            // fotoKtp,
            // fotoNpwp
        } = this.state

        const formData = {

           //step 1
           category:category,
           class_cd:class_cd,
           vip:vip,

           //step 2 (individu)
           salutation:salutation[0].label,
        //    salutation_cd: salutation_cd,
           name: name,
           addr1: addr1,
           province_cd : province_cd,
           city : city,
           district : district,
           village: village,
           post_cd: post_cd,
           tel_no: tel_no,
           handphone: handphone,
           hp: hp,
           hp2: hp2,
           email_addr: email_addr,

           //step 3 (individu)
           dob: dob,
           marital_status: marital_status,
           spouse_name: spouse_name,
           spouse_hp: spouse_hp,
           sex: sex,
           occupation: occupation,
           media: media[0].label,
           media_cd: media_cd,
        }
        console.log('saveprospect', formData);

        // this.setState({isVisible : true})
        // fetch(urlApi + 'c_nup/insertNup/IFCAMOBILE/', {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Token': this.state.token
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (!res.Error) {
        //             alert(res.Pesan)

        //         }
        //         console.log('saveSuksesNUP', res)

        //     }).catch((error) => {
        //         // alert(res.Pesan)
        //         console.log(error);
        //     });
    }
    onSubmitCompany() {
        alert('save company');
        // const {
        //     //step 1
        //     category,
        //     class_cd,
        //     vip,

        //     //step 2 (individu)
        //     salutation,
        //     name,
        //     addr1,
        //     province_cd,
        //     city,
        //     district,
        //     village,
        //     post_cd,
        //     tel_no,
        //     handphone,
        //     hp,
        //     hp2,
        //     email_addr,

        //     //step 3 (individu)
        //     dob,
        //     marital_status,
        //     spouse_name,
        //     spouse_hp,
        //     sex,
        //     occupation,
        //     media,
        //     media_cd,

        //     //step 2 (company)
        //     co_name,
        //     co_addr1,
        //     // province_cd,
        //     // city,
        //     // district,
        //     // village,
        //     co_post_cd,
        //     contact_person,
        //     // tel_no,
        //     handphone,
        //     // email_addr,

        //     //step 3 (company)
        //     // occupation,
        //     // hp,
        //     // hp2



        //     // fotoKtp,
        //     // fotoNpwp
        // } = this.state

        // const formData = {

        //     no_hp_alt: no_hp_alt,
        //     no_telp_alt: no_telp_alt,
        //     property: property,
        //     nupqty: nupqty,
        //     nupprice: nupprice,
        //     nuptype: nuptype,
        //     email: email,
        //     no_hp: no_hp,
        //     name: name,
        //     ktp: ktp,
        //     npwp: npwp,

        //     cons: 'IFCAPB',

        //     media: media,


        //     // fotoKtp: require('@Asset/images/upload.png'),
        //     // fotoNpwp: require('@Asset/images/upload.png'),
        // }
        // console.log('saveprospect', formData);

        // this.setState({isVisible : true})
        // fetch(urlApi + 'c_nup/insertNup/IFCAMOBILE/', {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Token': this.state.token
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (!res.Error) {
        //             alert(res.Pesan)

        //         }
        //         console.log('saveSuksesNUP', res)

        //     }).catch((error) => {
        //         // alert(res.Pesan)
        //         console.log(error);
        //     });
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
                            {"Add Prospect".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
                <Content
                 style={Style.layoutInner}
                 contentContainerStyle={Style.layoutContent}
                >

                    <ProgressSteps >
                        <ProgressStep label={`Prospect Type`} 
                        nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}}>
                            {/* <View style={{ alignItems: 'center' }}> */}
                                <View style={Styles.overview}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Text style={Styles.overviewTitles}>Category</Text>
                                    </View>
                                    <Item rounded style={{height: 35}} >
                                        <Picker note 
                                                mode="dropdown"
                                                style={Styles.textInput}
                                                selectedValue={this.state.category}
                                                // onValueChange={this.onValueChange.bind(this)}
                                                // onValueChange={(val)=>this.setState({category:val})} 
                                                onValueChange={(cat)=>this.changeform(cat)}
                                                // onValueChange={(val)=>alert(val)} 
                                        >
                                            <Picker.Item label="- Choose Category -" />
                                           
                                            <Picker.Item label="Individu" value="I" />
                                            <Picker.Item label="Company" value="C" />
                                            
                                        </Picker>
                                    </Item>
                                </View>
                                <View style={Styles.overview}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Text style={Styles.overviewTitles}>Class</Text>
                                    </View>
                                    <Item rounded style={{height: 35}} >
                                        <Picker note 
                                            mode="dropdown"
                                            style={Styles.textInput}
                                            selectedValue={this.state.class_cd}
                                            // onValueChange={this.onValueChange.bind(this)}
                                            onValueChange={(val)=>this.setState({class_cd:val})} 
                                            // onValueChange={(val)=>console.log('class', val)}
                                        >
                                            {this.state.classCd.map((data, key) =>
                                                <Picker.Item key={key} label={data.label} value={data.value} />
                                            )}
                                            {/* <Picker.Item label="Apartement" value="A" />
                                            <Picker.Item label="Ruko" value="R" /> */}

                                        </Picker>

                                    </Item>
                                        
                                </View>
                                <View style={Styles.overview}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                        <Text style={Styles.overviewTitles}>VIP</Text>
                                    </View>
                                    <Item rounded style={{height:35}}>
                                        <Picker note 
                                                mode="dropdown"
                                                style={Styles.textInput}
                                                selectedValue={this.state.vip}
                                                onValueChange={(val)=>this.setState({vip: val})}
                                                // onValueChange={(val)=>alert(val)}
                                                // onValueChange={this.onValueChange.bind(this)}
                                        >
                                            <Picker.Item label="- Choose VIP -" />
                                            <Picker.Item label="Yes" value="Y" />
                                            <Picker.Item label="No" value="N" />
                                        </Picker>
                                    </Item>
                                        
                                </View>
                            {/* </View> */}
                        </ProgressStep>
                        {this.state.individu ?
                        <ProgressStep label={`Detail Information Individu`} 
                        nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                            previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 90}}>
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Salutation</Text>
                                </View>
                                <Item rounded style={{height: 35}} >
                                        <Picker note 
                                            mode="dropdown"
                                            style={Styles.textInput}
                                            selectedValue={this.state.salutation_cd}
                                            // onValueChange={this.onValueChange.bind(this)}
                                            // onValueChange={(val)=>this.setState({class_cd:val})} 
                                            // onValueChange={(val)=>console.log('salutation', val)}
                                            onValueChange={(val)=>{
                                                const descsalutation = this.state.salutationcd.filter(item=>item.value==val);
                                                // console.log('salutation', this.state.salutationcd.filter(item=>item.value==val));
                                                this.setState({salutation_cd:val,salutation:descsalutation})
                                            }}
                                        >
                                           {this.state.salutationcd.map((data, key) =>
                                                <Picker.Item key={key} label={data.label} value={data.value} />
                                            )}
                                            {/* <Picker.Item label="Apartement" value="A" />
                                            <Picker.Item label="Ruko" value="R" /> */}

                                        </Picker>

                                    </Item>
                            
                                {/* {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <Input style={Styles.textInput} placeholder={'Salutation'} value={this.state.salutation} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Salutation"
                                    selectedValue={this.state.salutation_cd}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // onValueChange={(val)=>this.setState({district:val})}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
                                    onValueChange={(val)=>console.log('salutation',val)}
                                    // onValueChange={(val) => this.setState({salutation:val})}
                                    >
                                         
                                        {this.state.salutationcd.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                
                                </Item>
                                } */}
                                
                                {/* <TextInput style={Styles.textInput} placeholder={'District'} value={district} onChangeText={(val)=>{this.setState({district:val})}}/> */}
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Name</Text>
                                </View>
                                <TextInput style={Styles.textInput} placeholder={'Name'} value={this.state.name} onChangeText={(val)=>{this.setState({name:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Address</Text>
                                </View>
                                <TextInput 
                                    style={Styles.textInputArea}
                                    numberOfLines={7}
                                    multiline={true} 
                                    placeholder={'Address'} value={this.state.addr1} onChangeText={(val)=>{this.setState({addr1:val})}}/>
                            </View>
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Province</Text>
                                </View>
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
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // onValueChange={(val)=>this.setState({province_cd:val})}
                                    // onValueChange={(val)=>alert(val)}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue}
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>City</Text>
                                </View>
                                
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'City'} value={this.state.city} onChangeText={(val)=>{this.setState({city:val})}}/>
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="City"
                                    selectedValue={this.state.city}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // defaultValue="Select..."
                                    // onValueChange={(val)=>this.setState({city:val})}
                                    // onValueChange={(val)=>alert(val)}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
                                    onValueChange={(zoomcity)=>this.chooseCity(zoomcity)}
                                    >
                                        {/* <Picker.Item label="Select Type" value="0" /> */}
                                        {this.state.getcity.map((data, key) =>
                                            // <Picker.Item label="Select Type" value="0" />
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                
                                </Item>
                                }
                                
                                {/* <TextInput style={Styles.textInput} placeholder={'City'} value={city} onChangeText={(val)=>{this.setState({city:val})}}/> */}
                            </View>
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>District</Text>
                                </View>
                            
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'District'} value={this.state.district} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="District"
                                    selectedValue={this.state.district}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // onValueChange={(val)=>this.setState({district:val})}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Village</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'Village'} value={this.state.village} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Village"
                                    selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Post Code</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'Post Code'} value={this.state.post_cd} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Post Code"
                                    selectedValue={this.state.post_cd}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:"#666"}} 
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
                                    // onValueChange={(val)=>alert({post_cd:val})}
                                    
                                    onValueChange={(val)=>this.setState({post_cd:val})}
                                    // onValueChange={(val)=>console.log('post code', val)}
                                    >
                                        {this.state.getpostcode.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                
                                </Item>
                                }
                                
                                {/* <TextInput style={Styles.textInput} placeholder={'Post Code'} value={this.state.post_cd} onChangeText={(val)=>{this.setState({post_cd:val})}}/> */}
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Telephone</Text>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Telephone Number'} value={this.state.tel_no} onChangeText={(val)=>{this.setState({tel_no:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Handphone / Whatsapp</Text>
                                </View>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Handphone / Whatsapp'} value={this.state.handphone} onChangeText={(val)=>{this.setState({handphone:val})}}/>
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Alternatif Handphone</Text>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Alternate Handphone Number'} value={this.state.hp} onChangeText={(val)=>{this.setState({hp:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Alternatif Handphone 2</Text>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Alternate Handphone Number 2'} value={this.state.hp2} onChangeText={(val)=>{this.setState({hp2:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Email</Text>
                                </View>
                                <TextInput keyboardType="email-address" style={Styles.textInput} placeholder={'Email'} value={this.state.email_addr} onChangeText={(val)=>{this.setState({email_addr:val})}} />
                            </View>
                            
                            
                        </ProgressStep>
                        :
                        <ProgressStep label={`Detail Information Company`} 
                        nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                        previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 90}}
                        >
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Company Name</Text>
                                </View>
                                <TextInput style={Styles.textInput} placeholder={'Name'} value={this.state.co_name} onChangeText={(val)=>{this.setState({co_name:val})}} />
                            
                            </View>
                            
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Company Address</Text>
                                </View>
                                <TextInput 
                                    style={Styles.textInputArea}
                                    numberOfLines={7}
                                    multiline={true} 
                                    placeholder={'Address'} value={this.state.co_addr1} onChangeText={(val)=>{this.setState({co_addr1:val})}}/>
                            </View>
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Province</Text>
                                </View>
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
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue}
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>City</Text>
                                </View>
                                
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'City'} value={this.state.city} onChangeText={(val)=>{this.setState({city:val})}}/>
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="City"
                                    selectedValue={this.state.city}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // defaultValue="Select..."
                                    // onValueChange={(val)=>this.setState({city:val})}
                                    // onValueChange={(val)=>alert(val)}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
                                    onValueChange={(zoomcity)=>this.chooseCity(zoomcity)}
                                    >
                                        {/* <Picker.Item label="Select Type" value="0" /> */}
                                        {this.state.getcity.map((data, key) =>
                                            // <Picker.Item label="Select Type" value="0" />
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                
                                </Item>
                                }
                                
                                {/* <TextInput style={Styles.textInput} placeholder={'City'} value={city} onChangeText={(val)=>{this.setState({city:val})}}/> */}
                            </View>
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>District</Text>
                                </View>
                            
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'District'} value={this.state.district} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="District"
                                    selectedValue={this.state.district}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({district:val})}
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Village</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'Village'} value={this.state.village} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Gender"
                                    selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
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
                            <View style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {/* <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" /> */}
                                    <Text style={Styles.overviewTitles}>Post Code</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <TextInput style={Styles.textInput} placeholder={'Post Code'} value={this.state.post_cd} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Post Code"
                                    selectedValue={this.state.post_cd}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // enabled={this.state.disabledetailindividu ? this.state.makafalse  : this.state.makatrue} 
                                    // onValueChange={(val)=>alert({post_cd:val})}
                                    
                                    onValueChange={(val)=>this.setState({post_cd:val})}
                                    // onValueChange={(val)=>console.log('post code', val)}
                                    >
                                        {this.state.getpostcode.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )}
                                    </Picker>
                                
                                </Item>
                                }
                                
                                {/* <TextInput style={Styles.textInput} placeholder={'Post Code'} value={this.state.post_cd} onChangeText={(val)=>{this.setState({post_cd:val})}}/> */}
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Contact Person</Text>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Telephone Number'} value={this.state.contact_person} onChangeText={(val)=>{this.setState({contact_person:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewTitle}>Telephone</Text>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Telephone'} value={this.state.tel_no} onChangeText={(val)=>{this.setState({tel_no:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Handphone / Whatsapp</Text>
                                </View>
                                <TextInput keyboardType="number-pad" style={Styles.textInput} placeholder={'Handphone / Whatsapp'} value={this.state.handphone} onChangeText={(val)=>{this.setState({handphone:val})}}/>
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Email</Text>
                                </View>
                                <TextInput keyboardType="email-address" style={Styles.textInput} placeholder={'Email'} value={this.state.email} onChangeText={(val)=>{this.setState({email:val})}} />
                            </View>
                    </ProgressStep>
                        }

                        {this.state.individu ? 
                         
                        <ProgressStep label={`Other Information`} onSubmit={this.onSubmitIndividu} finishBtnText={`Submit`} 
                            nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                            previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                            nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                            previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 90}} >
                                
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Birth Date</Text>
                                </View>
                                {/* <View style={Styles.dateInput}> */}
                                    <Item rounded  style={{height: 35}}><DatePicker rounded placeholderText='Sleect date'/></Item>
                                
                                {/* </View> */}
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start',marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Married</Text>
                                </View>
                                <Input style={Styles.txtInput} placeholder={'Married'} value={this.state.marital_status} onChangeText={(val)=>{this.setState({marital_status:val})}} />
                            </View>
                        
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Spouse Name</Text>
                                </View>
                                <Input style={Styles.txtInput} placeholder={'Spouse Name'} value={this.state.spouse_name} onChangeText={(val)=>{this.setState({spouse_name:val})}}/>
                            </View>

                            
                            
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Sex</Text>
                                </View>
                                <Input style={Styles.txtInput} placeholder={'Sex'} value={this.state.sex} onChangeText={(val)=>{this.setState({sex:val})}}/>
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Spouse Hp</Text>
                                </View>
                                <Input style={Styles.txtInput} placeholder={'Spouse Hp'} value={this.state.spouse_hp} onChangeText={(val)=>{this.setState({spouse_hp:val})}}/>
                            </View>
                            <View  style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Occupation</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <Input  placeholder={'Occupation'} value={this.state.occupation} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Media"
                                    selectedValue={this.state.occupation}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}}
                                    // enabled={this.state.disableotherdetail ? this.state.makafalse  : this.state.makatrue}  
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
                            <View  style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Media</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <Input style={Styles.textInput} placeholder={'Media'} value={media} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Media"
                                    selectedValue={this.state.media_cd}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({media_cd:val})}
                                    onValueChange={(val)=>{
                                        const descsmedia = this.state.getmedia.filter(item=>item.value==val);
                                        // console.log('salutation', this.state.salutationcd.filter(item=>item.value==val));
                                        this.setState({media_cd:val,media:descsmedia})
                                    }}
                                    // enabled={this.state.disableotherdetail  ? this.state.makafalse  : this.state.makatrue} 
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
                            
                            
                        </ProgressStep>    
                        :
                        <ProgressStep label={`Other Information`} 
                        onSubmit={this.onSubmitCompany} finishBtnText={`Submit`} 
                        nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} 
                        nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} 
                        previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 90}}
                        >
                            <View  style={Styles.overview} >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Occupation</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <Input  placeholder={'Occupation'} value={this.state.occupation} />
                                        </View>
                                    </TouchableOpacity>
                                :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Media"
                                    selectedValue={this.state.occupation}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}}
                                    // enabled={this.state.disableotherdetail ? this.state.makafalse  : this.state.makatrue}  
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
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start',marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Alternate Handphone</Text>
                                </View>
                                <Input keyboardType="number-pad" style={Styles.txtInput} placeholder={'Alternate Handphone Number'} value={this.state.hp} onChangeText={(val)=>{this.setState({hp:val})}} />
                            </View>
                            <View style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start',marginBottom: -15}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Alternate Handphone 2</Text>
                                </View>
                                <Input keyboardType="number-pad" style={Styles.txtInput} placeholder={'Alternate Handphone Number 2'} value={this.state.hp2} onChangeText={(val)=>{this.setState({hp2:val})}} />
                            </View>
                            <View  style={Styles.overview}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                    <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Media</Text>
                                </View>
                                {Platform.OS == "ios" ?
                                    <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                        <View pointerEvents="none">
                                            <Input style={Styles.textInput} placeholder={'Media'} value={media} />
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
                                    // enabled={this.state.disableotherdetail  ? this.state.makafalse  : this.state.makatrue} 
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
                        </ProgressStep>
                        
                        }
                        
                        
                    </ProgressSteps>
                    <Button style={Styles.signInBtn}><Text>tes</Text></Button>
                    
                        
     
                    
                </Content>
                    
            </Container>

        );
    }
}
export default AddProspect;

const styles = StyleSheet.create({
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