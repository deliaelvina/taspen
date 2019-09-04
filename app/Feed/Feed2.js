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

let isMount = false
// create a component
class Feed extends Component {

    constructor(props){
      super(props)

      this.state={
        hd : null,

        news : [],
        user : "",
        name : "",
        project : []
    }

      console.log('props cf',props);
    }

    async componentDidMount(){
      isMount = true
      const data = {
        hd : new Headers({
          'Token' : await _getData('@Token')
        }),
        user : await _getData('@User'),
        name : await _getData('@UserId'),
        project : await _getData('@UserProject')
      }

      this.setState(data,()=>{
        this.getNews()
      })
    }

    getNews = () =>{

        {isMount ?
            fetch(urlApi+'c_newsandpromo/getDatanews2/IFCAMOBILE/',{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    resData.map((data)=>{
                        this.setState(prevState=>({
                            news : [...prevState.news, data]
                        }))
                    })
                    console.log('res',res);
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getNews',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    clickChouseUnit(item) {
      
        Actions.chouseunit({
          unitItems : item,
          items : this.props.item,
          prevItems : this.props.prevItems
        });
        // this.setState({ click : true})
    }
    clickUnitEnquiry() {
        Actions.unitenquiry();
        this.setState({ click : true})
    }
    render() {
        return (
            <Container style={Style.bgMain}>
              <StatusBar backgroundColor={"rgba(0, 0, 0, 0.3)"} animated barStyle="dark-content" />
             <Content
               style={[Style.layoutInner,{marginTop:StatusBar.currentHeight}]}
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
                    <ScrollView>
                    {
                        this.state.news.map((data,key)=>
                            <TouchableOpacity key={key} onPress={()=>Actions.NewsAndPromoDetail({items : data})}>
                                <Card style={{
                                    height: null,
                                    backgroundColor: 'black',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowColor: "#37BEB7",
                                    shadowOpacity: 0.5,
                                    elevation: 5,
                                    paddingBottom: 10
                                }} >
                                    <View>
                                        {/* <View>
                                            <Text style={{
                                                fontSize: 12,
                                                textAlign: 'left',
                                                color: '#333',
                                                fontWeight : "500"
                                            }}>
                                                {data.descs}
                                                </Text>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                                textAlign: 'left',
                                                color: '#333'
                                            }}>
                                                {data.subject}
                                            </Text>
                                        </View> */}
                                        <View>
                                            <Image source={{uri:data.picture}} style={Styles.itemImg} />
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                textAlign: 'left',
                                                color: '#ff720d'
                                            }}>
                                                {data.date_created}
                                            </Text>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }
                    </ScrollView>
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
export default Feed;
