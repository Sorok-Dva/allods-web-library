const BackError = Error;
const request = require('request');

let retrieveFullHost = (server) => {
  switch (server) {
    case 'Account':
      if (!process.env.ACCOUNT_SERVER_HOST || !process.env.ACCOUNT_SERVER_PORT)
        throw new BackError('Unable to reach config data, please verify your .env file.');
      return { host: process.env.ACCOUNT_SERVER_HOST, port: process.env.ACCOUNT_SERVER_PORT };
    default:
      throw new BackError('Unknow server');
  }
};

class NetworkManager {
  constructor(server, endpoint) {
    this.server = server;
    this.endpoint = endpoint;
    this.fullHost = retrieveFullHost(this.server);
    this.reachable = false;
    this.requestOptions = {
      url: 'http://' + this.fullHost.host + ':' + this.fullHost.port,
      method: 'GET'
    };
  }

  resolveHost() {
    return request(this.requestOptions, (error, response) => {
      if (error) {
        console.error('Unable to reach the server ' + JSON.stringify(this.fullHost));
        return false;
      }
      this.reachable = true;
    });
  };

  get(props) {
    this.requestOptions.method = 'GET';
    return this.execute(props);
  }

  post(props) {
    this.requestOptions.method = 'POST';
    return this.execute(props);
  }

  put(props) {
    this.requestOptions.method = 'PUT';
    return this.execute(props);
  }

  delete(props) {
    this.requestOptions.method = 'DELETE';
    return this.execute(props);
  }

  execute(data) {
    if (!this.reachable) this.resolveHost();
    return new Promise((resolve, reject) => {
      let requestOptions = { ...this.requestOptions, json: data };
      requestOptions.url += '/' + this.endpoint;

      return request(requestOptions, (error, response) => {
        if (error) return reject(error);
        else return resolve(response.body);
      });
    });
  }

  changeEndpoint(endpoint) {
    this.endpoint = endpoint;
    return this;
  }
}

module.exports = NetworkManager;
