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
  image: {
    width: '100%',
    height: 200,
  },

  title: {
    width: '100%',
    height: 350,
    backgroundColor: '#fff',
  },
  productName: {
    padding: 10,
    fontSize: 16,
    maxHeight: 80,
    height: 80,
  },
  price: {
    alignSelf: 'flex-start',
    padding: 10,
    fontSize: 18,
    color: '#1B8366',
  },

  desc: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  descTitle: {
    padding: 10,
    width: '100%',
    textAlignVertical: 'center',
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  descItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  descs: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    width: 150,
    padding: 10,
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
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
  mainmodal: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '90%',
  },
  modal: {
    width: '100%',
    height: 50,
    // backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  totalbutton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#1B8366',
  },
  modalscreen: {
    bottom: 0,
  },
  exitmodal: {
    alignSelf: 'flex-end',
    margin: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#1B8366',
  },
  buttonfont: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  tambah: {
    backgroundColor: '#1B8366',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 20,
  },
  space: {
    margin: 20,
  },
  shop: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  shopProfil: {
    width: '100%',
    marginTop: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  shopTitle: {
    padding: 10,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  shopAvatar: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    width: 250,
  },
  images: {
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
