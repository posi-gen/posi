export const roles = {
  dbPostgraphile: {
    key: 'dbPostgraphile',
    login: true,
    password: 'MAvpHSpoU5lp6v9y',
    comment: 'Role for Postgraphile',
    grantRoles: {
      dbAdmin: {
        key: 'dbAdmin'
      },
      dbUser: {
        key: 'dbUser'
      },
      dbAnonymous: {
        key: 'dbAnonymous'
      }
    }
  },
  dbAdmin: {
    key: 'dbAdmin',
    comment: 'Administrators access group',
    grants: {
      TABLE_person: {
        key: 'person',
        type: 'TABLE',
        permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
      },
      TABLE_account: {
        key: 'account',
        type: 'TABLE',
        permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
      }
    }
  },
  dbUser: {
    key: 'dbUser',
    comment: 'User access group',
    grants: {
      TABLE_person: {
        key: 'person',
        type: 'TABLE',
        permissions: ['SELECT']
      }
    }
  },
  dbAnonymous: {
    key: 'dbAnonymous',
    comment:
      'Access group for unknown users, only registration is available to them'
  }
}
