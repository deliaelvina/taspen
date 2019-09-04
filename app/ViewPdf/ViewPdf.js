import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text
} from 'react-native';

import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;


export default class PDFExample extends React.Component {
  
    render() {
        let source = {uri:'https://app.luminpdf.com/viewer/z5RPpL9ER6iGbzhy3',cache:true};
       

        return (
                        <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});