const { snakeCase } = require('change-case')

exports.initialFilling = ({
  database: { defaultAdminLogin, defaultAdminPassword, roleForAdmin }
}) =>
  `INSERT INTO person (name) VALUES('${snakeCase(defaultAdminLogin)}');
INSERT INTO account (person_id, login, password_hash, role) 
  VALUES(
    1,
    '${snakeCase(defaultAdminLogin)}',
    service.crypt('${defaultAdminPassword}', service.gen_salt('bf'))::TEXT,
    '${snakeCase(roleForAdmin)}'
  );`
