import { createReducer } from '@rootstrap/redux-tools';
import { geocode } from 'state/actions/geocodeActions';

const initialState = {
    addressGeocode: {}
};

const actionHandlers = {
  [geocode.success]: (state, { payload }) => {
    state.addressGeocode = payload.addressGeocode;
  },
};

export default createReducer(initialState, actionHandlers);
