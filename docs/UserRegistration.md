# User Registration

Here is an example of implementation of the **allods-web-library** package into a **node.js**/**express.js** app.

The code below will demonstrate how to use the library for a user registration case.
```javascript
const { Account } = require('allods-web-library');

// express config & middlewares...

app.post('/register', function (req, res) {
  let { username, password } = req.body;
  
  let newAccount = new Account(username);
  
  newAccount.create({
    password,
    accessLevel: 'User',
    accessStatus: 'Inactive'
  }).then(result => {
    if (result.status === 'SUCCESS') {
      return res.status(201).send(result);
    } else if (result.status === 'ALREADYEXISTS') {
      return res.status(400).send('This account already exists.');
    }
  }).catch(error => res.status(500).send(error));
});
```