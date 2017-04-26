const knex = require('knex');
const settings = require("../settings");
const config = {
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
};

module.exports = {
  connect: () => knex({
    client: 'pg',
    connection: config
  })
};
