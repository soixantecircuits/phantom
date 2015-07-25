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

*Phantom works in collaboration with [Majordome](http://github.com/hugohil/majordome).*

1. Clone the repo
2. Duplicate the `settings.example.json` file into `settings.json` and fill it with your config.
3. Run `$ meteor --settings settings.json`

### Demeteorization

*You'll probably need [pm2](https://github.com/Unitech/pm2)*

1. Install `demeteorizer` by running `$ [sudo] npm i -g demeteorizer`
2. Duplicate the `phantom-pm2.example.json` file into `phantom-pm2.json` and fill it with your config (i.e mongodb infos and `METEOR_SETTINGS`).
2. Run `$ ./earthcontrol.sh` script to demeteorize the instance and install dependencies (you should take a look inside before though to understand what it does).

> Note: Don't forget to run `$ nvm use 0.10` each time you open a new shell window (it doesn't work in bash scripts so I can't add this to the `./earthcontrol.sh`).

## Troubleshouting

If installation instructions don't work, try doing this as root.
