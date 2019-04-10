# passport-with-roles

A small middleware to authorize specific roles on your routes. Checks the user key on your request object after running through passport.js

### Installation

*requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```js
// require library
const PassportWithRoles = require('passport-with-roles')
// then instantiate
const hasRoles = new PassportWithRoles("role")
// then pass as middleware after passport
router.get('/', jwtStrategy, hasRoles.authorize(["admin"]), controller)
// this will return 403 if user role is not included in authorize array.
```

You can instantiate with no parameters to use the default path of "role". This path should point to the desired key on your user object passed to the request by passport. Currently allows only top level paths (nothing like "auth.roles"). Expects a string.

#### Updating role path
You can set the role path with
```.js
hasRoles.setRolePath("new_role")
```

