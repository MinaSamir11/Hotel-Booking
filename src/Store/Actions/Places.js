import * as types from './types';

import Api from '../../Utils/Api';

import HotelsDetails from '../../Model/HotelsDetails'; //get new instance

const APIkey = 'AIzaSyBGgpFx852M6gLPnbAcxK3D98o2rAiJ_Zk';

export const HotelsNearBy = (Points) => {
  return async (dispatch) => {
    try {
      let response = await Api.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/',
        `json?location=${Points.latitude},${Points.longitude}&radius=${Points.radius}&type=hotel&keyword=hotel&key=${APIkey}`,
      );
      if (response) {
        if (response.data.results) {
          let HotelsData = [];
          //   let requests = [];
          for (let i = 0; i < response.data.results.length; i++) {
            HotelsData.push(new HotelsDetails(response.data.results[i]));
          }

          HotelsData.sort(function (a, b) {
            return b['rating'] - a['rating'];
          });

          dispatch(
            setHotelsDetails({
              data: HotelsData,
              Status: 200,
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(
        setHotelsDetails({
          data: [],
          Status: 50,
        }),
      );
      console.log(ex);
    }
  };
};

const setHotelsDetails = (HotelsData) => {
  return {
    HotelsData: HotelsData,
    type: types.GET_HOTELPLACES,
  };
};

export const getHotelByPlaceID = (place_id) => {
  return async (dispatch) => {
    try {
      let response = await Api.get(
        'https://maps.googleapis.com/maps/api/place/details',
        `/json?placeid=${place_id}&key=${APIkey}`,
      );
      if (response) {
        if (response.data.result) {
          let HotelData = new HotelsDetails(response.data.result);

          dispatch(
            setHotelsDescription({
              data: HotelData,
              Status: 200,
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(
        setHotelsDescription({
          data: {},
          Status: 50,
        }),
      );
      console.log(ex);
    }
  };
};

const setHotelsDescription = (HotelsDesc) => {
  return {
    HotelDecription: HotelsDesc,
    type: types.GET__HOTEL_DESCRIPTION,
  };
};

export const BookHotel = (Booking) => {
  return async (dispatch) => {
    try {
      let response = await Api.post(
        'http://192.168.1.3:3000',
        `/Booking`,
        Booking,
      );
      if (response) {
        if (response.data) {
          dispatch(
            setBooking({
              Status: 201,
            }),
          );
        } else {
          dispatch(
            setBooking({
              Status: 500,
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(
        setBooking({
          Status: 50,
        }),
      );
      console.log(ex);
    }
  };
};

const setBooking = (BookingResponse) => {
  return {
    BookingResponse: BookingResponse,
    type: types.GET_BOOKING_RSPONSE,
  };
};
