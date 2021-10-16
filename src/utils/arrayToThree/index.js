/** @format */

import cloneDeep from 'lodash.clonedeep'
export const arrayToTree = (array, id = 'id', pid = 'parent', title = 'spmc', children = 'children') => {
  let data = cloneDeep(array)
  let result = []
  let hash = {}

  data.forEach((item, index) => {
    item.label = item.name
    item.value = item.id
    if (item[id] == item[pid]) {
      item[pid] = null
    }
    hash[data[index][id]] = data[index]
  })
  data.forEach(item => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export const treeFindPath = (tree, func, path = [], result = []) => {
  for (const data of tree) {
    path.push(data.id)
    func(data) && result.push([...path])
    data.children && treeFindPath(data.children, func, path, result)
    path.pop()
  }
  return result
}
export const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
