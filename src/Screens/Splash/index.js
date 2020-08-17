import React, {useEffect} from 'react';

import {View, Image} from 'react-native';

import Styles from './styles';

import {Images} from '../../Assets';

import AsyncStorage from '@react-native-community/async-storage';

import {useSelector, useDispatch} from 'react-redux';

import * as Auth from '../../Store/Actions/Auth';

const Splash = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  useEffect(() => {
    setTimeout(() => {
      AutoLogin();
    }, 3000);
  }, []);

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      dispatch(setUserProfile({...UserInfo, Status: 0}));
      props.navigation.replace('OnBoarding');
    } else if (UserInfo.Status == 50) {
    } else if (UserInfo.Status == 401) {
    }
  }, [UserInfo]);

  const AutoLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('com.Hotel.userInfo');
      if (jsonValue == null) {
        props.navigation.replace('AuthStack');
      } else {
        let user = JSON.parse(jsonValue);
        dispatch(
          Auth.SignInAuth({
            Email: user['Email'], // email in this case not sensitive
            Password: user['Password'],
          }),
        );
      }
    } catch (e) {
      // error reading value
      props.navigation.replace('AuthStack');
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <Image source={Images.SplashSreen} style={Styles.Logo} />
    </View>
  );
};

export default Splash;
