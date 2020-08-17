import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  BookBtn: {borderRadius: 28.5, marginTop: 10, width: 165, height: 57},
  ContainerCard: {
    width: '90%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 15,
    marginStart: 25,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'flex-start',
  },
  HotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E3E3E',
    letterSpacing: 0.5,
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlign: 'left',
  },
  CountryName: {
    fontSize: 14,
    color: 'rgba(62, 62, 62, 0.6)',
    marginTop: 10,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  ContainerRating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  RatingTxt: {
    fontSize: 14,
    color: 'orange',
    letterSpacing: 0.5,
    marginStart: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  ReviewsTxt: {
    fontSize: 14,
    color: 'rgba(62, 62, 62, 0.6)',
    letterSpacing: 0.5,
    marginStart: 5,
    textAlign: 'left',
  },
  HotelPhoto: {
    width: 95,
    height: 95,
    borderRadius: 6,
  },
  HeaderTitle: {textAlign: 'left', color: '#3E3E3E', letterSpacing: 0.5},
  ContainerTitle: {alignSelf: 'flex-start', justifyContent: 'flex-start'},
  ContainerHeader: {backgroundColor: '#E5E5E5'},
  containerContent: {flex: 1, marginTop: 40},
  containerContent: {flex: 1, marginTop: 40},
  containerHeaderModal: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
  },
  headerContent: {
    marginTop: '20%',
  },
  Modal: {
    backgroundColor: '#FAFAFA',
    marginTop: '20%',
    borderRadius: 20,
  },
  ContnuieBtn: {
    borderRadius: 28.5,
    marginTop: 30,
    width: '90%',
    height: 57,
    marginBottom: 15,
  },
});

export default styles;
