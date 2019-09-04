import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
} from "native-base";
import styles from "./Style";
import NavigationService from '../../../Service/Navigation'

const drawerCover = require("@Asset/images/bg.png");
const drawerImage = require("@Asset/images/avatar.png");
const datas1 = [
  {
    name: "Home",
    route: "PublicHome",
    icon: "home",
  },
  {
    name: "Properties",
    route: "PublicProperties",
    icon: "building",
  },
  {
    name: "Property Detail",
    route: "PublicPropertyDetail",
    icon: "building-o",
  },
  {
    name: "Property Search",
    route: "PublicPropertySearch",
    icon: "search",
  },
  {
    name: "Agents",
    route: "PublicAgents",
    icon: "group",
  },
  {
    name: "Agent Detail",
    route: "PublicAgentDetail",
    icon: "user-circle-o",
  },
  {
    name: "About Myyaow Realtor",
    route: "PublicAboutUs",
    icon: "info-circle"
  },
  {
    name: "Contact",
    route: "PublicContact",
    icon: "envelope",
  }
];
const datas2 = [
  {
    name: "Register",
    route: "MemberSignUp",
    icon: "lock",
  },
  {
    name: "Sign In",
    route: "MemberSignIn",
    icon: "login-variant",
    type: "MaterialCommunityIcons",
  },
  {
    name: "Dashboard",
    route: "MemberHome",
    icon: "home",
  },
  {
    name: "Properties",
    route: "MemberProperties",
    icon: "building",
  },
  {
    name: "Add Property",
    route: "MemberPropertyAdd",
    icon: "plus",
  },
  {
    name: "Messages",
    route: "MemberMessages",
    icon: "message",
    type: "MaterialIcons",
  },
  {
    name: "Profile",
    route: "MemberProfile",
    icon: "user-circle-o",
  },
  {
    name: "Favorites",
    route: "MemberFavorites",
    icon: "star",
  },
  {
    name: "Settings",
    route: "MemberSettings",
    icon: "gears",
  },
  {
    name: "Logout",
    route: "PublicHome",
    icon: "logout",
    type: "MaterialCommunityIcons",
  }
];

class MenuLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  renderList(datas) {
    return (
      <List
        dataArray={datas}
        renderRow={data =>
          <ListItem
            button
            noBorder
            onPress={() => NavigationService.navigate(data.route)}
          >
            <Left>
              <Icon
                active
                name={data.icon}
                style={{ color: "#333", fontSize: 24, width: 30 }}
                type={data.type || 'FontAwesome'}
              />
              <Text style={styles.text}>
                {data.name}
              </Text>
            </Left>
            {
              data.types &&
              <Right style={{ flex: 1 }}>
                <Badge>
                  <Text
                    style={styles.badgeText}
                  >{`${data.types}`}</Text>
                </Badge>
              </Right>
            }
          </ListItem>}
      />
    )
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, top: -1 }}
          render
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <View style={styles.drawerBg}>
            <Image square style={styles.drawerImage} source={drawerImage} />
            <Text style={styles.drawerText}>Kent Parker</Text>
          </View>

          <View style={styles.divider}>
            {this.renderList(datas1)}
          </View>
          <View>
            {this.renderList(datas2)}
          </View>

        </Content>
      </Container>
    );
  }
}

export default MenuLeft;
