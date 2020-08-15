import React, {useState, useEffect} from 'react';

import {View, Image} from 'react-native';

import Styles from './styles';

import {Images} from '../../Assets';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      console.log(1);
    }, 2000);
  }, []);

  return (
    <View style={Styles.MainContainer}>
      <Image source={Images.LogoOutline} style={Styles.Logo} />
    </View>
  );
};

export default Splash;
