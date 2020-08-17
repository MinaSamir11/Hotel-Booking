import * as types from '../Actions/types';

import initialState from './initialState';

export default function (state = initialState.Profile, action) {
  switch (action.type) {
    case types.GET_BOOKING_DETAILS: {
      return {
        ...state,
        BookingDetails: action.BookingResponse.data,
        StatusBookingDetails: action.BookingResponse.Status,
      };
    }
    case types.RESET_STATE: {
      return {
        BookingDetails: [],
        StatusBookingDetails: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
