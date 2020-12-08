import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  header: {
    width: '100%',
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#020C53',
    flexDirection: 'row',
  },
  back: {
    width: 50,
    height: '75%',
    justifyContent: 'center',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  headerImg: {
    width: '100%',
    position: 'absolute',
  },
  headerImg2: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
    height: '80%',
    width: '65%',
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
