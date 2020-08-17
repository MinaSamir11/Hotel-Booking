import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const Booking = (props) => {
  return (
    <View style={Styles.ContainerCard}>
      <View>
        <Image
          source={{
            uri: props.Data['photoURL']
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${props.Data['photoURL']}&key=AIzaSyBGgpFx852M6gLPnbAcxK3D98o2rAiJ_Zk`
              : 'https://source.unsplash.com/1024x768/?nature',
          }}
          style={Styles.HotelPhoto}
        />
      </View>
      <View style={{margin: 4, width: '70%'}}>
        <View>
          <Text style={Styles.HotelName} numberOfLines={2}>
            {props.Data['hotelName']}
          </Text>
        </View>
        <Text style={Styles.CountryName}>{props.Data['vicinity']}</Text>
        <View style={Styles.ContainerRating}>
          <Text style={Styles.DateTxt}>
            from {props.Data.startdate} To {props.Data['enddate']}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  ContainerCard: {
    width: '90%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 15,
    marginStart: 25,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'flex-start',
  },
  HotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E3E3E',
    letterSpacing: 0.5,
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlign: 'left',
  },
  CountryName: {
    fontSize: 14,
    color: 'rgba(62, 62, 62, 0.6)',
    marginTop: 10,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  ContainerRating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  DateTxt: {
    fontSize: 14,
    color: 'rgba(62, 62, 62, 0.6)',
    letterSpacing: 0.5,
    marginStart: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  HotelPhoto: {
    width: 95,
    height: 95,
    borderRadius: 6,
  },
});

export default Booking;
