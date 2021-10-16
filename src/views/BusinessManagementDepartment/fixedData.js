/** @format */
export const fixedData = {
  proFormData: {
    layout: 'horizontal',
    form: {},
    formConfig: [
      {
        label: '上级部门名称',
        key: 'startingName',
        component: 'MetaInput',
        span: 24,
        labelCol: {
          span: 12,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        props: {
          key: 'startingName',
          type: '',
          maxlength: 50,
          disabled: true,
        },
      },
      {
        span: 24,
        label: '新增下级部门名称',
        rules: [{ required: true, message: '请输入下级部门名称', type: 'string', trigger: 'blur' }],
        labelCol: {
          span: 12,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        key: 'name',
        component: 'MetaInput',
        props: {
          key: 'name',
        },
      },
      {
        span: 24,
        label: '备注',
        labelCol: {
          span: 12,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        key: 'description',
        component: 'MetaInputText',
        props: {
          key: 'description',
        },
      },
    ],
  },
  proTableData: {
    size: 'default',
    isRowSelection: true,
    columns: [
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'id',
      },
      {
        title: '姓名',
        key: 'username',
        dataIndex: 'username',
      },
      {
        title: '所属部门',
        dataIndex: 'department_name',
        key: 'department_name',
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
        align: 'center',
      },
    ],
    tableData: [],
    pagination: {
      page: 1, //-- 当前页
      size: 5, //-- 页大小
      count: 20, //--页总数
      pageSizeOptions: ['5', '10', '20', '30'],
    },
  },
  proTableMenuData: {
    title: '部门名称',
    menuList: [
      {
        type: 'primary',
        icon: 'iconicon-test2',
        text: '新增',
        features: 'add',
        size: 'small',
      },
    ],
  },
}
