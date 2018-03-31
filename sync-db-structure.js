'use strict';
require('./project/dev-env');
require('@my/main-api-server')
  .syncDatabase()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
