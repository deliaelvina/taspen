import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
  Linking,
  Alert
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
import { Actions } from "react-native-router-flux";
import {urlApi} from '@Config/services';
import GALLERY from "./Gallery";
import AMENITIES from "./Amenities";
import SIMILAR from "./Similar";
import {_storeData,_getData,_navigate} from '@Component/StoreAsync';

import { Style, Colors } from "../Themes/index";
import Styles from "./Style";
import { WebView } from 'react-native-webview';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTML from 'react-native-render-html';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

let isMount = false



export default class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        title : '',
        picture_url : '',

        active: false,
        isVisible: false,
        isView : false,
        isLogin : false,

        hd : new Headers,
        email : '',
        userId : '',
        descs : '',
        refEmail : '',

        amenities  : null,
        feature : null,
        overview : null,
        project : null,
        gallery : null,
        imagesPreview :[],
        dataPromo:[],
        index : 0
      };

      console.log('props',props);

    }
      
async componentDidMount() {
    Actions.refresh({ backTitle: () => this.props.title });

    const data = {
      hd : new Headers({
        'Token' : await _getData('@Token')
      }),
      email : await _getData('@User'),
      userId : await _getData('@UserId'),
      name : await _getData('@Name'),
      handphone : await _getData('@Handphone'),
      isLogin : await _getData('@isLogin'),
      descs : 'Saya tertarik reservasi ' +this.props.items.project_descs+ '\n\nHubungi saya untuk info detail.',
      title : this.props.items.project_descs,
      picture_url : this.props.items.picture_url
    }

    isMount=true

    this.setState(data,()=>{
      this.getDataDetails(this.props.items)
      this.getDataGallery(this.props.items)
      this.getPromo()
    })

}

componentWillUnmount(){
  // this.setState({isMount:false})
  isMount =false
}

