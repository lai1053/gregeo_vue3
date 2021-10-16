import { Input } from 'ant-design-vue'

const G_input = {
  props: {
    type: String,
    data: '',
    config: Object,
  },
  setup() {},
  render() {
    const { type, config } = this.props
    const { module } = config
    const renderChildren = type => {
      return { config }
    }
    return {
      renderChildren,
    }
  },
}
export default G_input
