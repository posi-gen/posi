const { snakeCase } = require('change-case')

exports.authenticate = roles => `CREATE FUNCTION authenticate(
  login TEXT,
  password TEXT
) RETURNS jwt_token AS $$
DECLARE
  account account;
BEGIN
  SELECT a.* INTO account
  FROM account as a
  where a.login = authenticate.login;

  IF account.password_hash = service.crypt(password, account.password_hash) THEN
    PERFORM set_config('jwt.claims.person_id', account.person_id::text, true);
    RETURN (account.role, account.person_id)::jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

COMMENT ON FUNCTION authenticate(TEXT, TEXT)
  IS 'Создает JWT - token, который будет использоваться для идентификации пользователя';
GRANT EXECUTE ON FUNCTION authenticate(TEXT, TEXT) TO 
  ${Object.values(roles)
    .filter(item => !item.login)
    .reduce(
      (acc, item, index) =>
        acc + (index === 0 ? '' : ', ') + snakeCase(item.key),
      ''
    )};`
