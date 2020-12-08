import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {styles} from './style/DetailStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      modal: false,
      isLoading: false,
      token: '',
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data Profile
  }
  TambahKeCart() {
    const {quantity} = this.state;

    var dataToSend = new FormData();
    dataToSend.append('quantity', quantity);
    //POST requestu
    this.setState({isLoading: true}),
      fetch(
        'https://mini-project-d.herokuapp.com/api/order_product/' +
          this.props.route.params.getDetail.id,
        {
          method: 'POST', //Request Typeu
          body: dataToSend, //post body
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            //Header Defination
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Accept: 'application/json',
          },
        },
      )
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'succes') {
            this.setState({isLoading: false});
            alert('sukses ditambahkan ke keranjang');
            this.setState({modal: false});
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

  TambahKeCartBayar() {
    const {quantity} = this.state;

    var dataToSend = new FormData();
    dataToSend.append('quantity', quantity);
    //POST requestu
    this.setState({isLoading: true}),
      fetch(
        'https://mini-project-d.herokuapp.com/api/order_product/' +
          this.props.route.params.getDetail.id,
        {
          method: 'POST', //Request Typeu
          body: dataToSend, //post body
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            //Header Defination
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Accept: 'application/json',
          },
        },
      )
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'succes') {
            this.setState({isLoading: false});
            alert('sukses ditambahkan ke keranjang');
            this.props.navigation.navigate('CartScreen');
          } else if (status == 'Token is Invalid') {
            this.props.navigation.navigate('LoginScreen');
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

  showModal(visible) {
    this.setState({modal: visible});
  }
  pengurangan() {
    this.state.quantity === 1
      ? this.setState({quantity: this.state.quantity})
      : this.setState({quantity: this.state.quantity - 1});
  }
  penambahan() {
    this.state.quantity === this.props.route.params.getDetail.quantity
      ? this.setState({quantity: this.state.quantity})
      : this.setState({quantity: this.state.quantity + 1});
  }
  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('LoginScreen');
  }
  render() {
    const {getDetail} = this.props.route.params;

    return (
      <View style={styles.screen}>
        {this.state.isLoading === true ? (
          <View style={styles.loading}>
            <LottieView
              source={require('../../lottie/36388-spin-finity-loader.json')}
              style={styles.images}
              autoPlay
              loop
            />
            <Text>Please Wait ...</Text>
          </View>
        ) : (
          <>
            <Modal
              visible={this.state.modal}
              transparent={true}
              style={styles.modalscreen}
              animationType="slide">
              <View style={styles.mainmodal}>
                <TouchableOpacity
                  style={styles.exitmodal}
                  onPress={() => this.setState({modal: false})}>
                  <Text style={styles.buttonfont}>X</Text>
                </TouchableOpacity>
                <View style={styles.space}>
                  <Text>Berapa jumlah yang akan di Beli?</Text>
                </View>
                <View style={styles.modal}>
                  <TouchableOpacity
                    onPress={() => this.pengurangan()}
                    style={styles.totalbutton}>
                    <Text style={styles.buttonfont}>-</Text>
                  </TouchableOpacity>
                  <Text> {this.state.quantity} </Text>
                  <TouchableOpacity
                    style={styles.totalbutton}
                    onPress={() => this.penambahan()}>
                    <Text style={styles.buttonfont}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => this.TambahKeCart()}
                  style={styles.tambah}>
                  <Text style={styles.buttonfont}> Tambah ke keranjang </Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('./icon/detail/reply.png')}
                  style={[styles.headerImg, {tintColor: '#fff'}]}
                />
              </TouchableOpacity>
              <Text style={styles.back}> Produk Detail </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CartScreen')}>
                <Image
                  source={require('./icon/detail/shop-cart.png')}
                  style={styles.headerImg}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.title}>
                <Image style={styles.image} source={{uri: getDetail.image}} />
                <Text style={styles.productName}>{getDetail.product_name}</Text>
                <Text style={styles.price}>Rp.{getDetail.price}</Text>
              </View>
              <View>
                <View style={styles.shop}>
                  <Text style={styles.shopTitle}>Toko</Text>
                </View>
                <View style={styles.shopProfil}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ClickToko', {
                        showId: getDetail,
                      })
                    }
                    style={{flexDirection: 'row'}}>
                    <Image
                      style={styles.shopAvatar}
                      source={{uri: getDetail.shop.avatar}}
                    />
                    <Text style={styles.name}>{getDetail.shop.shop_name}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.desc}>
                <Text style={styles.descTitle}>Rinician Produk</Text>

                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Text style={styles.descs}>Diperbaharui</Text>
                  <Text style={{padding: 10}}>{getDetail.updated_at}</Text>
                </View>

                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Text style={styles.descs}>Tersisa</Text>
                  <Text style={{padding: 10}}>{getDetail.quantity}</Text>
                </View>

                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Text style={styles.descs}>Terjual</Text>
                  <Text style={{padding: 10}}>{getDetail.sold}</Text>
                </View>

                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Text style={styles.descs}>Berat</Text>
                  <Text style={{padding: 10}}>{getDetail.weight}</Text>
                </View>

                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Text style={styles.descs}>kategori</Text>
                  <Text style={{padding: 10}}> {getDetail.category}</Text>
                </View>
              </View>
              <View>
                <View style={styles.shop}>
                  <Text style={styles.shopTitle}>Deskripsi</Text>
                </View>
                <Text style={styles.descItem}>{getDetail.description} </Text>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.footer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ChatScreen', {
                    getId: getDetail.shop.user_id,
                  })
                }
                style={[
                  styles.footerImgArea,
                  {borderRightColor: '#000', borderRightWidth: 1},
                ]}>
                <Image
                  style={styles.footerImg}
                  source={require('./icon/detail/chat.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.showModal()}
                style={styles.footerImgArea}>
                <Image
                  style={styles.footerImg}
                  source={require('./icon/detail/cart.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerBuyArea}>
                <Text
                  onPress={() => this.TambahKeCartBayar()}
                  style={styles.back}>
                  Beli sekarang
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}
