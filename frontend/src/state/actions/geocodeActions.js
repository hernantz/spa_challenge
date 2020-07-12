import { createThunk, createAction } from '@rootstrap/redux-tools';
import geocodingService from 'services/geocodingService';
import parseError from 'utils/parseError';

export const geocode = createThunk('GEOCODE', async address => {
  try {
    const {
      data: { data }
    } = await geocodingService.geocode({ address });
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});


