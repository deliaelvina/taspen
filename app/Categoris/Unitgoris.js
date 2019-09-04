//import liraries
import React from "react";
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
  Badge
} from "native-base";


import PROPERGORIS from "./Propergoris";
import Unittype from "./Unittype";

import PROPTYPES from "./Proptypes";


import { Actions } from "react-native-router-flux";
import RBSheet from "react-native-raw-bottom-sheet";
import Overlay from 'react-native-modal-overlay';




import { Style, Colors } from "../Themes/";
import Styles from "./Style";

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

// create a component
class Unitgoris extends React.Component {
  state = {
    modalVisible: true, 
  }

  componentDidMount(){
    console.log('props',this.props);
  }
  
  onClose = () => this.setState({ modalVisible: false});

  clickUnittype() {
    Actions.unittype();
    this.setState({ click : true})
}

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
              {"Unit Group".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <ImageBackground style={Styles.homeBg}>
            <View style={Styles.section}>
              <FlatList
                data={PROPERGORIS}
                style={Styles.item}
                renderItem={({ item, separators }) => (
                  <TouchableHighlight 
                  underlayColor="transparent"
                  onPress={() => {
                    this.clickUnittype();
                  }}>
                    <View style={Styles.record}>
                      <Image
                        source={{ uri: item.image }}
                        style={Styles.itemImg}
                      />
                      <View style={Styles.itemInfo}>
                        <Text style={Styles.itemTitle}>{item.title}</Text>
                      </View>
                      {/* <View style={Styles.trash}>
                                            <Button transparent onPress={() => {
                                                NavigationService.navigate('MemberFavorites')
                                            }}>
                                                <Icon name="arrow-right" type="FontAwesome" style={Styles.itemIcon} />
                                            </Button>
                                        </View> */}
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          </ImageBackground>
          {/* <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
        <RBSheet
          ref={ref => {
            this.RBSheet =  ref;
          }}
          height={450}
          paddingTop={64}
          duration={250}
          closeOnSwipeDown="false"
          
        >
        <ScrollView>
          <Unittype />
          </ScrollView>
        </RBSheet>
        </View> */}

        </Content>
      </Container>
    );
  }
}


//make this component available to the app
export default Unitgoris;
