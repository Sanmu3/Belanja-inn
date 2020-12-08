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
import {styles} from './style/GetCheckoutStyles';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class GetCheckOut extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dataSource: {},
      dataUser: {},
      dataProduk: [],
      token: '',
      refresh: false,
    };
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getCheckOut();
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data HomeScreen
  }
  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('LoginScreen');
  }

  getCheckOut() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/getCheckout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        // Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('hi saya', responseJson);
        if (responseJson.data == null) {
          this.setState({refresh: false, dataSource: []});
        } else {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
            dataProduk: responseJson.products,
            dataUser: responseJson.data.user,
            refresh: false,
          });
        }
      });
  }

  CheckOut() {
    const {dataSource} = this.state;

    var dataToSend = {dataSource};
    console.log('ini', dataToSend);
    //POST requestu
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/checkout', {
      method: 'POST', //Request Typeu
      body: dataToSend, //post body
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
          alert('sukses checkOut');
          this.props.navigation.navigate('Pemesanan');
        } else {
          this.setState({isLoading: false});
          alert('gagal');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log('errornya', error);
      });
  }

  componentDidMount() {
    this.getToken();
  }
  handleRefresh() {
    this.setState({refresh: true});
    this.getCheckOut();
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
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('./icon/reply.png')}
                  style={[styles.headerImg, {tintColor: '#fff'}]}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => this.handleRefresh()}
                />
              }>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UpdateScreen')}
                style={styles.data}>
                <View style={styles.produk}>
                  <Text style={styles.datatitle}>Nama :</Text>
                  <Text>{this.state.dataUser.name}</Text>
                </View>

                <View style={styles.produk}>
                  <Text style={styles.datatitle}>Nomor Telepon :</Text>
                  <Text>{this.state.dataUser.phone_number}</Text>
                </View>

                <View style={styles.produk}>
                  <Text style={styles.datatitle}>alamat :</Text>
                  <Text>{this.state.dataUser.address}</Text>
                </View>
              </TouchableOpacity>
              <View>
                {this.state.dataProduk.map((val, key) => {
                  return (
                    <View style={styles.produkList}>
                      <View style={styles.produkItem}>
                        <View style={styles.produk}>
                          <Image
                            source={{
                              uri: val.product.image,
                            }}
                            style={styles.produkImg}
                          />

                          <View style={styles.produk1}>
                            <Text style={styles.produkTitle}>
                              {val.product.product_name}
                            </Text>

                            <View style={styles.produk}>
                              <Image
                                source={{uri: val.shop.avatar}}
                                style={styles.avatar}
                              />
                              <Text style={styles.shopname}>
                                {val.shop.shop_name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <Text style={styles.price}>
                Total = Rp.{this.state.dataSource.total_price}
              </Text>
              <TouchableOpacity
                onPress={() => this.CheckOut()}
                style={styles.footerBuyArea}>
                <Text style={styles.back}>bayar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
