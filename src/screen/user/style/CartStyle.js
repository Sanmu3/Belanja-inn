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
    width: 200,
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
    width: '100%',
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
  deletebutton: {
    backgroundColor: '#020C53',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  delete: {
    width: 20,
    height: 20,
    tintColor: '#fff',
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
  belumMasuk: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: 100,
    borderRadius: 50,
    padding: 50,
    backgroundColor: '#020C53',
  },
  text: {
    color: '#020C53',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tombol: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  touchArea: {
    backgroundColor: '#fff',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 50,
  },
});
