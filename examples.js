require('dotenv').config();

const Account = require('./components/Account/Account');

let account = new Account('Sorok');

// User Login
account.checkPassword('42').then(async result => {
  // Login abort because user not found or wrong password
  if (result.status !== 'SUCCESS')
    console.log('Login failed: ' + result.reason);

  // Login abort because account is not Active
  let status = await account.status();
  if (status.accountStatus !== 'Active')
    console.log('Login failed: Account Inactive');

  // Login abort because player is banned
  let sData = await account.Sanction().get();
  let isBanned = sData.sanctions
    .map(s => s.sanctionType === 'Ban' && s.isOn === true)
    .filter(v => v === true)[0];
  if (isBanned)
    console.log('Login failed: User is banned');

  let details = await account.get();
  let session = {
    username: details.accountName,
    lastShardName: details.lastShardName,
    onAccountServer: details.onAccountServer,
    onShard: details.onShard,
    access: {
      base: details.baseAccessLevel,
      current: details.currentAccessLevel
    }
  };
  console.log(session)
});

/*account.get()
  .then(account => console.log(account))
  .catch(error => console.log(error));*/

/*account.create({
  password: 'password',
  accessLevel: 'User',
  accountStatus: 'Active'
}).then(result => {
  console.log(result);
  account.get()
    .then(account => console.log(account))
    .catch(error => console.error(error));
}).catch(error => console.error(error));*/

/*account.Sanction().set({
  type: 'TotalTradeBan',
  reason: 'API TEST',
  gmName: 'Website',
  expireTime: 1586965256
}).then(data => {
  console.log(data);
  account.Sanction().get().then(sanctions => console.log(sanctions));
}).catch(error => console.error(error));*/

/*account.Sanction().delete({
  type: 'TotalTradeBan',
  reason: 'API TEST Unban',
  gmName: 'Website'
}).then(data => {
  console.log(data);
  account.Sanction().get().then(sanctions => console.log(sanctions));
}).catch(error => console.error(error));*/