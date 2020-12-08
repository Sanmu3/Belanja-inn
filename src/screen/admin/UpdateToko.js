import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {styles} from './style/UpdateStyle';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import {get} from 'lodash';

export default class UpdateToko extends Component {
  constructor(props) {
    super(props);
    const {getImage} = this.props.route.params;
    this.state = {
      avatar: '',
      avatarPicker: {
        fileName: 'default.jpeg',
        type: 'image/jpeg',
        uri: getImage.avatar,
      },
      dataSource: [],
      token: '',
      dataProduk: [],
      dataToko: {},
      description: getImage.description,
      address: getImage.address,
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token});
          this.setState({isLoading: false});
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
  logOut() {
    this.props.navigation.navigate('LoginScreen');
  }
  updateToko() {
    const {description, address, avatarPicker} = this.state;

    //POST json

    var dataToSend = {
      _method: 'PUT',
      avatar: avatarPicker,
      description: description,
      address: address,
    };
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/update_shop', {
        method: 'POST',
        body: this.createFormData(avatarPicker, dataToSend),
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
            this.setState({isLoading: false}), alert('Update sukses');
            this.props.navigation.goBack();
          } else {
            this.setState({isLoading: false});
            alert('Pastikan Form Sudah Terisi dengan benar');
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          console.log(error);
        });
  }
  getToko() {
    this.setState({isLoading: true}),
      fetch(
        'https://mini-project-d.herokuapp.com/api/get_shop/' +
          this.props.route.params.getIdToko.id,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          let {description, address, avatar} = responseJson.hasil;
          console.log('ini respon', responseJson);
          this.setState({
            isLoading: false,
            address: address,
            description: description,
            avatarPicker: {
              name: 'default.jpeg',
              type: 'image/jpeg',
              uri: avatar,
            },
            refresh: false,
          });
        })

        .catch((error) => {
          console.log(error);
        });
  }

  componentDidMount() {
    this.getToken();
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({avatarPicker: response});
        console.log(response);
      }
    });
  };

  createFormData = (avatar, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: avatar.fileName,
      type: avatar.type,
      uri: avatar.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data);
    return data;
  };

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <View>
            <View>
              {this.state.avatarPicker.uri ? (
                <Image
                  source={{uri: this.state.avatarPicker.uri}}
                  style={styles.avatar}
                />
              ) : (
                <Image
                  source={{uri: this.state.avatarPicker.uri}}
                  style={styles.avatar}
                />
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleChoosePhoto()}>
                <Text style={styles.footTitle}>Choose Photo</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.bioTitle}>Deskripsi</Text>
              <TextInput
                value={this.state.description}
                onChangeText={(description) => this.setState({description})}
                style={styles.bioInput}
              />

              <Text style={styles.bioTitle}>Adress</Text>
              <TextInput
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
                style={styles.bioInput}
              />
            </View>
          </View>

          <View style={styles.foot}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.foot2Button}>
              <Text style={styles.footTitle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footButton}
              onPress={() => this.updateToko()}>
              <Text style={styles.footTitle}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
        ) : null}
      </View>
    );
  }
}
