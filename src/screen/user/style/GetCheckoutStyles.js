import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#020C53',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    flex: 1,
  },
  back: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerImg: {
    width: 25,
    height: 25,
  },

  shopname: {
    fontSize: 18,
    alignSelf: 'center',
    padding: 10,
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  footerImgArea: {
    width: '25%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B8366',
  },
  footerImg: {
    width: 25,
    height: 25,
  },
  footerBuyArea: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dc143c',
  },

  produk: {flexDirection: 'row'},
  produk1: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  produkItem: {
    width: '90%',
    maxWidth: '90%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 10,
  },
  produkList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  produkImg: {
    width: 100,
    height: 100,
    marginRight: 10,
  },

  produkTitle: {
    fontSize: 14,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14.5,
    color: '#1B8366',
    alignSelf: 'flex-start',
    width: 270,
    backgroundColor: '#fff',
    padding: 10,
  },
  data: {
    margin: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  datatitle: {
    width: 150,
    color: '#808080',
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
  },
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
