/** @format */

export const columns = [
  {
    //sorter: true, // 是否允许排序
    title: '客户ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    //sorter: true,

    //slots: { customRender: 'name' },
  },
  {
    title: '员工人数',
    key: 'person_total',
    dataIndex: 'person_total',
  },
  {
    title: '商机来源',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: '重要程度',
    key: 'status',
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '创建时间',
    dataIndex: 'add_time',
    key: 'add_time',
  },
  {
    title: '跟进阶段',
    dataIndex: 'category',
    key: 'category',
  },

  /*
  {
    title: '客户产量',
    dataIndex: 'enterprise_yield',
    key: 'enterprise_yield',
  },*/

  {
    title: '操作',
    dataIndex: 'czs',
    key: 'czs',
    slots: { customRender: 'czs' },
    width: 150,
  },
]

export const tableData = []
