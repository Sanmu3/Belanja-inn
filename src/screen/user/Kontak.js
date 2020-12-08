import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import {styles} from './style/KontakStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class CartScreen extends Component {
  constructor() {
    super();
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
        this.getkontak();
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data HomeScreen
  }
  logOut() {
    this.props.navigation.navigate('LoginScreen');
  }

  getkontak() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/message', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        // Accept: 'application/json',
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
      });
  }

  componentDidMount() {
    this.getToken();
  }
  handleRefresh() {
    this.setState({refresh: true});
    this.getToken();
  }

  render() {
    // const {getDetail} = this.props.route.params;
    console.log(this.state.dataSource);
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
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('./icon/reply.png')}
                  style={styles.headerImg}
                />
              </TouchableOpacity>
              <Text style={styles.back}> Kontak </Text>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => this.handleRefresh()}
                />
              }>
              <View>
                {this.state.dataSource.map((val, key) => {
                  return (
                    <View style={styles.viewList}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ChatScreen', {
                            getId: val.id,
                          })
                        }
                        style={styles.viewItem}>
                        <View style={styles.view}>
                          <Image
                            source={{
                              uri: val.avatar,
                            }}
                            style={styles.ProfileImg}
                          />

                          <View style={styles.view1}>
                            <View style={styles.viewTitle}>
                              <Text numberOfLines={1} style={styles.name}>
                                {val.username}
                              </Text>
                            </View>
                            <Text numberOfLines={1} style={styles.chat}>
                              @{val.username}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
