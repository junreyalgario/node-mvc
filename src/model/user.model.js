const pgsql = require('../db/sql.db').pgsql;

exports.create = (user) => {
  let sql =`INSERT INTO "public"."user"(f_name, l_name, email, password) 
            VALUES($1, $2, $3, $4) RETURNING *`;
  return pgsql.query(sql, user);
}

exports.getUserByEmail = (email) => {
  const sql =`SELECT * FROM "public"."user"
              WHERE email = $1`;

  return pgsql.query(sql, [email]);
}