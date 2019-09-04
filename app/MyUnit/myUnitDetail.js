import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Icon,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Thumbnail,
    Spinner
} from "native-base";
import { Style, Colors } from "../Themes";
import Styles from "./Style";
import { Actions } from "react-native-router-flux";
import moment from "moment";
import numFormat from "@Component/numFormat";
import {_storeData,_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';

class MyUnitDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            units  : [],
            
            isLoaded : false
        };
    }

    async componentDidMount() {
        isMount = true;
        const data = {
            hd: new Headers({
                Token: await _getData("@Token")
            }),
            email: await _getData("@User"),
            name: await _getData("@UserId")
        };

        this.setState(data, () => {
            this.getUnitDetail();
        });
    }

    getUnitDetail = () =>{
        const {cons,LotNo} = this.props.unit

        {isMount ?
            fetch(urlApi+'c_myunits/myUnitDetail/'+cons+'/'+LotNo,{
                method:'GET',
                headers : this.state.hd,
            }).then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    const resData = res.Data
                    this.setState({units : resData,isLoaded: !this.state.isLoaded})
                } else {
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        alert(res.Pesan)
                    });
                }
                console.log('getunits',res);
            }).catch((error) => {
                console.log(error);
            })
        :null}
    }

    render() {
        const {
            ProjectName,
            Property,
            Level,
            LotNo,
            sell_price
        } = this.props.unit;

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
                            {"Unit Detail".toUpperCase()}
                        </Text>
                    </View>
                    <View style={Style.actionBarRight} />
                </Header>
                <Content>
                    <List>
                        <ListItem itemHeader>
                            <View>
                                <Text style={[Style.textBlack,Style.textMedium]}>{ProjectName}</Text>
                                <Text style={[Style.textBlack,Style.textSmall]}>
                                    {Property} | {Level} | <Text style={Style.textRed}>{LotNo}</Text>
                                </Text>
                                <Text style={[Style.textBlack,Style.textMedium]}>
                                    {`Selling Price : \t`} 
                                    <Thumbnail style={{width:18,height:18}} source={require('@Asset/icon/rupiah.png')} />
                                    <Text style={[Style.textGreen,Style.textMedium]}> {numFormat(sell_price)}</Text>
                                </Text>
                            </View>
                        </ListItem>
                        <ListItem itemDivider />
                        {this.state.units.map((data,key)=>
                            <ListItem key={key}> 
                                <View style={{flex:1}}>
                                    <Text style={Style.textBlack}>{data.descs}</Text>
                                    <Text>{moment(data.bill_date).format('DD MMM YYYY')}</Text>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <Text style={[Style.textMedium,Style.textBlue]}>Rp. {numFormat(data.trx_amt)}</Text>
                                </View>
                            </ListItem>    
                        )}
                    </List>
                    {!this.state.isLoaded ? <Spinner color="#31C998" /> :null }
                </Content>
            </Container>
        );
    }
}
export default MyUnitDetailPage;
