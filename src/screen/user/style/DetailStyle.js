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
    height: 120,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
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
