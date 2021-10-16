<!-- @format -->

<template>
  <div>
    <a-spin
      tip="数据加载中"
      :delay="300"
      :spinning="false"
    >
      <div
        v-if="newAdd === false"
        class="cData"
      >
        <div class="ivider" />
        <div class="more">
          <a-button
            class="menu"
            type="primary"
            @click="showClientModals"
          >
            <template #icon>
              <PlusOutlined />
            </template>
            新增客户
          </a-button>
        </div>
        <div class="table">
          <a-table
            :row-appendselection="rowSelection"
            :columns="columns"
            :data-source="tableData"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            bordered
          >
            <template #cz="{ record }">
              <span>
                <a @click="modification(record)">修改</a>&nbsp;
                <a @click="deletItem(record)">删除</a>
              </span>
            </template>
          </a-table>
          <div class="pagination">
            <a-pagination
              v-model:current="pagination.page"
              :page-size="pagination.size"
              :total="pagination.count"
              show-less-items
              @change="load"
            />
          </div>
        </div>
      </div>
      <div v-if="newAdd === true">
        <div class="newAddButton">
          <a-button @click="addTogo">
            返回上一层
          </a-button>
        </div>
        <DataDetails :enterprise-data="enterpriseData" />
      </div>
      <a-modal
        v-model:visible="showClientModal"
        title="请输入企业名称"
        width="560px"
        :destroy-on-close="true"
        @ok="newClient"
        @cancel="() => (this.enterpriseName = '')"
      >
        <!--<enterpriseInfo
          ref="enterpriseInfo"
        ></enterpriseInfo>-->
        <a-input v-model:value="enterpriseName" />
      </a-modal>
    </a-spin>
  </div>
