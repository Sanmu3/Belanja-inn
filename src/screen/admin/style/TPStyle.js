import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 26,
    textAlignVertical: 'center',
    textAlign: 'center',
    height: 75,
    backgroundColor: '#fff',
    elevation: 5,
  },
  bioTitle: {
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  bioInput: {
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'center',
    elevation: 5,
  },
  selectScreen: {
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'center',
  },
  select: {
    width: '100%',
    height: 50,
  },
  avatar: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#020C53',
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 10,
    elevation: 5,
  },

  footTitle: {
    color: '#F0F0F0',
    fontWeight: 'bold',
  },

  ibutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  outButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: '30%',
    padding: 15,
    backgroundColor: '#020C53',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  updateButton: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    width: '30%',
    padding: 15,
    backgroundColor: '#020C53',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
  },
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
