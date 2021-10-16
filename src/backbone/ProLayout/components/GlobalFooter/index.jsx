/**
 * 通用的底部组件
 *
 * 显示公司各种链接地址
 */

import VueTypes from 'vue-types'
import { getComponentFromProp, hasProp } from '../../utils'
import './index.scss'

// 定义对应的属性
const ProLayoutFooterProps = {
  links: VueTypes.array,
  copyright: VueTypes.any,
}

// 定义组价你
const ProLayoutFooter = {
  name: 'ProLayoutFooter',
  props: ProLayoutFooterProps,
  render(instance) {
    const copyright = getComponentFromProp(instance, 'copyright')
    const links = getComponentFromProp(instance, 'links')
    const linksType = hasProp(instance, 'links')

    return (
      <footer class="grewall-global-layout-footer">
        <div class="grewall-global-layout-footer-links">
          {(linksType &&
            links.map(link => (
              <a key={link.key} title={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                {link.title}
              </a>
            ))) ||
            links}
        </div>
        {copyright && <div class="grewall-global-layout-footer-copyright">{copyright}</div>}
      </footer>
    )
  },
}

export default ProLayoutFooter
