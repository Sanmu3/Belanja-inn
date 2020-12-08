import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './style/HomeStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      token: '',
      refresh: false,
      keyword: '',
      iklan: [],
    };
  }

  // // getToken() {
  // //   AsyncStorage.getItem('token').then((token) => {
  // //     if (token !== null) {
  // //       this.setState({token: token});
  // //       this.getItem();
  // //     } else {
  // //       this.logOut();
  // //     }
  // //   });

  //   //setelah token muncul maka ambil data HomeScreen
  // }
  // logOut() {
  //   AsyncStorage.clear();
  //   this.props.navigation.navigate('LoginScreen');
  // }

  getItem() {
    this.setState({isLoading: true});
    fetch('https://mini-project-d.herokuapp.com/api/public')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          iklan: responseJson.event,
          refresh: false,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  Search() {
    const {keyword} = this.state;
    let form = new FormData();
    form.append('keyword', keyword);
    var dataToSend = {keyword: keyword};
    console.log('ini dataToSend', dataToSend);
    //POST requestu
    fetch('https://mini-project-d.herokuapp.com/api/public/search', {
      method: 'POST', //Request Typeu
      body: form, //post body
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log('ini respon nya', responseJson);
        const {status} = responseJson;
        if (status == 'succes') {
          alert('pilih barang yang anda cari');
          this.props.navigation.navigate('Search', {getSearch: responseJson});
        } else {
          alert('barang yang anda cari tidak ada');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getItem();
  }
  handleRefresh() {
    this.setState({refresh: true});
    this.getItem();
  }

  render() {
    console.log('ini state', this.state.dataSource);
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              placeholder="cari barang anda"
              style={styles.textInput}
              onChangeText={(input) => this.setState({keyword: input})}
              value={this.state.keyword}
            />
            <TouchableOpacity onPress={() => this.Search()}>
              <Image
                style={styles.icon}
                source={require('./icon/search.png')}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kontak')}
            style={styles.headerImg2}>
            <Image
              style={styles.backImg}
              source={require('./icon/detail/chat.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerImg2}
            onPress={() => this.props.navigation.navigate('CartScreen')}>
            <Image
              style={styles.backImg}
              source={require('./icon/detail/shop-cart.png')}
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
            <Swiper style={{height: 200}} loop={true} autoplay={true}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('./pic/gaming.jpg')}
              />
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={require('./pic/furnitur.jpg')}
              />
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={require('./pic/handphone.jpg')}
              />
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={require('./pic/elektronik.jpg')}
              />
            </Swiper>
          </View>

          <View>
            <Text style={styles.kategori}>Kategori</Text>
            <ScrollView horizontal>
              <View style={styles.horizon}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      type: '1',
                    })
                  }>
                  <View style={styles.kategoriItem}>
                    <Image
                      source={require('./icon/kategori/camera.png')}
                      style={styles.kategoriImg}
                    />
                  </View>

                  <Text style={styles.kategoriText}>electronic</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      type: '2',
                    })
                  }>
                  <View style={styles.kategoriItem}>
                    <Image
                      source={require('./icon/kategori/computer.png')}
                      style={styles.kategoriImg}
                    />
                  </View>
                  <Text style={styles.kategoriText}>accessories computer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      type: '3',
                    })
                  }>
                  <View style={styles.kategoriItem}>
                    <Image
                      source={require('./icon/kategori/mobile.png')}
                      style={styles.kategoriImg}
                    />
                  </View>
                  <Text style={styles.kategoriText}>accessories handphone</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      type: '4',
                    })
                  }>
                  <View style={styles.kategoriItem}>
                    <Image
                      source={require('./icon/kategori/clothes.png')}
                      style={styles.kategoriImg}
                    />
                  </View>
                  <Text style={styles.kategoriText}>Pakaian</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      type: '5',
                    })
                  }>
                  <View style={styles.kategoriItem}>
                    <Image
                      source={require('./icon/kategori/furniture.png')}
                      style={styles.kategoriImg}
                    />
                  </View>
                  <Text style={styles.kategoriText}>Furniture</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View>
            <Text style={styles.kategori}>Produk</Text>
            <View style={styles.produkScreen}>
              {this.state.dataSource.map((val, key) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {getDetail: val})
                    }
                    style={styles.produkItem}>
                    <View style={styles.produkList}>
                      <Image
                        source={{uri: val.image}}
                        style={styles.produkImg}
                      />

                      <Text style={styles.produkTitle}>{val.product_name}</Text>

                      <Text style={styles.sold}>
                        <Text>Terjual</Text> {val.sold}
                      </Text>
                      <Text style={styles.price}>Rp. {val.price}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
