import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ActivityIndicator} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Image style={styles.img} source={require('./icon/logo1.png')} />
        <ActivityIndicator style={styles.indicator} color="#fff" size="large" />
      </View>
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
  img: {},
  title: {
    fontSize: 24,
    lineHeight: 28,
    display: 'flex',
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 5},
  },
  indicator: {
    marginTop: 50,
  },
});
