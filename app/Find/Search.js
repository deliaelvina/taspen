import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList,ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'
import RadioGroup from 'react-native-custom-radio-group'
import {Actions} from 'react-native-router-flux'
import { Style } from '../Themes/'
import Styles from './Style'
import {_storeData,_getData} from '@Component/StoreAsync';
// import Shimmer from 'react-native-shimmer';
import Shimmer from '@Component/Shimmer';
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



export default class Search extends React.Component {

    state = {
        dataTower :[],
        isVisible : false
    }
   
    async componentDidMount(){
        const data = {
            dataTower : await _getData('@UserProject')
        }

        setTimeout(() => {
            this.setState(data)
        }, 2000)

    }

    componentWillMount() {
        
    }
    clickProject(item) {
        // console.log('property',item);
        Actions.propertydetail({items : item});
        this.setState({ click : true})
    }
    render() {
        return (
        <Container style={Style.bgMain}>
    
            <Content style={Style.layoutContent} >
            <ScrollView
                scrollEventThrottle={200}
                directionalLockEnabled={true}
            >
            
                <View style={Styles.sectionGrey}>
                    <View style={Styles.headerBg}>
                        <Icon name="building" type="FontAwesome5" style={Styles.headerIcon} />
                        <Text style={Styles.sHeader}>{'All Project'.toUpperCase()}</Text>
                        {/* <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { NavigationService.navigate('PublicProperties') }}>
                                <Text style={Styles.sLink} >See All</Text>
                            </Button>
                        </Right> */}
                    </View>
                    
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