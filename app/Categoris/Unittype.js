//import liraries
import React, { Component, Fragment } from "react";
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

import PROPTYPES from "./Proptypes";

import RBSheet from "react-native-raw-bottom-sheet";
import Overlay from "react-native-modal-overlay";
import { Actions } from "react-native-router-flux";


import { Style, Colors } from "../Themes/";
import Styles from "./Style";

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

// create a component
class Unittype extends React.Component {

  clickUnitDetail() {
    Actions.unitdetail();
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
              {"Unit Type".toUpperCase()}
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
                data={PROPTYPES}
                style={Styles.item}
                renderItem={({ item, separators }) => (
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => {
                        this.clickUnitDetail();
                      }}
                  >
                    <View style={Styles.record}>
                      <Image
                        source={{ uri: item.image }}
                        style={Styles.itemImg}
                      />
                      <View style={Styles.itemInfo}>
                        <Text style={Styles.itemTitle}>{item.title}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          </ImageBackground>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

//make this component available to the app
export default Unittype;
