import {
  // routerReducer,
  push,
  replace
  // go,
  // goBack,
  // goForward
} from 'react-router-redux'

export const getAddAndGo = (name, dispatch) => ({ parent, url }) => {
  dispatch[name].add(parent)
  dispatch(push(url + `/${name}s/_new`))
}

export const getEffEdit = (name, dispatch) => (payload, { router }) => {
  dispatch[name].edit(payload)
  const { key, oldKey } = payload.data
  if (key !== oldKey) {
    dispatch(replace(replaceEnd(router.location.pathname, oldKey, key)))
  }
}

const replaceEnd = (source, substr, newSubstr) => {
  const pcs = source.split(substr)
  const lastPc = pcs.pop()
  return pcs.join(substr) + newSubstr + lastPc
}
