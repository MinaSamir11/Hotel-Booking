import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  morningTxt: {
    color: '#3E3E3E',
    lineHeight: 38,
    fontSize: 28,
    fontWeight: 'bold',
  },
  ContainerHotelName: {
    flex: 1,
    position: 'absolute',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    left: 25,
  },
  ContainerMorningTxt: {marginStart: 25, marginTop: 35},
  ContainerTabs: {
    padding: 10,
  },
  UserProfileBtn: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    marginEnd: 32,
  },
});

export default styles;
