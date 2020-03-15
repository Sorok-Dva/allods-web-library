module.exports = class AccountStatus {
  constructor(value = 'Inactive') {
    this.name = value;
  }

  static Inactive() {
    return new AccountStatus('Inactive');
  }

  static Active() {
    return new AccountStatus('Active');
  }

};