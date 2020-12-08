import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './style/ProfileStyle';
import LottieView from 'lottie-react-native';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      token: '',
      refresh: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getProfile();
      } else {
        this.keluar();
      }
    });
    //setelah token muncul maka ambil data Profile
  }
  keluar() {
    this.props.navigation.navigate('LoginScreen');
  }

  getProfile() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/get_user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          refresh: false,
        });
      })

      .catch((error) => {
        console.log('token woy', error);
      });
  }

  componentDidMount() {
    this.getToken();
  }

  logOut() {
    fetch('https://mini-project-d.herokuapp.com/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          AsyncStorage.clear();
          this.props.navigation.navigate('LoginScreen');
        } else {
          console.log('error');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log('token', error);
      });
  }
  handleRefresh() {
    this.setState({refresh: true});
    this.getToken();
  }

  render() {
    console.log('ini token', this.state.token);
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
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => this.handleRefresh()}
                />
              }>
              {this.state.dataSource.map((val, key) => {
                return (
                  <View style={styles.header}>
                    <Image source={{uri: val.avatar}} style={styles.avatar} />
                    <Text style={styles.headerText}>{val.username}</Text>
                  </View>
                );
              })}

              <View>
                {this.state.dataSource !== undefined
                  ? this.state.dataSource.map((val, key) => {
                      return (
                        <View>
                          <View style={styles.biodata}>
                            <View style={styles.bio}>
                              <Text style={styles.biotitle}>Name</Text>
                              <Text style={styles.biodesc}>{val.name}</Text>
                            </View>
                            <View style={styles.bio}>
                              <Text style={styles.biotitle}>Email</Text>
                              <Text style={styles.biodesc}>{val.email}</Text>
                            </View>
                            <View style={styles.bio}>
                              <Text style={styles.biotitle}>Phone number</Text>
                              <Text style={styles.biodesc}>
                                {val.phone_number}
                              </Text>
                            </View>
                            <View style={styles.bio}>
                              <Text style={styles.biotitle}>Adress</Text>
                              <Text style={styles.biodesc}>{val.address}</Text>
                            </View>
                          </View>
                          <View style={styles.button}>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('UpdateScreen', {
                                  getInfo: val,
                                })
                              }
                              style={styles.updateButton}>
                              <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('ChangePassword')
                              }
                              style={styles.outButton}>
                              <Text style={styles.buttonText}>
                                Change Password
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.button}>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('Pemesanan')
                              }
                              style={styles.updateButton}>
                              <Text style={styles.buttonText}>Pemesanan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => this.logOut()}
                              style={styles.outButton}>
                              <Text style={styles.buttonText}>logOut</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })
                  : null}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
