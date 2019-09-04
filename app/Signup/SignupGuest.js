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
class SignupGuest extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isLoaded : true
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
                                ref='email' 
                                style={styles.inputEmail} 
                                editable={true} 
                                onChangeText={(val)=>this.setState({email:val})}
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                                placeholder='Email'
                                placeholderTextColor="rgba(0,0,0,0.20)" />
						</View>
						{Platform.OS == "ios" ? <View style={styles.divider}/> : null}
                        <View style={styles.containMid}>
                            <Input 
                                ref='Apaya' 
                                style={styles.inputEmail} 
                                editable={true} 
                                onChangeText={(val)=>this.setState({email:val})}
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                                placeholder='Email'
                                placeholderTextColor="rgba(0,0,0,0.20)" />
						</View>
						<View style={styles.divider}/>
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
								secureTextEntry={true}/>
						</View>
					</View>
					<View style={styles.signbtnSec} pointerEvents={this.state.isLoaded ? 'auto' : 'none'}>
                        <Button style={styles.signInBtn} onPress={() => this.btnLoginClick()}>
                            {!this.state.isLoaded ? <ActivityIndicator color="#fff" /> :
                            <Text style={styles.signInBtnText}>Register Now</Text>}
                        </Button>
					</View> 
					
				</ImageBackground>
            </Container>
        );
    }
}
export default SignupGuest;
