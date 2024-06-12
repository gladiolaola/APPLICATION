import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { Card } from 'react-native-elements';

export default class Tracker extends Component {
  constructor(props){
    super(props);
    this.state={
      location: {},
      error: null,
      time: 0
    };
  }
  
  componentWillMount(){
    //Check if it is a device or an emulator
    if(Constants.platform === "android" && !Constants.isDevice){
      this.setState({
        error: "Not a Device"
      })
    }
    else{
      this._getLocation();
    }
  }
  
  _getLocation = async() => {
    //Requests permission to use device location from the user
  const isGranted = await Permissions.askAsync(Permissions.LOCATION);
  if(isGranted){
    this.setState({
      error: isGranted
    })
  }
  // else{
  //   alert(" Please Enable Location Permission");
  //   this.props.navigation.popToTop();
  // }
}

_startLocation = async() => {
  //watches the user location
  this._watchId = await Location.watchPositionAsync({
    enableHighAccuracy: true,
    timeInterval:1,
    distanceInterval:3 // updates for every 3 meters travelled
    },
  (coords) =>{
    //updates the state with coords and maintains the counter
    this.setState({
      location: coords.coords,
      time: this.state.time+1
    })
    
      //Get user Id from the previous screeen
      let userName = this.props.navigation.getParam('userName','NoName');
      let userId = userName.$oid;
     //Post the location details to DB
      fetch("https://api.mlab.com/api/1/databases/tracker/collections/userInfo/"+userId+"?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q",{
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"$set" :{
        location: {
          latitude:  this.state.location.latitude,
          longitude: this.state.location.longitude
        }
        }})
    }).catch((err)=>alert(err))
  });
}

_stopLocation = async() =>{
   //Get user Id from the previous screeen
      let userName = this.props.navigation.getParam('userName','NoName');
      let userId = userName.$oid;
     //Post the location details to DB
      fetch("https://api.mlab.com/api/1/databases/tracker/collections/userInfo/"+userId+"?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q",{
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"$set" :{
        location: {
          latitude:  '',
          longitude: ''
        }
        }})
    }).catch((err)=>alert(err))
  //removes the instance of the location tracker ie stops listening to the user location
  this._watchId && this._watchId.remove();
}

componentWillUnmount(){
  this._stopLocation();
  // //removes the instance of the location tracker ie stops listening to the user location
  // this._watchId && this._watchId.remove();
  //sign out
  this.props.navigation.popToTop();
}

// Title of the Screen  
static navigationOptions ={
  title: 'Tracker'
}

  render() {
    let latitude = this.state.location.latitude;
    let longitude = this.state.location.longitude;
    //let userName = this.props.navigation.getParam('userName','NoName');
    return (
      <View style={styles.container}>
      <MapView
      style={{alignSelf: 'stretch', height: 200}}
      initialRegion={{
          latitude: latitude, 
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        //followsUserLocation={true}
      />
        <Card title="Location Details">
        <Text>latitude: {latitude}</Text>
        <Text>longitude: {longitude}</Text>
        <Text>{this.state.time}</Text>
        </Card>
        <TouchableOpacity style={styles.touch} onPress={this._startLocation}>
        <Text style={styles.touchText}>Share My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch} onPress={this._stopLocation}>
        <Text style={styles.touchText}>Stop Location Sharing</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
    touch:{
    backgroundColor: '#52B3D9',
    borderRadius: 15,
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  touchText:{
    fontSize: 22,
    color: '#ECECEC'
  }
});
