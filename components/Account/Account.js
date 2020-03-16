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

    let payload = {
      userName: this.userName,
      password: props.password,
      accessLevel: props.accessLevel,
      accountStatus: props.accountStatus
    };

    return this.Request
      .changeEndpoint('createAccount')
      .post(payload);
  }

  get() {
    return this.Request
      .changeEndpoint('accountDetails')
      .post({ userName: this.userName });
  }

  status() {
    return this.Request
      .changeEndpoint('accountStatus')
      .post({ userName: this.userName });
  }

  checkPassword(password) {
    return this.Request
      .changeEndpoint('checkPassword')
      .post({ userName: this.userName, password });
  }

  changePassword(password) {
    return this.Request
      .changeEndpoint('changePassword')
      .put({ userName: this.userName, password });
  }

  setStatus(accountStatus) {
    return this.Request
      .changeEndpoint('accountStatus')
      .put({ userName: this.userName, accountStatus });
  }

  setBaseAccess(accessLevel) {
    return this.Request
      .changeEndpoint('baseAccessLevel')
      .put({ userName: this.userName, accessLevel });
  }

  setCurrentAccess(accessLevel) {
    return this.Request
      .changeEndpoint('currentAccessLevel')
      .put({ userName: this.userName, accessLevel });
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