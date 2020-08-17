import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Images} from '../../Assets';

import * as RootNavigation from '../../Navigation/RootNavigation';

const {width, height} = Dimensions.get('screen');

const Posts = (props) => {
  const dispatch = useDispatch();

  const HotelDetails = () => {
    RootNavigation.navigate('HotelDetails', {
      place_id: props.Data['place_id'],
    });
  };
  return (
    <TouchableOpacity onPress={HotelDetails} activeOpacity={0.9}>
      <View>
        <Image
          source={{
            uri: props.Data['photos']
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${props.Data['photos'][0]['photo_reference']}&key=AIzaSyBGgpFx852M6gLPnbAcxK3D98o2rAiJ_Zk`
              : 'https://source.unsplash.com/1024x768/?nature',
            // uri: 'https://source.unsplash.com/1024x768/?nature',
          }}
          style={styles.HotelPhoto}
        />
      </View>
      <View style={styles.ContainerRating}>
        <Icons size={16} name={'star'} color={'#FD9942'} />
        <Text style={{color: '#fff', zIndex: 5}}>{props.Data.rating}</Text>
      </View>
      <View style={styles.ContainerHotelName}>
        <View>
          <Text style={styles.HotelNameTxt}>{props.Data.name}</Text>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14,
              textAlign: 'left',
            }}>
            {props.Data.vicinity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  HotelNameTxt: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  ContainerRating: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(62, 62, 62, 0.6)',
    top: 15,
    right: -20,
    width: 74,
    height: 35,
    borderRadius: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HotelPhoto: {
    width: width / 1.5,
    height: height / 2,
    borderRadius: 25,
    resizeMode: 'cover',
  },
});

export default Posts;
