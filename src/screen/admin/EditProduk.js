import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {styles} from './style/TPStyle';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import LottieView from 'lottie-react-native';

export default class EditProduk extends Component {
  constructor(props) {
    super(props);
    const {getId} = this.props.route.params;
    this.state = {
      image: '',
      imagePicker: {
        fileName: 'default.jpeg',
        type: 'image/jpeg',
        uri: getId.image,
      },
      token: '',
      product_name: '',
      price: '',
      quantity: '',
      description: '',
      dataProduk: [],
      dataToko: {},
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token});
          this.getToko();
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

  EditProduk(id) {
    const {
      product_name,
      price,
      quantity,
      description,
      imagePicker,
    } = this.state;

    //POST json
    var dataToSend = {
      _method: 'PUT',
      product_name: product_name,
      price: price,
      description: description,
      quantity: quantity,
      image: imagePicker,
      // image: imagePicker,
    };

    this.setState({isLoading: true}),
      //making data to send on server
      fetch(
        'https://mini-project-d.herokuapp.com/api/update_product/' +
          this.props.route.params.getId.id,
        {
          method: 'POST',
          body: imagePicker
            ? this.createFormData(imagePicker, dataToSend)
            : JSON.stringify(dataToSend),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.state.token}`,
            //Header Defination
            // 'Content-Type': 'application/json',
          },
        },
      )
        .then((response) =>
          response.json().catch((error) => console.log(error)),
        )
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'success') {
            this.setState({isLoading: false}), alert('berhasil di edit');
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
            Accept: 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          let {product_name, price, quantity, description} = responseJson.hasil;
          console.log('ini dari get toko', responseJson.hasil);
          console.log('ini respon', responseJson);
          this.setState({
            isLoading: false,
            // dataToko: responseJson.hasil,
            // dataProduk: responseJson.products,
            product_name: product_name,
            price: price,
            description: description,
            quantity: quantity,
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

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <Text style={styles.title}> Edit Produk </Text>

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
              onPress={() => this.handleChoosePhoto()}>
              <Text style={styles.footTitle}>Choose Photo</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bioTitle}>product name</Text>
          <TextInput
            value={this.state.product_name}
            style={styles.bioInput}
            onChangeText={(product_name) => this.setState({product_name})}
          />
          <Text style={styles.bioTitle}>price</Text>
          <TextInput
            style={styles.bioInput}
            keyboardType="numeric"
            onChangeText={(price) => this.setState({price})}
          />
          <Text style={styles.bioTitle}>quantity</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.bioInput}
            onChangeText={(quantity) => this.setState({quantity})}
          />
          <Text style={styles.bioTitle}>description</Text>
          <TextInput
            style={styles.bioInput}
            onChangeText={(description) => this.setState({description})}
          />

          <View style={styles.ibutton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.updateButton}>
              <Text style={styles.buttonText}>goBack</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.EditProduk()}
              style={styles.outButton}>
              <Text style={styles.buttonText}>Edit Produk</Text>
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
