import React, {useState, useEffect} from 'react';

import {View, Image, Text} from 'react-native';

import Styles from './styles';

import {Images} from '../../Assets';

import {Button} from '../../Components';
const OnBoarding = (props) => {
  useEffect(() => {}, []);

  return (
    <View style={Styles.MainContainer}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
          style={Styles.Logo}
        />
        <Text
          style={{
            color: '#3E3E3E',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: '10%',
            marginStart: '5%',
            marginBottom: '5%',
          }}>
          Travel with no worry
        </Text>
        <Text
          style={{
            marginStart: '5%',
            color: 'rgba(62, 62, 62, 0.8)',
            letterSpacing: 0.5,
            lineHeight: 28,
            marginEnd: '5%',
          }}>
          You can now experience the next level travel experience for hotel
          bookings.
        </Text>
        <Button
          title={'Next'}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={{
            borderRadius: 28.5,
            marginTop: 30,
            width: 165,
            height: 57,
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default OnBoarding;
