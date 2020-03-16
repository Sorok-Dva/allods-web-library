const chai = require('chai'),
  expect = chai.expect,
  { Account } = require('../index'),
  account = new Account('user');

describe('# Account', () => {
  describe('Create an Account Entity', () => {
    it('should returns an Account Entity.', async () => {
      expect(account instanceof Account).to.be.equal(true);
    });
  });
});
