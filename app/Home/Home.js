import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList
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
  View,
  FooterTab,
  Badge,
  List,
  ListItem,
  Tab,
  Tabs,
  Fab,
  Form,
  Label,
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Carousel, { Pagination, ParallaxImage } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./styles/SliderEntry";
import SliderEntry from "../components/SlideEntry";
import styles, { colors } from "./styles/index";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
import { scrollInterpolators, animatedStyles } from "./utils/animations";
import CardSlide from "../components/CardSlide";
const { height, width } = Dimensions.get('window')
import {urlApi} from '@Config/services';
import {_storeData,_getData} from '@Component/StoreAsync';
import { Actions } from "react-native-router-flux";
import Styles from "./Style";
const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 0;
import SIMILAR from "../Property/Similar";
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      name : '',
      email  : '',
      dataTower : [],
      dataPromo : [],
      dataNews : [],

      isCorLoaded : false,
    };
  }

  componentWillMount() {
    this.startHeaderHeight = 80
    if (Platform.OS == 'android') {
        this.startHeaderHeight = 100 + StatusBar.currentHeight
    }
  }

  async componentDidMount(){
    console.log('Data Project',await _getData('@UserProject'));
    const data = {
      email :  await _getData('@User'),
      name : await _getData('@Name'),
      dataTower : await _getData('@UserProject'),
      isCorLoaded : true
    }

    this.setState(data,()=>{
      this.getPromo()
      this.getNews()
    })
  }

  getPromo = () => {
    fetch(urlApi+'c_newsandpromo/getDatapromo2/IFCAMOBILE' ,{
        method : "GET",
    })
    .then((response) => response.json())
    .then((res)=>{
        if(!res.Error){
          const resData = res.Data

          this.setState({dataPromo:resData})
          console.log('dataPRopmo',resData);
        }
    }).catch((error) => {
        console.log(error);
    });
  }

  getNews = () => {
    fetch(urlApi+'c_newsandpromo/getDatanews2/IFCAMOBILE' ,{
        method : "GET",
    })
    .then((response) => response.json())
    .then((res)=>{
        if(!res.Error){
          const resData = res.Data

          this.setState({dataNews:resData})
          console.log('dataNews',resData);
        }
    }).catch((error) => {
        console.log(error);
    });
  }
  

  // _renderItem({ item, index }) {
  //   return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  // }

  _renderItemPromo ({item, index}, parallaxProps) {
    return (
        <TouchableOpacity style={styles.item} onPress={()=>Actions.NewsAndPromoDetail({items : item})}>
            <ParallaxImage
                source={{ uri: item.picture }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <View style={styles.newsTitle}>
              <Text style={styles.newsTitleText} numberOfLines={2}>
                  { item.descs }
              </Text>
            </View>
        </TouchableOpacity>
    );
}

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        onPress={()=>Actions.propertydetail({items:item})}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        {/* //??? Di Matiin Belum nemu Solusi Biar ke refresh */}
        {/* <Text style={styles.title}>Hey {this.state.name}</Text> */}
        <Text style={styles.title}>Urban Jakarta Propertindo</Text>
        <Text style={styles.subtitle}>{`This is what you need!`}</Text>
        
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            flex: 1,
            paddingRight: 16,
            marginTop: -20
          }}
        >
          <Button
            small
            rounded
            style={Styles.sBtnHead}
            onPress={()=>Actions.ListingProjectPage()}>
            <Text style={Styles.sLinkHead}>ALL PROJECT</Text>
          </Button>
        </View>
        
        <View style={styles.corContainerStyle}>
          {this.state.dataTower.length == 0 ? <ActivityIndicator size="large" /> :
            <Carousel
            ref={c => (this._slider1Ref = c)}
            data={this.state.dataTower}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={false}
            loopClonesPerSide={2}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            autoplay={false}
            autoplayDelay={1000}
            autoplayInterval={3000}
          />
          }
        </View>
        
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 0, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  renderItemNews(item){
    return (
      <TouchableOpacity
        style={Styles.item}
        underlayColor="transparent"
        onPress={()=>Actions.NewsAndPromoDetail({items : item})}>
        <View>
          <View>
            <Image
              source={{ uri: item.picture }}
              style={Styles.itemImg}
            />
          </View>
          <Text style={Styles.itemPrice}>{item.descs}</Text>
          <Text style={Styles.itemLocation}>{item.subject}</Text>
          
        </View>
      </TouchableOpacity>
    )
  }

  renderItemPromo(item){
    return (
      <TouchableOpacity
        style={Styles.item}
        underlayColor="transparent"
        onPress={()=>Actions.NewsAndPromoDetail({items : item})}>
        <View>
          <View>
            <Image
              source={{ uri: item.picture }}
              style={Styles.itemImg}
            />
          </View>
          <Text style={Styles.itemPrice}>{item.descs}</Text>
          <Text style={Styles.itemLocation}>{item.subject}</Text>
          
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const example1 = this.mainExample(1, "");
    // const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
    // const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
    // const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
    // const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
    // const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
    // const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
    // const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.3)"}
          barStyle={"dark-content"}
        />
        {this.gradient}
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {example1}
          <ScrollView scrollEventThrottle={16} >
            <View style={{ flex: 1 }}>

              {/* <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.dataPromo.length != 0 ?
                    this.state.dataPromo.map((item,key)=>
                      <CardSlide key={key} imageUri={{url:item.picture}} name={item.subject} />
                    )
                  :<ActivityIndicator/>}
                </ScrollView>
              </View> */}
              <View style={Styles.sectionTransparent}>
                <View style={Styles.headerBg}>
                  <Text style={Styles.sTitleWhite}>
                    {"UJP Promo".toUpperCase()}
                  </Text>
                  <Right>
                    <Button
                      small
                      rounded
                      style={Styles.sBtn}
                      onPress={()=>Actions.Feed()}
                      >
                      <Text style={Styles.sLink}>See All</Text>
                    </Button>
                  </Right>
                </View>
                <Carousel
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={3000}
                  sliderWidth={width}
                  sliderHeight={width}
                  itemWidth={width - 60}
                  data={this.state.dataPromo}
                  renderItem={this._renderItemPromo}
                  hasParallaxImages={true}
                  // resizeMode={ImageResizeMode.contain}
                />
                {/* <FlatList
                  data={this.state.dataPromo}
                  horizontal
                  alwaysBounceHorizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={Styles.flatList}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => this.renderItemPromo(item)}
                /> */}
              </View>

              <View style={Styles.sectionTransparent}>
                <View style={Styles.headerBg}>
                  <Text style={Styles.sTitleWhite}>
                    {"UJP News".toUpperCase()}
                  </Text>
                  <Right>
                    <Button
                      small
                      rounded
                      style={Styles.sBtn}
                      onPress={()=>Actions.Feed()}>
                      <Text style={Styles.sLink}>See All</Text>
                    </Button>
                  </Right>
                </View>
                <FlatList
                  data={this.state.dataNews}
                  contentContainerStyle={Styles.flatList}
                  keyExtractor={item => item.id.toString()}
                  numColumns={2}
                  renderItem={({ item }) => this.renderItemNews(item)}
                />
              </View>

              {/* <View style={{ marginTop: 40, paddingHorizontal: 20, paddingBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>
                    Introducing Ifca SPlus
                </Text>
                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                    A new selection of homes verified for quality & comfort
                </Text>
                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                  <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                    source={require('../Images/home.jpg')} />
                </View>
              </View> */}
            </View>
          </ScrollView>          
        </ScrollView>
      </View>
    );
  }
}
