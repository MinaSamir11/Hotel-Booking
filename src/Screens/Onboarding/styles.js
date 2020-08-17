import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Logo: {
    width: '80%',
    height: '55%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  LoginBtn: {
    borderRadius: 28.5,
    marginTop: 30,
    width: '90%',
    height: 57,
    marginBottom: 15,
  },
  NextBtn: {borderRadius: 28.5, marginTop: 30, width: 165, height: 57},
  messageTxt: {
    marginStart: '5%',
    color: 'rgba(62, 62, 62, 0.8)',
    letterSpacing: 0.5,
    lineHeight: 28,
    marginEnd: '5%',
  },
  messageHeaderTxt: {
    color: '#3E3E3E',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%',
    marginStart: '5%',
    marginBottom: '5%',
  },
});

export default styles;
