import * as types from '../Actions/types';

import initialState from './initialState';

export default function (state = initialState.Places, action) {
  switch (action.type) {
    case types.GET_HOTELPLACES: {
      return {
        ...state,
        HotelsDetails: action.HotelsData.data,
        StatusHotelsDetails: action.HotelsData.Status,
      };
    }
    case types.GET__HOTEL_DESCRIPTION: {
      return {
        ...state,
        HotelDescription: action.HotelDecription.data,
        StatusHotelDescription: action.HotelDecription.Status,
      };
    }
    case types.GET_BOOKING_RSPONSE: {
      return {
        ...state,
        StatusHotelDescription: action.BookingResponse.Status,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
