import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  BackHandler,
} from 'react-native';
import {styles} from './style/LoginStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      secureTextEntry: true,
      token: '',
    };
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('HomeScreen', {screen: 'home'});
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  }

  mengambilUser = () => {
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/public', {
        method: 'GET',
        Authorization: `Bearer ${this.state.token}`,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) => {
          console.error(error);
        });
  };

  componentDidMount() {
    this.mengambilUser();
  }

  Login = () => {
    const {email, password} = this.state;

    var dataToSend = {email: email, password: password, mobile: true};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    //POST request
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/login', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {token} = responseJson;
          if (token) {
            this.setState({isLoading: false}),
              AsyncStorage.setItem('token', token);
            this.props.navigation.navigate('HomeScreen', {screen: 'home'});
          } else {
            this.setState({isLoading: false}),
              alert('Pastikan Email dan Password BENAR!');
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          alert('Pastikan Email dan Password BENAR!');
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
            <Text style={styles.title}> Sign In </Text>

            <View style={styles.email}>
              <Text style={styles.headerinput}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="masukan email"
                onChangeText={(email) => this.setState({email})}
              />
            </View>

            <View style={styles.password}>
              <Text style={styles.headerinput}>password</Text>
              <View style={styles.inPass}>
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

              <TouchableOpacity
                style={styles.forgotpassword}
                onPress={() =>
                  Linking.openURL(
                    'http://mini-project-d.herokuapp.com/password/reset',
                  )
                }>
                <Text style={styles.forgotpasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.Login()}
              style={styles.button}>
              <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
            <View style={styles.haveAcc}>
              <Text style={styles.white}>Don't have any account?</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('RegisterScreen')
                }>
                <Text style={styles.fontSignUp}> Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.haveAcc}>
              <Text style={styles.white}>Try Aplication as</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('HomeScreen', {screen: 'home'})
                }>
                <Text style={styles.fontSignUp}> Guest</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
