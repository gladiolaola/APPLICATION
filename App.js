import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import {StackNavigator} from 'react-navigation';

import Login from './views/login';

import Tracker from './views/tracker';
import Splash from './views/splash';
import Signup from './views/signup';
import Viewer from './views/viewer';
import Setroute from './views/setroute';


import { Button } from 'react-native-elements';

const RootRouter = StackNavigator({
        Home:{
            screen: Splash
        },
        Tracker:{
          screen: Tracker
        },
        Login:{
          screen: Login
        },
        Signup:{
          screen: Signup
        },
        Viewer:{
          screen: Viewer
        },
        Setroute:{
          screen: Setroute
        }
  },
  {
    initialRouteName: 'Home',
    
  }
)

export default class App extends Component {
  
  render() {
    return (
      <RootRouter/>
    );
  }
}

const styles = StyleSheet.create({
  
});
