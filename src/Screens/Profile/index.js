import React, {useState, useEffect, useCallback, useReducer} from 'react';

import {View, Image, ScrollView, TouchableOpacity, Text} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Styles from './styles';

import {Header, LoadingModal, PopUp, Button} from '../../Components';

import {Images, Icons, Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector, useDispatch} from 'react-redux';

import * as ProfileActions from '../../Store/Actions/Profile';

import AsyncStorage from '@react-native-community/async-storage';

import {StackActions} from '@react-navigation/native';

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfile = (props) => {
  const dispatch = useDispatch();

  const mUser = useSelector((state) => state.Auth.UserInfo);

  const userBookingDetails = useSelector(
    (state) => state.Profile.BookingDetails,
  );

  const StatusBookingDetails = useSelector(
    (state) => state.Profile.StatusBookingDetails,
  );

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [ProfileImage, setProfileImage] = useState(
    mUser ? mUser['Photo'] : 'https://source.unsplash.com/1024x768/?nature',
  );

  const setIntialState = () => {
    return {
      type: 'RESET_STATE',
    };
  };

  const initFetch = useCallback(() => {
    dispatch(
      ProfileActions.getBookingDetails({
        userID: mUser['id'],
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (StatusBookingDetails != null) {
      if (StatusBookingDetails == 200) {
        IsLoadingModalVisible(false);
      } else if (StatusBookingDetails == 50) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      }
    }
  }, [StatusBookingDetails]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnReload = () => {
    IsLoadingModalVisible(true);
    initFetch();
  };

  const PickerImage = async () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('com.Hotel.userInfo');
      props.navigation.dispatch(StackActions.replace('AuthStack'));
      dispatch(setIntialState());
    } catch (e) {}
  };

  const LeftBtnPopUpFunction = async () => {
    if (MessagePopUp === 'Are you sure you want to logout ?') {
      Logout();
      setVisiabiltyPopUp(() => false);
    }
  };

  const RightBtnPopUpFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);
  return (
    <View style={Styles.MainContainer}>
      <Header
        BackButton
        Title="Profile"
        IconColor={'#3E3E3E'}
        ContainerTitle={Styles.ContainerHeaderTitle}
        titleStyle={Styles.HeaderTitle}
        containerStyle={Styles.ContainerHeader}
        onPressLeft={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{alignSelf: 'center'}}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={ProfileImage != null ? {uri: ProfileImage} : Images.Logo}
              style={Styles.ProfilePic}
            />
            <TouchableOpacity
              onPress={PickerImage}
              style={Styles.Edit}
              activeOpacity={0.7}>
              <Icon color={'#FFF'} size={25} name={'camera'} />
            </TouchableOpacity>
          </View>
          <Text style={Styles.UserName}>{mUser['UserName']}</Text>
        </View>

        <View style={Styles.InfoBoard}>
          <View>
            <Text style={Styles.InfoValue}>47</Text>
            <Text style={Styles.InfoHeader}>Reviews</Text>
          </View>
          <View>
            <Text style={Styles.InfoValue}>75</Text>
            <Text style={Styles.InfoHeader}>Transactions</Text>
          </View>
          <View>
            <Text style={Styles.InfoValue}>{userBookingDetails.length}</Text>
            <Text style={Styles.InfoHeader}>Bookings</Text>
          </View>
        </View>
        <Text style={Styles.Options}>Options</Text>

        <Button
          IconsRightName={'chevron-right'}
          IconsRightColor={Colors.MainColor}
          IconsRightSize={24}
          title={'User Settings'}
          IconLeftName={'license'}
          IconColor={'#A9A9A9'}
          IconSize={24}
          activeOpacity={0.8}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          onPress={() => {}}
        />

        <Button
          title={'Logout'}
          IconLeftName={'logout'}
          IconColor={'#A9A9A9'}
          IconSize={24}
          activeOpacity={0.8}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          onPress={() => {
            setMessagePopUp('Are you sure you want to logout ?');
            setVisiabiltyPopUp(true);
          }}
        />

        <Button
          title={'Booking'}
          IconsImage={Icons.Success}
          IconsRightName={'chevron-right'}
          IconsRightColor={Colors.MainColor}
          IconsRightSize={24}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.navigate('BookingDetails');
          }}
        />

        <PopUp
          visible={PopupModel}
          message={MessagePopUp}
          LeftBtnName={'OK'}
          RightBtnName={
            MessagePopUp === 'Are you sure you want to logout ?' ? 'CANCEL' : ''
          }
          topIcon={Icons.WrongPopUp}
          LeftBtnFunction={LeftBtnPopUpFunction}
          RightBtnFunction={RightBtnPopUpFunction}
        />
      </ScrollView>
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default UserProfile;