getPromo = () => {
  const {entity_cd,project_no} = this.props.items
  fetch(urlApi+'c_newsandpromo/getDatapromo2/IFCAMOBILE/'+entity_cd+'/'+project_no ,{
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

getDataDetails = (item) => {
    {isMount ?
    fetch(urlApi+'c_reservation/getDataDetails/'+item.db_profile+'/'+item.entity_cd+'/'+item.project_no,{
        method:'GET',
        headers : this.state.hd,
    }).then((response) => response.json())
    .then((res)=>{
        if(!res.Error){
            const resData = res.Data
            const data = {
              amenities : resData.amenities,
              feature : resData.feature,
              overview : resData.overview,
              project : resData.project
            }
            console.log('data',data);
            this.setState(data)
        } else {
            this.setState({isLoaded: !this.state.isLoaded},()=>{
                alert(res.Pesan)
            });
        }
        console.log('getDAtaDetails',res);
    }).catch((error) => {
        console.log(error);
    })
    :null}
}

getDataGallery = (item) => {
  {isMount ?
  fetch(urlApi+'c_reservation/getGallery/'+item.db_profile+'/'+item.entity_cd+'/'+item.project_no,{
      method:'GET',
      headers : this.state.hd,
  }).then((response) => response.json())
  .then((res)=>{
      if(!res.Error){
          const resData = res.Data
          this.setState({gallery : resData.gallery})
          resData.gallery.map((item)=>{
            this.setState(prevState=>({
              imagesPreview : [...prevState.imagesPreview, {url:item.gallery_url}]
            }))
          })
      } else {
          this.setState({isLoaded: !this.state.isLoaded},()=>{
              alert(res.Pesan)
          });
      }
      console.log('getData Galerry',res);
  }).catch((error) => {
      console.log(error);
  })
  :null}
}

sendWa(){
  const noHp = this.props.items.handphone
  const descs = this.state.descs
  Linking.openURL('https://wa.me/'+noHp+'?text='+descs)
}

showModal(){
  this.setState({isVisible:true})
}

clickToNavigate = (to,param) =>{
  Actions[to](param);
  this.setState({click:true})
}

showAlert = () => {
  Alert.alert(
      '',
      'Please Login First',
      [
          {text: 'Cancel',onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: 'OK', onPress: () => Actions.Login()},
      ],
      {cancelable: false},
  );
}
 
  render() {
    // let feature = ''
    // if(this.state.feature){
    //   feature = this.state.feature[0].feature_info.replace(/<div class="col-md-6">|<\/div>|<\/b>|<b>|<ul class="list-unstyled">|<\/ul>/gi, '')
    //   feature = feature.replace(/<\/li>/gi,'\n')
    //   feature = feature.replace(/<li>/gi,'• ')
    //   feature = feature.replace(/<br>/gi,' ')
    // }

    return (
      <Container style={Style.bgMain}>
        <Header style={Style.navigation}>
          <StatusBar backgroundColor={Colors.statusBarOrange} animated barStyle="light-content" />          

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
              {this.state.title.toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}>
            {/* <Button
              transparent
              style={Style.actionBtnRight}
            >
              <Icon
                active
                name="search"
                style={Style.actionIcon}
                type="FontAwesome"
              />
            </Button> */}
          </View>
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          {this.state.picture_url !='' ?
            <ImageBackground
            source={{
              uri: this.state.picture_url
            }}
            imageStyle={"cover"}
            style={Styles.coverImg}
            >
          {/* <Fab
            active={this.state.active}
            direction="down"
            containerStyle={{ marginLeft:8}}
            style={{ backgroundColor: '#DAD299', width:32, height: 32 }}
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#DAD299',  width:32, height: 32,  marginLeft:4  }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#DAD299',  width:32, height: 32,  marginLeft:4  }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button style={{ backgroundColor: '#DAD299' ,  width:32, height: 32,  marginLeft:4 }}>
              <Icon name="mail" />
            </Button>
          </Fab> */}
          </ImageBackground>
          :<ActivityIndicator/>}


          {/* <View style={Styles.section}>
                    <Text style={Styles.price}>$2,850,000</Text>
                    <View style={Styles.locationTop}>
                        <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                        <Text style={Styles.locationTopInfo}>Bristol, England</Text>
                    </View>
                </View> */}

          <View style={Styles.count}>
           <ScrollView horizontal={true}>
            <View style={[Styles.countItem, Styles.countFirst]}>
              <TouchableOpacity onPress={() => {
                _navigate('ProductProjectPage',{items:this.props.items})
              }}>
                <View style={Styles.countCol}>
                  <Image
                    source={require("@Asset/images/type.png")}
                    style={{ width: 34, height: 34 }}
                    resizeMode='stretch'
                  />
                  <View style={Styles.textMenu}>
                    <Text style={Styles.countText}>Find Unit & Price</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[Styles.countItem, Styles.countFirst]}>
              <TouchableOpacity
              onPress={()=>{
                this.state.isLogin ? Actions.BookingPage({items : this.props.items}) 
                : this.showAlert()
              }}>
                <View style={Styles.countCol}>
                  <Image
                    source={require("@Asset/images/booking.png")}
                    style={{ width: 34, height: 34 }}
                    resizeMode='stretch'
                  />
                  <View style={Styles.textMenu}>
                    <Text style={Styles.countText}>Booking Now</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[Styles.countItem, Styles.countFirst]}>
              <TouchableOpacity
              onPress={()=>Actions.ProjectDownloadPage({items:this.props.items})}>
                <View style={Styles.countCol}>
                  <Image
                    source={require("@Asset/images/brosur.png")}
                    style={{ width: 34, height: 34 }}
                    resizeMode='stretch'
                  />
                  <View style={Styles.textMenu}>
                    <Text style={Styles.countText}>Brosur</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>

          <ImageBackground
            source={require("@Asset/images/shadow.png")}
            imageStyle={"cover"}
            style={Styles.shadow}
          />

          <View style={Styles.overview}>
            <Text style={Styles.overviewTitle}>Overview</Text>
    
              {this.state.overview ? 
                <HTML html={this.state.overview[0].overview_info} imagesMaxWidth={Dimensions.get('window').width} />
              :<ActivityIndicator /> }

          </View>
          <Tabs locked={Platform.OS == 'android' ? true : false} tabBarUnderlineStyle={Styles.tabBorder}>
            <Tab
              tabStyle={Styles.tabGrey}
              textStyle={Styles.tabText}
              activeTabStyle={Styles.tabGrey}
              activeTextStyle={Styles.tabTextActive}
              heading="Informations"
            >
              <List style={Styles.infoTab}>
                <View style={Styles.overview}>
                  <Text style={Styles.overviewTitle}>Feature</Text>
                    {this.state.feature ? 
                    // <Text style={Styles.overviewDesc}> 
                    //   {feature}
                    // </Text>
                    <HTML html={this.state.feature[0].feature_info} imagesMaxWidth={Dimensions.get('window').width} />
                    :<ActivityIndicator /> }
                </View>
              </List>
            </Tab>
            <Tab
              tabStyle={Styles.tabGrey}
              textStyle={Styles.tabText}
              activeTabStyle={Styles.tabGrey}
              activeTextStyle={Styles.tabTextActive}
              heading="Gallery"
            >
              <List style={Styles.infoTab}>
                <View style={Styles.overview}>
                  <Text style={Styles.overviewTitle}>Photo Gallery</Text>
                  {this.state.gallery ?
                  <FlatList
                  data={this.state.gallery}
                  horizontal
                  style={Styles.slider}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item =>item.line_no}
                  renderItem={({ item,index }) => (
                    <TouchableOpacity
                      underlayColor="transparent"
                      onPress={() => {
                        this.setState({isView:true,index:index})
                      }}
                    >
                      <View>
                        <Image
                          source={{ uri: item.gallery_url }}
                          style={Styles.sliderImg}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                />  
                 :<ActivityIndicator/>}
                </View>
                <View style={Styles.amenities}>
                  <Text style={Styles.amenityTitle}>Facilities</Text>
                  <View>
                    <FlatList
                      data={AMENITIES}
                      horizontal
                      keyExtractor={item => item.amenity}
                      renderItem={({ item }) => (
                        <View style={Styles.amenity}>
                          <Image
                            source={item.icon}
                            style={Styles.amenityIcon}
                          />
                          <Text style={Styles.amenityItem}>{item.amenity}</Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </List>
            </Tab>
            <Tab
              tabStyle={Styles.tabGrey}
              textStyle={Styles.tabText}
              activeTabStyle={Styles.tabGrey}
              activeTextStyle={Styles.tabTextActive}
              heading="Simulasi KPA/R"
            >
              <List style={Styles.infoTab}>
                <View style={Styles.overview}>
                  <Text style={Styles.overviewTitle}>Simulasi Perhitungan KPA/R</Text>
               
                  <TextInput
                    style={Styles.textInput}
                    placeholder={"Total Credit ( IDR )"}
                    keyboardType="numeric"
                  />
                  <View style={Styles.col}>
                    <TextInput
                      style={Styles.textInputHalf}
                      placeholder={"Bunga (%)"}
                      keyboardType="numeric"


                    />
                    <TextInput
                      style={Styles.textInputHalf}
                      placeholder={"Time (years)"}
                      keyboardType="numeric"

                    />
                  </View>
                  <Button
                    style={Styles.btn}
                  >
                    <Text style={Styles.formBtnText}>
                      {"Hitung".toUpperCase()}
                    </Text>
                    <Icon
                      active
                      name="calculator"
                      type="FontAwesome"
                      style={Styles.formBtnIcon}
                    />
                  </Button>
                  </View>
                  <View style={Styles.overview}>

                  <Text style={Styles.countText}>
                  * Angka di atas merupakan angka estimasi, untuk lebih akuratnya mohon hubungi bank terkait.
                  </Text>
                  </View>

                  </List>
            </Tab>
          </Tabs>

          <View style={Styles.sectionGrey}>
            <View style={Styles.headerBg}>
              <Text style={Styles.sHeader}>
                {"Promo".toUpperCase()}
              </Text>
              <Right>
                <Button
                  small
                  rounded
                  style={Styles.sBtn}
                  onPress={() => {
                    Actions.Feed()
                  }}
                >
                  <Text style={Styles.sLink}>See All</Text>
                </Button>
              </Right>
            </View>
            {this.state.dataPromo.length > 0 ?
              <FlatList
                data={this.state.dataPromo}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={Styles.flatList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={Styles.item}
                    underlayColor="transparent"
                    
                  >
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
                )}
              />  
            :<Text style={[Styles.itemPrice,{alignSelf:'center'}]}>No Promo</Text>}
          </View>

          
          <Modal visible={this.state.isView} transparent={true}
          onRequestClose={() => {
            this.setState({ isView: !this.state.isView })
          }}>
            <Header style={Style.navigationModal}>
              <StatusBar
                backgroundColor={Colors.statusBarOrange}
                animated
                barStyle="light-content"
              />
              <View style={Style.actionBarRight}>
                <Button
                  transparent
                  style={Style.actionBtnRight}
                  onPress={() => {
                    this.setState({ isView: !this.state.isView })
                  }}            >
                  <Icon
                    active
                    name="close"
                    style={Style.actionIcon}
                    type="FontAwesome"
                  />
                </Button>
              </View>
            </Header>
            {this.state.imagesPreview ? <ImageViewer enableImageZoom={true} enableSwipeDown={true} onSwipeDown={()=>this.setState({ isView: !this.state.isView })} index={this.state.index} imageUrls={this.state.imagesPreview}/> : null}
          </Modal>

          <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: !this.state.isVisible })
          }}>
          <Header style={Style.navigationModal}>
          <StatusBar
            backgroundColor={Colors.statusBarOrange}
            animated
            barStyle="light-content"
          />
           <View style={Style.actionBarLeft}>
               </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>
              {"I'm Interested".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}>
            <Button
              transparent
              style={Style.actionBtnRight}
              onPress={() => {
                this.setState({ isVisible: !this.state.isVisible })
              }}            >
              <Icon
                active
                name="close"
                style={Style.actionIcon}
                type="FontAwesome"
              />
            </Button>
          </View>
        </Header>
        <ScrollView>
        <Form style={{marginTop:10}}>
            <Item>
              <Text>{this.state.title}</Text>
            </Item>
            <Item floatingLabel>
              <Label>Nama Anda</Label>
              <Input value={this.state.name} onChangeText={(val)=>this.setState({name : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Handphone</Label>
              <Input value={this.state.handphone} onChangeText={(val)=>this.setState({handphone : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Deskripsi</Label>
              <Input multiline value={this.state.descs} onChangeText={(val)=>this.setState({descs : val})} />
            </Item>
            <Item floatingLabel>
              <Label>Reference Email</Label>
              <Input value={this.state.refEmail} onChangeText={(val)=>this.setState({refEmail : val})} />
            </Item>
            <Body style={{ paddingVertical:32 }} >
            <Button rounded success full
            style={{ marginTop:16 }} >
            <Text>Send Email</Text>
          </Button>
            <Button rounded warning iconRight full
            style={{ marginTop:16 }} onPress={()=>this.sendWa()}>
            <Text>Send via WhatsApp</Text>
            <Icon name='whatsapp' 
            type="FontAwesome5"/>
          </Button>
          </Body>
          </Form>
          </ScrollView>
        </Modal>
        </Content>
        <Button full style={{ backgroundColor: "#fb5f26" }}  onPress={() =>{
          this.state.isLogin ? this.showModal()
          : this.showAlert()
          
        }}>
          <Text>I'm Interested</Text>
        </Button>
      </Container>
    );
  }
}
