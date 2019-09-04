import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList,ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'
import RadioGroup from 'react-native-custom-radio-group'
import {Actions} from 'react-native-router-flux'
import { Style } from '../Themes/'
import { Fonts, Metrics, Colors } from '../Themes/';
import Styles from './Style'
import {_storeData,_getData} from '@Component/StoreAsync';
// import Shimmer from 'react-native-shimmer';
import Shimmer from '@Component/Shimmer';
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



export default class Project extends React.Component {

    state = {
        dataTower :[],
        isVisible : false
    }
   
    async componentDidMount(){
        const data = {
            dataTower : await _getData('@UserProject')
        }

        console.log('data',data);

        setTimeout(() => {
            this.setState(data)
        }, 1000)

    }

    componentWillMount() {
        
    }
    clickProject(item) {
        // console.log('property',item);
        Actions[this.props.goTo]({items : item,dyn : true});
        this.setState({ click : true})
    }
    render() {
        return (
        <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar
                    backgroundColor={Colors.statusBarOrange}
                    animated
                    barStyle="dark-content"
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
                    {"Choose Project".toUpperCase()}
                    </Text>
                </View>
                <View style={Style.actionBarRight}></View>
            </Header>

            <Content style={Style.layoutContent} >
            <ScrollView
                scrollEventThrottle={200}
                directionalLockEnabled={true}
            >
            
                <View style={Styles.sectionGrey}>
                    
                    {this.state.dataTower.length == 0 ? 
                        <View style={Styles.city}>
                            <Shimmer autoRun={true} style={Styles.btnCity} />
                            <Shimmer autoRun={true} style={Styles.btnCity} />
                            <Shimmer autoRun={true} style={Styles.btnCity} />
                            <Shimmer autoRun={true} style={Styles.btnCity} />
                        </View>
                    :
                        <View style={Styles.city}>

                        {this.state.dataTower.map((item,key)=>
                            <TouchableOpacity key={key} style={Styles.btnCity} onPress={() => this.clickProject(item)}>
                            <Image source={{ uri: item.picture_url+ '?random_number=' + new Date().getTime() }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>{item.project_descs}</Text>
                            </View>
                            </TouchableOpacity>
                        )}
                        </View>

                    }

                    
                </View>



            </ScrollView>
            </Content>


        </Container>
        )
    }
}