</template>
<script>
import { createVNode } from 'vue'
import { enterprise, enterpriselist, schema, deleteDate } from '../../api/clientData'
import moment from 'moment'
import { filterFormOld, form, tableData, columns, modalForm, modalFormOld, rules } from './fixedData'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import DataDetails from './DataDetails'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  components: {
    PlusOutlined,
    DataDetails,
  },
  setup() {
    return {}
  },
  data() {
    return {
      url: '/api/user/manage/enterprise/',
      schema: '',
      childrenId: '',
      showClientModal: false,
      newAdd: false,
      oss: {},
      loding: true,
      clientHeight: document.body.clientHeight - 115 + 'px',
      dateFormat: 'YYYY-MM-DD',
      showModel: false,
      showModelTitle: '新增',
      size: 'large',
      form: form,
      filterFormOld: filterFormOld,
      tableData: tableData,
      columns: columns,
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      labelCols: { span: 4 },
      wrapperCols: { span: 16 },
      other: '',
      rules: rules,
      modalForm: modalForm,
      pagination: {
        page: 1, //-- 当前页
        size: 5, //-- 页大小
        count: 20, //--页总数
      },
      imageUrl: '',
      enterpriseInfo: modalForm.enterpriseInfo, //企业信息
      enterpriseName: '',
      enterpriseId: '',
      enterpriseData: {},
      quill: {
        width: 800,
        border: false,
        content: 'wellcome ~',
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ['bold', 'italic', 'underline', 'strike', 'link'],
        ],
      },
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // 禁止选择
          name: record.name,
        }),
      }
    },
  },
  mounted() {
    this.load()
  },
  beforeMount() {
    /* this.loding = false
    console.log('onBeforeMount');*/
  },
  methods: {
    addTogo() {
      this.newAdd = !this.newAdd
      this.reset('modalForm')
      this.showModelTitle = '新增'
      this.load()
    },
    async load() {
      this.loding = true
      const e = await schema()
      const userConfig = e.result.user__enterprise
      this.schema = userConfig

      let data = this.form
      let search = ''
      Object.keys(data).forEach(key => {
        if (data[key] != '') {
          search += data[key] + ' '
        }
      })
      let a = {
        /*  search,
        ordering:'id',*/
        page: this.pagination.page,
        size: this.pagination.size,
      }
      let res = await enterpriselist(a)
      if (res.code === 0) {
        this.loding = false
        this.tableData = this.configTable(res.result.results)
        this.pagination.count = res.result.count
      } else {
        message.error('系统故障请重新刷新页面')
      }
    },
    configTable(data) {
      // console.log(this.schema.fields);
      const fields = this.schema.fields
      Object.keys(fields).forEach(key => {
        if (fields[key].choices) {
          data.forEach(item => {
            item[key] = fields[key].choices[item[key]]
          })
        }
      })
      return data
    },

    //表格修改
    async modification(record) {
      this.showModel = true
      this.showModelTitle = '修改'
      this.newAdd = true

      this.enterpriseData = { id: record.id } //实际上只要一个ID就可以
    },
    deletItem(record) {
      const data = {
        id: record.id,
      }
      const that = this
      Modal.confirm({
        title: '你确定要删除此信息么？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.delete(data)
        },
        onCancel() {},
      })
    },
    async delete(data) {
      let a = await deleteDate(this.url, data)
      if (a.code === 0) {
        this.load()
      } else {
        this.$message.error(a.message)
      }
    },
    dateChange(date, dateString) {
      if (this.modalForm != true) {
        let startData = moment(date[0]).format('YYYY-MM-DD HH:mm:ss')
        let endData = moment(date[1]).format('YYYY-MM-DD HH:mm:ss')
        this.form.date[0] = startData
        this.form.date[1] = endData
      }
    },
    goUser() {
      this.load()
    },
    reset(e) {
      if (e === 'modalForm') {
        modalFormOld.addInfo = {}
        modalFormOld.customer_enterprises = []
        modalFormOld.demand_enterprises = []
        modalFormOld.salesstrategy_enterprises = []
        modalFormOld.planimplementation_enterprises = []
        this.imageUrl = ''
        // :afterClose="reset('model')"
        this.modalForm = Object.assign(this.modalForm, modalFormOld)
        /* console.log(this.modalForm);*/
      } else {
        this.form = Object.assign(this.form, this.filterFormOld)
      }
    },
    // 新增客户按钮
    showClientModals() {
      this.showClientModal = !this.showClientModal
      this.enterpriseInfo = {}
      this.modalForm = {}
    },
    // 校验新增信息
    newClient() {
      const name = this.enterpriseName
      if (name === '') {
        console.log(123)
        message.error('公司名称不能少于五个字符')
      }
      if (name.length < 5) {
        message.error('公司名称不能少于五个字符')
        return
      }
      this.sendClient({ name: this.enterpriseName })
    },
    // 提交表单信息
    async sendClient(data) {
      const res = await enterprise(data, 'POST')
      if (res.code === 0) {
        this.modalForm = res.result
        this.enterpriseData = res.result
        this.newAdd = true
        this.showClientModal = false
        this.enterpriseName = ''
      } else {
        Modal.error({
          content: res.message,
        })
      }
    },
  },
}
</script>
<style lang="less">
#date {
  width: 100% !important;
}
.goUserButton {
  position: relative;
  float: right;
  margin-right: 20px;
}
.ivider {
  .ant-divider {
    margin: 0 !important;
  }
}

.cData {
  background-color: white;
  padding: 25px;
  display: flex;
  flex-direction: column;
  .more {
    /*position: absolute;
   !* float: right;*!
    margin-top: 140px;
    right: 20px;
    width: 100px;*/
    /* height: 100px;*/
    padding: 25px 0px 25px 0px;
  }
  .menu {
  }
  .selects {
    margin-top: 10px;
    .ant-row-flex {
      /*      padding-bottom: 5px;*/
    }
  }
  .table {
  }
  .pagination {
    padding-top: 25px;
    .ant-pagination {
      position: relative;
      float: right;
    }
  }
  .ant-modal-content {
    margin-top: -60px;
  }
  .fromContent {
    width: 100%;
    .fromRight {
      display: inline-block;
      width: 450px;
    }
    .fromRight {
      display: inline-block;
      width: 450px;
    }
  }
  .addModalInfo {
  }
}
.newAddButton {
  padding: 25px 20px 0px 25px;
}
</style>
