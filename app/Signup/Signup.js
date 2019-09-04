import React from 'react';
//import react in project 
import { PermissionsAndroid,Text, View, Image, StatusBar, Platform, ActivityIndicator, ImageBackground ,TouchableOpacity, BackHandler,I18nManager} from 'react-native';
import { Container, Button, Icon, Right, Item, Input, Header, Left, Body, Title} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';
import { Style, Colors } from "../Themes";
import { Actions } from 'react-native-router-flux'
import {_storeData,_getData} from '@Component/StoreAsync';
import DeviceInfo from 'react-native-device-info';
import {urlApi} from '@Config/services';
class Signup extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded : true,
            email : this.props.data.email,
            fullname : this.props.data.givenName + ' ' + this.props.data.familyName,
            nohp : '',
            password : '',
            isHide : false
            
        }

        console.log('props',props);
    }

    SignupSosmed () {
        this.setState({isLoaded: !this.state.isLoaded});


        data = {
            Email : this.state.email,
            FullName : this.state.fullname,
            Handphone : this.state.nohp,
            Medsos : this.props.sosmed,
            Id : this.props.data.id,
            password : this.state.password,
        };
    
        fetch(urlApi+'c_auth/SignUpGuest',{
            method:'POST',
            headers : {
                'Accept':'application/json',
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        }).then((response) => response.json())
        .then((res)=>{
            
            console.log('Login Result',res);
        }).catch((error) => {
            console.log(error);
            this.setState({isLoaded: !this.state.isLoaded},()=>{
              alert(error)
          });
        });
      }

    render() {
        return (
            <Container>
                <ImageBackground style={styles.backgroundImage}>
                    <Header style={styles.header}>
						<Left style={styles.left}>
                            <Button transparent style={Style.actionBarBtn} onPress={Actions.pop} >
                                <Icon
                                    active
                                    name="arrow-left"
                                    style={Style.textWhite}
                                    type="MaterialCommunityIcons"
                                />
                            </Button>
                        </Left>
						<Body style={styles.body}>
                            <Text style={{fontSize : 18,fontWeight:'bold',color : '#fff'}}>
                                {"Sign Up as Guest"}
                            </Text>
                        </Body>
						<Right style={styles.right}></Right>
					</Header>
					<View style={styles.inputFieldStyles}>
                        
                        <Image  style={styles.images} source={ require("../Images/logo.png")}/>

						<View style={styles.containEmail}>
                            <Input 
                                ref='email' 
                                style={styles.inputEmail} 
                                editable={false} 
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                                placeholder='Email'
                                placeholderTextColor="rgba(0,0,0,0.20)"
                                value = {this.state.email}
                                />
						</View>
						<View style={styles.divider}/>
                        <View style={styles.containMid}>
                            <Input 
                                ref='fullname' 
                                style={styles.inputEmail} 
                                editable={true} 
                                onChangeText={(val)=>this.setState({fullname:val})}
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                                placeholder='Full Name'
                                placeholderTextColor="rgba(0,0,0,0.20)"
                                value = {this.state.fullname}                                
                                />
						</View>
						<View style={styles.divider}/>
						<View style={styles.containMid}>
							<Input
								ref='nohp'
								style={styles.inputEmail}
								editable={true}
                                onChangeText={(val)=>this.setState({nohp:val})}
								keyboardType='numeric'
								returnKeyType='next'
								autoCapitalize='none'
								autoCorrect={false}
								underlineColorAndroid='transparent'lkk
								textAlign={I18nManager.isRTL ? 'right' : 'left'}
								placeholder='Handphone'
								placeholderTextColor="rgba(0,0,0,0.20)" 
                                value = {this.state.nohp}
                                />
						</View>
                        <View style={styles.containPassword}>
							<Input
								ref='password'
								style={styles.inputEmail}
								editable={true}
                                onChangeText={(val)=>this.setState({password:val})}
								keyboardType='default'
								returnKeyType='next'
								autoCapitalize='none'
								autoCorrect={false}
								underlineColorAndroid='transparent'
								textAlign={I18nManager.isRTL ? 'right' : 'left'}
								placeholder='Password'
								placeholderTextColor="rgba(0,0,0,0.20)"
								secureTextEntry={!this.state.isHide}
                                value={this.state.password}/>
                                <Icon name={this.state.isHide ? "eye-off" : "eye"} style={styles.eye} onPress={()=>this.setState({isHide:!this.state.isHide})} />
						</View>
					</View>
					<View style={styles.signbtnSec} pointerEvents={this.state.isLoaded ? 'auto' : 'none'}>
                        <Button style={styles.signInBtn} onPress={() => this.SignupSosmed()}>
                            {!this.state.isLoaded ? <ActivityIndicator color="#fff" /> :
                            <Text style={styles.signInBtnText}>Register Now</Text>}
                        </Button>
					</View> 
					
				</ImageBackground>
            </Container>
        );
    }
}
export default Signup;
