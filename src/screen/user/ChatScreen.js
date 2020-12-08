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
import {styles} from './style/ChatStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Pusher from 'pusher-js/react-native';
import LottieView from 'lottie-react-native';

export default class CartScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      dataSource: [],
      dataview: {},
      token: '',
      refresh: false,
      message: '',
      to: '',
    };
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getChat();
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data HomeScreen
  }
  logOut() {
    this.props.navigation.navigate('LoginScreen');
  }
  componentDidMount() {
    this.getToken();
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('8d28dfe973d0377c124b', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      console.log(JSON.stringify(data));
      this.setState({massage: ''});
      this.getChat();
    });
  }

  getChat() {
    // this.setState({isLoading: true});
    fetch(
      'https://mini-project-d.herokuapp.com/api/message/' +
        this.props.route.params.getId,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          // Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          dataview: responseJson.profil[0],
          refresh: false,
        });
      });
  }

  sendMessage() {
    const {message, to} = this.state;

    var dataToSend = {
      message: message,
      to: this.props.route.params.getId,
    };

    console.log('ini', dataToSend);
    //POST requestu
    // this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/message', {
      method: 'POST', //Request Typeu
      body: JSON.stringify(dataToSend), //post body
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        //Header Defination
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          this.getChat();
          this.setState({
            message: '',
            // isLoading: false,
          });
        } else {
          this.setState({isLoading: false});
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log(error);
      });
  }

  handleRefresh() {
    this.setState({refresh: true});
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
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('./icon/reply.png')}
                  style={styles.headerImg}
                />
              </TouchableOpacity>
              <Image
                source={{
                  uri: this.state.dataview.avatar,
                }}
                style={styles.ProfileImg}
              />

              <Text style={styles.kontakName}>
                {this.state.dataview.username}
              </Text>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => this.handleRefresh()}
                />
              }
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({animated: false})
              }>
              <View>
                {this.state.dataSource.map((val, key) => {
                  return (
                    <View style={styles.viewList}>
                      <View
                        style={
                          val.to == this.props.route.params.getId
                            ? styles.postChat
                            : styles.getChat
                        }>
                        <Text style={styles.message}>{val.message}</Text>
                        <Text style={styles.time}>{val.created_at}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.inputArea}>
                <TextInput
                  onChangeText={(input) => this.setState({message: input})}
                  value={this.state.message}
                  style={styles.input}
                  placeholder="Tulis Pesan ..."
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={() => this.sendMessage()}
                  style={styles.send}>
                  <Image
                    style={styles.footerImg}
                    source={require('./icon/direct.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }
}
