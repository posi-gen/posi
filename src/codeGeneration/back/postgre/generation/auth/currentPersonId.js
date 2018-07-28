const { snakeCase } = require('change-case')

exports.currentPersonId = roles => `CREATE FUNCTION current_person_id() RETURNS INTEGER AS $$
  SELECT id
  FROM person
  WHERE id = current_setting('jwt.claims.person_id')::INTEGER
$$ LANGUAGE SQL STABLE;
COMMENT ON FUNCTION current_person_id() is 'Получение id текущего пользователя';
GRANT EXECUTE ON FUNCTION current_person_id() TO ${Object.values(roles)
  .filter(item => !item.login)
  .reduce(
    (acc, item, index) => acc + (index === 0 ? '' : ', ') + snakeCase(item.key),
    ''
  )};
`
