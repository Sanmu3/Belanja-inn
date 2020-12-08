import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './style/TokoStyle';
import LottieView from 'lottie-react-native';

export default class NavigasiToko extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      token: '',
      dataProduk: [],
      dataToko: {},
      refresh: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          this.setState({token: token});
        } else {
          this.logOut();
        }
      })
      .then(() => this.getProfile())
      .then(() => this.getToko());

    //setelah token muncul maka ambil data Profile
  }
  logOut() {
    this.props.navigation.navigate('LoginScreen');
  }
  getToko() {
    this.setState({isLoading: true});
    fetch(
      'https://mini-project-d.herokuapp.com/api/get_shop/' +
        this.state.dataSource.id,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.hasil == null) {
          this.setState({
            refresh: false,
            dataProduk: [],
            dataToko: {},
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
            dataToko: responseJson.hasil,
            dataProduk: responseJson.hasil.products,
            refresh: false,
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  getProfile() {
    this.setState({isLoading: true});
    return fetch('https://mini-project-d.herokuapp.com/api/get_user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data[0],
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduk(id) {
    this.setState({isLoading: true});
    fetch(`https://mini-project-d.herokuapp.com/api/destroy_product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const {status} = json;
        if (status == 'success') {
          this.setState({isLoading: false});
          alert('sukses menghapus');
          this.handleRefresh();
        } else {
          this.setState({isLoading: false});
          alert('Gagal menghapus');
        }
      });
  }
  handleRefresh() {
    this.setState({refresh: true});
    this.getToken();
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    console.log(this.state.token);
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
            {this.state.dataSource.role_id === 1 ? (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={() => this.handleRefresh()}
                  />
                }>
                {this.props.navigation.navigate('BuatToko')}
              </ScrollView>
            ) : (
              <View>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refresh}
                      onRefresh={() => this.handleRefresh()}
                    />
                  }>
                  <View style={styles.topheader}>
                    <Image
                      source={{uri: this.state.dataToko.avatar}}
                      style={styles.avatar}
                    />
                    <Text style={styles.topheaderText}>
                      {this.state.dataToko.shop_name}
                    </Text>
                  </View>
                  <View>
                    <View>
                      <View style={styles.biodata}>
                        <View style={styles.bio}>
                          <Text style={styles.biotitle}>Nama Toko</Text>
                          <Text style={styles.biodesc}>
                            {this.state.dataToko.shop_name}
                          </Text>
                        </View>
                        <View style={styles.bio}>
                          <Text style={styles.biotitle}>Alamat</Text>
                          <Text style={styles.biodesc}>
                            {this.state.dataToko.address}
                          </Text>
                        </View>
                        <View style={styles.bio}>
                          <Text style={styles.biotitle}>Deskripsi</Text>
                          <Text style={styles.biodesc}>
                            {this.state.dataToko.description}
                          </Text>
                        </View>
                        <View style={styles.button}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('Tambah Produk')
                            }
                            style={styles.updateButton}>
                            <Text style={styles.buttonText}>Tambah Produk</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('KonfirmasiToko')
                            }
                            style={styles.konfirmButton}>
                            <Text style={styles.buttonText}>konfirm</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('UpdateToko', {
                                getId: this.state.dataSource,
                                getImage: this.state.dataToko,
                              })
                            }
                            style={styles.outButton}>
                            <Text style={styles.buttonText}>Update Toko</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View>
                      {this.state.dataProduk.map((val, key) => {
                        return (
                          <View style={styles.produkList}>
                            <TouchableOpacity
                              style={styles.produkItem}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'DetailFromAdmin',
                                  {
                                    getDetail: this.state.dataToko,
                                    getProducts: val,
                                  },
                                )
                              }>
                              <View style={styles.produk}>
                                <Image
                                  source={{uri: val.image}}
                                  style={styles.produkImg}
                                />

                                <Text style={styles.produkTitle}>
                                  {val.product_name}
                                </Text>
                              </View>
                              <View style={styles.produk2}>
                                <Text
                                  style={styles.hapus}
                                  onPress={() => this.deleteProduk(val.id)}>
                                  Hapus
                                </Text>
                                <Text
                                  onPress={() =>
                                    this.props.navigation.navigate(
                                      'EditProduk',
                                      {
                                        getId: val,
                                        getIdToko: this.state.dataSource,
                                      },
                                    )
                                  }
                                  style={styles.hapus}>
                                  Edit
                                </Text>
                                <View style={{alignSelf: 'flex-end'}}>
                                  <Text style={styles.sold}>
                                    Terjual {val.sold}
                                  </Text>
                                  <Text style={styles.price}>
                                    Rp. {val.price}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    );
  }
}
