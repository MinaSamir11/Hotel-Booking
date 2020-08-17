import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Utils/Api';

export const SignInAuth = (Account) => {
  return async (dispatch) => {
    try {
      let response = await Api.get(
        'http://192.168.1.3:3000',
        `/Users?Email=${Account.Email}&Password=${Account.Password}`,
      );
      if (response) {
        if (response.data[0]) {
          //if we get data then user found in our DB
          dispatch(
            setUserProfile({
              ...response.data[0],
              Status: response.status,
            }),
          );
          //store data in Async Storage To prove of concept using Asyncstorage Package
          storeData(response.data[0]);
        } else {
          dispatch(
            setUserProfile({
              Status: 401, //response.status in real response Api //wrong email or password
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(setUserProfile({Status: 50}));
    }
  };
};

const setUserProfile = (userState) => {
  return {
    userData: userState,
    type: types.GET_SIGNINAUTH,
  };
};

export const SignUpAuth = (Account) => {
  return async (dispatch) => {
    try {
      let CheckUserNameRequest = await Api.get(
        'http://192.168.1.3:3000',
        `/Users?UserName=${Account.UserName}`,
      ); // we here check username if exist or not to not conflict with other users. in real api, makes these validations

      if (CheckUserNameRequest) {
        if (CheckUserNameRequest.data[0]) {
          //if we get data then user found in our DB
          dispatch(
            setUserProfile({
              Status: 409,
            }),
          );
        } else {
          let CheckEmailRequest = await Api.get(
            'http://192.168.1.3:3000',
            `/Users?Email=${Account.Email}`,
          ); // we here check email if exist or not to not conflict with other users. in real api, makes these validations
          if (CheckEmailRequest) {
            if (CheckEmailRequest.data[0]) {
              dispatch(
                setUserProfile({
                  Status: 422,
                }),
              );
            } else {
              /// user not found create user
              let response = await Api.post(
                'http://192.168.1.3:3000',
                `/Users`,
                Account,
              );
              if (response) {
                if (response.data) {
                  dispatch(
                    setUserProfile({
                      ...response.data,
                      Status: 201,
                    }),
                  );
                  storeData(response.data);
                }
              }
            }
          }
        }
      }
    } catch (ex) {
      dispatch(setUserProfile({Status: 50}));
    }
  };
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('com.Hotel.userInfo', jsonValue);
  } catch (e) {
    // saving error
  }
};

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('com.Hotel.userInfo');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };
