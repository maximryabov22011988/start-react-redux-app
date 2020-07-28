import { httpMethod, EndpointBuilder } from 'api';

const offersAPI = {
  getOffers() {
    const endpoint = new EndpointBuilder()
      .setHttpMethod(httpMethod.GET)
      .setPath('/offers')
      .build();

    return endpoint();
  },
  updateOffer(updatedOffer) {
    const endpoint = new EndpointBuilder()
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
    const endpoint = new EndpointBuilder()
      .setHttpMethod(httpMethod.DELETE)
      .setPath(`/offers/${offerId}`)
      .build();

    return endpoint();
  },
};

export { offersAPI };
