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
import {styles} from '../user/style/TokoStyle';
import LottieView from 'lottie-react-native';

export default class ClikToko extends Component {
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
  // getToken() {
  //   AsyncStorage.getItem('token')
  //     .then((token) => {
  //       if (token !== null) {
  //         this.setState({token: token});
  //       } else {
  //         this.logOut();
  //       }
  //     })
  //     .then(() => this.getToko());
  //   //setelah token muncul maka ambil data Profile
  // }
  getToko() {
    this.setState({isLoading: true}),
      fetch(
        'https://mini-project-d.herokuapp.com/api/get_shop/' +
          this.props.route.params.showId.shop.id,
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
          this.setState({
            isLoading: false,
            dataToko: responseJson.hasil,
            dataProduk: responseJson.hasil.products,
            refresh: false,
          });
        })

        .catch((error) => {
          console.log(error);
        });
  }
  getItem() {
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/public')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
            refresh: false,
          });
        })

        .catch((error) => {
          console.log(error);
        });
  }

  // handleRefresh() {
  //   this.setState({refresh: true});
  //   this.getItem();
  // }

  componentDidMount() {
    this.getToko();
  }
  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('LoginScreen');
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
                    </View>
                  </View>
                  <View>
                    {this.state.dataProduk.map((val, key) => {
                      return (
                        <View style={styles.produkList}>
                          <TouchableOpacity
                            style={styles.produkItem}
                            onPress={() =>
                              this.props.navigation.navigate('DetailToko', {
                                getDetail: this.state.dataToko,
                                getProducts: val,
                              })
                            }>
                            <View style={styles.produk}>
                              <Image
                                source={{uri: val.image}}
                                style={styles.produkImg}
                              />

                              <Text style={styles.produkTitle}>
                                {val.product_name}
                              </Text>
                              <View style={styles.price}>
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
          </>
        )}
      </View>
    );
  }
}
