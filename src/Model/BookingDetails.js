export default class BookingDetails {
  constructor(Result) {
    this.userID = Result['userID'];
    this.id = Result['id'];
    this.hotelName = Result['hotelName'];
    this.photoURL = Result['photoURL'];
    this.place_id = Result['place_id'];
    this.startdate = Result['startdate'];
    this.enddate = Result['enddate'];
    this.vicinity = Result['vicinity'];
  }
}
