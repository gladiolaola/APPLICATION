import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';


import { Button } from 'react-native-elements';

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
    
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={{height: 300, width: 300}} source={require('./logo.png')} />
        </View>
        <View style={styles.button1}>
        <Button title='Login' 
        buttonStyle={{backgroundColor:'#52B3D9',borderRadius: 15, paddingTop: 10}}
        onPress = {()=>navigate('Login')} //navigate to login page
        />
        </View>
        <View style={styles.button2}>
        <Button title='Sign Up'
        buttonStyle={{backgroundColor:'#52B3D9',borderRadius: 15}}
        onPress = {()=> navigate('Signup')} // navigate to sign up page
        />
        </View>
        <View style={styles.button2}>
        <Button title='Set Route'
        buttonStyle={{backgroundColor:'#52B3D9',borderRadius: 15}}
        onPress = {()=> navigate('Setroute')} // navigate to the location viewer page
        />
        </View>
        <View style={styles.button2}>
        <Button title='Spectator Login'
        buttonStyle={{backgroundColor:'#52B3D9',borderRadius: 15}}
        onPress = {()=> navigate('Viewer')} // navigate to the location viewer page
        />
        </View>
        <View style={{alignItems: 'center', paddingTop: 70}}>
        <Text style={{color: 'rgba(108, 122, 137,0.9)'}}>Powered by Kat</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#DADFE1'
  },
  logoContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  button1:{
    marginTop: 40
  },
  button2:{
    marginTop: 10
  },
});
