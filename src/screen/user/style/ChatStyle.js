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
    justifyContent: 'flex-start',
  },
  title: {
    width: '100%',
    flex: 1,
  },
  kontakName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginLeft: 10,
  },
  headerImg: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  headerButton: {
    alignSelf: 'center',
  },

  chat: {
    fontSize: 16,
    color: '#a0a0a0',
    maxWidth: 300,
    height: 35,
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding: 10,
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
  send: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputArea: {
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    width: '85%',
    marginLeft: 10,
  },

  viewList: {
    flex: 1,
    width: '100%',
  },
  ProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  getChat: {
    backgroundColor: '#D3D3D3',
    maxWidth: '75%',
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
  },
  postChat: {
    backgroundColor: '#75BBA4',
    maxWidth: '75%',
    alignSelf: 'flex-end',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 35,
    maxWidth: 200,
    width: 200,
  },
  time: {
    fontSize: 8,
    color: '#6D6D6D',
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  message: {
    maxWidth: '80%',
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
