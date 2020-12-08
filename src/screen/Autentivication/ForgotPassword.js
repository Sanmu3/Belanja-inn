import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {styles} from './style/ForgotPassStyle';

export default class ForgotPassword extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.back}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Image source={require('./icon/arrow.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}> Reset Password </Text>
        <Text style={styles.text}>
          Please enter your email below to receive your password reset
          instructions.
        </Text>
        <View style={styles.email}>
          <Text style={styles.headerinput}>Email</Text>
          <TextInput style={styles.input} placeholder="masukan email" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttontext}>Send Email</Text>
        </TouchableOpacity>
      </View>
    );
  }
  RegisterScreen;
}
