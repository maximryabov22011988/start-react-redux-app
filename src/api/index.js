import axios from 'axios';

const TIMEOUT = 5000;
const mockApiUrl = 'http://5dd870fc505c590014d3bcbf.mockapi.io/domrf/';

const getBaseAPI = (baseURL) => {
  const options = {
    baseURL,
    timeout: TIMEOUT,
  };

  const api = axios.create(options);

  const onSuccessRequest = (request) => request;
  const onFailRequest = (error = {}) => Promise.reject(new Error(error?.response?.data));

  api.interceptors.request.use(onSuccessRequest, onFailRequest);

  const onSuccessResponse = (response) => response;
  const onFailResponse = (error = {}) => Promise.reject(new Error(error?.response?.data));

  api.interceptors.response.use(onSuccessResponse, onFailResponse);

  return api;
};

const makeAPI = (baseURL) => {
  const baseAPI = getBaseAPI(baseURL);

  const get = (url, conf = {}) => baseAPI
    .get(url, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  const post = (url, data = {}, conf = {}) => baseAPI
    .post(url, data, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  const put = (url, data = {}, conf = {}) => baseAPI
    .put(url, data, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  const head = (url, conf = {}) => baseAPI
    .head(url, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  const options = (url, conf = {}) => baseAPI
    .options(url, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  const patch = (url, data = {}, conf = {}) => baseAPI
    .patch(url, data, conf)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));

  return {
    get, post, put, head, options, patch,
  };
};

export { makeAPI };

export default {
  PROJECT: makeAPI(),
  MOCK: makeAPI(mockApiUrl),
};
