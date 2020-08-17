import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';

const Reviews = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: props.Data['profile_photo_url']
              ? props.Data['profile_photo_url']
              : 'https://source.unsplash.com/1024x768/?nature',
          }}
          style={styles.ProfilePic}
        />
        <View style={styles.ContainerReviewersName}>
          <View style={{marginStart: 10, marginTop: 5}}>
            <Text style={styles.reviewersTxt}>{props.Data['author_name']}</Text>
          </View>
          <View style={{marginStart: 10, marginTop: 15}}>
            <Text style={styles.reviewersTxt}>{props.Data['text']}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerReviewersName: {width: '70%'},
  MainContainer: {
    width: '90%',
    marginStart: 25,
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  reviewersTxt: {
    textAlign: 'left',
    color: 'rgba(62, 62, 62, 0.8)',
    letterSpacing: 0.5,
  },
  ContainerRating: {
    width: 74,
    height: 35,
  },
  ProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },
});

export default Reviews;
