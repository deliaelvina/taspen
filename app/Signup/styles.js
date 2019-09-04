
import { Platform, StyleSheet, Dimensions } from 'react-native';
// Screen Styles
import { Fonts, Metrics, Colors } from '../Themes';


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT,
		backgroundColor: '#febe29',
	},
	header: {
		backgroundColor: Colors.transparent,
		height: Metrics.WIDTH * 0.15,
		borderBottomWidth: 0,
		...Platform.select({
		ios: {},
		android: {
			marginTop: Fonts.moderateScale(25)
		}
    }),
		elevation: 0
	},
	images: {
		top: 5,
		shadowColor:'#000',
		shadowOffset: {width: 3, height: 2 },
		shadowRadius: 2,
		shadowOpacity: 0.10,


	},
	left: {
    flex: 0.5,
		 backgroundColor: 'transparent',
  },
	backArrow: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30
	},
	textRight :{ 
	justifyContent: 'center',
	alignItems: 'center',
	width: 90
},
  body: {
		flex: 3,
		alignItems: 'center',
		backgroundColor: 'transparent'
  },
	textTitle: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(16),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  right: {
    flex: 0.5
	},
	
	inputFieldStyles:{
		height: (Metrics.HEIGHT * 0.45),
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	
	containEmail:{
		backgroundColor: '#fff',
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		elevation: 3,
	},
	containMid:{
		backgroundColor: '#fff',
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		elevation: 3,
	},
	inputEmail:{
		height: (Metrics.HEIGHT * 0.08),
    width: (Metrics.WIDTH * 0.84),
		color: "#000",
		paddingLeft: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
	containPassword:{
		backgroundColor: '#fff',
    height: (Metrics.HEIGHT * 0.08),
    width: (Metrics.WIDTH * 0.92),
    borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
	},
	divider: {
    width: (Metrics.WIDTH * 0.92),
		height: 0.6,
		backgroundColor: 'rgba(0,0,0,0.1)',
		left:15,
		right:15,
	},
	signbtnSec:{
		marginTop: Fonts.moderateScale(15),
		height: (Metrics.HEIGHT * 0.12),
	},
	signInBtn:{
		backgroundColor: Colors.loginBlue,
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		borderRadius: 15,
    alignSelf: 'center',
		elevation: 3,
		shadowColor:"#000",
		alignItems : 'center',
		justifyContent : 'center'
	},
	signInBtnText:{
		color: "#fff",
		fontSize: Fonts.moderateScale(17),
		width: (Metrics.WIDTH * 0.92),
		textAlign: 'center',
		fontFamily: Fonts.type.sfuiDisplaySemibold,
	},
	forgotPassword:{
		color: Colors.snow,
		fontSize: Fonts.moderateScale(15),
		height: (Metrics.HEIGHT * 0.05),
		width: (Metrics.WIDTH),
		alignSelf: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: Colors.transparent,
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
	socialSec:{
		height: (Metrics.HEIGHT * 0.25),
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: Fonts.moderateScale(20),
	},
	fbButton: {
		backgroundColor: "#3b5998",
		height: (Metrics.HEIGHT * 0.08),
		width: (Metrics.WIDTH * 0.92),
		borderRadius: 5,
		justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
	},
	fbButtonText:{
		color: Colors.snow,
		paddingLeft: Fonts.moderateScale(5),
		fontSize: Fonts.moderateScale(17),
		fontFamily: Fonts.type.sfuiDisplayRegular,
	},
	eye :{
		position: 'absolute',
		right : 10,
		top : 9,
	}
});
export default styles;
