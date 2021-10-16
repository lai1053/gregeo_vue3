/** @format */

export const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '工单ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '工单名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '提交人',
    dataIndex: 'submitter',
    align: 'center',
  },
  {
    title: '申请时间',
    dataIndex: 'applicationDate',
    align: 'center',
  },
  {
    title: '受理人员',
    dataIndex: 'slry',
    align: 'center',
  },
  {
    title: '工单状态',
    dataIndex: 'workStatus',
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
    name: 'John Brown',
    applicationDate: '2020-10-22',
    submitter: '新能源',
    slry: '100人',

    workStatus: '已开单',
    cz: '1',
  },
]
