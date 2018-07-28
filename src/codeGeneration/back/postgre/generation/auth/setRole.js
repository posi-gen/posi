exports.setRole = database => `CREATE FUNCTION set_role(
  user_id INTEGER,
  role_name TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  UPDATE account SET role = role_name WHERE person_id = user_id;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION set_role(INTEGER, TEXT) is 'Установка пользователю новой роли.';
GRANT EXECUTE ON FUNCTION set_role(INTEGER, TEXT) TO ${snakeCase(
  database.roleForAdmin
)};`
