module.exports = class AccessLevel {
  constructor(value = 'User') {
    this.name = value;
  }

  static User() {
    return new AccessLevel('User');
  }

  static Master() {
    return new AccessLevel('Master');
  }

  static Developer() {
    return new AccessLevel('Developer');
  }
};