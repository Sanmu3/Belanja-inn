import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from './style/BuatTokoStyle';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class BuatToko extends Component {
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
      shop_name: '',
      description: '',
      address: '',
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token});
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
  buatToko() {
    const {shop_name, address, description, avatarPicker} = this.state;

    //POST json
    var dataToSend = {
      shop_name: shop_name,
      address: address,
      description: description,
      avatar: avatarPicker,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/store_shop', {
      method: 'POST',
      body: this.createFormData(avatarPicker, dataToSend),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        //Header Defination
        Accept: 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          this.setState({isLoading: false});
          alert('toko berhasil di buat');
          this.props.navigation.navigate('HomeScreen', {screen: 'home'});
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
  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
      <View>
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
            <Text style={styles.title}> Buat Toko </Text>
            <ScrollView>
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
                  <Text style={styles.footTitle}>pilih Photo</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.bioTitle}>Nama Toko</Text>
              <TextInput
                style={styles.bioInput}
                onChangeText={(shop_name) => this.setState({shop_name})}
              />
              <Text style={styles.bioTitle}>address</Text>
              <TextInput
                style={styles.bioInput}
                onChangeText={(address) => this.setState({address})}
              />
              <Text style={styles.bioTitle}>description</Text>
              <TextInput
                style={styles.bioInput}
                onChangeText={(description) => this.setState({description})}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.buatToko()}>
                <Text style={styles.footTitle}>Buat Sekarang</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
