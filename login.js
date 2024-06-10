import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon} from 'react-native-elements';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  }
  
  constructor(props){
    super(props);
    this.state = {
      userName : '',
      passWord: '',
      data:[]
    }
  }
  
  componentWillMount(){
    fetch('https://api.mlab.com/api/1/databases/tracker/collections/userInfo?apiKey=QiykEcfyrO9zzNer8HSgDWUEfCBm54_q')
    .then((res) =>res.json())
    .then((resJson)=> {
      //alert(JSON.stringify(resJson))
      this.setState({
        data:resJson
      });
      //alert(JSON.stringify(this.state.data[0]));
      
    })
    .catch((err)=>alert(err))
  }
  
  componentWillUnmount(){
  //   alert(this.state.data[0].username)
  }
  
  handleLogin(){
    this.state.data.map((user)=>{
    if(user.details.userName === this.state.userName && user.details.passWord === this.state.passWord){
      this.props.navigation.navigate('Tracker',{
        userName : user._id
      })
      }
    })
    //alert(JSON.stringify(this.state.data[0]));
  }
  
  render() {
    //let name='';
    //let pwd='';
    //let {push} = this.props.navigation;
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
        onChangeText={(e)=>{this.setState({passWord:e})}}
        />
        <TouchableOpacity style={styles.touch}  onPress={this.handleLogin.bind(this)}>
        <Text style={styles.touchText}>Login</Text>
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
