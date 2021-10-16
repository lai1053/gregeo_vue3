import { Select } from 'ant-design-vue'
const { Option } = Select

export const basicFormConfig = [
  {
    id: 'name',
    label: '公司名称',
    module: 'Input',
    rules: true,
    rulesMin: 5,
    rulesMax: 30,
    rulesType: 'string',
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 6,
    },
  },
  {
    id: 'website',
    label: '公司网址',
    module: 'InputWeb',
    //rulesType:'url',
    //rulesMessage:'请输入合法的url',
    //default:'https://',
    //urlType:true,
    isEmail: true,
    addonBefore: 'httpSelect',
    addonAfter: 'httpSelect',
  },
  {
    id: 'phone',
    label: '公司电话',
    module: 'InputGroup',
    SelectInputValue: [
      {
        name: '中国',
        value: '+86',
      },
      {
        name: '美国',
        value: '+00',
      },
    ],
  },
  {
    id: 'district',
    label: '公司地区',
    isAddress: true,
    module: 'Cascader',
    CascaderValue: [],
  },
  {
    id: 'address',
    label: '公司详细地址',
    module: 'Input',
  },
  {
    id: 'scale',
    label: '公司规模',
    module: 'Select',
    SelectValue: [
      {
        name: '未知',
        value: 0,
      },
      {
        name: '0-20人',
        value: 1,
      },
      {
        name: '21-99人',
        value: 2,
      },
      {
        name: '100-299人',
        value: 3,
      },
      {
        name: '300人以上',
        value: 4,
      },
    ],
  },
  {
    id: 'enterprise_yield',
    label: '公司产量',
    module: 'Select',
    SelectValue: [
      {
        name: '1-100吨',
        value: 0,
      },
      {
        name: '100-500吨',
        value: 1,
      },
      {
        name: '500-999吨',
        value: 2,
      },
      {
        name: '1000吨以上',
        value: 3,
      },
    ],
  },
  {
    id: 'pay_type',
    label: '付款方式',
    module: 'Select',
    SelectValue: [
      {
        name: '30天结',
        value: 0,
      },
      {
        name: '月结',
        value: 1,
      },
      {
        name: '90天结',
        value: 2,
      },
      {
        name: '现金',
        value: 3,
      },
      {
        name: '预付',
        value: 4,
      },
    ],
  },
  {
    id: 'source',
    label: '商机来源',
    module: 'Select',
    SelectValue: [
      {
        name: '指定',
        value: 1,
      },
      {
        name: '自主',
        value: 2,
      },
      {
        name: '被动',
        value: 3,
      },
    ],
  },
  {
    id: 'service_start_time',
    label: '商机获取时间',
    module: 'DatePicker',
  },
  {
    id: 'category',
    label: '跟进阶段',
    isCascader: true,
    cascaderUrl: '/api/user/manage/enterprise/enterprise_category/',
    module: 'Cascader',
    CascaderValue: [
      {
        label: '一级',
        value: 0,
        children: [
          {
            label: '重点客户',
            value: 0.1,
          },
          {
            label: '一般客户',
            value: 0.2,
          },
          {
            label: '赔本客户',
            value: 0.3,
            children: [
              {
                label: '赔本客户的赚钱客户',
                value: 0.31,
              },
              {
                label: '赔本客户的赔本客户',
                value: 0.31,
              },
            ],
          },
        ],
      },
      {
        label: '二级',
        value: 1,
      },
      {
        label: '三级',
        value: 2,
      },
    ],
  },
  {
    id: 'status',
    label: '重要程度',
    module: 'Select',
    SelectValue: [
      {
        name: '未知',
        value: 0,
      },
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
  {
    id: 'service_team',
    label: '客户经理',
    module: 'Input',
  },

  // {
  //   id: 'photo',
  //   label: '营业执照',
  //   module: 'Upload',
  //   imgeMultiple: true // 是否只有一张
  // },

  // {
  //   id: 'product_category',
  //   isCascader:true,
  //   cascaderUrl:'/api/user/manage/enterprise/product_category/',
  //   label: '产品类型',
  //   module: 'Cascader',
  //   CascaderValue: [
  //     {
  //       label: '改性厂',
  //       value: '0',
  //       // children:[]
  //     },
  //     {
  //       label: '制品厂',
  //       value: '1',
  //       children: [
  //         {
  //           label: '袋子厂',
  //           value: '1.1',
  //           children: [
  //             {
  //               label: '产品类型分类',
  //               value: '1.11',
  //               children: [
  //                 {
  //                   label: '购物袋',
  //                   value: '购物袋',
  //                 }, {
  //                   label: '垃圾袋',
  //                   value: '垃圾袋',
  //                 }, {
  //                   label: '快递袋',
  //                   value: '快递袋',
  //                 }, {
  //                   label: '等等',
  //                   value: '等等',
  //                 },
  //               ]
  //             }, {
  //               label: '形状分类',
  //               value: '1.2',
  //               children:[
  //                 {
  //                   label: '平口袋',
  //                   value: '平口袋',
  //                 }, {
  //                   label: '背心袋',
  //                   value: '背心袋',
  //                 }, {
  //                   label: '心底袋',
  //                   value: '心底袋',
  //                 },
  //               ]
  //             }, {
  //               label: '封口类型',
  //               value: '1.2',
  //               children:[
  //                 {
  //                   label: '底封袋',
  //                   value: '底封袋',
  //                 } ,{
  //                   label: '侧封袋',
  //                   value: '侧封袋',
  //                 }
  //               ]
  //             },
  //           ]
  //         }, {
  //           label: '气泡袋厂',
  //           value: '气泡袋厂'
  //         }, {
  //           label: '地膜厂',
  //           value: '地膜厂'
  //         }, {
  //           label: '吸管厂',
  //           value: '吸管厂'
  //         }, {
  //           label: '快餐盒厂',
  //           value: '快餐盒厂'
  //         }, {
  //           label: '混合',
  //           value: '混合'
  //         },
  //       ]
  //
  //     },
  //     {
  //       label: '混合',
  //       value: '2',
  //
  //     },
  //   ]
  // },
]
export const testTreeData = [
  {
    title: '客户综合信息',
    url_path: '/api/user/manage/enterprise/',
    key: '/api/user/manage/enterprise/',
    filter_name: 'enterprise',
    pathF: true,
    formConfig: basicFormConfig,
    children: [
      /*    {
    title: "上游供应商信息",
    url_path: "/api/user/manage/enterprise/",
    key: "/api/user/manage/enterprise/.",
    filter_name:'slaves',
    isUpstream:true,
    addF: true,
    formConfig: basicFormConfig,
    columns: [
      {
        title: '客户ID',
        dataIndex: 'id',
        /!* slots: { customRender: 'id' },*!/
      },
      {
        title: '时间',
        dataIndex: 'add_time',
      },
      {
        title: '公司全称',
        dataIndex: 'name',
        width:200
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
        title: '客户来源',
        dataIndex: 'source',
      },
      {
        title: '业务状态',
        dataIndex: 'status',
        width: 90
      },{
        title: '操作',
        dataIndex: 'cz',
        slots: { customRender: 'cz' },
        width:150,
        align:'center'
      },
    ]
  },*/
      {
        title: '联系人信息',
        url_path: '/api/user/manage/enterprise/customer/',
        key: '/api/user/manage/enterprise/customer/',
        filter_name: 'enterprise',
        addF: true,
        formConfig: [
          {
            id: 'department',
            label: '部门',
            module: 'Input',
            rules: true,
          },
          {
            id: 'nickname',
            label: '联系人姓名',
            rules: true,
            module: 'Input',
          },
          {
            id: 'email',
            label: '邮箱',
            rules: true,
            isEmail: true,
            module: 'Input',
          },
          {
            id: 'position',
            label: '技术职位',
            module: 'Select',
            SelectValue: [
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
            ],
          },
          {
            id: 'phone',
            label: '手机号码',
            isInt: true,
            maxlength: 11,
            module: 'Input',
          },
          {
            id: 'district',
            label: '籍贯',
            isAddress: true,
            module: 'Cascader',
          },
          {
            id: 'tags',
            label: '标签',
            module: 'Tag',
          },
          {
            id: 'gender',
            label: '性别',
            module: 'Select',
            SelectValue: [
              { name: '未知', value: 0 },
              { name: '男', value: 1 },
              { name: '女', value: 2 },
            ],
          },
          {
            id: 'level',
            label: '信任度级别',
            module: 'Select',
            SelectValue: [
              { name: '未知', value: 0 },
              { name: '一级', value: 1 },
              { name: '二级', value: 2 },
              { name: '三级', value: 3 },
            ],
          },
          {
            id: 'birth_date',
            label: '出生年月',
            module: 'DatePicker',
          },
          {
            id: 'start_work_date',
            label: '入职时间',
            module: 'MonthPicker',
          },

          {
            id: 'description',
            label: '沟通状况',
            module: 'QuillEditor',
          },
          {
            id: 'work_experience',
            label: '工作经历',
            module: 'QuillEditor',
          },
          // {
          //   id:'avatar',
          //   label:'头像',
          //   module:'Upload',
          // },
        ],
        columns: [
          {
            title: '联系人姓名',
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
            title: '手机号码',
            dataIndex: 'phone',
          },
          {
            title: '操作',
            dataIndex: 'cz',
          },
        ],
      },
      {
        title: '企业价格体系',
        url_path: '/api/user/manage/enterprise/price_system/',
        key: '/api/user/manage/enterprise/price_system/',
        filter_name: 'enterprise',
        addF: true,
        formConfig: [
          {
            id: 'price_zone',
            label: '单价范围',
            rules: true,
            module: 'Input',
          },
          {
            id: 'material',
            label: '原材料名称',
            rules: true,
            module: 'Input',
          },
          {
            id: 'discount',
            label: '折扣',
            module: 'Select',
            SelectValue: [
              { name: '1折', value: 0.1 },
              { name: '2折', value: 0.2 },
              { name: '3折', value: 0.3 },
              { name: '4折', value: 0.4 },
              { name: '5折', value: 0.5 },
              { name: '6折', value: 0.6 },
              { name: '7折', value: 0.7 },
              { name: '8折', value: 0.8 },
              { name: '9折', value: 0.9 },
              { name: '无折扣', value: 0 },
            ],
          },
          {
            id: 'preferential',
            label: '优惠',
            module: 'Input',
          },
          {
            id: 'activity',
            label: '活动',
            module: 'Input',
          },
        ],
        columns: [
          {
            title: '单价范围',
            dataIndex: 'price_zone',
            align: 'center',
          },
          {
            title: '原材料名称',
            dataIndex: 'material',
            align: 'center',
          },
          {
            title: '折扣',
            dataIndex: 'discount',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'cz',
            slots: { customRender: 'cz' },
            width: 150,
            align: 'center',
          },
        ],
      },
      {
        title: '企业原材料',
        url_path: '/api/user/manage/enterprise/material/',
        key: '/api/user/manage/enterprise/material/',
        filter_name: 'enterprise',
        columns: [
          {
            title: '原材料名称',
            dataIndex: 'name',
            width: 150,
            align: 'center',
          },
          {
            title: '原材料规格型号',
            dataIndex: 'sku',
            width: 150,
            align: 'center',
          },
          // {
          //   title: '物性表',
          //   dataIndex: 'properties',
          //   width:150,
          //   align:'center'
          // }, {
          //   title: '成分清单',
          //   dataIndex: 'composition',
          //   width:150,
          //   align:'center'
          // },
          {
            title: '操作',
            dataIndex: 'cz',
            slots: { customRender: 'cz' },
            width: 150,
            align: 'center',
          },
        ],
        addF: true,
        formConfig: [
          {
            id: 'name',
            label: '原材料名称',
            module: 'Input',
            rules: true,
          },
          // {
          //   id: 'model',
          //   label: '原材料型号',
          //   module: 'Input',
          // },
          {
            id: 'sku',
            label: '原材料型号/规格',
            module: 'Input',
            rules: true,
          },
          // {
          //   id: 'provide_enterprise',
          //   label: '原料供应商',
          //   module: 'Input'
          // },
          {
            id: 'provider_name',
            label: '所属供应商名称',
            rules: true,
            module: 'Input',
          },
          {
            id: 'elements',
            label: '成分清单',
            module: 'QuillEditor',
          },
          {
            id: 'physical_state',
            label: '物性表',
            module: 'QuillEditor',
          },
          {
            id: 'img_list',
            label: '原材料图片',
            module: 'Upload',
          },
        ],
      },
      {
        title: '企业产品',
        url_path: '/api/user/manage/enterprise/sample_product/',
        key: '/api/user/manage/enterprise/sample_product/',
        filter_name: 'enterprise',
        columns: [
          {
            title: '产品名称',
            dataIndex: 'name',
            width: 150,
            align: 'center',
          },
          {
            title: '产品规格型号',
            dataIndex: 'sku',
            width: 150,
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'cz',
            slots: { customRender: 'cz' },
            width: 150,
            align: 'center',
          },
        ],
        addF: true,
        formConfig: [
          {
            id: 'name',
            label: '产品名称',
            module: 'Input',
            rules: true,
          },
          {
            id: 'sku',
            label: '产品型号规格',
            module: 'Input',
          },
          {
            id: 'project',
            label: '检测项目',
            module: 'Input',
          },
          {
            id: 'basic',
            label: '检测标准',
            module: 'Input',
          },
          {
            id: 'frequency',
            label: '检测频率',
            module: 'Input',
          },
          {
            id: 'img_list',
            label: '产品图片',
            module: 'Upload',
          },
          {
            id: 'technique',
            label: '产品工艺',
            module: 'QuillEditor',
          },
          {
            id: 'performance',
            label: '产品性能',
            module: 'QuillEditor',
          },
        ],
      },
      {
        title: '企业工厂',
        url_path: '/api/user/manage/enterprise/enterprise_factory/',
        key: '/api/user/manage/enterprise/enterprise_factory/',
        filter_name: 'enterprise',
        addF: true,
        columns: [
          {
            title: '工厂名称',
            dataIndex: 'name',
            width: 150,
            align: 'center',
          },
          {
            title: '工厂地址',
            dataIndex: 'district',
            width: 150,
            align: 'center',
          },
          {
            title: '工厂面积(㎡）',
            dataIndex: 'area',
            width: 150,
            align: 'center',
          },
          {
            title: '工厂人数（人）',
            dataIndex: 'person_total',
            width: 150,
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'cz',
            slots: { customRender: 'cz' },
            width: 150,
            align: 'center',
          },
        ],
        formConfig: [
          {
            id: 'name',
            label: '工厂名称',
            module: 'Input',
            rules: true,
          },
          {
            id: 'district',
            label: '工厂地区',
            isAddress: true,
            module: 'Cascader',
            CascaderValue: [],
          },
          {
            id: 'address',
            label: '工厂详细地址',
            isAddress: true,
            module: 'Input',
          },
          {
            id: 'area',
            label: '工厂面积',
            isInt: true,
            addonAfter: '㎡',
            module: 'Input',
          },
          {
            id: 'person_total',
            label: '工厂人数',
            isInt: true,
            module: 'Input',
          },
          {
            id: 'detail',
            label: '工厂描述',
            module: 'QuillEditor',
          },
        ],
        children: [
          {
            title: '企业工厂设备',
            isSearchAllPlant: true,
            url_path: '/api/user/manage/enterprise/enterprise_factory_device/',
            key: '/api/user/manage/enterprise/enterprise_factory_device/',
            plantList: '/api/user/manage/enterprise/enterprise_factory/',
            filter_name: 'enterprise',
            addF: true,
            columns: [
              {
                title: '所属工厂',
                dataIndex: 'enterprise_factory',
                align: 'center',
              },
              {
                title: '设备名称',
                dataIndex: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '设备数量',
                dataIndex: 'number',
                width: 150,
                align: 'center',
              },
              {
                title: '操作',
                dataIndex: 'cz',
                slots: { customRender: 'cz' },
                width: 150,
                align: 'center',
              },
            ],
            formConfig: [
              {
                id: 'enterprise_factory',
                label: '所属工厂',
                module: 'Select',
                SelectValue: [],
                rules: true,
                rulesType: 'number',
                enterprise_factory: true,
              },
              {
                id: 'name',
                label: '设备名称',
                module: 'Input',
                rules: true,
              },
              {
                id: 'number',
                label: '设备数量',
                module: 'Input',
                isInt: true,
              },
              {
                id: 'category',
                label: '设备种类',
                module: 'Select',
                SelectValue: [
                  { name: '未知', value: 0 },
                  { name: '改性设备', value: 1 },
                  { name: '吹膜设备', value: 2 },
                  { name: '制袋设备', value: 3 },
                  { name: '印刷设备', value: 4 },
                ],
              },
              {
                id: 'img_list',
                label: '设备图片',
                module: 'Upload',
              },
            ],
          },
          {
            title: '工厂人员信息',
            isSearchAllPlant: true,
            url_path: '/api/user/manage/enterprise/factory_person/',
            key: '/api/user/manage/enterprise/factory_person/',
            plantList: '/api/user/manage/enterprise/enterprise_factory/',
            filter_name: 'enterprise',
            addF: true,
            columns: [
              {
                title: '所属工厂',
                dataIndex: 'enterprise_factory',
                align: 'center',
              },
              {
                title: '职工姓名',
                dataIndex: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '职务',
                dataIndex: 'position',

                align: 'center',
              },
              {
                title: '操作',
                dataIndex: 'cz',
                slots: { customRender: 'cz' },
                width: 150,
                align: 'center',
              },
            ],
            formConfig: [
              {
                id: 'enterprise_factory',
                label: '所属工厂',
                module: 'Select',
                SelectValue: [],
                rules: true,
                rulesType: 'number',
                enterprise_factory: true,
              },
              {
                id: 'name',
                label: '职工姓名',
                module: 'Input',
              },
              {
                id: 'position',
                label: '技术职位',
                module: 'Input',
              },
              // {
              //   id: 'duty',
              //   label: '职责',
              //   module: 'Input',
              // },
              {
                id: 'description',
                label: '职责描述',
                module: 'QuillEditor',
              },
            ],
          },
          {
            title: '企业工厂产线',
            isSearchAllPlant: true,
            url_path: '/api/user/manage/enterprise/factory_production_line/',
            key: '/api/user/manage/enterprise/factory_production_line/',
            plantList: '/api/user/manage/enterprise/enterprise_factory/',
            filter_name: 'enterprise',
            addF: true,
            columns: [
              {
                title: '所属工厂',
                dataIndex: 'enterprise_factory',
                align: 'center',
              },
              {
                title: '成品率',
                dataIndex: 'success_rate',

                width: 150,
                align: 'center',
              },
              {
                title: '利用率',
                dataIndex: 'use_rate',
                width: 150,
                align: 'center',
              },
              {
                title: '月生产量',
                dataIndex: 'month_quantity',
                width: 150,
                align: 'center',
              },
              {
                title: '年生产量',
                dataIndex: 'year_quantity',
                width: 150,
                align: 'center',
              },
              {
                title: '操作',
                dataIndex: 'cz',
                slots: { customRender: 'cz' },
                width: 150,
                align: 'center',
              },
            ],
            formConfig: [
              {
                id: 'enterprise_factory',
                label: '所属工厂',
                module: 'Select',
                SelectValue: [],
                rules: true,
                rulesType: 'number',
                enterprise_factory: true,
              },
              {
                id: 'name',
                label: '产线名称',
                module: 'Input',
              },
              {
                id: 'success_rate',
                label: '成品率',
                addonBefore: '％',
                rules: true,
                isInt: true,
                isHundred: true,
                module: 'Input',
              },
              {
                id: 'use_rate',
                label: '利用率',
                addonBefore: '％',
                rules: true,
                isInt: true,
                isHundred: true,
                module: 'Input',
              },
              {
                id: 'month_quantity',
                label: '月生产量',
                //isInt:true,
                isUnit: true,
                module: 'InputGroupQuantity',
              },
              {
                id: 'year_quantity',
                label: '年生产量',
                //isInt:true,
                isUnit: true,
                module: 'InputGroupQuantity',
              },
              {
                id: 'products',
                label: '产品列表',
                module: 'QuillEditor',
              },
            ],
          },
        ],
      },
      {
        title: '需求分析',
        url_path: '/api/user/manage/enterprise/demand/',
        key: '/api/user/manage/enterprise/demand/',
        filter_name: 'enterprise',
        addF: true,
        columns: [
          {
            title: '编号ID',
            dataIndex: 'id',
            align: 'center',
          },
          {
            title: '创建时间',
            dataIndex: 'add_time',
            align: 'center',
          },
          {
            title: '需求痛点',
            dataIndex: 'pain_points',
            align: 'center',
          },
          {
            width: 200,
            title: '操作',
            slots: { customRender: 'cz' },
            dataIndex: 'cz',
            align: 'center',
          },
        ],
        formConfig: [
          {
            id: 'pain_points',
            label: '需求痛点',
            module: 'Input',
            rules: true,
          },
          {
            id: 'content',
            label: '需求内容',
            module: 'QuillEditor',
          },
          {
            id: 'focus',
            label: '需求重点',
            module: 'QuillEditor',
          },
        ],
      },
      {
        title: '销售策略',
        url_path: '/api/user/manage/enterprise/sales_strategy/',
        key: '/api/user/manage/enterprise/sales_strategy/',
        filter_name: 'enterprise',
        addF: true,
        columns: [
          {
            title: '编号ID',
            dataIndex: 'id',
            align: 'center',
          },
          {
            title: '创建时间',
            dataIndex: 'add_time',
            align: 'center',
          },
          {
            title: '策略目标',
            dataIndex: 'target',
            align: 'center',
          },
          {
            width: 200,
            title: '操作',
            slots: { customRender: 'cz' },
            dataIndex: 'cz',
            align: 'center',
          },
        ],
        formConfig: [
          {
            id: 'target',
            label: '策略目标',
            module: 'Input',
            rules: true,
          },
          {
            id: 'content',
            label: '策略方案',
            module: 'QuillEditor',
          },
        ],
      },
      {
        title: '计划执行',
        url_path: '/api/user/manage/enterprise/plan_implementation/',
        key: '/api/user/manage/enterprise/plan_implementation/',
        filter_name: 'enterprise',
        addF: true,
        columns: [
          {
            title: '计划标题',
            dataIndex: 'title',

            align: 'center',
          },
          {
            title: '计划开始时间',
            dataIndex: 'start_time',

            align: 'center',
          },
          {
            title: '计划结束时间',
            dataIndex: 'end_time',

            align: 'center',
          },
          {
            width: 200,
            title: '操作',
            slots: { customRender: 'cz' },
            dataIndex: 'cz',
            align: 'center',
          },
        ],
        formConfig: [
          {
            id: 'title',
            label: '计划标题',
            rules: true,
            module: 'Input',
          },
          // {
          //   id: 'scheduled',
          //   label: '计划时间',
          //   rules:true,
          //   module: 'DatePicker',
          // },
          {
            id: 'start_time',
            label: '计划开始时间',
            rules: true,
            module: 'DatePicker',
          },
          {
            id: 'end_time',
            label: '计划结束时间',
            rules: true,
            module: 'DatePicker',
          },
          // {
          //   id: 'achieve_state',
          //   label: '执行情况',
          //   module: 'Input',
          // },{
          //   id: 'carry_state',
          //   label: '完成状况',
          //   module: 'Input',
          // },
          {
            id: 'content',
            label: '计划内容',
            module: 'QuillEditor',
          },
        ],
      },
    ],
  },
]
export const testcolumns = []

export const testcolumns2 = [
  {
    title: '工厂ID',
    dataIndex: 'id',
    /* slots: { customRender: 'id' },*/
  },
  {
    title: '工厂时间',
    dataIndex: 'add_time',
  },
  {
    title: '工厂的名字',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '工厂的类型',
    dataIndex: 'output_type',
  },
  {
    title: '操作',
    dataIndex: 'cz',
  },
]
export const testdataSource = []

export const formConfig2 = [
  {
    id: 'industry',
    label: '公司行业',
    name: 'industry',
    module: 'Input',
  },
  {
    id: 'scale',
    label: '公司规模',
    name: 'website',
    module: 'Input',
  },
  {
    id: 'source',
    label: '时间来源',
    name: 'source',
    module: 'select',
  },
]
