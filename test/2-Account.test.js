const chai = require('chai'),
  expect = chai.expect,
  { NetworkManager } = require('../index'),
  request = new NetworkManager('Account');

describe('# Network Manager', () => {
  describe('Create a request for Account server', () => {
    it('should returns a NetworkManager Entity with no endpoint', () => {
      expect(request instanceof NetworkManager).to.be.equal(true);
      expect(request.endpoint).to.be.equal(undefined);
      request.changeEndpoint('accountDetails');
    });

    it('should returns a NetworkManager Entity with "accountDetails" endpoint', () => {
      return expect(request.endpoint).to.be.equal('accountDetails');
    });
  });
});
