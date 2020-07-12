import httpClient from 'httpClient';

class GeocodingService {
  static geocode({address}) {
    return httpClient.get('/geocode/', {params: {address: address.address}});
  }

  static reverseGeocode(address) {
    return httpClient.get('/reverse/', address);
  }

  static distance(address1, address2) {
    return httpClient.get('/distance/', address1, address2);
  }
}

export default GeocodingService;
