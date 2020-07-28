import { httpMethod, ApiBuilder } from 'api';

const offersAPI = {
  getOffers() {
    const endpoint = new ApiBuilder()
      .setHttpMethod(httpMethod.GET)
      .setPath('/offers')
      .build();

    return endpoint();
  },
  updateOffer(updatedOffer) {
    const endpoint = new ApiBuilder()
      .setHttpMethod(httpMethod.POST)
      .setPath('/offers')
      .setBody(updatedOffer)
      .setConfig({
        // headers: { 'X-Custom-Header': 'foobar1' },
        timeout: 10000,
      })
      .build();

    return endpoint();
  },
  deleteOffer(offerId) {
    const endpoint = new ApiBuilder()
      .setHttpMethod(httpMethod.DELETE)
      .setPath(`/offers/${offerId}`)
      .build();

    return endpoint();
  },
};

export { offersAPI };
