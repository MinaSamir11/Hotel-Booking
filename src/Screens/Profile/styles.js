import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  ContainerHeader: {zIndex: 5, overflow: 'visible'},
  ProfilePic: {
    width: 90,
    height: 90,
    backgroundColor: '#000',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 50,
    overflow: 'hidden',
  },
  Edit: {
    backgroundColor: Colors.MainColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 38,
    height: 38,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.White,
    borderWidth: 2,
  },
  TitleBtn: {
    fontSize: 16,
    color: '#3E3E3E',
    marginStart: 27,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
  },
  ContainerBtn: {
    backgroundColor: '#fff',
    marginStart: '5%',
    marginEnd: '5%',
    marginTop: 25,
    height: 64,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Options: {color: '#3E3E3E', fontSize: 20, marginStart: '5%', marginTop: '8%'},
  InfoHeader: {color: 'rgba(62, 62, 62, 0.6)'},
  InfoValue: {
    color: Colors.MainColor,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  InfoBoard: {
    marginTop: 40,
    backgroundColor: Colors.White,
    height: 103,
    marginStart: 25,
    marginEnd: 25,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  UserName: {
    marginTop: 15,
    fontSize: 24,
    color: '#3E3E3E',
    fontWeight: 'bold',
  },
});

export default styles;
