require('dotenv').config();

const Account = require('./components/Account/Account');

let account = new Account('Sorok');

account.get()
  .then(account => console.log(account))
  .catch(error => console.log(error));

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