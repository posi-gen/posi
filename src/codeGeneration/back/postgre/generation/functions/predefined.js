exports.current_person_id = `CREATE FUNCTION current_person_id() RETURNS INTEGER AS $$
  SELECT id
  FROM person
  WHERE id = current_setting('jwt.claims.person_id')::INTEGER
$$ LANGUAGE SQL STABLE;
COMMENT ON FUNCTION current_person_id() is 'Получение данных текущего пользователя';`
