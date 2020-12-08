import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },

  topheader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#020C53',
    padding: 15,
  },
  topheaderText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 5,
    width: '50%',
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowRadius: 1,
    textShadowColor: '#696969',
    textShadowOffset: {width: 5, height: 5},
  },

  avatar: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 500,
  },

  username: {
    color: '#f0f0f0',
  },
  biodata: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  bio: {
    width: '90%',
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  outButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: '30%',
    padding: 15,
    backgroundColor: '#020C53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    width: '30%',
    padding: 15,
    backgroundColor: '#020C53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  konfirmButton: {
    borderRadius: 50,
    width: '30%',
    padding: 15,
    backgroundColor: '#020C53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  updateBottomButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: '25%',
    padding: 15,
    backgroundColor: '#020C53',
    marginTop: 25,
    alignSelf: 'flex-end',
  },
  bottomButtonText: {
    color: '#fff',
  },

  produk: {flexDirection: 'row'},
  produk2: {flexDirection: 'row', justifyContent: 'space-between'},

  produkItem: {
    width: '90%',
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
    paddingTop: 10,
    fontSize: 14,
    width: 150,
    maxWidth: 150,
    maxHeight: 75,
  },
  headerImg: {
    width: 25,
    height: 25,
  },
  float: {
    backgroundColor: '#020C53',
    width: 50,
    height: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
    margin: 40,
    borderRadius: 50,
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
  hapus: {
    alignSelf: 'flex-end',
    backgroundColor: '#020C53',
    width: 75,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 50,
    color: '#fff',
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
  title: {
    marginTop: 50,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
