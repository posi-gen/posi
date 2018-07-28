const policyTypes = require('../../../../../../constants/policyTypes')

module.exports = (conditions = '', policyType) =>
  conditions.reduce((acc, item, index) => {
    const delimiter =
      policyType === policyTypes.PERMISSIVE ? (index === 0 ? '' : 'OR') : 'AND'
    return acc + delimiter + item
  }, '')
