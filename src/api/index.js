import axios from 'axios';

const TIMEOUT = 5000;
const MOCK_API_URL = 'http://5dd870fc505c590014d3bcbf.mockapi.io/domrf/';

const httpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  HEAD: 'head',
  OPTIONS: 'options',
  PATCH: 'patch',
  DELETE: 'delete',
};

const getBaseAPI = (baseURL) => {
  const options = {
    baseURL,
    timeout: TIMEOUT,
  };

  const api = axios.create(options);

  const onSuccessRequest = (config) => config;
  const onFailureRequest = (error) => Promise.reject(error);
  api.interceptors.request.use(onSuccessRequest, onFailureRequest);

  const onSuccessResponse = (response) => response;
  const onFailureResponse = (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  };
  api.interceptors.response.use(onSuccessResponse, onFailureResponse);

  return api;
};

const makeAPI = (baseURL, httpMethods = Object.values(httpMethod)) => {
  const baseAPI = getBaseAPI(baseURL);

  return httpMethods.reduce((result, method) => {
    switch (method) {
      case httpMethod.GET:
      case httpMethod.HEAD:
      case httpMethod.OPTIONS:
      case httpMethod.DELETE: {
        result[method] = (url, config = {}) => baseAPI[method](url, config)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error));

        return result;
      }

      case httpMethod.POST:
      case httpMethod.PUT:
      case httpMethod.PATCH: {
        result[method] = (url, data = {}, config = {}) => baseAPI[method](url, data, config)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error));

        return result;
      }

      default: {
        return result;
      }
    }
  }, {});
};

export default {
  PROJECT: makeAPI(),
  MOCK: makeAPI(MOCK_API_URL, [httpMethod.GET, httpMethod.POST, httpMethod.DELETE]),
};
