/** @format */

export const tableData = []
export const columns = [
  {
    title: '客户ID',
    dataIndex: 'id',
    /* slots: { customRender: 'id' },*/
  },
  {
    title: '时间',
    dataIndex: 'add_time',
  },
  {
    title: '公司全称',
    dataIndex: 'name',
    width: 200,
  },
  // {
  //   title: '产品类型',
  //   dataIndex: 'output_type',
  // },
  {
    title: '公司规模',
    dataIndex: 'scale',
  },
  {
    title: '公司产量',
    dataIndex: 'enterprise_yield',
  },
  // {
  //   title: '客户级别',
  //   dataIndex: 'company_level',
  // },
  {
    title: '商机来源',
    dataIndex: 'source',
  },
  {
    title: '重要程度',
    dataIndex: 'status',
    width: 90,
  },
  {
    title: '操作',
    dataIndex: 'cz',
    slots: { customRender: 'cz' },
    width: 150,
    align: 'center',
  },
]
// 搜索表单信息
export const form = {
  date: [], // 时间范围
  enterprise_yield: '', //公司产量

  name: '', //公司名称
  scale: '', //公司规模
  status: '', // 业务状态
}
export const filterFormOld = {
  date: [], // 时间范围
  output_type: '', //产品类型
  enterprise_yield: '', //公司产量
  company_level: '', //公司级别

  name: '', //公司名称
  scale: '', //公司规模
  status: '', // 业务状态
}
// 客户信息详情
export const modalForm = {
  enterpriseInfo: {
    name: '', //企业昵称
    email: '',
    industry: 0, // 公司行业
    scale: 0, //公司规模
    status: 0, // 业务状态
    enterprise_yield: 0, // 公司产量

    phone: '',
    output_type: '', //产品类型
    pay_type: 0, //付款方式
    source: 1, //来源
    level: 0, //客户级别
    address: '', // 公司地址
    modalTitle: '', //列表新增信息表头
    addInfo: {}, // 列表页新增信息
    photo: '', // 营业执照
    oss_host: '',
    priority: '', //客户级别
    //customerName:'',//客户姓名
    activeKey: [], // 列表展开key
    website: '',
  },

  customer_enterprises: [
    /*{
      title:'阮先生',ziw:'销售',
      email:'18181888882@163.com',
      phone:'10086'
    }*/
  ], // 客户列表
  demand_enterprises: [
    /* {
     status：
      content: ''
    }*/
  ], //需求列表
  salesstrategy_enterprises: [
    /* {
      nickname:'',
      content:''
    }*/
  ], //销售策略列表
  planimplementation_enterprises: [
    /* {
      date:[],
      nickname:'',
      content:'',
      start_time:'',
      end_time:''
    }*/
  ], // 计划执行列表
}

export const modalFormOld = {
  name: '',
  email: '',
  industry: 0, // 公司行业
  scale: 0, //公司规模
  status: 0, // 业务状态
  enterprise_yield: 0, // 公司产量

  phone: '',
  output_type: '', //产品类型
  pay_type: '', //付款方式
  source: '', //来源
  level: 0, //客户级别
  address: '', // 公司地址
  modalTitle: '', //列表新增信息表头
  website: '',
  addInfo: {}, // 列表页新增信息
  photo: '', // 营业执照
  oss_host: '',
  priority: '', //客户级别
  //customerName:'',//客户姓名
  activeKey: [], // 列表展开key
  customer_enterprises: [
    /*{
      title:'阮先生',ziw:'销售',
      email:'18181888882@163.com',
      phone:'10086'
    }*/
  ], // 客户列表
  demand_enterprises: [
    /* {
      status：
       content: ''
     }*/
  ], //需求列表
  salesstrategy_enterprises: [
    /* {
       nickname:'',
       content:''
     }*/
  ], //销售策略列表
  planimplementation_enterprises: [
    /* {
       date:[],
       nickname:'',
       content:'',
       start_time:'',
       end_time:''
     }*/
  ], // 计划执行列表
}
export const rules = {
  name: [{ required: true, message: '公司名称为必填项', trigger: 'blur' }],
  /* email:[
    { required: true, message: '公司邮箱为必填项', trigger: 'blur' },
    {
      pattern: /^[^\u4e00-\u9fa5\s]{0,}$/,
      message: '不能输入中文与空格',
      trigger: 'change',
    },
  ],*/

  /* customerName:[
    { required: true, message: '客户姓名为必填项', trigger: 'blur' },
  ],*/
  phone: [{ required: true, message: '联系电话为必填项', trigger: 'blur' }],

  /*industry:[
    { required: true, message: '公司行业为必填项', trigger: 'blur' },

  ],

  status:[
    { required: true, message: '业务状态为必填项', trigger: 'blur' },

  ],
  enterprise_yield:[
    { required: true, message: '公司产量为必填项', trigger: 'blur' },

  ],
  output_type:[
    { required: true, message: '产品类型为必填项', trigger: 'blur' },

  ],
  level:[
    { required: true, message: '客户级别为必填项', trigger: 'blur' },

  ],
  address:[
    { required: true, message: '公司地址为必填项', trigger: 'blur' },

  ],
  priority:[
    { required: true, message: '客户级别为必填项', trigger: 'blur' },

  ],*/
}
