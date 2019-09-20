import { StyleSheet,Dimensions,Platform } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes/';
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    // background1: '#12173F',
    background1: Colors.navyUrban,
    background2: Colors.blueUrban,
    // background2: '#1E3A60'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 24
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        backgroundColor: 'transparent',
        // color: 'rgba(48, 53, 61, 0.75)',
        
        color: Colors.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 32,


    },
    titletxt: {
        backgroundColor: 'transparent',
        color: 'rgba(48, 53, 61, 0.75)',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop:-16

    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginLeft: 16,
        // color: 'rgba(48, 53, 61, 0.75)',
        color: Colors.white,
        fontSize: 14,
        fontStyle: 'normal',

    },
    slider: {
        marginTop: 8,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10,
      // for custom animation
    },
    paginationContainer: {
        paddingVertical: 0
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 0
    },
    InBtn:{
		backgroundColor: Colors.bloodOrange,
        height: 30,
        width: 90,
		borderRadius: 8,
        shadowOffset:{  width: 2,  height: 3,  },
      shadowColor: 'black',
      shadowOpacity: 0.5,
	},
	InBtnText:{
		color: "#fff",
		fontSize: Fonts.moderateScale(12),
        alignItems: 'center',
        textAlign: 'center',
        padding:8,
		fontFamily: Fonts.type.sfuiDisplaySemibold,
    },
    corContainerStyle : {
        height : dh * 0.54,
        alignItems:'center',
        justifyContent: 'center',
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    item: {
        width: dw - 60,
        height: dw /2,
    },
    newsTitleText :{
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 16,
        // marginVertical : 2
    },
    newsTitleText_small :{
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 16,
        // fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical : 4
    },
    newsTitle :{
        position : 'absolute',
        borderRadius :5,
        left : 0,
        bottom :0,
        width : dw - 60,
        backgroundColor : 'rgba(0,0,0,0.5)',
        justifyContent :'center',
        alignItems:'center'
    },

    newsTitle_small :{
        position : 'absolute',
        borderRadius :5,
        left : 0,
        bottom :0,
        width : dw - 60,
        backgroundColor : 'rgba(0,0,0,0.5)',
        justifyContent :'center',
        alignItems:'center'
    }
});
