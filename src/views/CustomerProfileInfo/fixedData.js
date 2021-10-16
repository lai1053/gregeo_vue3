/** @format */
import { biasConfig } from '@/components/fixedData/proTree'
export const fixedData = {
  proFormData: {
    layout: 'horizontal',
    form: {},
    formConfig: biasConfig,
  },
  proTableData: {
    size: 'default',
    isRowSelection: true,
    columns: [
      {
        sorter: true, // 是否允许排序
        title: '客户ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '时间',
        dataIndex: 'add_time',
        key: 'add_time',
      },
      {
        title: '公司全称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        slots: { customRender: 'name' },
      },
      {
        title: '公司规模',
        key: 'scale',
        dataIndex: 'scale',
      },
      {
        title: '公司产量',
        dataIndex: 'enterprise_yield',
        key: 'enterprise_yield',
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
        width: 90,
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        slots: { customRender: 'cz' },
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
    title: '客户关系',
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
