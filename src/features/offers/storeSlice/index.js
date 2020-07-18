import { createSlice } from '@reduxjs/toolkit';

import { offersAPI } from 'api/offersAPI';

import { createOperation } from 'store/createOperation';

import { normalizeOffers } from './normalize';

const sliceName = 'offers';


const { operation: fetchOffers, reducers } = createOperation({
  sliceName,
  fetchFunction: offersAPI.getOffers,
  normalizeFunction: normalizeOffers,
  mapFunction: (data) => {
    if ('entities' in data && 'result' in data) {
      const { entities, result } = data;
      return {
        offer: entities.offers,
        offerIds: result,
      };
    }

    return data;
  },
});


const offersSlice = createSlice({
  name: sliceName,
  initialState: {},
  reducers,
});

export { fetchOffers };

export default offersSlice.reducer;
