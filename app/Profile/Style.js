const React = require("react-native");
const { Platform } = React;
import { Colors,Fonts } from "../Themes/";
import {StatusBar} from 'react-native';
export default {
  layoutContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadow: {
    flex: 1,
    height: 20,
  },


  coverImg: {
    flex: 1,
    height: 200,
  },

  section: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profile: {
    flex: 1,
    height: 200,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
  },
  bgBlue: {
    width: '100%',
    flex: 1,
    height: 200,
    backgroundColor: "transparent",
    position: 'absolute',
  },
  back: {
    flex: 1,
    // width: '100%',
    height: 200,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },


  owner: {
    flex: 1,
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  ownerTitle: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
    color: '#333',
  },
  ownerAvatar: {
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#DDD',
    padding: 5,
    alignItems: 'center',
  },
  ownerAvatarImg: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  ownerInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ownerName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#FFF',
    marginTop: 20,
    marginBottom: 5,
  },
  ownerLocation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#FFF',
    opacity: 0.7,
    marginBottom: 20,
  },
  ownerBg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profleEdit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    bottom: 0,
  },

  tabBorder: {
    backgroundColor: '#FCC300',
  },
  tabGrey: {
    backgroundColor: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
  tabText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
  },
  tabTextActive: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#333',
  },
  infoTab: {
    paddingVertical: 20,
  },
  infoItem: {
    alignItems: 'flex-start',
    paddingVertical: 30,
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoHeader: {
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    marginBottom: 5,
    fontSize: 12,
  },
  infoDesc: {
    fontFamily: 'Montserrat-Regular',
    color: '#999',
    fontSize: 12,
  },

  formBg: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    fontSize: 12,
    width: '100%',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#666',
  },
  textInputMulti: {
    fontFamily: 'Montserrat-Regular',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: 20,
      },
      android: {
        textAlignVertical: 'top',
      },
    }),
  },
  textInputHalf: {
    fontFamily: 'Montserrat-Regular',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: '48.5%',
    marginBottom: 10,
    borderRadius: 5,
    color: '#666',
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FCC300',
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 12,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 14,
    alignSelf: 'center',
  },

  formBtnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 12,
  },
  formBtnIcon: {
    color: '#333',
    fontSize: 24,
  },

  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overviewTitle: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 10,
  },
  overviewDesc: {
    flex: 1,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },

  formPicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingLeft: 15,
  },
  pickerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#333',
  },

  accordion: {
    width: '100%',
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
  sLink: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  sBtn: {
      width : 150,
      padding: 9,
      backgroundColor: '#FF6900',
      color: '#FFF',
      borderRadius: 18,
      flexDirection: 'row',
      justifyContent : 'space-between',
      alignItems: 'center',
  },
  editBtn :{
    
  },
  iconEdit : {
    color : "#333",
    fontSize : 20,
    position : 'absolute',
    right : -5,
    bottom : 0,
    backgroundColor : '#f3f3f3',
    padding : 7,
    borderRadius : 18,
    overflow: 'hidden'
  }


}