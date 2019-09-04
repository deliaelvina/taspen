import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class CardSlide extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 10,
          marginRight : 10
        //   borderWidth: 1,
        //   borderColor: "#DBDBDB",
        //   borderRadius: 15
        }}
      >
        <View style={{ flex: 2,backgroundColor:'#fff',borderRadius:10 }}>
          <Image
            source={this.props.imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 10
            }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text style={{textAlign:'center'}}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
export default CardSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
