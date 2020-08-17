import React, {useState, useEffect, useCallback} from 'react';

import {View, Image, Text, Dimensions, FlatList} from 'react-native';

import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

import {CalendarList} from 'react-native-calendars';

import Styles from './styles';

import {Icons, Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Button,
  Header,
  LoadingModal,
  PopUp,
  EmptyState,
} from '../../Components';

import {useSelector, useDispatch} from 'react-redux';

import * as Places from '../../Store/Actions/Places';

import Reviews from './RenderReviews';

import TransactionModal from './TransactionStatusModal';

const {width, height} = Dimensions.get('screen');

const HotelDetails = (props) => {
  const dispatch = useDispatch();

  const HotelDescription = useSelector(
    (state) => state.Places.HotelDescription,
  );

  const StatusHotelDescription = useSelector(
    (state) => state.Places.StatusHotelDescription,
  );

  const mUser = useSelector((state) => state.Auth.UserInfo);

  let [ShowComment, setShowModelComment] = useState(false);

  let [ShowTransaction, setShowingTransaction] = useState(false);

  let [animateModal, setanimateModal] = useState(false);

  let [StartDate, setStartDate] = useState('');

  let [EndDate, setEndDate] = useState('');

  let [markedDate, setmarkedDate] = useState([]);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setHotelsDescription = (HotelsData) => {
    return {
      type: 'GET__HOTEL_DESCRIPTION',
      HotelDecription: HotelsData,
    };
  };

  const setBooking = (BookingResponse) => {
    return {
      BookingResponse: BookingResponse,
      type: 'GET_BOOKING_RSPONSE',
    };
  };

  useEffect(() => {
    if (StatusHotelDescription != null) {
      if (StatusHotelDescription == 200) {
        dispatch(setHotelsDescription({data: HotelDescription, Status: 0}));

        IsLoadingModalVisible(false);
      } else if (StatusHotelDescription == 50) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
      } else if (
        StatusHotelDescription == 201 ||
        StatusHotelDescription == 500
      ) {
        IsLoadingModalVisible(false);
        setanimateModal(true);
        setShowingTransaction(true);
      }
    }
  }, [StatusHotelDescription]);

  useEffect(() => {
    if (EndDate !== '') {
      const date1 = new Date(StartDate);
      const date2 = new Date(EndDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let temp = {};
      let cart = [];
      for (let i = 0; i < diffDays + 1; i++) {
        var tomorrow = new Date(StartDate);

        tomorrow.setDate(tomorrow.getDate() + i);

        temp[tomorrow.toISOString().slice(0, 10)] = InitMarkedDate(
          tomorrow.toISOString().slice(0, 10),
        );
        cart.push(temp);
      }
      setmarkedDate([...cart]);
    }
  }, [EndDate, StartDate]);

  const InitMarkedDate = (date) => {
    if (date === StartDate) {
      return {
        startingDay: true,
        color: Colors.MainColor,
        textColor: 'white',
      };
    } else if (date === EndDate) {
      return {
        endingDay: true,
        color: Colors.MainColor,
        textColor: 'white',
      };
    } else {
      return {color: 'rgba(0, 167, 110, 0.2)', textColor: 'white'};
    }
  };

  const OnChangeDay = (day) => {
    if (StartDate == '') {
      setStartDate(day.dateString);
      var tomorrow = new Date(day.dateString);

      tomorrow.setDate(tomorrow.getDate());

      setmarkedDate([
        {
          [tomorrow.toISOString().slice(0, 10)]: InitMarkedDate(
            tomorrow.toISOString().slice(0, 10),
          ),
        },
      ]);
    } else {
      const date1 = new Date(StartDate);
      const date2 = new Date(day.dateString);

      if (date2 - date1 < 0) {
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const OnLongPress = (day) => {
    const date1 = new Date(EndDate);
    const date2 = new Date(day.dateString);
    if (date2 - date1 < 0) {
      setStartDate(day.dateString);
    } else {
      var tomorrow = new Date(day.dateString);
      tomorrow.setDate(tomorrow.getDate() + 2);
      setStartDate(day.dateString);
      setEndDate(tomorrow.toISOString().slice(0, 10));
    }
  };

  const initFetch = useCallback(() => {
    dispatch(Places.getHotelByPlaceID(props.route.params.place_id));
  }, [dispatch]);

  useEffect(() => {
    if (props.route.params != undefined) {
      initFetch();
    }
  }, [initFetch]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const IsgetPlaceID = () => {
    if (
      HotelDescription !== undefined &&
      StatusHotelDescription !== 50 &&
      !LoadingModalVisible
    ) {
      return true;
    } else {
      return false;
    }
  };

  const ContnuieReservation = () => {
    IsLoadingModalVisible(true);
    dispatch(
      Places.BookHotel({
        userID: mUser['id'],
        place_id: props.route.params.place_id,
        hotelName: HotelDescription['name'],
        photoURL: HotelDescription['photos']
          ? HotelDescription['photos'][0]['photo_reference']
          : null,
        vicinity: HotelDescription['vicinity'],
        startdate: StartDate,
        enddate: EndDate,
      }),
    );
  };

  const OnCloseTransactionModal = () => {
    dispatch(setBooking({Status: 0}));
    setShowingTransaction(false);
  };

  const OnTransactionSuccess = () => {
    setShowingTransaction(false);
    dispatch(setBooking({Status: 0}));
    props.navigation.goBack();
  };

  const OnTransactionFaild = () => {
    setShowingTransaction(false);
    ContnuieReservation();
  };
  return (
    <View style={Styles.MainContainer}>
      <Header
        BackButton
        Title="Description"
        IconColor={'#3E3E3E'}
        ContainerTitle={Styles.ContainerTitle}
        titleStyle={Styles.HeaderTitle}
        containerStyle={Styles.ContainerHeader}
        onPressLeft={() => {
          props.navigation.goBack();
        }}
      />
      {IsgetPlaceID() ? (
        <View style={{flex: 1}}>
          <View style={Styles.ContainerCard}>
            <View>
              <Image
                source={{
                  uri: HotelDescription['photos']
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${HotelDescription['photos'][0]['photo_reference']}&key=AIzaSyBGgpFx852M6gLPnbAcxK3D98o2rAiJ_Zk`
                    : 'https://source.unsplash.com/1024x768/?nature',
                }}
                style={Styles.HotelPhoto}
              />
            </View>
            <View style={{margin: 4, width: '70%'}}>
              <View>
                <Text style={Styles.HotelName} numberOfLines={2}>
                  {HotelDescription.name}
                </Text>
              </View>
              <Text style={Styles.CountryName}>
                {HotelDescription.vicinity}
              </Text>
              <View style={Styles.ContainerRating}>
                <Icon size={16} color={'orange'} name={'star'} />
                <Text style={Styles.RatingTxt}>{HotelDescription.rating}</Text>
                <Text style={Styles.ReviewsTxt}>
                  ({HotelDescription.user_ratings_total} Reviews)
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            style={{marginTop: 30}}
            data={HotelDescription.reviews}
            renderItem={({item, index}) => <Reviews key={index} Data={item} />}
            keyExtractor={(item) => item['profile_photo_url']}
          />

          <Button
            title={'Book'}
            Customstyle={Styles.BookBtn}
            onPress={() => setShowModelComment(true)}
          />
        </View>
      ) : (
        !LoadingModalVisible &&
        StatusHotelDescription == 50 && (
          <View style={Styles.MainContainer}>
            <EmptyState MessageTitle={MessagePopUp} Image={Icons.Failed} />
          </View>
        )
      )}

      <SwipeUpDownModal
        modalVisible={ShowComment}
        PressToanimate={animateModal}
        ContentModal={
          <View style={Styles.containerContent}>
            <View style={{flex: 1}}>
              <CalendarList
                markingType={'period'}
                markedDates={markedDate[0]}
                style={{
                  height: height / 2,
                }}
                horizontal={true}
                pagingEnabled={true}
                theme={{
                  backgroundColor: '#FFFFFF',
                  calendarBackground: '#FFFFFF',
                  todayTextColor: '#00adf5',
                  monthTextColor: '#2E3034',
                  textDayFontSize: 12,
                  textMonthFontSize: 12,
                  textDayHeaderFontSize: 12,
                  'stylesheet.calendar.header': {
                    week: {
                      marginTop: -5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  },
                }}
                current={new Date()}
                minDate={new Date()}
                maxDate={'2025-08-30'}
                onDayPress={(day) => OnChangeDay(day)}
                onDayLongPress={(day) => OnLongPress(day)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'rgba(62, 62, 62, 0.6)',
                      fontSize: 18,
                      marginStart: '5%',
                      lineHeight: 28,
                      letterSpacing: 0.5,
                      textAlign: 'center',
                    }}>
                    Check In
                  </Text>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 24,
                      marginStart: '5%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {StartDate !== '' ? StartDate : 'Choose Date'}
                  </Text>
                </View>
                <View style={{marginTop: '5%', justifyContent: 'center'}}>
                  <Icon color={'#A9A9A9'} size={25} name={'chevron-right'} />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'rgba(62, 62, 62, 0.6)',
                      fontSize: 18,
                      marginStart: '5%',
                      lineHeight: 28,
                      letterSpacing: 0.5,
                      textAlign: 'center',
                    }}>
                    Check Out
                  </Text>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 24,
                      marginStart: '5%',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {EndDate !== '' ? EndDate : 'Choose Date'}
                  </Text>
                </View>
              </View>
            </View>

            <Button
              title={'Continue'}
              Customstyle={Styles.ContnuieBtn}
              onPress={ContnuieReservation}
            />
          </View>
        }
        HeaderStyle={Styles.headerContent}
        ContentModalStyle={Styles.Modal}
        HeaderContent={
          <View style={Styles.containerHeaderModal}>
            <View
              style={{
                width: '40%',
                height: 8,
                backgroundColor: 'rgba(169, 169, 169, 0.2)',
                borderRadius: 20,
              }}
            />
          </View>
        }
        duration={1100}
        onClose={() => {
          setShowModelComment(false);
          setanimateModal(false);
        }}
      />

      <TransactionModal
        TransactionStatus={
          StatusHotelDescription == 201
            ? 'Transaction Success'
            : 'Transaction Failed '
        }
        TransactionMessage={
          StatusHotelDescription == 201
            ? 'Congratulations! You can see your bookings in the booking section Enjoy your trip!'
            : 'Please check your internet connection and try again in a moments. Good luck!'
        }
        BtnTitle={StatusHotelDescription == 201 ? 'Back To Home' : 'Try again'}
        ShowTransaction={ShowTransaction}
        OnDismiss={OnCloseTransactionModal}
        ImageStatus={
          StatusHotelDescription == 201 ? Icons.Success : Icons.Failed
        }
        TakeAction={
          StatusHotelDescription == 201
            ? OnTransactionSuccess
            : OnTransactionFaild
        }
      />

      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.Failed}
        LeftBtnFunction={PopupactionFunction}
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default HotelDetails;
