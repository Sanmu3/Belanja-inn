import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../user/style/ChangePassStyle';
import LottieView from 'lottie-react-native';

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      password: '',
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token}, function () {});
        } else {
          //Ini ga ada
          this.logOut();
        }
      })

      .catch((error) => {
        console.log(error);
      });
    //setelah token muncul maka ambil data
  }
  updatePassword() {
    const {password} = this.state;

    //POST json

    var dataToSend = JSON.stringify({
      _method: 'PUT',
      password: password,
    });

    this.setState({isLoading: true});

    fetch('https://mini-project-d.herokuapp.com/api/update_password', {
      method: 'POST',
      body: dataToSend,
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
        //Header Defination
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          this.setState({isLoading: false});
          alert('Update sukses');
          this.props.navigation.goBack();
        } else {
          this.setState({isLoading: false});
          alert('minimal 8 huruf / angka');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getToken();
  }
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
            <View>
              <Text style={styles.bioTitle}> New password </Text>
              <TextInput
                onChangeText={(password) => this.setState({password})}
                style={styles.bioInput}
              />
            </View>
            <View style={styles.foot}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.foot2Button}>
                <Text style={styles.footTitle}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footButton}
                onPress={() => this.updatePassword()}>
                <Text style={styles.footTitle}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
