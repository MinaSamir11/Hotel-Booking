export default class HotelsDetails {
  constructor(Result) {
    this.name = Result['name'];
    this.photos = Result['photos'];
    this.place_id = Result['place_id'];
    this.rating = Result['rating'];
    this.user_ratings_total = Result['user_ratings_total'];
    this.business_status = Result['business_status'];
    this.vicinity = Result['vicinity'];
    Result['address_components']
      ? (this.address_components = Result['address_components'])
      : null;
    Result['reviews'] ? (this.reviews = Result['reviews']) : null;
    Result['formatted_phone_number']
      ? (this.formatted_phone_number = Result['formatted_phone_number'])
      : null;
    Result['reference'] ? (this.reference = Result['reference']) : null;
  }
}
