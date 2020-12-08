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

export default class UpdateScreen extends Component {
  constructor() {
    super();
    this.state = {
      avatar: '',
      avatarPicker: {
        fileName: 'default.jpeg',
        type: 'image/jpeg',
        uri:
          'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
      },
      token: '',
      name: '',
      phone_number: '',
      address: '',
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token}, function () {
            this.getProfile();
          });
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
  setLoading(loading) {
    this.setState({loading: loading});
  }
  updateProfile() {
    const {name, phone_number, address, avatarPicker} = this.state;

    //POST json

    var dataToSend = {
      _method: 'PUT',
      avatar: avatarPicker,
      name: name,
      phone_number: phone_number,
      address: address,
    };
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/update_user', {
      method: 'POST',
      body: this.createFormData(avatarPicker, dataToSend),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        //Header Defination
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
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
          alert('Pastikan Form Sudah Terisi dengan benar');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log(error);
      });
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
        let {name, phone_number, address, avatar} = responseJson.data[0];
        console.log('Avatar === ' + avatar);
        this.setState({
          isLoading: false,
          name: name,
          phone_number: phone_number,
          address: address,
          avatarPicker: {
            name: 'default.jpeg',
            type: 'image/jpeg',
            uri: avatar,
          },
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
                  <Text style={styles.bioTitle}> Name </Text>
                  <TextInput
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    style={styles.bioInput}
                  />
                  <Text style={styles.bioTitle}>Phone number</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.phone_number}
                    onChangeText={(phone_number) =>
                      this.setState({phone_number})
                    }
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
                  onPress={() => this.updateProfile()}>
                  <Text style={styles.footTitle}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
