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
        width: dw * 0.65
      },
      infoDesc: {
        fontFamily: "Montserrat-Regular",
        color: "#999",
        fontSize: 12,
        flexWrap: "wrap",
        width: dw * 0.65
      },
      overviewTitles: {
        flex: 1,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        left: 15,
      },
      overviewTitle: {
        flex: 1,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
      },
      overview: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
      },
      textInput: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
      },
      iconSub : {
        fontSize: 6,color : 'red',position: 'absolute',  left: 4,top: 3
      },
      iconColor : {
        color: Colors.navyUrban, left: 15,
        fontSize: 20
      },
      textInputArea: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
      },
      dateInput: {
        fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
      },


}