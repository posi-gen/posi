import React, { PureComponent, Fragment } from 'react'

export class List extends PureComponent {
  render() {
    const {
      data = [],
      renderItem = item => '',
      keyExtractor = item => null,
      ItemSeparatorComponent = null,
      ListHeaderComponent = null,
      ListFooterComponent = null
    } = this.props
    return (
      <Fragment>
        {ListHeaderComponent && <ListHeaderComponent />}
        {data.map((item, index, arr) => {
          const Item = () => renderItem(item)
          return (
            <Fragment key={keyExtractor(item) || index}>
              {ItemSeparatorComponent &&
              index !== 0 &&
              index !== arr.length - 1 ? (
                <ItemSeparatorComponent />
              ) : null}
              <Item />
            </Fragment>
          )
        })}
        {ListFooterComponent && <ListFooterComponent />}
      </Fragment>
    )
  }
}
