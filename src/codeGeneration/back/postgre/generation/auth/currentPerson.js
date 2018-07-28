const { snakeCase } = require('change-case')

exports.currentPerson = roles => `CREATE FUNCTION current_person() RETURNS person AS $$
  SELECT *
  FROM person
  WHERE id = current_setting('jwt.claims.person_id')::INTEGER
$$ LANGUAGE SQL STABLE;
COMMENT ON FUNCTION current_person() is 'Получение данных текущего пользователя';
GRANT EXECUTE ON FUNCTION current_person() TO ${Object.values(roles)
  .filter(item => !item.login)
  .reduce(
    (acc, item, index) => acc + (index === 0 ? '' : ', ') + snakeCase(item.key),
    ''
  )};
`
