import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Platform,
    Linking,

} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text,
    ListItem,
    List,
    Right,
    Card,
    Content,
    Accordion,
    Label,
    Picker,
    CardItem,
    Left,
    Tab,
    Tabs,
    Item,

} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import { _storeData, _getData } from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
import { Input } from "react-native-elements";
import SearchableDropdown from 'react-native-searchable-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import Mailer from "react-native-mail";
// import ListProject from './ListProspect';
import FollowupProspect from './FollowupProspect';
import DetailPage from './DetailPage';
// import styles, { colors } from "./styles/index";


const navState = {
    index: 0,
    routes: [
        { key: 'detail', title: 'Detail' },
        { key: 'follow', title: 'Follow Up' },


    ]
}

const navScene = {
    detail: DetailPage,
    follow: FollowupProspect,


}




class DetailProspect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navState: {
                index: 0,
                routes: [
                    { key: 'detail', title: 'Detail' },
                    { key: 'follow', title: 'Follow Up' },


                ]
            },

            navScene: {
                detail: DetailPage,
                follow: FollowupProspect,


            },
            status_cd:'',
        }

       
    }
    async componentDidMount(){
        const dataProspect = await _getData("statusProspect");
        console.log("_getdata dari ListProspect",dataProspect);
        Actions.refresh({ backTitle: () => dataProspect.status_cd });
        const data = {
            status_cd : dataProspect.status_cd,

        }
        console.log('ambil data statuscd', data);
        isMount = true;
        this.setState(data, () => {

        });
    }
    componentWillUnmount(){
        // this.setState({isMount:false})
        isMount =false
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
                            {/* {"Low".toUpperCase()} */}
                            {/* {dataProspect.status_cd.toUpperCase()} */}
                            {this.state.status_cd.toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
                <TabBar navState={this.state.navState} navScene={this.state.navScene} />

            </Container>

        );
    }
}
export default DetailProspect;

const navStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    tabItem: {
        // flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});