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
import {styles} from './style/CartStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class CartScreen extends Component {
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
    fetch('https://mini-project-d.herokuapp.com/api/carts', {
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

  deleteProduk(id) {
    this.setState({isLoading: true});
    fetch(`https://mini-project-d.herokuapp.com/api/delete_cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json nya', json);
        const {status} = json;
        if (status == 'succes') {
          this.setState({isLoading: false});
          alert('sukses menghapus');
          this.getCart();
          this.handleRefresh();
        } else {
          this.setState({isLoading: false});
          alert('Gagal menghapus');
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
    // const {getDetail} = this.props.route.params;
    console.log('dalem nya', this.state.dataSource);
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
              <Text style={styles.back}> Keranjang </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kontak')}
                style={styles.headerImg2}>
                <Image
                  source={require('./icon/chat.png')}
                  style={styles.headerImg}
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
              <View>
                {this.state.dataSource.map((val, key) => {
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
                              <Text style={styles.price}>
                                Rp. {val.product.price} x {val.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.deleteProduk(val.id)}
                                style={styles.deletebutton}>
                                <Image
                                  style={styles.delete}
                                  source={require('./icon/delete.png')}
                                />
                              </TouchableOpacity>
                            </View>
                            <Text style={styles.price}>
                              Total = Rp. {val.total_price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('GetCheckOut')}
                style={styles.footerBuyArea}>
                <Text style={styles.back}>Check Out</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
