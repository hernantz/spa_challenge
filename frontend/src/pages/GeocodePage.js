import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGeocoding, useDispatch } from 'hooks';
import GeocodeForm from 'components/challenge/GeocodeForm.js';
import { geocode } from 'state/actions/geocodeActions';

const GeocodePage = () => {
  const { addressGeocode } = useGeocoding();
  const geocodeRequest = useDispatch(geocode);

  return (
    <div>
      <p>
        <FormattedMessage id="geocode.title" />
      </p>
      <GeocodeForm onSubmit={geocodeRequest} />
      {addressGeocode.lat && <p>Lat: {addressGeocode.lat}</p>}
      {addressGeocode.lng && <p>Lng: {addressGeocode.lng}</p>}
    </div>
  );
};

export default memo(GeocodePage);
