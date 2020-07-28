import axios from 'axios';

class Axios {
  setRequestInterceptors() {
    const onSuccessRequest = (config) => config;
    const onFailureRequest = (error) => Promise.reject(error);

    this.api.interceptors.request.use(onSuccessRequest, onFailureRequest);
  }

  setResponseInterceptors() {
    const onSuccessResponse = (response) => response;
    const onFailureResponse = (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    };

    this.api.interceptors.response.use(onSuccessResponse, onFailureResponse);
  }

  create(rootEndpoint, headers, timeout) {
    this.api = axios.create({
      timeout,
      headers,
      baseURL: rootEndpoint,
    });
    this.setRequestInterceptors();
    this.setResponseInterceptors();

    return this.api;
  }
}

export { Axios };
