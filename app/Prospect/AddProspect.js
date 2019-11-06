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
    ActivityIndicator
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
    Input,
    Textarea
} from "native-base";
import Styles from "./Style";
import { urlApi } from "@Config/services";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {_storeData,_getData} from '@Component/StoreAsync';
import moment from 'moment';
import TabBar from '@Component/TabBar';
import { DateInput, MinuteInput, DatetimeInput } from "../components/Input";

class AddProspect extends Component {

    constructor(props){
        super(props)

        this.state = {
            company: true,
            individu: true,
            disable : true,
            enabled: false,
            makatrue : true,
            makafalse: false,

            status_cd : '',
            // status: '',
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
            // birthdate: moment().format('YYYY-MM-DD HH:M:SS'),
            birthdate: new Date(),

            
            //tab 1
            business_id: '',
            descs: '',
            vip: '',
            category: '',
            getstatus: [],
            status_cd: '',
            status: '',

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
            marital_status: '',

            //tab 3
            // marital_status: '',
            sex: '',
            spouse_name: '',
            spouse_hp: '',
            co_name: '', //company name
            co_addr1: '',
            co_post_cd: '',
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
            zoompostcd: '',

            //tab Interest
            datainterest: [],
            property_cd : '',
            project_name: '',
            lot_no: '',
            rent: '',
            buy: '',
            provdescs: '',

            chosenDate: new Date()
        }
        this.setDate = this.setDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    setDate(chosenDate){
        this.setState({ chosenDate: moment(chosenDate).format('YYYY-MM-DD')});
    }

    async componentDidMount(){
        isMount = true;
        const data = {}
        this.setState(data, () =>{
            this.getProvince()
            this.getCity()
            this.getDistrict()
            this.getVillage()
            this.getSalutation()
            this.getClassCode()
            this.getMedia()
            this.getStatus()
            this.getOccupation()
        })
    }

    componentWillUnmount(){
        isMount =false;
      }

    // ----------------- GET DROPDOWN --------------------------
    getOccupation = () => {
        {isMount ?
            fetch(urlApi + 'c_ocupation/getOcupation/IFCAPB2/',{
                method: 'GET',
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                //   }
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({ getocupation : resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getocupation',res);
            }).catch((error) => {
                console.log(error);
            })
            :null}
    }

    getProvince = () => {
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
                    this.setState({ prov : resData});
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getprov',res);
            }).catch((error) => {
                console.log(error);
            })
            :null}
    }

