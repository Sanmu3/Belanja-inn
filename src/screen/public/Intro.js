import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      showRealApp: false,
    };
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('HomeScreen', {screen: 'home'});
      } else {
        this.props.navigation.navigate('Intro');
      }
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      this.setState({showRealApp: !!value});
    });
  }

  render() {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#020C53',
            image: (
              <LottieView
                source={require('../../lottie/36596-the-woman-sitting-on-the-phone.json')}
                style={styles.image}
                autoPlay
                loop
              />
            ),
            title: 'Selamat Datang di Belanja inn',
            subtitle: 'Belanja Aman, pengiriman cepat, dan amanah',
          },
          {
            backgroundColor: '#020C53',
            image: (
              <LottieView
                source={require('../../lottie/38287-scanning-searching-for-data.json')}
                style={styles.image}
                autoPlay
              />
            ),
            title: 'Cari barang anda',
            subtitle:
              'Cari barang yang anda perlukan ataupun yang anda inginkan',
          },
          {
            backgroundColor: '#020C53',
            image: (
              <LottieView
                source={require('../../lottie/25192-contactless-payment.json')}
                style={styles.image}
                autoPlay
                loop={false}
              />
            ),
            title: 'transaksi aman',
            subtitle:
              'pembayaran tidak akan diserahkan kepada penjual sebelum barang sampai kepada pembeli ',
          },
          {
            backgroundColor: '#020C53',
            image: (
              <LottieView
                source={require('../../lottie/25925-fast-delivery.json')}
                style={styles.image}
                autoPlay
                loop={false}
              />
            ),
            title: 'pengiriman cepat dan tepat',
            subtitle:
              'kami akan mengirimkan barang setelah permbayaran ke alamat yang di tuju',
          },
          {
            backgroundColor: '#020C53',
            image: (
              <LottieView
                source={require('../../lottie/37050-get-in-touch-with-us-online-managers.json')}
                style={styles.image}
                autoPlay
                loop
              />
            ),
            title: 'Tunggu apa lagi?',
            subtitle: 'Ayo gabung dengan kami',
          },
        ]}
        onDone={() =>
          AsyncStorage.setItem('first_time', 'true').then(() => {
            this.setState({showRealApp: true});
            this.props.navigation.navigate('HomeScreen', {screen: 'home'});
          })
        }
        onSkip={() =>
          AsyncStorage.setItem('first_time', 'true').then(() => {
            this.setState({showRealApp: true});
            this.props.navigation.navigate('HomeScreen', {screen: 'home'});
          })
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#020C53',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 250,
    height: 250,
  },

  title: {
    textAlign: 'center',
    width: '80%',
    fontSize: 28,
    lineHeight: 28,
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 5},
    margin: 10,
  },

  description: {
    width: '70%',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    margin: 20,
  },
});
