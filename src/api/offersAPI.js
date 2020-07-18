import api from 'api';

const offersAPI = {
  getOffers() {
    return api.MOCK.get('/offers');
  },
  updateOffer(updatedOffer) {
    return api.MOCK.post('/offers/update', updatedOffer);
  },
  deleteOffer(offerId) {
    return api.MOCK.delete(`/offers/${offerId}`);
  },
};

export { offersAPI };
