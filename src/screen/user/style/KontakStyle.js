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
  back: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
  },
  headerImg: {
    width: 25,
    height: 25,
    tintColor: '#fff',
    alignSelf: 'flex-start',
  },
  headerButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: 10,
    width: 50,
    height: 50,
  },

  chat: {
    fontSize: 16,
    color: '#a0a0a0',
    maxWidth: 300,
    height: 35,
  },

  view: {flexDirection: 'row'},
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  viewItem: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  viewList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ProfileImg: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 35,
    maxWidth: 200,
    width: 200,
  },
  time: {
    fontSize: 10,
    color: '#a0a0a0',
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
  title1: {
    marginTop: 50,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
