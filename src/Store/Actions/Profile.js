import * as types from './types';

import Api from '../../Utils/Api';

import BookingDetails from '../../Model/BookingDetails'; //get new instance

export const getBookingDetails = (User) => {
  return async (dispatch) => {
    try {
      let response = await Api.get(
        'http://192.168.1.3:3000',
        `/Booking?userID=${User.userID}`,
      );

      if (response) {
        if (response.data) {
          let BookingDetailsList = [];
          for (let i = 0; i < response.data.length; i++) {
            BookingDetailsList.push(new BookingDetails(response.data[i]));
          }

          dispatch(
            setBookingDetails({
              data: BookingDetailsList,
              Status: 200,
            }),
          );
        }
      }
    } catch (ex) {
      dispatch(
        setBookingDetails({
          data: [],
          Status: 50,
        }),
      );
      console.log('Ex', ex);
    }
  };
};

const setBookingDetails = (BookingResponse) => {
  return {
    BookingResponse: BookingResponse,
    type: types.GET_BOOKING_DETAILS,
  };
};
