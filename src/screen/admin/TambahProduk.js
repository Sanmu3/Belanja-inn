import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';
import {styles} from './style/TPStyle';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class TambahProduk extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      imagePicker: {
        fileName: 'default.jpeg',
        type: 'image/jpeg',
        uri:
          'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
      },
      token: '',
      product_name: '',
      price: '',
      quantity: '',
      description: '',
      weight: '',
      category_id: '',
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
        this.setState({imagePicker: response});
        console.log(response);
      }
    });
  };

  createFormData = (image, body) => {
    const data = new FormData();

    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data);
    return data;
  };
  TambahProduk() {
    const {
      product_name,
      price,
      quantity,
      description,
      weight,
      category_id,
      imagePicker,
    } = this.state;

    //POST json
    var dataToSend = {
      product_name: product_name,
      price: price,
      description: description,
      image: imagePicker,
      quantity: quantity,
      weight: weight,
      category_id: category_id,
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
      fetch('https://mini-project-d.herokuapp.com/api/store_product', {
        method: 'POST',
        body: this.createFormData(imagePicker, dataToSend),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.state.token}`,
          //Header Defination
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'success') {
            this.setState({isLoading: false}),
              alert('produk behasil ditambahkan ke toko');
            this.props.navigation.goBack();
          } else {
            this.setState({isLoading: false}),
              alert('Pastikan Form Sudah Terisi dengan benar');
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          console.log(error);
        });
  }
  loading() {
    this.setState({isLoading: true}), this.TambahProduk();
  }
  componentDidMount() {
    this.getToken();
    this.setState({category_id: '1'});
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <Text style={styles.title}> Tambah Produk </Text>
          <View>
            {this.state.imagePicker.uri ? (
              <Image
                source={{uri: this.state.imagePicker.uri}}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{uri: this.state.imagePicker.uri}}
                style={styles.avatar}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleChoosePhoto();
              }}>
              <Text style={styles.footTitle}>pilih Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.bioTitle}>Nama Produk</Text>
            <TextInput
              placeholder="minimal 10 huruf"
              style={styles.bioInput}
              onChangeText={(product_name) => this.setState({product_name})}
            />
            <Text style={styles.bioTitle}>Harga</Text>
            <TextInput
              placeholder="harga barang yang akan dijual"
              style={styles.bioInput}
              keyboardType="numeric"
              onChangeText={(price) => this.setState({price})}
            />
            <Text style={styles.bioTitle}>Jumlah</Text>
            <TextInput
              placeholder="jumlah barang yang akan dijual"
              style={styles.bioInput}
              keyboardType="numeric"
              onChangeText={(quantity) => this.setState({quantity})}
            />
            <Text style={styles.bioTitle}>Deskripsi</Text>
            <TextInput
              placeholder="deskripsi barang yang akan dijual"
              style={styles.bioInput}
              onChangeText={(description) => this.setState({description})}
            />
            <Text style={styles.bioTitle}>Kategori</Text>
            <View style={styles.selectScreen}>
              <Picker
                selectedValue={this.state.category_id}
                style={styles.select}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({category_id: itemValue})
                }>
                <Picker.Item label="electronik" value="1" />
                <Picker.Item label="Komputer" value="2" />
                <Picker.Item label="handphone" value="3" />
                <Picker.Item label="Pakaian" value="4" />
                <Picker.Item label="Furniture" value="5" />
              </Picker>
            </View>
            <Text style={styles.bioTitle}>Berat</Text>
            <TextInput
              placeholder="berat barang yang akan dijual"
              style={styles.bioInput}
              keyboardType="numeric"
              onChangeText={(weight) => this.setState({weight})}
            />
          </View>

          <View style={styles.ibutton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.updateButton}>
              <Text style={styles.buttonText}>goBack</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.loading()}
              style={styles.outButton}>
              <Text style={styles.buttonText}>Tambah Produk</Text>
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
