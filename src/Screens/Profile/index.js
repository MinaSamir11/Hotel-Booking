import React, {useState, useEffect, useCallback, useReducer} from 'react';

import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Styles from './styles';

import {
  Header,
  Input,
  LoadingModal,
  PopUp,
  EmptyState,
  Button,
} from '../../Components';

import {Images, Icons, Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector, useDispatch} from 'react-redux';

import * as ProfileActions from '../../Store/Actions/Profile';

import {StackActions} from '@react-navigation/native';

import {validateEmail} from '../../Utils/stringUtils';

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfile = (props) => {
  const dispatch = useDispatch();

  // const UserProfile = useSelector((state) => state.Profile.UserProfile);

  // const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [ProfileImage, setProfileImage] = useState(
    UserProfile
      ? UserProfile.Photo
      : 'https://source.unsplash.com/1024x768/?nature',
  );

  const initFetch = useCallback(() => {
    // dispatch(ProfileActions.GetUserProfile(UserInfo.id));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (UserProfile != null) {
      if (UserProfile.Status == 200) {
        IsLoadingModalVisible(false);
        setProfileImage(
          UserProfile.Photo !== null ? UserProfile.Photo : Images.Logo,
        );
      } else if (UserProfile.Status == 50) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        setVisiabiltyPopUp(true);
      } else if (UserProfile.Status == 401) {
        console.log('401');
        IsLoadingModalVisible(false);
        // setMessagePopUp('Your Profile not found');
        // setVisiabiltyPopUp(true);
        // props.navigation.dispatch(StackActions.replace('Auth'));
        //Profile not found  kick out of app
      } else if (UserProfile.Status == 201) {
        console.log('201');
        IsLoadingModalVisible(false);
        setMessagePopUp('Profile Updated');
        setVisiabiltyPopUp(true);
      }
    }
  }, [UserProfile]);

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

  return (
    <View style={Styles.MainContainer}>
      <ScrollView>
        {/* <Header
          StatusBarColor
          BackButton
          Title=""
          IconColor={Colors.MainColor}
        /> */}

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
          <Text style={Styles.UserName}>Daniel Bronks</Text>
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
            <Text style={Styles.InfoValue}>2</Text>
            <Text style={Styles.InfoHeader}>Bookings</Text>
          </View>
        </View>
        <Text style={Styles.Options}>Options</Text>

        <Button
          IconsRightName={'arrow-right'}
          IconsRightColor={Colors.MainColor}
          IconsRightSize={24}
          title={'User Settings'}
          IconLeftName={'license'}
          IconColor={'#A9A9A9'}
          IconSize={24}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          onPress={() => {}}
        />

        <Button
          title={'Logout'}
          IconLeftName={'logout'}
          IconColor={'#A9A9A9'}
          IconSize={24}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          onPress={() => {}}
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

export default UserProfile;
