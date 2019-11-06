import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Fonts, Metrics, Colors } from '../Themes/';
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
    //prospect

    sBtnHeadAdd: {
        padding: 2,
        backgroundColor: Colors.blueUrban,
        // color: Colors.fire,
        // color: '#e73536'
        color: Colors.blueUrban
      },
      sBtnHead: {
        padding: 2,
        backgroundColor: Colors.yellowsoft,
        // color: Colors.fire,
        color: '#e73536'
        // color: Colors.blueUrban
      },
    
      record: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#DDD",
        marginLeft: 0,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        justifyContent: "center",
    },

    sLinkHead: {
        // color: '#f3f3f3',
        color: Colors.redUrban,
        fontSize: 10,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
      },

      infoItem: {
        alignItems: "flex-start",
        paddingVertical: 30
      },
      infoIcon: {
        marginRight: 10,
        width: 60,
        height: 60
      },
      infoHeader: {
        fontFamily: "Montserrat-Regular",
        color: "#333",
        marginBottom: 5,
        fontSize: 15,
        flexWrap: "wrap",
        width: dw * 0.70
      },
      infoDesc: {
        
        fontFamily: "Montserrat-Regular",
        color: "#999",
        fontSize: 12,
        flexWrap: "wrap",
        width: dw * 0.65
      },
      descFollow: {
        
        fontFamily: "Montserrat-Regular",
        color: "#222",
        fontSize: 14,
        flexWrap: "wrap",
        width: dw * 0.65
      },
      descFollow_first: {
        
        fontFamily: "Montserrat-Regular",
        color: "#222",
        fontSize: 14,
        // flexWrap: "wrap",
        // width: dw * 0.65,
        // marginRight: 10
        width: 80
      },
      overviewTitles: {
        flex: 1,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        left: 15,
      },
      overviewTitles_regular: {
        flex: 1,
       
        left: 15,
      },
      overviewTitles_Small : {
        flex: 1,
        // fontFamily: Fonts.type.sfuiDisplaySemibold,
        left: 13,
        fontSize: 14,
        bottom: 5,
        color:"#b5b5ba"
      },
      overviewTitle: {
        flex: 1,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
      },

      overview: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      overview_padhorizontal: {
        flex: 1,paddingHorizontal: 0, width: '100%',paddingVertical: 5
      },
      // textInput: {
      //   fontFamily: Fonts.type.sfuiDisplaySemibold,
      //   borderBottomWidth: 0,
      //   borderColor: '#DDD',
      //   backgroundColor: '#f0f0f0',
      //   paddingHorizontal: 20,
      //   paddingVertical: 15,
      //   fontSize: 12,
      //   width: '100%',
      //   marginBottom: 10,
      //   borderRadius: 5,
      //   textAlignVertical: 'top',
      // },
      textInput_disable: {
        fontFamily: 'Montserrat-Regular',
        borderBottomWidth: 1,
        borderColor: '#CCC',
        fontSize: 14,
        width: '100%',
        borderRadius: 5,
        textAlignVertical: 'bottom',
        paddingVertical: .5,
        paddingHorizontal: 20,
        color: '#666',
        backgroundColor: '#f3f3f3'
      },
      iconSub : {
        fontSize: 6,color : 'red',position: 'absolute',  left: 4,top: 3
      },
      iconSub2 : {
        fontSize: 6,color : 'red',position: 'absolute',  left: 4,top: -5
      },
      iconColor : {
        color: Colors.navyUrban, left: 15,
        fontSize: 20
      },
      // textInputArea: {
      //   fontFamily: Fonts.type.sfuiDisplaySemibold,
      //   borderBottomWidth: 0,
      //   borderColor: '#DDD',
      //   backgroundColor: '#f0f0f0',
      //   paddingHorizontal: 20,
      //   paddingVertical: 15,
      //   fontSize: 12,
      //   width: '100%',
      //   marginBottom: 10,
      //   borderRadius: 5,
      //   textAlignVertical: 'top',
      // },
      dateInput: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        // borderBottomWidth: 0,
        // borderColor: '#DDD',
        // backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: "#CCC",
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
      },
      overview_detail: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    
      },
      overview_detail_follow: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 15,
      },
      city: {
        flex : 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
      cardshimmer: {
        width: 100,
        height: 100,
      
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor:'#f3f3f3',

    },
    badge: {
      position: 'absolute', 
      // left: 200,
      right: 5,
      // left: 0, 
      justifyContent: 'center', 
      alignItems: 'center', 
      top: 0, 
      bottom: 0, 
      backgroundColor: Colors.navyUrban,
      
      borderRadius: 15,
      // height: null,
      width: 50
    },
    accordionTab: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      marginBottom: 1,
    },
    accordionTabText: {
      color: '#333',
      fontSize: 12,
      fontFamily: 'Montserrat-SemiBold',
    },
    accordionTabIcon: {
      fontSize: 14,
      color: '#666',
    },
    accordionContent: {
      paddingVertical: 10,
    },
    formBg: {
      width: '100%',
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 10,
    },
    accordion: {
      width: '100%',
    },
    textInputArea: {
      fontFamily: Fonts.type.sfuiDisplaySemibold,
      borderBottomWidth: 0,
      borderColor: '#DDD',
      // backgroundColor: '#f0f0f0',
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontSize: 12,
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      textAlignVertical: 'top',
      borderBottomWidth: 1,
      borderColor: "#CCC",
    },
    textInput: {
      fontFamily: 'Montserrat-Regular',
      borderBottomWidth: 1,
      borderColor: "#CCC",
      fontSize: 12,
      width: '100%',
      borderRadius: 5,
      textAlignVertical: 'bottom',
      paddingVertical: .5,
      paddingHorizontal: 20,
      color: "#666666",
      // color: "black"
    },
    textInput_nobottom: {
      // fontFamily: 'Montserrat-Regular',
      // borderBottomWidth: 1,
      // borderColor: "#CCC",
      fontSize: 16,
      width: '100%',
      borderRadius: 5,
      // textAlignVertical: 'bottom',
      paddingVertical: .5,
      paddingHorizontal: 20,
      // color: "#666666",
      color: "#333"
    },
    textInput_medium: {
      fontFamily: 'Montserrat-Regular',
      borderBottomWidth: 1,
      borderColor: "#CCC",
      fontSize: 14,
      width: '100%',
      borderRadius: 5,
      textAlignVertical: 'bottom',
      paddingVertical: .5,
      paddingHorizontal: 20,
      color: "#666666",
      // color: "black"
    },
    txtInput: {
      fontFamily: 'Montserrat-Regular',
      borderBottomWidth: 1,
      borderColor: "#CCC",
      fontSize: 12,
      width: '100%',
      // borderRadius: 5,
      textAlignVertical: 'bottom',
      marginHorizontal: 5,
      // height: 50,
      paddingVertical: .5,
      paddingHorizontal: 20,
      // paddingLeft: 5,
      color: '#666'
    },
    actionBarMiddle: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 6,
  },
  actionBarText: {
    color: '#FFFFFF',
fontFamily: "Montserrat-Regular",
    fontSize: 14,
    textAlign: 'center',
},
buttonContact: {
  flexDirection: 'row', 
  width: '100%', 
  flex: 1, 
  // backgroundColor: '#fff',
  //  borderColor: Colors.navyUrban, 
  //  borderWidth: 1,
   marginHorizontal: 3,
   marginVertical: 3,
   borderRadius: 5,
   height: 0, 
   justifyContent: 'center',
   fontSize: 30,
   color: 'green'
},
gradient: {
  ...StyleSheet.absoluteFillObject
},
signInBtn: {
  // backgroundColor: Colors.loginBlue,
  backgroundColor: Colors.navyUrban,
  height: Metrics.HEIGHT * 0.06,
  width: Metrics.WIDTH * 0.92,
  borderRadius: 5,
  alignSelf: "center",
  elevation: 3,
  shadowColor: "#000",
  alignItems: "center",
  justifyContent: "center",
  // top: 30,
  // position: 'absolute'
},
subWrap: {
  // marginVertical: 5,
  marginHorizontal: 5,
  width: '45%'
},
subWrapLarge: {
  // marginVertical: 5,
  marginHorizontal: 5,
  // width: '45%'
},




