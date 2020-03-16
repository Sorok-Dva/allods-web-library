# ALLODS-WEB-LIBRARY
[![npm version](https://badgen.net/npm/v/allods-web-library)](https://www.npmjs.com/package/allods-web-library)
[![build](https://badgen.net/travis/Sorok-Dva/allods-web-library)](https://travis-ci.com/github/Sorok-Dva/allods-web-libraryy)
[![codecov](https://badgen.net/codecov/c/github/Sorok-Dva/allods-web-library/master?icon=codecov)](https://codecov.io/gh/Sorok-Dva/allods-web-library)
[![npm downloads](https://badgen.net/npm/dm/allods-web-library)](https://www.npmjs.com/package/allods-web-library)
[![Merged PRs](https://badgen.net/github/merged-prs/Sorok-Dva/allods-web-library)](https://github.com/Sorok-Dva/allods-web-library)

## About
This repository is a rework of the web library of Allods dedicated to all server owners that want a web technology more newest and better than PHP.
We (especially [@paulus-allods](https://github.com/paulus-allods/)) have also reworks the [API Core in JAVA](https://github.com/paulus-allods/AllodsOnlineAPI) to change from Hessian Protocol to JSON Rest. This will allows an easiest use of the web library to control your game server.

What you'll be able to do ?

- Control Account : Create, Update, Sanctions, Collection Editions Management
- Control Game Server : define maxUsersOnShard limit

More incoming (BillingServer API, GameTool & LogServer and much more) !

## Warning
This web library should be used only on a localhost environment. You should also close all game API ports.
If you use it through a public IP or do not close these ports, **EVERYBODY** will be able to use the full API, so be really careful with this.

_(if needed by some server owners, we'll be able to provide a solution that will allows remote connection with gameTool, open a issue for that.)_

## How to start ?
Start by moving the jar files in the `/jars` folder into your `gameServer/server_bin/jars` (make a backup of those files before just in case).
Start wanted server, and you can now use this web library to manipulate your game server.

Install `allods-web-library` package
```bash
npm i -s allods-web-library
```

Now create your `.env` file in your project with servers data variables : 
(this web library save these data into process.env, using dotenv package.)
```dotenv
ACCOUNT_SERVER_HOST=127.0.0.1
ACCOUNT_SERVER_PORT=9337
BILLING_SERVER_HOST=127.0.0.1
BILLING_SERVER_PORT=9336
...
```

Now you can call API Collection that you want like it : 
```javascript
const { Account, Billing, Item, GameTool, LogServer } = require('allods-web-library');

let user = new Account('username');
...
```
You also have access to the `NetworkManager` class of the library that allows you to make your own request to the api servers, useful if you want to create your own JAVA API endpoints or methods.
```javascript
const { NetworkManager } = require('allods-web-library');

(async () => {
  let Request = new NetworkManager('Account');

  Request.changeEndpoint('myOwnEndPoint-getAvatars');
  let avatars = await Request.get();
})();
```

## API Collection
Here is the web API Collection of an Allods Game Server, with code examples to get those data with this web library (if not implemented, will shows request form data).

### Account

- **POST** - /createAccount
```javascript
let Account = new Account('Username');
Account.create({
  password,
  accessLevel,
  accountStatus
});
```
- **POST** - /accountDetails
```javascript
let Account = new Account('Username');
Account.get().then(accountData => accountData);
```
- **POST** - /accountStatus
```json
{
  "userName": "userName"
}
```
- **POST** - /accountInfo
```json
{
  "userName": "userName"
}
```
- **POST** - /checkPassword
```javascript
let Account = new Account('Username');
Account.checkPassword('password').then(result => result);
// {"status":"SUCCESS","reason":"OK"} or
// {"status":"FAILED","reason":"wrong password"}
```
- **PUT** - /changePassword
```javascript
let Account = new Account('Username');
Account.changePassword('newPassword').then(result => result);
```
- **PUT** - /accountStatus
```javascript
let Account = new Account('Username');
// Active or Inactive
Account.setStatus('Active').then(result => result);
```
- **PUT** - /baseAccessLevel
```javascript
let Account = new Account('Username');
// User, Master or Developer
Account.setBaseAccess('User').then(result => result);
```
- **PUT** - /currentAccessLevel
```javascript
let Account = new Account('Username');
// User, Master or Developer
Account.setCurrentAccess('User').then(result => result);
```

### Sanction

- **POST** - /sanctions
```javascript
let Account = new Account('Username');
Account.Sanction().get().then(sanctions => sanctions);
// {"status":"SUCCESS","reason":"OK","sanctions":[]}
```
- **PUT** - /sanctions
```javascript
let Account = new Account('Username');
Account.Sanction().set({
  type: 'Ban', // Ban, Silence, PlayerTradeBan, TotalTradeBan
  reason: 'Sanction Reason',
  gmName: 'Game Master Nickname',
  expireTime: 'timestamp'
}).then(result => {
  console.log(result);
  Account.Sanction().get().then(sanctions => sanctions);
});
// {"status":"SUCCESS","reason":"OK"}
// {"status":"SUCCESS","reason":"OK","sanctions":[{"login":"Username","sanctionType":"Ban","isOn":true,"expireTime":1586965256,"reason":"Sanction Reason","gmName":"Game Master Nickname"}]}
```
- **DELETE** - /sanctions
```javascript
// NOTE : this will not hard delete the row in the db. It will updates the sanction with the new values you set below and with the flag column at 0

let Account = new Account('Username');
Account.Sanction().delete({
  type: 'Ban', // Which sanction type to remove ?
  reason: 'Sanction Removal Reason', // Reason of the deletion of the sanction
  gmName: 'Game Master who removed sanction', // name of the GM who delete the sanction
}).then(result => {
  console.log(result);
  Account.Sanction().get().then(sanctions => sanctions);
});
// {"status":"SUCCESS","reason":"OK"}
// {"status":"SUCCESS","reason":"OK","sanctions":[{"login":"Username","sanctionType":"Ban","isOn":false,"expireTime":1586965256,"reason":"Sanction Reason","gmName":"Game Master Nickname"}]}
```

### Collection Editions

... soon