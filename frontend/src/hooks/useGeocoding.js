import { useSelector, shallowEqual } from 'react-redux';

const useGeocoding = () =>
  useSelector(
    ({ geocode: { addressGeocode } }) => ({
      addressGeocode
    }),
    shallowEqual
  );

export default useGeocoding;
