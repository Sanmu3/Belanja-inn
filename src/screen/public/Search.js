import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './style/CategoriesStyle';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      dataSearch: [],
      refresh: false,
      isLoading: false,
    };
  }
  Search() {
    const {keyword} = this.state;
    let form = new FormData();
    form.append('keyword', keyword);
    var dataToSend = {keyword: keyword};
    console.log('ini dataToSend', dataToSend);
    //POST requestu
    this.setState({isLoading: true}),
      fetch('https://mini-project-d.herokuapp.com/api/public/search', {
        method: 'POST', //Request Typeu
        body: form, //post body
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          //Header Defination
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          // Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log('ini respon nya', responseJson);
          const {status} = responseJson;
          if (status == 'succes') {
            this.setState({isLoading: false});
            this.setState({dataSearch: responseJson.data});
            // this.Search();
          } else {
            this.setState({isLoading: false}),
              alert('barang yang anda cari tidak ada');
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          console.log(error);
        });
  }

  componentDidMount() {
    this.setState({dataSearch: this.props.route.params.getSearch.data});
  }
  handleRefresh() {
    this.setState({refresh: true});
  }
  render() {
    console.log('ini params', this.state.dataSearch);

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
                  onChangeText={(input) => this.setState({keyword: input})}
                  value={this.state.keyword}
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
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => this.handleRefresh()}
                />
              }>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {this.state.dataSearch.map((val, key) => {
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
  }
}
