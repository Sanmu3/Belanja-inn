import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {styles} from './style/RegisterStyle';
import LottieView from 'lottie-react-native';

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      secureTextEntry: true,
      secureTextEntry2: true,
      username: '',
      email: '',
      password: '',
      ulangiPassword: '',
      cekPassword: true,
      ulangiCekPassword: true,
      isLoading: false,
    };
  }
  register = () => {
    const {username, email, password} = this.state;

    //POST json
    var dataToSend = {
      username: username,
      email: email,
      password: password,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/register', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'success') {
            this.setState({isLoading: false}), alert('register sukses');
            this.props.navigation.navigate('LoginScreen');
          } else {
            this.setState({isLoading: false}),
              alert('Pastikan Form Sudah Terisi dengan benar');
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          console.log(error);
        });
  };
  render() {
    return (
      <View style={styles.screen}>
        {this.state.isLoading === true ? (
          <View style={styles.loading}>
            <LottieView
              source={require('../../lottie/36388-spin-finity-loader.json')}
              style={styles.image}
              autoPlay
              loop
            />
            <Text>Please Wait ...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}> Sign Up </Text>
            <View style={styles.email}>
              <Text style={styles.headerinput}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="masukan email"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <View style={styles.password}>
              <Text style={styles.headerinput}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="masukan nama"
                onChangeText={(username) => this.setState({username})}
              />
            </View>
            <View style={styles.password}>
              <Text style={styles.headerinput}>Password</Text>
              <View style={styles.passScreen}>
                <TextInput
                  secureTextEntry={this.state.secureTextEntry}
                  placeholder="masukan password"
                  onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      secureTextEntry: !this.state.secureTextEntry,
                    })
                  }
                  style={styles.security}>
                  <Image source={require('./icon/eye.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.register()}>
              <Text style={styles.buttontext}>Register</Text>
            </TouchableOpacity>

            <View style={styles.haveAcc}>
              <Text style={styles.haveAccText}>Have account ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={styles.signUp}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
