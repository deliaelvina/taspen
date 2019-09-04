const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
  },
  drawerBg: {
    position: 'absolute',
    flexDirection: 'row',
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 14,
    top: Platform.OS === "android" ? deviceHeight / 17 : deviceHeight / 14,
    resizeMode: "cover"
  },
  drawerText: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 5,
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 12,
    marginLeft: 20,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined,
    justifyContent: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingBottom: 20,
    marginBottom: 20,
  },
  
};
