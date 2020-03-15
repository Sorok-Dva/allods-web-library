const NetworkManager = require('../NetworkManager/NetworkManager');

module.exports = class Sanction {
  constructor(props = { userName: '' }) {
    this.userName = props.userName;
    this.Request = new NetworkManager('Account', 'sanctions');
  }

  get() {
    return this.Request.post({ userName: this.userName })
      .then(result => result)
      .catch(error => console.error(error.body));
  }

  set(props = { type: '', reason: '', gmName: '', expireTime: ''}) {
    let payload = {
      userName: this.userName,
      sanction: props.type,
      ...props,
    };
    return this.Request.put(payload)
      .then(result => result)
      .catch(error => console.error(error.body));
  }

  delete(props = { type: '', reason: '', gmName: ''}) {
    let payload = {
      userName: this.userName,
      sanction: props.type,
      ...props,
    };
    return this.Request.delete(payload)
      .then(result => result)
      .catch(error => console.error(error.body));
  }
};