import React, {useState, useReducer, useEffect, useCallback} from 'react';

import {View, Image, Text, ScrollView} from 'react-native';

import Styles from './styles';

import {Button, Input, LoadingModal, PopUp} from '../../../Components';

import {Icons} from '../../../Assets';

import {validateEmail, validatePassword} from '../../../Utils/stringUtils';

import {useSelector, useDispatch} from 'react-redux';

import * as Auth from '../../../Store/Actions/Auth';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      IsLoadingModalVisible(false);
      dispatch(setUserProfile({...UserInfo, Status: 0}));

      // props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
      console.log('Logged');
    } else if (UserInfo.Status == 50) {
      IsLoadingModalVisible(false);

      setMessagePopUp('No internet Connection');

      setVisiabiltyPopUp(true);
    } else if (UserInfo.Status == 401) {
      IsLoadingModalVisible(false);

      setMessagePopUp('wrong email or password');

      setVisiabiltyPopUp(true);
    }
  }, [UserInfo]);

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      return {
        Account: {
          ...state.Account,
          [action.Input]: action.Value,
        },
      };
    }
    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    Account: {
      Email: '',
      Password: '',
      ErrorEmail: false,
      ErrorPassword: false,
    },
  });

  const ChangeState = (data) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      Value: data.value,
      Input: data.input,
    });
  };

  const OnChangeEmail = (text) => {
    if (validateEmail(text.trim())) {
      ChangeState({
        value: text.trim(),
        input: 'Email',
      });
      ChangeState({
        value: false,
        input: 'ErrorEmail',
      });
    } else {
      ChangeState({
        value: text,
        input: 'Email',
      });
      ChangeState({
        value: text.length > 0 ? true : false,
        input: 'ErrorEmail',
      });
    }
  };

  const OnChangePassword = (text) => {
    if (formState.Account.ErrorPassword) {
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
    }
    ChangeState({
      value: text.trim(),
      input: 'Password',
    });
  };

  const OnLogin = () => {
    if (!formState.Account.Email.length > 0 || formState.Account.ErrorEmail) {
      ChangeState({
        value: true,
        input: 'ErrorEmail',
      });
    } else if (!validatePassword(formState.Account.Password)) {
      //accept ar least 6 char Mixed char and num of CAPTIAL AND Small char
      ChangeState({
        value: true,
        input: 'ErrorPassword',
      });
    } else {
      //call Api
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
      IsLoadingModalVisible(true);
      dispatch(
        Auth.SignInAuth({
          Email: formState.Account.Email.toLowerCase(), // email in this case not sensitive
          Password: formState.Account.Password,
        }),
      );
    }
  };

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={{marginTop: 40}}>
          <Text style={Styles.txtUserName}>Username</Text>
          <Input
            Error={formState.Account.ErrorEmail}
            PlaceHolder={'Create your username'}
            ErrorTitle={'In-valid Email'}
            onChangeText={(text) => OnChangeEmail(text)}
            maxLength={35}
            InputStyle={Styles.InputStyle}
          />
        </View>
        <View style={{marginTop: 51}}>
          <Text style={Styles.txtUserName}>E-mail</Text>

          <Input
            Error={formState.Account.ErrorPassword}
            ErrorTitle={'In-valid Password'}
            secureTextEntry
            maxLength={35}
            PlaceHolder={'Enter your e-mail'}
            onChangeText={(text) => OnChangePassword(text)}
            InputStyle={[Styles.InputStyle]}
          />
        </View>

        <View style={{marginTop: 51}}>
          <Text style={Styles.txtUserName}>Password</Text>

          <Input
            Error={formState.Account.ErrorPassword}
            ErrorTitle={'In-valid Password'}
            secureTextEntry
            maxLength={35}
            PlaceHolder={'Create your password'}
            onChangeText={(text) => OnChangePassword(text)}
            InputStyle={[Styles.InputStyle]}
          />
        </View>
        <Button
          title={'Sign Up'}
          Customstyle={Styles.LoginBtn}
          onPress={OnLogin}
        />
        <PopUp
          visible={PopupModel}
          message={MessagePopUp}
          LeftBtnName={'OK'}
          topIcon={Icons.WrongPopUp}
          LeftBtnFunction={PopupactionFunction}
        />
      </ScrollView>
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default SignUp;
