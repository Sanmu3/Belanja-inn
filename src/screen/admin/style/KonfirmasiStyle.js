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

  price: {
    fontSize: 18,
    color: '#1B8366',
    width: 125,
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
    width: '50%',
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
  produk2: {flexDirection: 'row', justifyContent: 'space-between'},

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
    width: 25,
    height: 25,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  shopname: {
    color: '#888',
  },

  produkTitle: {
    fontSize: 14,
    height: 50,
  },
  confirmbutton: {
    backgroundColor: '#020C53',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  confirm: {
    color: '#f3f3f3',
  },
  status: {
    color: '#020C53',
  },
  produkFoto: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  backbutton: {
    width: 50,
    height: 50,
    backgroundColor: '#020C53',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 50,
    marginRight: 25,
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
