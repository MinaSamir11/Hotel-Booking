import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.MainColor,
    justifyContent: 'center',
  },
  Logo: {width: '100%', height: '100%', alignSelf: 'center', marginTop: 15},
});

export default styles;
