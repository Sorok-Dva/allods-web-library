# User Login

Here is an example of implementation of the **allods-web-library** package into a **node.js**/**express.js** app.

The code below will demonstrate how to use the library for a user login case.

```javascript
const { Account } = require('allods-web-library');

// express config & middlewares...

app.post('/login', function (req, res) {
  let { username, password } = req.body;
  
  let user = new Account(username);
  
  user.checkPassword(password).then(result => {
    if (result.status === 'SUCCESS') {
      // login logic here (session persistence)
    } else {
      return res.status(400).send('Login failed. Reason', result.reason);
      // Reasons : 'account not found' or 'wrong password'
    }
  }).catch(error => res.status(500).send(error));
});
```

If you're using **passport** package for authentication, this is the same way to implement the  allods web library : 

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Account } = require('allods-web-library');


passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  let user = new Account(username);
  user.checkPassword(password).then(async result => {
    // Login abort because user not found or wrong password
    if (result.status !== 'SUCCESS') 
      return done(null, false, 'Login failed: ' + result.reason);

    // Login abort because account is not Active
    let status = await user.status();
    if (status.accountStatus !== 'Active') 
      return done(null, false, 'Login failed: Account Inactive');
    
    // Login abort because player is banned
    let sData = await account.Sanction().get();
    let isBanned = sData.sanctions
      .map(s => s.sanctionType === 'Ban' && s.isOn === true)
      .filter(v => v === true)[0];
    if (isBanned)
      console.log('Login failed: User is banned');
    
    let details = await user.get();
    let session = {
      username: details.accountName,
      lastShardName: details.lastShardName,
      onAccountServer: details.onAccountServer,
      onShard: details.onShard,
      access: {
        base: details.baseAccessLevel,
        current: details.currentAccessLevel
      },
      opts: user.opts,
    };
            
    return done(null, session);
  }).catch(error => throw new Error(error));
}));

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser((id, done) => { ... });

module.exports = passport;
```