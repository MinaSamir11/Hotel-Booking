import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../Assets';

const {height, width} = Dimensions.get('window');

const Tabs = (props) => {
  const onPressTab = (event) => {
    props.onPressTab(event);
  };

  return (
    <View style={{...styles.tabsContainer, ...props.ContainerStyle}}>
      {props.tabs.map((tabTitle, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              props.selectedTab == index + 1 ? styles.activeTab : null,
              props.deactivatedTabStyle,
              props.selectedTab == index + 1 ? props.activatedTabStyle : null,
            ]}
            activeOpacity={1}
            onPress={() => onPressTab(index + 1, false)}>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.9}
              numberOfLines={1}
              style={[
                styles.tabText,
                props.selectedTab == index + 1 ? {fontWeight: 'bold'} : null,
              ]}>
              {tabTitle}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 4,
    height: 66,
  },
  tab: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: Colors.MainColor,
    borderStyle: 'solid',
    marginBottom: Platform.OS === 'android' ? -4 : null,
  },
  tabText: {
    fontSize: 17,
    letterSpacing: 1,
    color: '#3E3E3E',
    fontWeight: '600',
  },
});

export {Tabs};
