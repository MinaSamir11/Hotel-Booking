import React, {useState, useEffect, useCallback} from 'react';

import {
  View,
  Image,
  Text,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

import Styles from './styles';

import {Icons} from '../../Assets';

import {Button, PopUp, LoadingModal} from '../../Components';

import Geolocation from 'react-native-geolocation-service';

import {useSelector, useDispatch} from 'react-redux';

import * as Places from '../../Store/Actions/Places';

const OnBoarding = (props) => {
  const dispatch = useDispatch();

  const HotelsDetails = useSelector((state) => state.Places.HotelsDetails);

  const Status = useSelector((state) => state.Places.StatusHotelsDetails);

  let [LoadingModalVisible, setLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setHotelsDetails = (HotelsData) => {
    return {
      HotelsData: HotelsData,
      type: 'GET_HOTELPLACES',
    };
  };

  useEffect(() => {
    if (HotelsDetails) {
      if (Status == 200) {
        setLoadingModalVisible(false);
        dispatch(
          setHotelsDetails({
            data: HotelsDetails,
            Status: 0,
          }),
        );
        props.navigation.replace('HomeStack');
      } else if (Status == 50) {
        setLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      }
    }
  }, [HotelsDetails]);

  const GetLocation = async () => {
    let perm = await requestLocationPermission();
    if (perm) {
      await Geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            Places.HotelsNearBy({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 1500,
            }),
          );
          setLoadingModalVisible(true);
        },
        (error) => {
          Alert.alert(
            'Error',
            'something went wrong try again',
            [
              {
                text: 'ok',
                onPress: () => {
                  console.log('Cancel Pressed');
                },
              },
            ],
            {cancelable: false},
          );
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 2000,
        },
      );
    } else {
      Alert.alert(
        'sorry this app needs your location permission to work correctly',
      );
    }
  };

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'location Permission',
            message: ' App needs access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert('location permission denied');
          return false;
        }
      } catch (err) {
        Alert.alert(
          'something went wrong in access your location please try again',
        );
        return false;
      }
    } else {
      return true;
    }
  }

  const getBoundingBox = (region) => [
    region.longitude - region.longitudeDelta / 2, // westLng - min lng
    region.latitude - region.latitudeDelta / 2, // southLat - min lat
    region.longitude + region.longitudeDelta / 2, // eastLng - max lng
    region.latitude + region.latitudeDelta / 2, // northLat - max lat
  ];

  const SearchInAreaPlaces = (Bounderies) => {
    // RNGooglePlaces.getAutocompletePredictions('hotel', {
    //   type: 'establishment',
    //   locationRestriction: {
    //     latitudeNE: Bounderies[3],
    //     latitudeSW: Bounderies[1],
    //     longitudeNE: Bounderies[2],
    //     longitudeSW: Bounderies[0],
    //   },
    // })
    //   .then((place) => {
    //     for (let i = 0; i < place.length; i++) {
    //       RNGooglePlaces.lookUpPlaceByID(place[i].placeID, [
    //         'name',
    //         'address',
    //         'rating',
    //         'userRatingsTotal',
    //         'addressComponents',
    //         'website',
    //         'phoneNumber',
    //       ])
    //         .then((results) =>
    //           console.log(
    //             'Result of palce',
    //             place[i].primaryText,
    //             ' Data',
    //             results,
    //           ),
    //         )
    //         .catch((error) => console.log(error.message));
    //     }
    //   })
    //   .catch((error) => console.log(error.message));
  };

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
          style={Styles.Logo}
        />
        <Text style={Styles.messageHeaderTxt}>Travel with no worry</Text>
        <Text style={Styles.messageTxt}>
          You can now experience the next level travel experience for hotel
          bookings.
        </Text>
        <Button
          title={'Next'}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.NextBtn}
          onPress={GetLocation}
        />
      </View>
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default OnBoarding;
