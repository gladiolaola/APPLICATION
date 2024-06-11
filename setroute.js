import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, MapView } from 'expo';
import Decode from 'google-polyline';


import { Card } from 'react-native-elements';

export default class Setroute extends Component {
  constructor(){
    super();
    this.state={
      startCoords: '',
      endCoords: '',
      isStart: true,
      coords:[],
      wayPoint:[]
      }
    }
  
  componentDidUpdate(){
    if(this.state.coords.length == 2 && this.state.wayPoint.length == 0){
                    fetch(url).then((res)=>res.json())
          .then((resJson)=>{
          let wayPoint = resJson.routes[0].overview_polyline.points
          let wayPointCoords = Decode.decode(wayPoint)
          let coords = wayPointCoords.map((way)=>{
            return{
              latitude: way[0],
              longitude: way[1]
            }
          })
          this.setState({
            wayPoint : coords
          })
          fetch("https://api.mlab.com/api/1/databases/tracker/collections/location/5b19feb45d0e6502064f506a?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q",{
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"$set" :{
        way: this.state.wayPoint
        }})
    }).then((res)=>{
      if(res.status == 200)
      alert('Route Has Been Set')})
          //alert(JSON.stringify(coords))
      })
    }
  }
  
  componentWillUnmount(){
    this.setState({
      startCoords: '',
      endCoords: '',
      isStart: true,
      coords:[]
      })
  }
  
  render() {
    let initialRegion = {
          latitude: 45.4642,
          longitude: 9.1900,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
    return (
      <View style={styles.container}>
        { this.state.coords.length<2 ?
        <MapView
        style={{alignSelf: 'stretch', height: 400}}
        region={initialRegion}
        minZoomLevel={5}
        maxZoomLevel={17}
        onPress={(coords)=>{
          if(this.state.isStart){
          this.setState({
          startCoords : coords.nativeEvent.coordinate,
          isStart : !this.state.isStart
          })
          }else{
          this.setState({
          endCoords : coords.nativeEvent.coordinate,
          isStart : !this.state.isStart,
          coords:[this.state.startCoords,this.state.endCoords]
          })
          }
          }}
        />
        : 
        <MapView
        style={{alignSelf: 'stretch', height: 400}}
        region={initialRegion}
        minZoomLevel={5}
        maxZoomLevel={17}
        >
        <MapView.Marker
        coordinate={this.state.startCoords}
        title='Start Line'
        />
        <MapView.Marker
        coordinate={this.state.endCoords}
        title='Finish' 
        />
        <MapView.Polyline
        coordinates={this.state.wayPoint}
        strokeColor='#7f8c8d'
        strokeWidth={4}
        />
        </MapView>
        }
        <Card>
        <Text>{JSON.stringify(this.state.startCoords)}</Text>
        <Text>{JSON.stringify(this.state.endCoords)}</Text>
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
