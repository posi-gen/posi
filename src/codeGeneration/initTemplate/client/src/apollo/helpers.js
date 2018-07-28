const defaultFunc = () => ({})

export const mutateProp = (name, transformProps = defaultFunc) => ({
  props: ({ mutate, ownProps }) => ({
    [name]: variables =>
      mutate({
        variables
      }),
    ...transformProps(ownProps)
  })
})

export const transformListProps = ({
  data: { loading, error, mainQuery, fetchMore, refetch }
}) => ({
  loading,
  error,
  mainQuery,
  fetchMore,
  refetch: () => refetch(),
  loadMore: () =>
    fetchMore({
      variables: { after: mainQuery.pageInfo.endCursor },
      updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
        const previousMainQuery = previousResult.mainQuery || {}
        const currentMainQuery = fetchMoreResult.mainQuery || {}
        const previousNodes = previousMainQuery.nodes || []
        const currentNodes = currentMainQuery.nodes || []
        return {
          ...previousResult,
          mainQuery: {
            ...previousMainQuery,
            nodes: [...previousNodes, ...currentNodes],
            pageInfo: currentMainQuery.pageInfo
          }
        }
      }
    })
})
