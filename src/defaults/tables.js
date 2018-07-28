export const tables = {
  person: {
    key: 'person',
    comment: 'Физическое лицо',
    columns: {
      id: {
        key: 'id',
        type: 'SERIAL',
        comment: 'id'
      },
      name: {
        key: 'name',
        type: 'TEXT',
        comment: 'name'
      }
    },
    pkey: { id: { key: 'id' } },
    policy: {
      SELECT: {
        key: 'SELECT',
        users: {
          dbAdmin: {
            key: 'dbAdmin',
            conditions: {
              forAll: {
                key: 'forAll',
                using: {
                  type: 'BOOLEAN',
                  condition: 'true'
                }
              }
            }
          },
          dbUser: {
            key: 'dbUser',
            conditions: {
              isOwner: {
                key: 'isOwner',
                type: 'PERMISSIVE',
                using: {
                  type: 'FUNCTION',
                  column: 'id',
                  procedure: 'current_person_id'
                }
              }
            }
          }
        }
      },
      INSERT: {
        key: 'INSERT',
        users: {
          dbAdmin: {
            key: 'dbAdmin',
            conditions: {
              forAll: {
                key: 'forAll',
                check: {
                  type: 'BOOLEAN',
                  condition: 'true'
                }
              }
            }
          }
        }
      },
      UPDATE: {
        key: 'UPDATE',
        users: {
          dbAdmin: {
            key: 'dbAdmin',
            conditions: {
              forAll: {
                key: 'forAll',
                using: {
                  type: 'BOOLEAN',
                  condition: 'true'
                },
                check: {
                  type: 'BOOLEAN',
                  condition: 'true'
                }
              }
            }
          }
        }
      },
      DELETE: {
        key: 'DELETE',
        users: {
          dbAdmin: {
            key: 'dbAdmin',
            conditions: {
              forAll: {
                key: 'forAll',
                using: {
                  type: 'BOOLEAN',
                  condition: 'true'
                }
              }
            }
          }
        }
      }
    }
  },
  account: {
    key: 'account',
    comment: 'User accaunt',
    columns: {
      person_id: {
        key: 'person_id',
        type: 'INTEGER',
        comment: 'person id'
      },
      login: {
        key: 'login',
        type: 'TEXT',
        notNull: true,
        comment: 'login'
      },
      passwordHash: {
        key: 'passwordHash',
        type: 'TEXT',
        notNull: true,
        comment: 'Password hash'
      },
      role: {
        key: 'role',
        type: 'TEXT',
        notNull: true,
        comment: 'The role, which determines the level of account access'
      }
    },
    pkey: { person_id: { key: 'person_id' } },
    fkeys: {
      fkeyAccountPerson: {
        key: 'fkeyAccountPerson',
        column: 'person_id',
        reference: 'person'
      }
    },
    check: {
      loginFirstIsLetterOtherLettersAndNumbers: {
        key: 'loginFirstIsLetterOtherLettersAndNumbers',
        params: {
          login: { key: 'login' }
        },
        condition: `%%login%% ~* '^[a-z]+[a-z0-9]*$'`
      }
    }
  }
}
