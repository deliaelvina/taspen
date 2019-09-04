//import liraries
import React, { Component } from 'react';
import {
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform,
    SafeAreaView,
    View,
    FlatList,
    Modal
  } from "react-native";
  import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    FooterTab,
    Badge,
    Card
  } from "native-base";

  import { Actions } from "react-native-router-flux";
  import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { Style, Colors } from "../Themes";
import Styles from "./Style";

import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';
import moment from 'moment'
import HTML from 'react-native-render-html';

let isMount = false
// create a component
class NewsAndPromoDetail extends Component {

    constructor(props){
      super(props)

      console.log('props cf',props);
    }

    render() {
        const item = this.props.items
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
                   {"News And Promo Detail".toUpperCase()}
                 </Text>
               </View>
               <View style={Style.actionBarRight}></View>
               </Header>
             <Content
               style={Style.layoutInner}
               contentContainerStyle={Style.layoutContent}
             >
              {/* <Image
              source={require("@Asset/images/tigabr.jpg")}
              style={{
                width: null,
                height: 168,
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8
              }}
            />  */}
                <View>
                    <View>
                        <Image source={{uri:item.picture}} style={Styles.picture} />
                    </View>
                    <View style={Styles.wrapNews}>
                        <Text style={Styles.titleText}>{item.subject}</Text>
                    </View>
                    <View style={Styles.wrapNews}>
                        {item.content != "" ?
                          <HTML html={item.content} imagesMaxWidth={Dimensions.get('window').width} />
                        :null}
                        {/* <Text style={Styles.contentText}>{item.content}</Text> */}
                        {/* <Text>
                          <Text style={Styles.locationText}>{item.location}, {moment(item.date_created).format('DD MMMM YYYY')}</Text>
                          <Text style={Styles.contentText}>{item.content}</Text>
                        </Text> */}
                    </View>
                </View>
             </Content>
             </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default NewsAndPromoDetail;
