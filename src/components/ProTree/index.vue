<!-- @format -->
<template>
  <div class="tree">
    <a-tree
      :show-line="true"
      :tree-data="treeData"
      :expanded-keys="expandedKeys"
      default-expand-all
      @select="onSelect"
      @expand="expand"
    />
  </div>
</template>
<script>
const treeData = [
  {
    title: '客户基本信息',
    key: '/api/manage/customer/enterprise/',
    displayForm: true,
    paramsKey: 'enterprise',
    children: [
      {
        title: '销售相关联系人',
        key: '/api/manage/customer/customer/',
        paramsKey: 'customer',
      },
    ],
  },
  {
    title: '客户产品体系',
    key: '/api/manage/customer/enterpriseproduct/',
    paramsKey: 'enterpriseproduct',
    children: [
      {
        title: '客户工厂信息',
        key: '/api/manage/customer/enterprisefactory/',
        paramsKey: 'enterprisefactory',
        children: [
          {
            title: '产线信息',
            key: '/api/manage/customer/enterprisefactorydevice/',
            paramsKey: 'enterprisefactorydevice',
          },
          {
            title: '工厂主要联系人',
            key: '/api/manage/customer/enterprisefactoryperson/',
            paramsKey: 'enterprisefactoryperson',
          },
        ],
      },
    ],
  },
  {
    title: '竞品信息(客户原材料)',
    key: '/api/manage/customer/enterprisematerial/',
    paramsKey: 'enterprisematerial',
  },
  {
    title: '客户需求',
    key: '/api/manage/customer/demand/',
    paramsKey: 'demand',
  },
  {
    displayForm: true,
    displayFormChildren: true,
    title: '销售策略/执行',
    key: '/api/manage/customer/planimplementation/enterprise/',
    url: '/api/manage/customer/planimplementation/enterprise/',
    paramsKey: 'planimplementationtest',
  },
]

export default {
  components: {},
  props: ['treeClick'],
  data() {
    return {
      treeData,
      expandedKeys:[
        '/api/manage/customer/enterprise/','/api/manage/customer/enterpriseproduct/','/api/manage/customer/enterprisefactory/'
      ]
    }
  },
  methods: {
    onSelect(selectedKeys, info, e) {
      //console.log(selectedKeys, info, e);
      if (selectedKeys.length < 1) return
      const data = info.selectedNodes[0].props.dataRef
      //console.log(data);
      this.$emit('treeClick', data)
    },
    expand(electedKeys, info) {
      return
    },
  },
}
</script>
<style scoped lang="less">
.tree {
}
.treeTitle {
}
.icons-list ::v-deep(.anticon) {
  margin-right: 6px;
  font-size: 20px;
}
</style>
