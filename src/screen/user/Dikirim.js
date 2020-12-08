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
import {styles} from './style/KonfirmasiStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Dikirim extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dataSource: [],
      dataProduk: {},
      token: '',
      refresh: false,
    };
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getCart();
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

  getCart() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/sending', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        // Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.data == null) {
          this.setState({
            refresh: false,
            dataSource: [],
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
            dataProduk: responseJson.data.product,
            refresh: false,
          });
        }
      });
  }

  diterima(id) {
    const {dataSource} = this.state;

    var dataToSend = {dataSource};
    console.log('ini', dataToSend);
    //POST requestu
    this.setState({isLoading: true});
    fetch(`https://mini-project-d.herokuapp.com/api/confirmSent/${id}`, {
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
          alert('Telah Di diterima');
          // this.setState({modal: false});
        } else {
          this.setState({isLoading: false});
          alert('gagal');
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
  handleRefresh() {
    this.setState({refresh: true});
    this.getCart();
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
                    <View style={styles.produkList}>
                      <View style={styles.produkItem}>
                        <View style={styles.produk2}>
                          <View style={styles.produk}>
                            <Image
                              source={{
                                uri: val.shop.avatar,
                              }}
                              style={styles.produkImg}
                            />
                            <Text style={styles.shopname}>
                              {val.shop.shop_name}
                            </Text>
                          </View>
                          <Text style={styles.status}>Sedang Dikirim</Text>
                        </View>
                        <View style={styles.produk}>
                          <Image
                            source={{
                              uri: val.product.image,
                            }}
                            style={styles.produkFoto}
                          />

                          <View style={styles.produk1}>
                            <Text style={styles.produkTitle}>
                              {val.product.product_name}
                            </Text>
                            <Text style={styles.sold}>
                              <Text>pesan </Text>
                              {val.quantity}
                            </Text>
                            <View style={styles.produk}>
                              <Text style={styles.price}>
                                Rp. {val.total_price}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.diterima(val.id)}
                                style={styles.confirmbutton}>
                                <Text style={styles.confirm}>Konfirmasi</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
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
