import React, { Fragment, PureComponent } from 'react'
// import { Table } from 'components'
import { Heading } from 'ui'
// import { getTableColumns } from 'helpers'

// const data = [
//   { id: 1, name: 'Vasya' },
//   {
//     id: 2,
//     name: 'Petya',
//     surname: 'Petrov',
//     dateOfBirth: '1990-01-01'
//   }
// ]

// const settings = {
//   columns: {
//     id: { name: 'id', title: 'ID' },
//     name: { name: 'name', title: 'Name' },
//     surname: { name: 'surname', title: 'Surname', hidden: false }
//   },
//   useOrder: false
// }

export class Auth extends PureComponent {
  create = () => console.log('create')
  update = () => console.log('update')
  delete = () => console.log('delete')
  render() {
    return (
      <Fragment>
        <Heading mt={1} children="Auth" />
        {/* <Table
          data={data}
          columns={getTableColumns(data, settings)}
          keyExtractor={item => item.id}
          commands={{
            create: { name: 'Create', action: this.create },
            update: { name: 'Update', action: this.update },
            delete: { name: 'Delete', action: this.delete }
          }}
          match={this.props.match}
        /> */}
      </Fragment>
    )
  }
}
