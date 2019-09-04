/**
 * @format
 */

import {AppRegistry,YellowBox} from 'react-native';
import Router from './app/Router';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Require cycle:',])
AppRegistry.registerComponent(appName, () => Router);
