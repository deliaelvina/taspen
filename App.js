import React, { Component } from 'react';
import { BackHandler, Platform, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Router from './app/Router';
import { Actions } from 'react-native-router-flux'
// const GLOBAL = require('./config/Services');
// openApps = () => {
//     AsyncStorage.getItem(GLOBAL.CHECK_PAGE).then((value)=>{
//         var data = JSON.parse(value);
//         if(data == null){
//             Actions.launch();
//         }else{
//             Actions.home();
//         }
//     }).done();
// }
export default class App extends Component {
    render() {
        // openApps();
        // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}