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

export default class Selesai extends Component {
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
    this.props.navigation.navigate('LoginScreen');
  }

  getCart() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/waitConfirm', {
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

  componentDidMount() {
    this.getToken();
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
                          <Text style={styles.status}>Belum Di Konfirmasi</Text>
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