//coba
searchBarContainerStyle: {
  marginBottom: 10,
  flexDirection: "row",
  height: 40,
  shadowOpacity: 1.0,
  shadowRadius: 5,
  shadowOffset: {
    width: 1,
    height: 1
  },
  backgroundColor: "rgba(255,255,255,1)",
  shadowColor: "#d3d3d3",
  borderRadius: 10,
  elevation: 3,
  marginLeft: 10,
  marginRight: 10
},

selectLabelTextStyle: {
  color: "#000",
  textAlign: "left",
  width: "99%",
  padding: 10,
  flexDirection: "row"
},
placeHolderTextStyle: {
  color: "#D3D3D3",
  padding: 10,
  textAlign: "left",
  width: "99%",
  flexDirection: "row"
},
dropDownImageStyle: {
  marginLeft: 10,
  width: 10,
  height: 10,
  alignSelf: "center"
},

pickerStyle: {
  marginLeft: 18,
  elevation:3,
  paddingRight: 25,
  marginRight: 10,
  marginBottom: 2,
  shadowOpacity: 1.0,
  shadowOffset: {
    width: 1,
    height: 1
  },
  borderWidth:1,
  shadowRadius: 10,
  backgroundColor: "rgba(255,255,255,1)",
  shadowColor: "#d3d3d3",
  borderRadius: 5,
  flexDirection: "row"
}


}