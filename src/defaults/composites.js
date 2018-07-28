export const composites = {
  jwtToken: {
    key: 'jwtToken',
    comment: 'json web token',
    columns: {
      role: {
        key: 'role',
        type: 'TEXT'
      },
      personId: {
        key: 'personId',
        type: 'INTEGER'
      }
    }
  }
}
