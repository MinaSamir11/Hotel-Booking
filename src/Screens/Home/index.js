import React, {useState, useEffect} from 'react';

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

import {Images, Icons, Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Carousel from 'react-native-snap-carousel';

import {Button, Tabs, EmptyState} from '../../Components';

import {useSelector, useDispatch} from 'react-redux';

import * as Places from '../../Store/Actions/Places';

import Hotel from './RenderHotels';

const {width, height} = Dimensions.get('screen');

const Home = (props) => {
  const dispatch = useDispatch();

  const HotelsDetails = useSelector((state) => state.Places.HotelsDetails);

  const mUser = useSelector((state) => state.Auth.UserInfo);

  let [selectedTab, setSelectedTab] = useState(1);

  const changeTab = (index) => {
    if (index === 1) {
      HotelsDetails.sort(function (a, b) {
        return b['rating'] - a['rating'];
      });
      setSelectedTab(index);
    } else {
      HotelsDetails.sort(function (a, b) {
        return b['user_ratings_total'] - a['user_ratings_total'];
      });
      setSelectedTab(index);
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <View>
        <Button
          IconLeftName={'license'}
          IconSize={24}
          IconColor={'#A9A9A9'}
          Customstyle={Styles.UserProfileBtn}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        />
      </View>
      <View style={Styles.ContainerMorningTxt}>
        <Text style={Styles.morningTxt}>
          Good Morning, {'\n'}
          {mUser['UserName'] ? mUser['UserName'] : 'Dear'}!
        </Text>
      </View>

      {HotelsDetails.length !== 0 ? (
        <View>
          <View style={Styles.ContainerTabs}>
            <Tabs
              tabs={['Recommend', 'Popular', 'Trending']}
              selectedTab={selectedTab}
              onPressTab={changeTab}
              dots
            />
          </View>

          <Carousel
            layout={'default'}
            data={HotelsDetails}
            renderItem={({item, index}) => <Hotel key={index} Data={item} />}
            sliderWidth={width}
            itemWidth={width / 2}
          />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <EmptyState
            MessageTitle={'No Hotels near to you, right now'}
            Image={Icons.Failed}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
