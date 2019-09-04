import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import {
    Container,
    Header,
    Button,
    Icon,
    Text
} from "native-base";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import NUP from './NUP';
import NUPHistory from './NUPHistory';
import NUPStatus from './NUPStatus';

const navState = {
    index: 0,
    routes: [
      { key: 'nup', title: 'NUP Online' },
      { key: 'status', title: 'Status' },
      { key: 'history', title: 'History' },
    ]
}

const navScene = {
    nup: NUP,
    status: NUPStatus,
    history : NUPHistory
}



class NUPPage extends Component {
 
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
                            {"NUP Online".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                </Header>
                <TabBar navState={navState} navScene={navScene} />
            </Container>

        );
    }
}
export default NUPPage;

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