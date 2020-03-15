const NetworkManager = require('../NetworkManager/NetworkManager');
const { AccessLevel, AccountStatus, Sanction } = require('./index');
const BackError = Error;

class Account {
  constructor(username) {
    if (!username) throw new BackError('Account entity not initialized with an Account Name.');
    this.userName = username;
    this.Request = new NetworkManager('Account');
  }

  create(props = { password: 'password', accessLevel: 'User', accountStatus: 'Inactive' }) {
    if (!AccessLevel[props.accessLevel] || !AccountStatus[props.accountStatus])
      throw new BackError('Wrong AccessLevel or AccountStatus parameter.');

    this.Request.changeEndpoint('createAccount');

    let payload = {
      userName: this.userName,
      password: props.password,
      accessLevel: props.accessLevel,
      accountStatus: props.accountStatus
    };

    return this.Request.post(payload);
  }

  get() {
    this.Request.changeEndpoint('accountDetails');
    return this.Request.post({ userName: this.userName });
  }

  status() {
    this.Request.changeEndpoint('accountStatus');
    return this.Request.post({ userName: this.userName });
  }

  checkPassword(password) {
    this.Request.changeEndpoint('checkPassword');
    return this.Request.post({ userName: this.userName, password });
  }

  changePassword(password) {
    this.Request.changeEndpoint('changePassword');
    return this.Request.put({ userName: this.userName, password });
  }

  setStatus(accountStatus) {
    this.Request.changeEndpoint('accountStatus');
    return this.Request.put({ userName: this.userName, accountStatus });
  }

  setBaseAccess(accessLevel) {
    this.Request.changeEndpoint('baseAccessLevel');
    return this.Request.put({ userName: this.userName, accessLevel });
  }

  setCurrentAccess(accessLevel) {
    this.Request.changeEndpoint('currentAccessLevel');
    return this.Request.put({ userName: this.userName, accessLevel });
  }

  getAvatars() {

  }

  delete() {

  }

  Sanction() {
    return new Sanction({ userName: this.userName });
  }
}

module.exports = Account;