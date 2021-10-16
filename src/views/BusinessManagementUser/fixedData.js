/** @format */

export const columns = [
  {
    //sorter: true, // 是否允许排序
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '邮箱账号',
    dataIndex: 'email',
    key: 'email',
    width: 200,
    //sorter: true,

    //slots: { customRender: 'name' },
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '所属部门',
    key: 'department_name',
    dataIndex: 'department_name',
  },
  {
    title: '角色',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: '操作',
    dataIndex: 'viewEdit',
    key: 'viewEdit',
    slots: { customRender: 'viewEdit' },
    width: 150,
  },
]

export const tableData = []
