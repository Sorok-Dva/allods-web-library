module.exports = class UserRole {
  constructor(value = 'User') {
    this.name = value;
  }

  static User() {
    return new UserRole('User');
  }

  static Tester() {
    return new UserRole('Tester');
  }

  static Master() {
    return new UserRole('Master');
  }

  static Developer() {
    return new UserRole('Developer');
  }

  static Statistic() {
    return new UserRole('Statistic');
  }

  static SuperUser() {
    return new UserRole('SuperUser');
  }
};