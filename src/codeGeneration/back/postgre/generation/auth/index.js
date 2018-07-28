const { snakeCase } = require('change-case')
const { register } = require('./register')
const { authenticate } = require('./authenticate')
const { currentPerson } = require('./currentPerson')
const { currentPersonId } = require('./currentPersonId')
// const { setRole } = require('./setRole')

exports.auth2str = ({ database, roles }) =>
  // enumRoles(roles) +
  register(database) +
  ('\n\n' + authenticate(roles)) +
  ('\n\n' + currentPerson(roles)) +
  ('\n\n' + currentPersonId(roles)) +
  // ('\n\n' + setRole(database)) +
  `\n\nALTER DATABASE ${snakeCase(database.key)} SET jwt.claims.person_id TO 0;`
