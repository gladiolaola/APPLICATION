import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon} from 'react-native-elements';

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Login'
  }
  
  constructor(props){
    super(props);
    this.state = {
      userName : '',
      passWord1: '',
      password2: ''
    }
  }
  
  componentWillUnmount(){
    this.props.navigation.popToTop();
  }
  
  handleSignUp(){
    if(this.state.passWord1 === this.state.passWord2){
      //default format of the data to be stored in DB
      const userDetails = {
        details:{
          userName: this.state.userName,
          passWord: this.state.passWord1
        },
        adminId:'',
        location:{
         latitude:'',
         longitude:''
        }
      }
      // Store in DB
      fetch("https://api.mlab.com/api/1/databases/tracker/collections/userInfo?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q",{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(userDetails)
    })
    .then((res)=>{
      // On Successful data submition to DB show message with the username and redirect to the splash screen
      if(res.status === 200){
      alert(` Registered
      Use UserName: ${this.state.userName}
      to Login`);
      this.props.navigation.popToTop();
      }
    })
   }
    else{
      alert('password mismatch');
    }
    //alert(JSON.stringify(this.state.data[0]));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
        style={styles.textInput}
        placeholder='UserName'
        placeholderTextColor='rgba(34, 49, 63,0.4)'
        onChangeText={(e)=>{this.setState({userName:e})}}
        keyboardType='email-address'
        autoCorrect={false}
        />
        <TextInput 
        style={styles.textInput}
        placeholder='Password'
        placeholderTextColor='rgba(34, 49, 63,0.4)'
        secureTextEntry
        onChangeText={(e)=>{this.setState({passWord1:e})}}
        />
        <TextInput 
        style={styles.textInput}
        placeholder='Password'
        placeholderTextColor='rgba(34, 49, 63,0.4)'
        secureTextEntry
        onChangeText={(e)=>{this.setState({passWord2:e})}}
        />
        <TouchableOpacity style={styles.touch}  onPress={this.handleSignUp.bind(this)}>
        <Text style={styles.touchText}>Sign Up</Text>
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
    backgroundColor: '#DADFE1'
  },
  textInput:{
    marginTop: 30,
    width: 300,
    paddingVertical: 10,
    fontSize: 16
  },
  touch:{
    backgroundColor: '#52B3D9',
    borderRadius: 15,
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  touchText:{
    fontSize: 22,
    color: '#ECECEC'
  }
});
