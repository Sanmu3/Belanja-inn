import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020C53',
  },
  bioTitle: {
    padding: 10,
    color: '#fff',
  },
  bioInput: {
    padding: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 10,
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footButton: {
    backgroundColor: '#fff',
    height: 50,
    width: 100,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foot2Button: {
    backgroundColor: '#fff',
    height: 50,
    width: 100,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footTitle: {
    color: '#020C53',
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
