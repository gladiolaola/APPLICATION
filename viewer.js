import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';


import { Card } from 'react-native-elements';

export default class Viewer extends Component {
  constructor(){
    super();
    this.state={
      users:[],
      lat: 0,
      long: 0,
      counter: 0,
      wayPoint:[]
    }
  }
  
  componentWillMount(){
    fetch("https://api.mlab.com/api/1/databases/tracker/collections/location/5b19feb45d0e6502064f506a?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q")
    .then((res)=>res.json())
    .then((resJson)=>{
      this.setState({
        wayPoint: resJson.way
      })
    })
    
    setInterval(()=>{
      fetch('https://api.mlab.com/api/1/databases/tracker/collections/userInfo?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q')
    .then((res) =>res.json())
    .then((resJson)=> {
       this.setState({
         users: resJson,
        lat: resJson[0].location.latitude,
        long: resJson[0].location.longitude,
        counter: this.state.counter+1
      });
      //alert(this.state.lat);
      
    })
    .catch((err)=>alert(err))
     },3000)
  }
  
  render() {
    let initialRegion = {
          latitude: 45.4642,
          longitude: 9.1900,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
    return (
      <View style={styles.container}>
        <MapView
        style={{alignSelf: 'stretch', height: 400}}
        region={initialRegion}
        moveOnMarkerPress={true}
        minZoomLevel={11}
        maxZoomLevel={17}
        >
        <MapView.Polyline
        coordinates={this.state.wayPoint}
        strokeColor='#7f8c8d'
        strokeWidth={4}
        />
        {
          // For every user in the DB, render a marker in the Map with the user details
          this.state.users.map((user,i)=>{
          if(user.location.latitude){
          return (<MapView.Marker
          key={i}
          coordinate={{latitude: user.location.latitude, longitude: user.location.longitude}}
          title={user.details.userName}
          pinColor={'#52B3D9'}
        />
        )}
        })}
        </MapView>
        <Card>
        <Text>{this.state.counter}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
