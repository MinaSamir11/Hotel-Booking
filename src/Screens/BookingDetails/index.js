import React, {useState, useEffect} from 'react';

import {View, FlatList} from 'react-native';

import Styles from './styles';

import {Header, Button, EmptyState} from '../../Components';

import {Images, Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import Booking from './RenderBooking';

const BookingDetails = (props) => {
  const dispatch = useDispatch();

  const mUser = useSelector((state) => state.Auth.UserInfo);

  const userBookingDetails = useSelector(
    (state) => state.Profile.BookingDetails,
  );

  return (
    <View style={Styles.MainContainer}>
      <Header
        BackButton
        Title="Booking"
        IconColor={'#3E3E3E'}
        ContainerTitle={Styles.ContainerHeaderTitle}
        titleStyle={Styles.HeaderTitle}
        containerStyle={Styles.ContainerHeader}
        onPressLeft={() => {
          props.navigation.goBack();
        }}
      />

      <FlatList
        data={userBookingDetails}
        renderItem={({item, index}) => <Booking key={index} Data={item} />}
        keyExtractor={(item) => item['id']}
      />
      {!userBookingDetails.length > 0 && (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <EmptyState MessageTitle={'No Booking yet'} Image={Icons.Failed} />
        </View>
      )}
    </View>
  );
};

export default BookingDetails;
