import { Axios } from './Axios';

const httpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  HEAD: 'head',
  OPTIONS: 'options',
  PATCH: 'patch',
  DELETE: 'delete',
};

class EndpointBuilder {
  constructor(options = {}) {
    const {
      rootEndpoint = 'http://5dd870fc505c590014d3bcbf.mockapi.io/domrf/',
      headers = {},
      timeout = 5000,
    } = options;

    this.axiosInstance = new Axios().create(rootEndpoint, headers, timeout);
  }

  setHttpMethod(methodName) {
    switch (methodName) {
      case httpMethod.GET:
      case httpMethod.HEAD:
      case httpMethod.OPTIONS:
      case httpMethod.DELETE: {
        this.endpoint = () => this.axiosInstance[methodName](this.path, this.config)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error));
        break;
      }

      case httpMethod.POST:
      case httpMethod.PUT:
      case httpMethod.PATCH: {
        this.endpoint = (data = {}) => this.axiosInstance[methodName](this.path, data, this.config)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error));
        break;
      }

      default: {
        // eslint-disable-next-line no-console
        console.error('Unknown http method');
      }
    }

    return this;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setBody(body) {
    this.body = body || {};
    return this;
  }

  setConfig(config) {
    this.config = config || {};
    return this;
  }

  build() {
    return this.endpoint;
  }
}

export { httpMethod, EndpointBuilder };
