import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  header: {
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#020C53',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImg: {
    width: '100%',
    position: 'absolute',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  headerImg2: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cart: {
    width: 25,
    height: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    height: '50%',
    width: '100%',
    alignSelf: 'center',
    marginLeft: 25,
  },
  search: {
    backgroundColor: '#fff',
    height: '90%',
    width: '70%',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  textInput: {
    width: '75%',
    height: '110%',
  },

  kategori: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  horizon: {
    backgroundColor: '#020C53',
    flexDirection: 'row',
    padding: 10,
  },
  kategoriItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#ccc',
    width: 75,
    height: 75,
    margin: 10,
  },
  kategoriImg: {
    width: 50,
    height: 50,
    margin: 2,
    tintColor: '#fff',
  },
  kategoriText: {
    width: 100,
    textAlign: 'center',
    color: '#fff',
  },
  produkScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  produkItem: {
    width: '44%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 10,
  },

  produkList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  produkImg: {
    width: 100,
    height: 100,
    margin: 10,
  },

  produkTitle: {
    width: '95%',
    height: 60,
    maxHeight: 70,
    fontSize: 14,
  },
  produkDesc: {
    height: 30,
    fontSize: 10,
  },
  swiperImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  price: {
    color: '#1B8366',
    alignSelf: 'flex-end',
  },
  sold: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#b6afb4',
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
