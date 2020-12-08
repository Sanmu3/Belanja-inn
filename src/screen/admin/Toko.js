import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../public/style/ProfileStyle';
import LottieView from 'lottie-react-native';

export default class Toko extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: {},
      token: '',
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
      .then(() => this.getToko());
    //setelah token muncul maka ambil data Profile
  }

  getToko(id) {
    this.setState({isLoading: true}),
      fetch(`https://mini-project-d.herokuapp.com/api/store_shop/${id}`, {
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
            dataSource: responseJson.hasil,
          });
        })

        .catch((error) => {
          console.log(error);
        });
  }

  componentDidMount() {
    this.getToken();
  }

  handleRefresh() {
    this.setState({refresh: true});
    this.getToko();
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.handleRefresh()}
            />
          }>
          <View style={styles.header}>
            <Image
              source={{uri: this.state.dataSource.avatar}}
              style={styles.avatar}
            />
            <Text style={styles.headerText}>
              {this.state.dataSource.shop_name}
            </Text>
          </View>

          <View>
            <View>
              <View style={styles.biodata}>
                <View style={styles.bio}>
                  <Text style={styles.biotitle}>Name</Text>
                  <Text style={styles.biodesc}>
                    {this.state.dataSource.shop_name}
                  </Text>
                </View>
                <View style={styles.bio}>
                  <Text style={styles.biotitle}>Email</Text>
                  <Text style={styles.biodesc}>
                    {this.state.dataSource.address}
                  </Text>
                </View>
                <View style={styles.bio}>
                  <Text style={styles.biotitle}>Phone number</Text>
                  <Text style={styles.biodesc}>
                    {this.state.dataSource.description}
                  </Text>
                </View>
                <View style={styles.bio}>
                  <Text style={styles.biotitle}>Adress</Text>
                  <Text style={styles.biodesc}>
                    {this.state.dataSource.products}
                  </Text>
                </View>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.updateButton}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate('ChangePassword')}
                  style={styles.outButton}>
                  <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                //   onPress={() => this.logOut()}
                style={styles.updateBottomButton}>
                <Text style={styles.bottomButtonText}>logOut</Text>
              </TouchableOpacity>
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
