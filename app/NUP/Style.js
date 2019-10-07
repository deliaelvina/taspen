const React = require("react-native");
const { Platform } = React;
import { Fonts, Metrics, Colors } from "../Themes/";
import { Dimensions } from "react-native";
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
    layoutContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    row : {
        padding: 15,
        marginTop : 10,
        backgroundColor: "#fff",
        width: "100%",
        alignItems: "center",
        flexDirection : 'row',
        justifyContent : "space-between"
    },
    homeBg: {
        flex: 1,
        paddingBottom: 30
    },

    section: {
        flex: 1,
        paddingLeft: 0,
        alignItems: "center",
        width: "100%",
        backgroundColor:'#f3f3f3',
        // marginTop: 20,
    },
    trash: {
        marginTop: 10,
        // position : 'absolute',
        // right : 10,
        justifyContent:'flex-end',
        alignSelf: 'flex-end',
        bottom : 0
    },

    item: {
        width: "100%",
        flexDirection: "column"
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
    recordLast: {
        flexDirection: "row",
        borderBottomWidth: 0,
        marginLeft: 0,
        paddingVertical: 15
    },
    itemImg: {
        width: dw * 0.36,
        height: dw * 0.36,
        borderRadius: 5
    },
    itemImg2: {
        width: dw * 0.20,
        height: dw * 0.20,
        borderRadius: 5
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    itemTitle: {
        color: "#333",
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 0
    },
    itemLocation: {
        color: "#666",
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
        marginBottom: 5,
        lineHeight: 16
    },
    itemDiscount: {
        color: "#666",
        fontSize: 11,
        fontFamily: "Montserrat-Regular",
        marginBottom: 5,
        lineHeight: 16,
        textDecorationLine: "line-through",
        textDecorationStyle: "solid"
    },
    itemDate: {
        color: "#999",
        fontSize: 10,
        fontFamily: "Montserrat-Regular"
    },
    itemRow: {
        flexDirection: "row",
        justifyContent:'flex-start',
    },
    itemOverview: {
        flexGrow: 1,
        flexDirection: "row"
    },
    itemIcon: {
        color: "#fff",
        marginRight: 5,
        fontSize: 18
    },
    itemNo: {
        color: "#333",
        marginRight: 5,
        fontFamily: "Montserrat-SemiBold",
        marginTop: 5,
        fontSize: 12
    },

    crv: {
        borderRadius: 8
    },
    badges : {
        position : 'absolute',
        top : 0,
        right : 0,
        width : 60,
        height : 60
    },
    rupiah : {
        width : 18,
        height : 18
    },
    btnBuy : {
        backgroundColor : Colors.yellow,
    }
    ,
    marginround :{
        height: 40, marginBottom: 4,marginLeft: 4, marginRight: 4
    },
    iconSub : {
        fontSize: 6,color : 'red',position: 'absolute',  left: 4,top: -2
    },
    iconColor : {
        color: Colors.navyUrban, left: 15,
        fontSize: 20
    },
    positionTextInput: {
        fontSize: 15,left: 5
    }
};
