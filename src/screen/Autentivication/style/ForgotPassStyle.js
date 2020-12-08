import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#020C53',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {width: '90%'},
  arrow: {width: '8%'},
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    width: '75%',
    marginTop: 25,
  },
  email: {
    marginTop: 50,
    width: '75%',
  },

  headerinput: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#00B7AC',
    marginTop: 10,
    elevation: 5,
  },

  button: {
    width: '75%',
    backgroundColor: '#fff',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderRadius: 50,
  },
  buttontext: {
    fontSize: 15,
    color: '#020C53',
    fontWeight: 'bold',
  },
});
