/** @format */

export const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '流程ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '流程编码',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '工作流名称',
    dataIndex: 'submitter',
    align: 'center',
  },
  ,
  {
    title: '创建人',
    dataIndex: 'creator',
    align: 'center',
  },
  {
    title: '受理人员',
    dataIndex: 'applicationDate',
    align: 'center',
  },
  {
    title: '流程状态',
    dataIndex: 'workStatus',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'workDate',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    slots: { customRender: 'cz' },
    align: 'center',
  },
]
export const tableData = [
  {
    key: '1',
    id: '10086',
    name: 'John Brown10086',
    submitter: '加薪',
    creator: '董先生',
    applicationDate: '老板',
    slry: '100人',
    workStatus: '未生效',
    workDate: '2020-11-03',
    operate: '1',
  },
  {
    key: '1',
    id: '10086',
    name: 'John Brown10086',
    submitter: '裁员',
    creator: '周先生',
    applicationDate: '董先生',
    slry: '100人',
    workStatus: '生效',
    workDate: '2020-11-03',
    operate: '2',
  },
]
