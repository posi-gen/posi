exports.enumRoles = roles => `CREATE TYPE role AS ENUM (
  ${Object.values(roles)
    .filter(item => !item.login)
    .reduce(
      (acc, item, index) =>
        acc + (index === 0 ? '' : ',\n\t') + snakeCase(item.key),
      ''
    )}
);`
