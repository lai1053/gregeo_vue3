/** @format */

export const getComponentFromProp = (instance, prop) => {
  /**
   * 从应用的属性或者 slots 中找到对应的属性
   *
   * 注意如果是 slots 中找到，则返回对应的模板
   */
  const slots = instance.$slots
  const slotTemplate = slots[prop]
  return slotTemplate ? slotTemplate() : instance.$props[prop]
}

export const getComponentFromSlots = (instance, name) => {
  /**
   * 从应用的的 $slots 属性中获取对应的 slot
   */
  const componentSlot = instance.$slots[name]
  return componentSlot ? componentSlot() : null
}

export const isFun = func => {
  return typeof func === 'function'
}

export const layoutContentWidth = contentType => {
  return contentType !== 'Fluid'
}

export const hasProp = (instance, prop) => {
  var $options = instance.$options || {}
  var propsData = $options.props || {}

  return prop in propsData
}
