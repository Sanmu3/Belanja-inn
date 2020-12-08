import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './style/CategoriesStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.kategori();
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data HomeScreen
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

  kategori() {
    // this.setLoading(true);
    // console.log(this.state.token);
    this.setState({isLoading: true}),
      fetch(
        'https://mini-project-d.herokuapp.com/api/public/category/' +
          this.props.route.params.type,
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
            dataSource: responseJson.data,
            refresh: false,
          });
        })

        .catch((error) => {
          console.log(error);
        });
  }
  componentDidMount() {
    console.log(this.props.route.params.type);
    this.getToken();
  }
  render() {
    if (this.state.dataSource !== null) {
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
                <View style={styles.back}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('./icon/detail/reply.png')}
                      style={[styles.backImg, {tintColor: '#fff'}]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.search}>
                  <TextInput
                    placeholder="cari barang anda"
                    style={styles.textInput}
                  />
                  <TouchableOpacity onPress={() => this.Search()}>
                    <Image
                      style={styles.icon}
                      source={require('./icon/search.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.headerImg2}>
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
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.dataSource.map((val, key) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Detail', {
                            getDetail: val,
                          })
                        }
                        style={styles.produkItem}>
                        <View style={styles.produkList}>
                          <Image
                            source={{uri: val.image}}
                            style={styles.produkImg}
                          />

                          <Text style={styles.produkTitle}>
                            {val.product_name}
                          </Text>

                          <Text style={styles.sold}>
                            <Text>Terjual</Text> {val.sold}
                          </Text>
                          <Text style={styles.price}>Rp.{val.price}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      );
    } else {
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
                <View style={styles.back}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('./icon/detail/reply.png')}
                      style={[styles.backImg, {tintColor: '#fff'}]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.search}>
                  <TextInput
                    placeholder="cari barang anda"
                    style={styles.textInput}
                  />
                  <TouchableOpacity>
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
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}></View>
              </ScrollView>
            </>
          )}
        </View>
      );
    }
  }
}
