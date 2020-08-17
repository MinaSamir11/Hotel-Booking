import React, {useState, useReducer, useEffect, useCallback} from 'react';

import {View, Text, ScrollView} from 'react-native';

import Styles from './styles';

import {Button, Input, LoadingModal, PopUp} from '../../../Components';

import {Icons} from '../../../Assets';

import {validateEmail, validatePassword} from '../../../Utils/stringUtils';

import {useSelector, useDispatch} from 'react-redux';

import * as Auth from '../../../Store/Actions/Auth';

import * as RootNavigation from '../../../Navigation/RootNavigation';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [secureTextIcon, setsecureTextIcon] = useState('eye-off-outline');

  let [secureText, setsecureText] = useState(true);

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 201) {
      IsLoadingModalVisible(false);
      dispatch(setUserProfile({...UserInfo, Status: 0}));
      // props.navigation.dispatch(StackActions.replace('TabBottomNavigator'));
      RootNavigation.navigate('OnBoarding');
    } else if (UserInfo.Status == 50) {
      dispatch(setUserProfile({Status: 0}));
      IsLoadingModalVisible(false);
      setMessagePopUp('No internet Connection');
      setVisiabiltyPopUp(true);
    } else if (UserInfo.Status == 409) {
      dispatch(setUserProfile({Status: 0}));
      IsLoadingModalVisible(false);
      setMessagePopUp('Username not available');
      setVisiabiltyPopUp(true);
    } else if (UserInfo.Status == 422) {
      dispatch(setUserProfile({Status: 0}));
      IsLoadingModalVisible(false);
      setMessagePopUp('E-mail already exist');
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
      userName: '',
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
        value: text.trim().toLowerCase(),
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

  const OnChangeUserName = (text) => {
    ChangeState({
      value: text.trim(),
      input: 'UserName',
    });
    ChangeState({
      value: false,
      input: 'ErrorUserName',
    });
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

  const OnSignUp = () => {
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
    } else if (formState.Account.ErrorUserName) {
    } else {
      //call Api
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
      IsLoadingModalVisible(true);
      dispatch(
        Auth.SignUpAuth({
          Email: formState.Account.Email.toLowerCase(), // email in this case not sensitive
          Password: formState.Account.Password,
          UserName: formState.Account.UserName.toLowerCase(),
          Photo: 'https://source.unsplash.com/1024x768/?nature',
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
            PlaceHolder={'Create your username'}
            onChangeText={(text) => OnChangeUserName(text)}
            maxLength={35}
            InputStyle={Styles.InputStyle}
          />
        </View>

        <View style={{marginTop: 51}}>
          <Text style={Styles.txtUserName}>E-mail</Text>
          <Input
            Error={formState.Account.ErrorEmail}
            ErrorTitle={'In-valid Email'}
            maxLength={35}
            PlaceHolder={'Enter your e-mail'}
            onChangeText={(text) => OnChangeEmail(text)}
            InputStyle={[Styles.InputStyle]}
          />
        </View>

        <View style={{marginTop: 51}}>
          <Text style={Styles.txtUserName}>Password</Text>
          <Input
            Error={formState.Account.ErrorPassword}
            ErrorTitle={'In-valid Password'}
            secureTextEntry={secureText}
            maxLength={35}
            PlaceHolder={'Create your password'}
            onChangeText={(text) => OnChangePassword(text)}
            InputStyle={[Styles.InputStyle]}
            IconName={secureTextIcon}
            changeIcon={() => {
              setsecureText(!secureText);
              if (secureText) {
                setsecureTextIcon('eye-outline');
              } else {
                setsecureTextIcon('eye-off-outline');
              }
            }}
          />
        </View>
        <Button
          title={'Sign Up'}
          Customstyle={Styles.LoginBtn}
          onPress={OnSignUp}
        />
        <PopUp
          visible={PopupModel}
          message={MessagePopUp}
          LeftBtnName={'OK'}
          topIcon={Icons.Failed}
          LeftBtnFunction={PopupactionFunction}
        />
      </ScrollView>
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default SignUp;
