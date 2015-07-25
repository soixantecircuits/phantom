# Phantom

Phantom is a minimal CMS destined to easily write, store and retrieve content from anywhere.

*It is currently under active development.*

### Prequesites

- have [node](http://nodejs.org), [meteor](https://www.meteor.com/install) and [mongodb](http://docs.mongodb.org/manual/installation/) installed.
- use `node v0.10` or lower in your project to be able [to compile bcrypt](https://github.com/onmodulus/demeteorizer/issues/132) (use [nvm](https://github.com/creationix/nvm)).
- have `python v2.7`, `make` and `g++` (for [node-gyp](https://github.com/TooTallNate/node-gyp/#installation)).

#### Configuring your `mongo` database:
*documentation [here](http://docs.mongodb.org/manual/tutorial/add-user-administrator/)*

  - type `$ mongo` to enter the mongo shell.
  - Create a system admin user:
  ```
  > use admin
  > db.createUser({user: "admin", pwd: "adminpwd", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})
  ```

  - Create an admin user for your isntance db:
  ```
  > use phantom
  > db.createUser({user: "admin", pwd: "phantompwd", roles: [{role: "userAdmin", db: "phantom"}]})
  ```

  - Enable authentication security for mongo by uncommenting the `#auth = true` line in `/etc/mongodb.conf`
  - Restart the mongo service: `$ [sudo] service mongod restart`
  - Test your secure connections:
    - `$ mongo --verbose -u admin -padminpwd localhost/admin` (there is **no** space between `-p` and your password).
    - `$ mongo --verbose -u admin -pphantompwd localhost/phantom`

## Installation and usage

1. Clone the repo
3. Run `$ meteor`

### Demeteorization

1. Install `demeteorizer` by running `$ [sudo] npm i -g demeteorizer`
2. Run `$ ./earthcontrol.sh` script to demeteorize the instance and install dependencies (you should take a look inside before though to understand what it does).

## Troubleshouting

If installation instructions don't work, try doing this as root.
