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
class Reset extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded : true,

            conpass : '',
            newpass : ''
        }
    }

    ResetPress = () =>{
        const { conpass, newpass } = this.state
        if(conpass != newpass){
            alert('Password does not match')
        } else {
            const formData = {
                matching_passwords : {
                    newpass : newpass
                },
                email : this.props.email
            }

            console.log('form',formData);

            fetch(urlApi+'c_auth/Resetpass/',{
                method : "POST",
                body :JSON.stringify(formData),
                headers :{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((res)=>{
                // alert(res.Pesan)
                console.log('save profile',res)
                
            }).catch((error) => {
                console.log(error);
            });
        }
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
						<Body style={styles.body}></Body>
						<Right style={styles.right}></Right>
					</Header>
					<View style={styles.inputFieldStyles}>
                        
                        <Image  style={styles.images} source={ require("../Images/logo.png")}/>

						<View style={styles.containEmail}>
                            <Input 
                                ref='newpass' 
                                style={styles.inputEmail} 
                                editable={true} 
                                onChangeText={(val)=>this.setState({newpass:val})}
                                keyboardType='default'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                                placeholder='New Password'
                                placeholderTextColor="rgba(0,0,0,0.20)" 
                                secureTextEntry={true} 
                                onChangeText={(val)=>this.setState({newpass:val})}
                                value={this.state.newpass} />
						</View>
						<View style={styles.divider}/>
						<View style={styles.containPassword}>
							<Input
								ref='conpass'
								style={styles.inputEmail}
								editable={true}
                                onChangeText={(val)=>this.setState({conpass:val})}
								keyboardType='default'
								returnKeyType='done'
								autoCapitalize='none'
								autoCorrect={false}
								underlineColorAndroid='transparent'
								textAlign={I18nManager.isRTL ? 'right' : 'left'}
								placeholder='Confirm Password'
								placeholderTextColor="rgba(0,0,0,0.20)"
								secureTextEntry={true} 
                                onChangeText={(val)=>this.setState({conpass:val})} 
                                value={this.state.conpass} />
						</View>
					</View>
					<View style={styles.signbtnSec} pointerEvents={this.state.isLoaded ? 'auto' : 'none'}>
                        <Button style={styles.signInBtn} onPress={() => this.ResetPress()}>
                            {!this.state.isLoaded ? <ActivityIndicator color="#fff" /> :
                            <Text style={styles.signInBtnText}>Reset Password</Text>}
                        </Button>
					</View> 
					
				</ImageBackground>
            </Container>
        );
    }
}
export default Reset;
