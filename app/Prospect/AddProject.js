import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    Platform,

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
    Label,
    Picker,
    Item
} from "native-base";
// import {Icon} from "react-native-elements";
import { Style, Colors } from "../Themes";
import { Actions } from "react-native-router-flux";
import TabBar from '@Component/TabBar';
import Styles from "./Style";
import {_storeData,_getData} from '@Component/StoreAsync';
import { urlApi } from "@Config/services";
import Shimmer from '@Component/Shimmer';
// import styles, { colors } from "./styles/index";

// const navState = {
//     index: 0,
//     routes: [
//       { key: 'nup', title: 'NUP Online' },
//       { key: 'status', title: 'Status' },
//       { key: 'history', title: 'History' },
//     ]
// }

// const navScene = {
//     nup: NUP,
//     status: NUPStatus,
//     history : NUPHistory
// }


   


class AddProject extends Component {

   

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
                            {/* {data.descs} */}
                            {/* {this.state.status_cd.toUpperCase()} */}
                            {/* {this.state.descs.toUpperCase()} */}
                            Choose Project
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />

                </Header>
                
                <View>
                    <View style={{marginHorizontal:10}}>
                        <ScrollView>
                            <View style={{ paddingVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Project</Text>
                                </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Project'} value="1" />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Project"
                                    // selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({village:val})}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                            {/* {this.state.getvillage.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )} */}
                                            <Item label="1" value="1" />
                                            <Item label="2" value="2" />
                                    </Picker>
                                    
                                </Item>
                                }
                                
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                             </View>

                             <View style={{ paddingVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Property</Text>
                                </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Project'} value="1" />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Project"
                                    // selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({village:val})}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                            {/* {this.state.getvillage.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )} */}
                                            <Item label="1" value="1" />
                                            <Item label="2" value="2" />
                                    </Picker>
                                    
                                </Item>
                                }
                                
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                             </View>

                             <View style={{ paddingVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Lot No</Text>
                                </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Project'} value="1" />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Project"
                                    // selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({village:val})}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                            {/* {this.state.getvillage.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )} */}
                                            <Item label="1" value="1" />
                                            <Item label="2" value="2" />
                                    </Picker>
                                    
                                </Item>
                                }
                                
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                             </View>

                             <View style={{ paddingVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Rent</Text>
                                </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Project'} value="1" />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Project"
                                    // selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({village:val})}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                            {/* {this.state.getvillage.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )} */}
                                            <Item label="1" value="1" />
                                            <Item label="2" value="2" />
                                    </Picker>
                                    
                                </Item>
                                }
                                
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                             </View>

                             <View style={{ paddingVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={Styles.iconSub2} type="FontAwesome5" />
                                    <Text style={Styles.overviewTitles}>Buy</Text>
                                </View>
                            {Platform.OS == "ios" ?
                                <TouchableOpacity onPress={()=>this.showActionSheet()} style={{borderWidth: 1, borderColor: "#333"}}>
                                    <View pointerEvents="none">
                                        <TextInput style={Styles.textInput} placeholder={'Project'} value="1" />
                                    </View>
                                </TouchableOpacity>
                            :
                                <Item rounded style={{height: 35}}>
                                    <Picker 
                                    placeholder="Project"
                                    // selectedValue={this.state.village}
                                    style={{width: '100%',marginHorizontal:10}} 
                                    textStyle={{fontFamily:'Montserrat-Regular',fontSize:12,color:'#666'}} 
                                    // onValueChange={(val)=>this.setState({village:val})}
                                    // onValueChange={(val)=>this.chooseDistrict(val)}
                                    >
                                            {/* {this.state.getvillage.map((data, key) =>
                                            <Picker.Item key={key} label={data.label} value={data.value} />
                                        )} */}
                                            <Item label="1" value="1" />
                                            <Item label="2" value="2" />
                                    </Picker>
                                    
                                </Item>
                                }
                                
                            {/* <TextInput style={Styles.textInput} placeholder={'Province'} value={city} onChangeText={(val)=>{this.setState({province:val})}}/> */}
                             </View>

                            <View style={{alignSelf: 'center'}}>
                                <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 40, marginVertical: 10}} onPress={()=>this.AddProject() }>
                                {/* <Button style={{backgroundColor: Colors.navyUrban, borderRadius: 5, height: 30, marginVertical: 10}} onPress={()=>alert('add project') }> */}
                                    <Text style={{fontSize: 14}}>Edit</Text>
                                </Button>
                            </View>

                        </ScrollView>
                    </View>
                    

                </View>
                   
            </Container>

        );
    }
}
export default AddProject;

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