import { area } from '@/views/CustomerProfileInfo/area'
const customer = 'customer__'
export const biasConfig = [
  {
    label: '客户名称-全称',
    key: 'name',
    component: 'MetaInput',
    span: 8,
    lg: 8,
    rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
    labelAlign: 'right',
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    props: {
      key: 'name',
      type: '',
    },
  },
  {
    span: 8,
    label: '客户经理',
    labelAlign: 'right',
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    key: 'service_team',
    component: 'MetaInput',
    props: {
      disabled: true,
    },
  },
  {
    label: '客户分类',
    key: 'product_type',
    component: 'MetaSelect',
    span: 8,
    rules: [{ required: true, message: '这行需要输入信息', type: 'any', trigger: 'blur' }],
    labelAlign: 'right',
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    props: {
      option: [
        {
          name: '改性',
          value: 1,
        },
        {
          name: '制品',
          value: 2,
        },
        {
          name: '改性+制品',
          value: 3,
        },
        {
          name: '终端客户',
          value: 4,
        },
      ],
    },
  },
  {
    label: '客户简称',
    key: 'short_name',
    component: 'MetaInput',
    span: 12,
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    header: {
      //数据处理
    },
    props: {
      key: 'short_name',
      type: '',
      maxlength: 50,
    },
  },
  {
    span: 12,
    label: '年产能',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    key: 'produce_quantity',
    component: 'MetaInput',
    props: {
      key: 'enterprise_yield',
      inputType: 'number',
      addonBefore: '',
      addonAfter: '吨',
    },
  },
  {
    span: 12,
    label: '官网',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'website',
    component: 'MetaInput',

    props: {
      key: 'website',
    },
  },
  {
    span: 12,
    label: '产品应用领域',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'product_zone',
    component: 'MetaInput',
    props: {
      key: 'product_zone',
    },
  },
  {
    span: 12,
    label: '年用量',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },

    key: 'sale_quantity',
    component: 'MetaInput',
    props: {
      key: 'sale_quantity',
      inputType: 'number',
      addonBefore: '',
      addonAfter: '吨',
    },
  },
  {
    span: 12,
    label: '联系电话',
    labelAlign: 'right',
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'phone',
    component: 'MetaInput',
    props: {
      key: 'phone',
      inputType: 'number',
      // MetaInputGroupData: [
      //   {
      //     key: 'phone1',
      //     span: 4,
      //     value: '',
      //   },
      //   {
      //     key: 'phone2',
      //     span: 4,
      //     value: '',
      //   },
      //   {
      //     key: 'phone3',
      //     span: 12,
      //     value: '',
      //   },
      // ],
    },
  },
  {
    span: 12,
    label: '员工人数',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'person_total',
    component: 'MetaInput',
    props: {
      key: 'person_total',
      inputType: 'number',
    },
  },
  {
    span: 12,
    label: '地区',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'district',
    component: 'MetaCascader',
    props: {
      option: area,
    },
  },
  {
    span: 12,
    label: '具体地址',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'address',
    component: 'MetaInput',
    props: {
      key: 'address',
    },
  },
  {
    span: 12,
    label: '现有付款方式',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'pay_type',
    component: 'MetaCascader',
    schemaOption: 'customer__enterprise',
    props: {
      option: [],
    },
  },
  {
    span: 12,
    label: '商机来源',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'source',
    component: 'MetaSelect',
    props: {
      option: [
        {
          name: '自主开发',
          value: 1,
        },
        {
          name: '公司分派',
          value: 2,
        },
      ],
    },
  },
  {
    span: 12,
    label: '商机获取时间',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'chance_get_time',
    component: 'MetaDatePickerDay',
    props: {
      inputType: 'datePickerDay',
    },
  },
  {
    span: 12,
    label: '重要程度',
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    labelAlign: 'right',
    key: 'status',
    component: 'MetaSelect',
    props: {
      option: [
        {
          name: '小客户',
          value: 1,
        },
        {
          name: '中客户',
          value: 2,
        },
        {
          name: '大客户',
          value: 3,
        },
        {
          name: '战略客户',
          value: 4,
        },
      ],
    },
  },
  {
    span: 12,
    label: '跟进阶段',
    labelCol: {
      span: 8,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 12,
      offset: 0,
    },
    key: 'category',
    component: 'MetaSelect',
    ref: 'customer__enterprisecategory',
    props: {
      option: [
        { id: 1, add_time: '2021-02-02 15:42:59', name: '商机阶段', parent: null, value: 1 },
        { id: 2, add_time: '2021-02-02 15:59:48', name: '推进阶段', parent: null, value: 2 },
        { id: 3, add_time: '2021-02-02 12:00:11', name: '已签约', parent: null, value: 3 },
      ],
    },
  },

  {
    span: 24,
    label: '客户现有体系认证',
    labelCol: {
      span: 4,
    },
    labelAlign: 'right',
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    key: 'quality_certificate',
    qualification: 'type1',

    component: 'MetaCheckboxGroup',
    props: {
      span: 20,
      option: [],
    },
  },
  {
    span: 24,
    label: '备注',
    tooltip: '以上客户信息之外的补充或说明',
    labelAlign: 'right',
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
      offset: 0,
    },
    key: 'remark',
    component: 'MetaInputText',
    props: {},
  },
]
export const proTreeConfig = {
  enterprise: {
    //客户综合信息
    formConfig: biasConfig,
  },
  customer: {
    //客户联系人
    proTableData: {
      size: 'default',
      customer: customer + 'customer',
      columns: [
        {
          title: '联系人',
          dataIndex: 'nickname',

          /* slots: { customRender: 'id' },*/
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '部门',
          dataIndex: 'department',
          width: 200,
        },
        {
          title: '职位',
          dataIndex: 'position',
          width: 200,
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
        },
        {
          dataIndex: 'cz',
          key: 'cz',
          slots: { customRender: 'cz' },
          title: '操作',
          width: 150,
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
    modalConfig: {
      formConfig: [
        {
          label: '部门',
          key: 'department',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {},
        },
        {
          label: '职位',
          key: 'position',
          component: 'MetaSelect',
          span: 12,
          rules: [{ required: true, message: '请选择', type: 'number', trigger: 'blur' }],
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            option: [
              {
                name: '采购员',
                value: 1,
              },
              {
                name: '董事长',
                value: 2,
              },
              {
                name: '总经理',
                value: 3,
              },
              {
                name: '技术经理',
                value: 4,
              },
              {
                name: '生产经理',
                value: 5,
              },
              {
                name: '采购经理',
                value: 6,
              },
              /*   {
                name: '其他',
                value: 7,
              },*/
            ],
          },
        },
        {
          label: '姓名',
          key: 'nickname',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {},
        },
        {
          label: '电话号码',
          key: 'phone',
          component: 'MetaInput',
          rules: [{ required: true, message: '请输入电话号码', type: 'string', trigger: 'blur' }],

          span: 12,
          labelCol: {
            span: 12,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            inputType: 'number',
          },
        },
        {
          label: '邮箱',
          key: 'email',
          component: 'MetaInput',
          span: 12,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {},
        },
        {
          label: '性别',
          key: 'gender',
          component: 'MetaRadioGroup',
          span: 12,
          labelCol: {
            span: 2,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          props: {
            option: [
              {
                name: '男',
                value: 1,
              },
              {
                name: '女',
                value: 2,
              },
            ],
          },
        },
        {
          label: '籍贯',
          span: 12,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'district',
          component: 'MetaCascader',
          props: {
            option: area,
          },
        },
        {
          label: '信任级别',
          key: 'level',
          component: 'MetaSelect',
          span: 12,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            option: [
              {
                name: '公事公办',
                value: 0,
              },
              {
                name: '个人私交',
                value: 1,
              },
              {
                name: '利益趋同',
                value: 2,
              },
            ],
          },
        },
        {
          span: 12,
          label: '出生年月日',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'birth_date',
          component: 'MetaDatePickerDay',
          props: {
            inputType: 'datePickerDay',
          },
        },
        {
          span: 12,
          label: '入职时间',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'start_work_date',
          component: 'MetaDatePickerDay',
          props: {
            inputType: 'datePickerDay',
          },
        },
        {
          span: 12,
          label: '任职时间',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'work_up_date',
          component: 'MetaDatePickerDay',
          props: {
            inputType: 'datePickerDay',
          },
        },
        {
          label: '标签',
          key: 'tags',
          component: 'MetaTag',
          span: 24,
          //arrayTemplate:true,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'tags',
          },
        },
        {
          label: '点击频率最高标签',
          key: 'customertag',
          component: 'MetaTageItem',
          span: 24,
          //arrayTemplate:true,
          forTargetKey: 'tags',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            forTargetKey: 'tags',
            key: 'tagItem',
          },
        },
        {
          label: '沟通状况',
          key: 'communication',
          component: 'MetaRichText',
          tooltip: '重点关注客户需求，价格是否合适，质量、供应能力、技术实力、综合实力 ......',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'communication',
            inputType: 'MetaRichText',
          },
        },
        {
          label: '工作经历',
          key: 'work_experience',
          component: 'MetaRichText',
          tooltip: '联系人的关键工作经历',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'work_experience',
            inputType: 'MetaRichText',
          },
        },
      ],
    },
  },
  enterpriseproduct: {
    //客户产品体系
    proTableData: {
      size: 'default',
      customer: customer + 'enterpriseproduct',
      columns: [
        {
          title: '产品名称',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          dataIndex: 'add_time',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
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
    modalConfig: {
      formConfig: [
        {
          label: '产品分类',
          key: 'product_type',
          component: 'MetaSelect',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'any', trigger: 'blur' }],
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {
            disabled: true,
            option: [
              {
                name: '改性',
                value: 1,
              },
              {
                name: '制品',
                value: 2,
              },
              {
                name: '改性+制品',
                value: 3,
              },
              {
                name: '终端客户',
                value: 4,
              },
            ],
          },
        },
        {
          label: '产品名称',
          key: 'name',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {},
        },
        {
          span: 24,
          label: '产品体系认证（客户产品现有认证）',
          labelCol: {
            span: 12,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'quality_certificate',
          qualification: 'type2',
          component: 'MetaCheckboxGroup',
          props: {
            option: [],
          },
        },
        {
          label: '产品工艺',
          key: 'technique',
          component: 'MetaRichText',
          span: 24,
          labelCol: {
            span: 7,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'technique',
            inputType: 'MetaRichText',
          },
        },
        {
          label: '技术参数',
          key: 'performance',
          component: 'MetaRichText',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          tooltip:
            '规格：长 / 宽 / 厚 改性：粒子物性指标/吹塑薄膜性能 制品： 化学性能 / 物理力学性能 检测内容：指标/测试方法/参考标准',
          props: {
            key: 'performance',
            inputType: 'MetaRichText',
          },
        },
        {
          label: '商务信息',
          key: 'business',
          component: 'MetaRichText',
          tooltip: '价格/交货期/付款方式 ......',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'business',
            inputType: 'MetaRichText',
          },
        },
      ],
    },
  },
  enterprisefactory: {
    //客户工厂信息
    proTableData: {
      size: 'default',
      customer: customer + 'enterprisefactory',
      columns: [
        {
          title: '工厂名称',
          dataIndex: 'name',
        },
        {
          title: '工厂人数',
          dataIndex: 'person_total',
        },
        {
          title: '生产车间工人人数占比',
          dataIndex: 'person_rate',
        },
        {
          title: '年产能',
          dataIndex: 'produce_quantity',
          width: 150,
        },
        {
          title: '年出货量',
          dataIndex: 'sale_quantity',
          width: 150,
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
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
    modalConfig: {
      //width: '388px',
      formConfig: [
        {
          label: '工厂名称',
          key: 'name',
          component: 'MetaInput',
          span: 24,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {},
        },
        {
          label: '工厂人数',
          key: 'person_total',
          component: 'MetaInput',

          span: 12,
          labelCol: {
            span: 12,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {
            key: 'person_total',
            inputType: 'number',
          },
        },
        {
          label: '生产车间工人人数占比',
          tooltip: '生产车间工人人数占工厂总人数比例',
          key: 'person_rate',
          component: 'MetaInputNumber',
          span: 12,
          labelCol: {
            span: 15,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {},
        },
        {
          span: 12,
          label: '年产能',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'produce_quantity',
          component: 'MetaInput',
          props: {
            key: 'produce_quantity',
            inputType: 'number',
            addonBefore: '',
            addonAfter: '吨',
          },
        },
        {
          span: 12,
          label: '年出货量',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'sale_quantity',
          component: 'MetaInput',
          props: {
            key: 'sale_quantity',
            inputType: 'number',
            addonBefore: '',
            addonAfter: '吨',
          },
        },
      ],
    },
  },
  enterprisefactorydevice: {
    //产线信息
    proTableData: {
      size: 'default',
      customer: customer + 'enterprisefactorydevice',
      columns: [
        {
          title: '所属工厂',
          dataIndex: 'enterprise_factory',
        },
        {
          title: '产线名称',
          dataIndex: 'name',
          //width: 150,
        },
        {
          title: '年产能',
          dataIndex: 'produce_quantity',
        },
        {
          title: '年出货量',
          dataIndex: 'sale_quantity',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
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
    modalConfig: {
      requestEnterpriseFactoryListUrl: '/api/manage/customer/enterprisefactory/',
      formConfig: [
        {
          label: '所属工厂',
          key: 'enterprise_factory',
          component: 'MetaSelect',
          span: 12,
          rules: [{ required: true, message: '请选择', type: 'any', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          requestEnterpriseFactoryListUrlOption: true,
          props: {},
        },
        {
          label: '产线名称',
          key: 'name',
          rules: [{ required: true, message: '这行需要输入信息', type: 'any', trigger: 'blur' }],
          span: 12,
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          component: 'MetaInput',
          props: {},
        },
        {
          span: 12,
          label: '年产能',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'produce_quantity',
          component: 'MetaInput',
          props: {
            key: 'produce_quantity',
            inputType: 'number',
            addonBefore: '',
            addonAfter: '吨',
          },
        },
        {
          span: 12,
          label: '年出货量',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'sale_quantity',
          component: 'MetaInput',
          props: {
            key: 'sale_quantity',
            inputType: 'number',
            addonBefore: '',
            addonAfter: '吨',
          },
        },

        {
          label: '改性设备数量',
          key: 'modified_total',
          span: 6,
          labelCol: {
            span: 24,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          component: 'MetaInputNumberBasis',
          props: {},
        },
        {
          label: '吹膜设备数量',
          key: 'blown_film_total',
          span: 6,
          labelCol: {
            span: 24,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          component: 'MetaInputNumberBasis',
          props: {},
        },
        {
          label: '制袋设备数量',
          key: 'make_bag_total',
          span: 6,
          labelCol: {
            span: 24,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          component: 'MetaInputNumberBasis',
          props: {},
        },
        {
          label: '印刷设备数量',
          key: 'print_total',
          span: 6,
          labelCol: {
            span: 24,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          component: 'MetaInputNumberBasis',
          props: {},
        },

        {
          label: '设备图片',
          key: 'img_list',
          span: 24,
          labelCol: {
            span: 7,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          component: 'MetaUploadImage',
          props: {
            key: 'img_list',
          },
        },
      ],
    },
  },
  enterprisefactoryperson: {
    //工厂主要联系人
    proTableData: {
      size: 'default',
      customer: customer + 'enterprisefactoryperson',

      columns: [
        {
          title: '所属工厂',
          dataIndex: 'enterprise_factory',
        },
        {
          title: '职工姓名',
          dataIndex: 'name',
          width: 150,
        },
        {
          title: '职务',
          dataIndex: 'position',
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
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
    modalConfig: {
      requestEnterpriseFactoryListUrl: '/api/manage/customer/enterprisefactory/',
      formConfig: [
        {
          label: '所属工厂',
          key: 'enterprise_factory',
          component: 'MetaSelect',
          span: 12,
          rules: [{ required: true, message: '请选择', type: 'number', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          requestEnterpriseFactoryListUrlOption: true,
          props: {},
        },
        {
          label: '车间名称',
          key: 'workshop',
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          span: 12,
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          component: 'MetaInput',
          props: {},
        },
        {
          span: 12,
          label: '姓名',
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'name',
          component: 'MetaInput',
          props: {},
        },
        {
          span: 12,
          label: '邮箱',
          rules: [{ required: true, message: '需要输入正确的邮箱信息', type: 'email', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'email',
          component: 'MetaInput',
          props: {},
        },
        {
          span: 12,
          label: '手机号码',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'phone',
          component: 'MetaInput',
          props: {
            inputType: 'number',
          },
        },
        {
          span: 12,
          label: '职位',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          key: 'position',
          component: 'MetaInput',
          props: {},
        },
        {
          span: 24,
          label: '职责范围',
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'duty',
          component: 'MetaInputText',
          props: {},
        },
      ],
    },
  },
  enterprisematerial: {
    //竞品信息
    proTableData: {
      size: 'default',
      customer: customer + 'enterprisematerial',

      columns: [
        {
          title: '竞品名称',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          dataIndex: 'add_time',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
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
    modalConfig: {
      formConfig: [
        {
          label: '原材料名称',
          key: 'name',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {},
        },
        {
          label: '竞品所属供应商',
          key: 'provider',
          component: 'MetaInput',
          span: 12,
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {},
        },
        {
          span: 24,
          label: '产品体系认证（客户现有资质认证）',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'quality_certificate',
          qualification: 'type2',
          component: 'MetaCheckboxGroup',
          props: {
            key: 'quality_certificate',
            option: [],
          },
        },
        {
          label: '技术参数',
          key: 'performance',
          component: 'MetaRichText',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          tooltip:
            '规格：长 / 宽 / 厚 改性：粒子物性指标/吹塑薄膜性能 制品： 化学性能 / 物理力学性能 检测内容：指标/测试方法/参考标准',
          props: {
            key: 'performance',
            inputType: 'MetaRichText',
          },
        },
        {
          label: '商务信息', // 原来的物性表
          key: 'business',
          component: 'MetaRichText',
          span: 24,
          tooltip: '成本价/成交价/交付期/结算方式/销售政策 ......',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'business',
            inputType: 'MetaRichText',
          },
        },
      ],
    },
  },
  salesstrategy: {
    //销售策略
    proTableData: {
      size: 'default',
      customer: customer + 'salesstrategy',

      columns: [
        /*   {
          title: '编号ID',
          dataIndex: 'id',
        },*/
        {
          title: '创建时间',
          dataIndex: 'add_time',
        },
        {
          title: '策略目标',
          dataIndex: 'target',
        },
        {
          width: 200,
          title: '操作',
          slots: { customRender: 'cz' },
          dataIndex: 'cz',
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
    modalConfig: {
      formConfig: [
        {
          label: '策略目标',
          key: 'target',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {},
        },
        {
          label: '策略方案',
          key: 'content',
          component: 'MetaRichText',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 24,
            offset: 0,
          },
          props: {
            key: 'content',
            inputType: 'MetaRichText',
          },
        },
      ],
    },
  },
  demand: {
    //客户需求
    proTableData: {
      customer: customer + 'demand',

      size: 'default',
      columns: [
        {
          title: '需求分类',
          dataIndex: 'product_type',
        },
        {
          title: '客户需求痛点',
          dataIndex: 'pain_points',
        },
        {
          title: '创建时间',
          dataIndex: 'add_time',
        },
        {
          width: 200,
          title: '操作',
          slots: { customRender: 'cz' },
          dataIndex: 'cz',
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
    modalConfig: {
      formConfig: [
        {
          label: '需求分类',
          key: 'product_type',
          component: 'MetaRadioGroup',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'number', trigger: 'blur' }],
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            option: [
              {
                name: 'PBAT',
                value: 1,
              },
              {
                name: '改性',
                value: 2,
              },
              {
                name: '制品',
                value: 3,
              },
            ],
          },
        },
        {
          label: '需求痛点',
          key: 'pain_points',
          component: 'MetaInput',
          span: 12,
          rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
          labelCol: {
            span: 12,
          },
          wrapperCol: {
            span: 22,
            offset: 0,
          },
          props: {},
        },
        {
          label: '痛点说明',
          key: 'pain_points_des',
          component: 'MetaRichText',
          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'pain_points_des',
            inputType: 'MetaRichText',
          },
        },
        {
          span: 24,
          label: '资质认证(客户要求达到的资质认证）',
        },
        {
          span: 12,
          label: '企业管理体系认证',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'quality_certificate',
          component: 'MetaCheckboxGroup',
          qualification: 'type1',
          props: {
            key: 'quality_certificate',
            readKey: true,
            option: [],
          },
        },
        {
          span: 12,
          label: '产品体系认证',
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          key: 'quality_certificate_children',
          component: 'MetaCheckboxGroup',
          qualification: 'type2',
          props: {
            key: 'quality_certificate_children',
            readKey: true,
            option: [],
          },
        },
        {
          label: '产品需求',
          key: 'product_need',
          component: 'MetaRichText',
          span: 24,
          tooltip:
            '规格：长 / 宽 / 厚\n' +
            '改性：粒子物性指标/吹塑薄膜性能\n' +
            '制品： 化学性能 / 物理力学性能 \n' +
            '检测内容：指标/测试方法/参考标准' +
            '需求量，交期',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'product_need',
            inputType: 'MetaRichText',
          },
        },
        /*  {
          label: '供应链需求',
          key: 'supply_need',
          component: 'MetaRichText',
          tooltip: '需求量 / 交期',

          span: 24,
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'supply_need',
            inputType: 'MetaRichText',
          },
        },*/
        {
          label: '商务需求',
          key: 'business_need',
          component: 'MetaRichText',
          span: 24,
          tooltip: '价格 / 付款方式 /  售后政策 ......',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'business_need',
            inputType: 'MetaRichText',
          },
        },
        {
          label: '个人需求',
          key: 'person_need',
          component: 'MetaRichText',
          span: 24,
          tooltip: '工作关系/家庭成员/职业发展 ......',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 23,
            offset: 0,
          },
          props: {
            key: 'person_need',
            inputType: 'MetaRichText',
          },
        },
      ],
    },
  },
  planimplementationtest: {
    formConfig: [
      {
        label: '策略',
        key: 'strategy',
        component: 'MetaInputText',
        span: 12,
        rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 23,
          offset: 0,
        },
        props: {},
      },
      {
        label: '目标',
        key: 'target',
        component: 'MetaInputText',
        rules: [{ required: true, message: '这行需要输入信息', type: 'string', trigger: 'blur' }],
        span: 12,
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        props: {},
      },
      {
        label: '',
        key: 'process_list',
        component: 'MetaTableEdit',
        span: 24,
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        props: {
          key: 'process_list',
        },
      },
      {
        label: '复盘/持续改善',
        key: 'improvement_push',
        component: 'MetaInputText',
        span: 24,
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        tooltip: '销售对开发客户业务的成交与否，个人得失，复盘说明',
        props: {},
      },
      {
        label: '直属领导建议和意见',
        key: 'superior_push',
        component: 'MetaInputText',
        span: 24,
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        props: {},
      },
      {
        label: '销售总经理建议和意见',
        key: 'top_superior_push',
        component: 'MetaInputText',
        span: 24,
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 24,
          offset: 0,
        },
        props: {},
      },
    ],
  },
}
