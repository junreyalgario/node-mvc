'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('user', {
    user_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    f_name: {
      type: 'string',
      length: 499
    },
    l_name: {
      type: 'string',
      length: 499
    },
    email: {
      type: 'string',
      length: 499
    },
    password: {
      type: 'string',
      length: 499
    },
    img_uri: {
      type: 'string',
      length: 499
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