    getCity = (zoomprovince) => {
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

    getDistrict = (zoomcity) => {
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

    getVillage = (zoomdistrict) => {
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
    
    getPostCode = (zoomvillage) => {
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

    getSalutation = () => {

        {isMount ?
            fetch(urlApi + 'c_salutation/getSalutation/IFCAPB2/',{
                method:'GET',
                // body: JSON.stringify({salutation})
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

    getClassCode = () => {

        {isMount ?
        fetch(urlApi + 'c_class/getClass/IFCAPB2/',{
            method:'GET',
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

    getMedia = () =>{

        {isMount ?
            fetch(urlApi+ 'c_media/getMedia/IFCAPB2/',{
                method:'GET',
                // method:'POST',
                // body: JSON.stringify({media_cd})

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
    //  ----------------- END GET DROPDOWN --------------------------

    // ----------------- CHOOSE DROPDOWN --------------------------

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
    //  ----------------- END CHOOSE DROPDOWN --------------------------

    changeform = (cat) => {
        if(cat == 'C'){
            this.setState({category:cat})
            // this.setState(previousState=>({company: previousState.company}))
            this.setState({individu: false})
        }
        else{
            this.setState({category:cat})
            this.setState({individu: true})
            // this.setState(previousState=>({company: !previousState.company}))
        }
    }
    onValueChange(value) {
        this.setState({
            selected: value
        })
    }


    // ----------------------- SAVE THE DATA --------------------------

    async onSubmit() {
        const {
            class_cd,
            birthdate,
            vip,
            category,
            salutation,
            name,
            addr1,
            post_cd,
            village,
            district,
            city,
            province_cd,
            tel_no,
            handphone,
            hp,
            hp2,
            email_addr,
            marital_status,
            sex,
            spouse_name,
            spouse_hp,
            co_name,
            occupation,
            contact_person,
            media_cd,
            status_cd,
            // status,

            chosenDate
        } = this.state

        const formData = {
            email_login : await _getData('@User'),
            class_cd: class_cd,
            // birthdate: this.state.chosenDate,
            birthdate: birthdate,
            // birthdate: moment(chosenDate).format("YYYY-MM-DD"),
            vip: vip,
            category: category ,
            salutation: salutation,
            name: name,
            addr1: addr1,
            post_cd: post_cd,
            village: village,
            district: district,
            city: city,
            province_cd: province_cd,
            tel_no: tel_no,
            handphone: handphone,
            hp: hp,
            hp2: hp2,
            email_addr: email_addr,
            marital_status: marital_status,
            sex: sex,
            spouse_name: spouse_name,
            spouse_hp: spouse_hp,
            co_name: co_name,
            occupation: occupation,
            contact_person: contact_person,
            media_cd: media_cd,
            status_cd: status_cd,
            // status: status[0].label
        }
        console.log('save prospect', formData);
        fetch(urlApi+'c_prospect/insertProspec/IFCAPB2/',{
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
            console.log(res);
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

    // ----------------------- END SAVE THE DATA --------------------------
 
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

    <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep label="Prospect Type" onNext={this.onNextStep} errors={this.state.errors} nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}}>
            {/* <View style={{ alignItems: 'center' }}> */}
            {this.state.getstatus.length == 0 ?
                             <ActivityIndicator />
                         :
                <View>
                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>Business Type</Text>
                        </View>
                        <Item rounded style={{height: 35}}>
                            <Picker 
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.category}
                                    onValueChange={(cat)=>this.changeform(cat)}
                            >
                                <Picker.Item label="Choose Business Type" />
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
                        <Item rounded style={{height: 35}}>
                            <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.class_cd}
                                onValueChange={(val)=>this.setState({class_cd:val})}
                            >
                                <Picker.Item label="Choose Class" />
                                {this.state.classCd.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value}/>
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>VIP</Text>
                        </View>
                        <Item rounded style={{height: 35}}>
                            <Picker note 
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.vip}
                                    onValueChange={(val)=>this.setState({vip:val})}
                            >
                                <Picker.Item label="Choose One" />
                                <Picker.Item label="Yes" value="Y" />
                                <Picker.Item label="No" value="N" />
                            </Picker>
                            </Item>
                    </View>
                
                    <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Status</Text>
                     </View>
                     <Item rounded style={{height: 35}}>
                     <Picker

                        iosHeader="Select one"
                        mode="dropdown"
                        // style={{ width: 180,height: 40 }}
                        style={Styles.textInput}
                        selectedValue={this.state.status_cd}
                        onValueChange={(val)=>{
                            const statuspros = this.state.getstatus.filter(item=>item.value==val)
                            console.log('status change', this.state.getstatus.filter(item=>item.value==val));
                            this.setState({status_cd:val,status:statuspros})
                        }}
                        // onValueChange={(val)=>{
                        //     const statuspros = this.state.getstatus.filter(item=>item.value==val)
                        //     this.setState({status_cd:val})
                        // }}
                        >
                            <Picker.Item label="Choose Status" />
                        {this.state.getstatus.map((data, key) =>
                            <Picker.Item key={key} label={data.label} value={data.value} />
                        )}
                        {/* <Picker.Item label="tes" value="1" />
                        <Picker.Item label="tes2" value="2" /> */}
                        </Picker>
                        </Item>
                </View>
                </View>
                }
            {/* </View> */}
          </ProgressStep>
          
          {
              this.state.individu ? <ProgressStep label={`*Detail Information Individu`} nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}}> 
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Salutation</Text>
                     </View>
                     <Item rounded style={{height: 35}}>
                     <Picker 
                                placeholder="Select Salutation"
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.salutation}
                                onValueChange={(val)=>this.setState({salutation:val})}
                        >
                            <Picker.Item label="Choose Salutation" />
                            {this.state.salutationcd.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                             )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Name</Text>
                     </View>
                    <Input style={Styles.textInput} value={this.state.name} onChangeText={(name) => this.setState({ name })}  />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Address</Text>
                     </View>
                     <Textarea style={Styles.textInputArea} rowSpan={3}  value={this.state.addr1} onChangeText={(addr1) => this.setState({ addr1 })}  />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Province</Text>
                    <Item rounded style={{height: 35}}>
                        <Picker 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.province_cd}
                                // onValueChange={(val)=>this.setState({province_cd:val})}
                                onValueChange={(zoomprovince)=>this.chooseProv(zoomprovince)}
                        >
                            <Picker.Item label="Choose Province" />
                            {this.state.prov.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                            )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>City</Text>
                    <Item rounded style={{height: 35}}>
                        <Picker  
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.city}
                                onValueChange={(zoomcity)=>this.chooseCity(zoomcity)}
                        >
                            <Picker.Item label="Choose City" />
                            {this.state.getcity.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                            )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>District</Text>
                    <Item rounded style={{height: 35}}>
                        <Picker  
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.district}
                                onValueChange={(zoomdistrict)=>this.chooseDistrict(zoomdistrict)}
                        >
                            <Picker.Item label="Choose District" />
                            {this.state.getdistrict.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                            )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Village</Text>
                    <Item rounded style={{height: 35}}>
                        <Picker  
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.village}
                                onValueChange={(zoomvillage)=>this.chooseVillage(zoomvillage)}
                        >
                            <Picker.Item label="Choose Village" />
                             {this.state.getvillage.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                              )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Post Code</Text>
                    <Item rounded style={{height: 35}}>
                        <Picker note 
                                mode="dropdown"
                                style={Styles.textInput}
                                selectedValue={this.state.post_cd}
                                onValueChange={(val)=>this.setState({post_cd:val})}
                        >
                            <Picker.Item label="Choose Postcode" />
                             {this.state.getpostcode.map((data, key) =>
                                <Picker.Item key={key} label={data.label} value={data.value} />
                              )}
                        </Picker>
                        </Item>
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Telephone</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.tel_no} onChangeText={(tel_no) => this.setState({ tel_no })} />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Handphone / Whatsapp</Text>
                     </View>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.handphone} onChangeText={(handphone) => this.setState({ handphone })} />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Alternatif Handphone</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.hp} onChangeText={(hp) => this.setState({ hp })} />
                </View>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Alternatif Handphone 2</Text>
                    <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.hp2} onChangeText={(hp2) => this.setState({ hp2 })} />
                </View>
                <View style={Styles.overview}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Email</Text>
                     </View>
                    <TextInput keyboardType="email-address" style={Styles.textInput} value={this.state.email_addr} onChangeText={(email_addr) => this.setState({ email_addr })} />
                </View>
              </ProgressStep>
              
              : <ProgressStep label={`Detail Information Company`} nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}}> 
                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>Address</Text>
                        </View>
                        <TextInput 
                            style={Styles.textInputArea}
                            numberOfLines={7}
                            multiline={true}
                            value={this.state.addr1} 
                            onChangeText={(addr1) => this.setState({ addr1 })} />
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Province</Text>
                        <Item rounded style={{height: 35}}>
                            <Picker 
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.province_cd}
                                    // onValueChange={(val)=>this.setState({province_cd:val})}
                                    onValueChange={(zoomprovince)=>this.chooseProv(zoomprovince)}
                            >
                                <Picker.Item label="Choose Province" />
                                {this.state.prov.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>City</Text>
                        <Item rounded style={{height: 35}}>
                            <Picker  
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.city}
                                    onValueChange={(zoomcity)=>this.chooseCity(zoomcity)}
                            >
                                <Picker.Item label="Choose City" />
                                {this.state.getcity.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>District</Text>
                        <Item rounded style={{height: 35}}>
                            <Picker  
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.district}
                                    onValueChange={(zoomdistrict)=>this.chooseDistrict(zoomdistrict)}
                            >
                                <Picker.Item label="Choose District" />
                                {this.state.getdistrict.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Village</Text>
                        <Item rounded style={{height: 35}}>
                            <Picker  
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.village}
                                    onValueChange={(zoomvillage)=>this.chooseVillage(zoomvillage)}
                            >
                                <Picker.Item label="Choose Village" />
                                {this.state.getvillage.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Post Code</Text>
                        <Item rounded style={{height: 35}}>
                            <Picker note 
                                    mode="dropdown"
                                    style={Styles.textInput}
                                    selectedValue={this.state.post_cd}
                                    onValueChange={(val)=>this.setState({post_cd:val})}
                            >
                                <Picker.Item label="Choose Post Code" />
                                {this.state.getpostcode.map((data, key) =>
                                    <Picker.Item key={key} label={data.label} value={data.value} />
                                )}
                            </Picker>
                            </Item>
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Telephone</Text>
                        <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.tel_no} onChangeText={(tel_no) => this.setState({ tel_no })} />
                    </View>
                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>Handphone / Whatsapp</Text>
                        </View>
                        <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.handphone} onChangeText={(handphone) => this.setState({ handphone })} />
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Alternatif Handphone</Text>
                        <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.hp} onChangeText={(hp) => this.setState({ hp })} />
                    </View>
                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Alternatif Handphone 2</Text>
                        <TextInput keyboardType="number-pad" style={Styles.textInput} value={this.state.hp2} onChangeText={(hp2) => this.setState({ hp2 })} />
                    </View>
                    <View style={Styles.overview}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                            <Text style={Styles.overviewTitles}>Email</Text>
                        </View>
                        <TextInput keyboardType="email-address" style={Styles.textInput} value={this.state.email_addr} onChangeText={(email_addr) => this.setState({ email_addr })} />
                    </View>

              </ProgressStep>
          }
 
         {
             this.state.individu ? <ProgressStep label={`Other Information Individu`} onSubmit={this.onSubmit} nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}}>
            {/* <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Birth Date</Text>
                <View style={Styles.dateInput}>
                    <DatePicker onDateChange={this.setDate} locale={"en"} />
                
                </View>
            </View> */}
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Birth Date</Text>
                <View style={Styles.dateInput}>
                    {/* <DatePicker onDateChange={this.setDate } locale={"en"} 
                    onValueChange={(val) =>this.setState({birthdate:val}) } 
                    onValueChange={(val) =>alert(val) } 
                     /> */}
                
                    <DatetimeInput
                        name="birthdate"
                        label="Birthdate"
                        mode="date"
                        minimumDate={new Date(1900,1,1)}
                        onChange={(name,val)=>this.setState({birthdate:val})}
                        value={this.state.birthdate}
                    />
                </View>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Married</Text>
                <Item rounded style={{height: 35}}>
                        <Picker note 
                            mode="dropdown"
                            style={Styles.textInput}
                            selectedValue={this.state.marital_status}
                            onValueChange={(val)=>this.setState({marital_status:val})}
                        >
                            <Picker.Item label="Choose One" />
                           <Picker.Item label="Yes" value="Y" />
                           <Picker.Item label="No" value="N" />
                        </Picker>
                </Item>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Sex</Text>
                <Item rounded style={{height: 35}}>
                        <Picker note 
                            mode="dropdown"
                            style={Styles.textInput}
                            selectedValue={this.state.sex}
                            onValueChange={(val)=>this.setState({sex:val})}
                        >
                            <Picker.Item label="Choose Sex" />
                           <Picker.Item label="Male" value="F" />
                           <Picker.Item label="Female" value="M" />
                        </Picker>
                </Item>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Spouse Name</Text>
                <Input style={Styles.textInput} value={this.state.spouse_name} onChangeText={(spouse_name) => this.setState({ spouse_name })} />
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Company Name</Text>
                <Input style={Styles.textInput} value={this.state.co_name} onChangeText={(co_name) => this.setState({ co_name })} />
            </View>
            <View style={Styles.overview}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Occupation</Text>
                </View>
                <Item rounded style={{height: 35}}>
                <Picker 
                    placeholder="Occupation"
                    selectedValue={this.state.occupation}
                    onValueChange={(val)=>this.setState({occupation:val})}
                    // onValueChange={(val)=>alert(val)}
                >
                    <Picker.Item label="Choose Occupation" />
                    {this.state.getocupation.map((data, key) =>
                        <Picker.Item key={key} label={data.label} value={data.value} />
                    )}
                </Picker>
                </Item>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Contact</Text>
                <Input style={Styles.textInput} value={this.state.contact_person} onChangeText={(contact_person) => this.setState({ contact_person })} />
            </View>
            <View style={Styles.overview}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Media</Text>
                </View>
                <Item rounded style={{height: 35}}>
                <Picker 
                    placeholder="Media"
                    selectedValue={this.state.media_cd}
                    onValueChange={(val)=>this.setState({media_cd:val})}
                >
                    <Picker.Item label="Choose Media" />
                    {this.state.getmedia.map((data, key) =>
                        <Picker.Item key={key} label={data.label} value={data.value} />
                    )}
                </Picker>
                </Item>
            </View> 
             </ProgressStep>

             : <ProgressStep label={`Other Information Company`} onSubmit={this.onSubmit} nextBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 70}} nextBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}} previousBtnStyle={{backgroundColor: Colors.navyUrban, borderRadius: 5, width: 85}} previousBtnTextStyle={{color: Colors.white, fontSize: 16,textAlign: 'center',}}> 
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Company Name</Text>
                <Input style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Occupation</Text>
                </View>
                <Item rounded style={{height: 35}}>
                <Picker 
                    placeholder="Occupation"
                    selectedValue={this.state.occupation}
                    onValueChange={(val)=>this.setState({occupation:val})}
                >
                    <Picker.Item label="Choose Occupation" />
                    {this.state.getocupation.map((data, key) =>
                        <Picker.Item key={key} label={data.label} value={data.value} />
                    )}
                </Picker>
                </Item>
            </View>
            <View style={Styles.overview}>
                <Text style={Styles.overviewTitle}>Contact</Text>
                <Input style={Styles.textInput} />
            </View>
            <View style={Styles.overview}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon solid name='star' style={Styles.iconSub} type="FontAwesome5" />
                        <Text style={Styles.overviewTitles}>Media</Text>
                </View>
                <Item rounded style={{height: 35}}>
                <Picker 
                    placeholder="Media"
                    selectedValue={this.state.media_cd}
                    onValueChange={(val)=>this.setState({media_cd:val})}
                >
                    <Picker.Item label="Choose Media" />
                    {this.state.getmedia.map((data, key) =>
                        <Picker.Item key={key} label={data.label} value={data.value} />
                    )}
                </Picker>
                </Item>
            </View>
             </ProgressStep> 
         }                       
        </ProgressSteps>
 
        
      </View>
                    
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