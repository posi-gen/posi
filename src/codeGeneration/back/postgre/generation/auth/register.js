const { snakeCase } = require('change-case')

exports.register = database =>
  `
  CREATE FUNCTION register(
    name TEXT,
    login TEXT,
    password TEXT
  ) RETURNS person AS $$
  DECLARE
    person person;
  BEGIN
    INSERT INTO person (name) VALUES (name)
      RETURNING * INTO person;
    INSERT INTO account (person_id, login, password_hash, role) VALUES
      (person.id, login, service.crypt(password, service.gen_salt('bf')), '${snakeCase(
        database.roleForAuthorized
      )}');
    RETURN person;
  END;
  $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

COMMENT ON FUNCTION register(TEXT, TEXT, TEXT) IS 'Регистрация пользователя';
GRANT EXECUTE ON FUNCTION register(TEXT, TEXT, TEXT) TO ${snakeCase(
    database.roleForAnonymous
  )};`
