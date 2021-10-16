<!-- @format -->

<template>
  <a-spin
    tip="数据加载中"
    :delay="1"
    :spinning="loading"
  >
    <div class="item">
      <div class="upperLayer">
        <a-button
          class="button"
          @click="upperLayer"
        >
          返回上一层
        </a-button>
        <h2>{{ customerProfileInfo.name }}</h2>
      </div>
      <a-row class="row">
        <a-col
          span="4"
          class="rowColLeft"
        >
          <ProTree
            class="proTree"
            @treeClick="treeClick"
          />
        </a-col>
        <!--                <a-col
          span="1"
          class="divider"
        >
          <a-divider
            class="vertical"
            type="vertical"
          />
        </a-col>-->
        <a-col
          span="20"
          class="rowColRight"
        >
          <div
            v-if="displayForm"
            class="form"
          >
            <PorForm
              ref="ruleForm"
              class="PorForm"
              :pro-form-data="proFormData"
            />
          </div>
          <div
            v-if="!displayForm"
            class="table"
          >
            <ProTableMenu
              class="proTableMenu"
              :pro-table-menu-data="proTableMenuData"
              @menuClick="menuClick"
            />
            <PorTable
              :pro-table-data="proTableData"
              @tableDataClick="tableDataClick"
            />
          </div>
        </a-col>
      </a-row>
      <a-row
        v-if="displayForm"
        class="rowButton"
      >
        <a-col span="22" />
        <a-col
          v-if="!customerProfileInfo.allDisabled"
          span="2"
        >
          <a-button
            type="primary"
            @click="handleOk(id ? 'upData' : 'create')"
          >
            保存
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-modal
      v-model:visible="visible"
      :title="modalTitle"
      :width="modalConfig.width ? modalConfig.width : '750px'"
      :style="{ top: 25 }"
      :body-style="{
        top: '24px',
        height: modalConfig.width ? undefined : '560px',
        paddingTop: '0px',
        paddingBottom: '15px',
        paddingRight: '5px',
        paddingLeft: '5px',
      }"
      :destroy-on-close="true"
      :footer="customerProfileInfo.allDisabled ? null : undefined"
      @ok="handleOk"
      @cancel="cancel"
    >
      <div class="modalContent">
        <PorForm
          ref="ruleForm"
          :pro-form-data="proFormData"
        />
      </div>
    </a-modal>
  </a-spin>
</template>

<script>
import ProTree from '@/components/ProTree'
import ProTableMenu from '@/components/ProTableMenu'
import PorTable from '@/components/ProTable'
import PorForm from '@/components/ProForm'
import { Modal, message } from 'ant-design-vue'
import { fixedData } from './fixedData'
import { create, findSingle, findAllSingle, upData, deleteDate } from '@/api/customerPorfile'
import { proTreeConfig, biasConfig } from '@/components/fixedData/proTree'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { area } from './area'
import cloneDeep from 'lodash.clonedeep'
import { arrayToTree, treeFindPath } from '@/utils/arrayToThree'
const { proFormData, proTableData, proTableMenuData } = fixedData
export default {
  components: {
    ProTree,
    ProTableMenu,
    PorTable,
    PorForm,
  },
  data() {
    return {
      id: '',
      loading: false,
      visible: false, // 弹出框的显示
      displayForm: true, // 左侧显示表单或者是表格
      modalTitle: '', //弹出框标题
      modalConfig: {}, // 弹出框的配置信息
      treeData: '', //树结构返回数据
      qualification: '', // 企业资质
      customertag: '', //标签列表
      area,
      url: '',
      customerProfileInfo: {}, // 客户关系列表页返回信息
      biasConfig,
      biasConfigOld: cloneDeep(biasConfig),
      proFormData,
      proTableData,
      proTableMenuData,
      schema: {},
    }
  },
  created() {
    this.proFormData.formConfig = []
    this.customerProfileInfo = JSON.parse(localStorage.getItem('customerProfileInfo')) //
    this.qualification = JSON.parse(localStorage.getItem('qualification')) // 企业资质选项
    this.customertag = JSON.parse(localStorage.getItem('customertag')) // 标签列表
    this.schema = JSON.parse(localStorage.getItem('schema')) // 配置列表
    const allDisabled = this.customerProfileInfo.allDisabled
    if (allDisabled === 'readOnly') {
      this.biasConfigOld.forEach(i => {
        console.log(i)
        i.props.disabled = true
      })
      this.proFormData.formConfig = this.formConfigParams(this.biasConfigOld)
    } else {
      this.proFormData.formConfig = this.formConfigParams(this.biasConfig)
    }
    const realname = localStorage.getItem('realname')
    this.id = this.customerProfileInfo.id
    if (this.id) {
      this.load()
    } else {
      this.proFormData.form = {
        service_team: realname,
      }
    }
  },
  mounted() {},
  methods: {
    async load(e) {
      this.loading = true
      this.modalTitle = ''
      const params = {
        page: this.proTableData.pagination.page,
        size: this.proTableData.pagination.size,
      }
      let url = `/api/manage/customer/enterprise/${this.id}/`
      if (e && !e.displayForm) url = `${e.key}?enterprise=${this.id}&page=${params.page}&size=${params.size}` // 拼接父级ID数据
      if (e && e.displayForm && e.displayFormChildren) url = `${e.key}?enterprise=${this.id}`
      this.url = url
      const res = await findAllSingle(url)
      if (res.code === 0) {
        //  数据成功请求回来
        if (!e) {
          // 如果不是点击触发
          this.proFormData.form = this.positiveProcessingData(res.result)
          this.customerProfileInfo.product_type = res.result.product_type
        }
        if (e && e.displayForm) {
          const allDisabled = this.customerProfileInfo.allDisabled // //如果是点击触发 看触发的形态是表格还是表单
          //console.log(this.customerProfileInfo,'看状态');
          this.proFormData.form = this.positiveProcessingData(res.result) // 表单数据

          if (allDisabled === 'readOnly') {
            let disabledConfig = cloneDeep(e.formConfig)
            disabledConfig.forEach(i => (i.props.disabled = true))
            this.proFormData.formConfig = disabledConfig
            // console.log('进入到了只读的逻辑',e.formConfig);
          } else {
            this.proFormData.formConfig = e.formConfig
            //console.log('进入到了修改的逻辑',e.formConfig);
          }
        } else if (e && e.proTableData) {
          // 非表单配置
          e.proTableData.allDisabled = this.customerProfileInfo.allDisabled
          e.proTableData.pagination.count = res.result.count
          e.proTableData.tableData = this.configTable(res.result.results) // 把接口数据添加给表格数据
          //e.proTableData.tableData = res.result.results // 把接口数据添加给表格数据
          this.proTableData = e.proTableData || [] //渲染表格数据
        }
      } else {
        Modal.error({
          content: res.message,
        })
      }
      this.loading = false
    },
    configTable(data) {
      const customer = this.treeData.proTableData.customer
      const fields = this.schema[customer].fields || []
      fields &&
        Object.keys(fields).forEach(key => {
          if (fields[key].choices) {
            data.forEach(item => {
              item[key] = fields[key].choices[item[key]]
            })
          }
        })
      return data
    },
    formConfigParams(data) {
      data.forEach(i => {
        if (i.qualification) {
          i.props.option = this.qualification[i.qualification]
        }
        if (i.key === 'customertag') {
          i.props.option = this.customertag.customertag
        }
      })
      return data
    },
    upperLayer() {
      // 置空表单信息
      this.proFormData.form = {}
      // 返回上一层
      this.$router.replace({
        path: '/BasicLayout/customerProfile',
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      })
    },
    treeClick(e) {
      this.displayForm = false
      if (this.customerProfileInfo.allDisabled === 'readOnly') {
        this.proTableMenuData.menuList = [] // 查看状态下没有新增功能
      } else {
        this.proTableMenuData.menuList = [
          {
            type: 'primary',
            icon: 'iconicon-test2',
            text: '新增',
            features: 'add',
            size: 'small',
          },
        ] // 查看状态下没有新增功能
      }
      if (!this.id) return message.error('没有企业相关信息')
      // 树形控件返回的值用以渲染左边显示的值
      if (e.displayForm) {
        this.displayForm = true
      } else {
        this.displayForm = false
      }

      // 根据树状图的key，组装页面配置信息
      this.proTableMenuData.title = e.title // 新增菜单栏的标题名称
      e.formConfig = proTreeConfig[e.paramsKey].formConfig // 客户信息表配置
      e.proTableData = proTreeConfig[e.paramsKey].proTableData // 表格信息
      e.modalConfig = proTreeConfig[e.paramsKey].modalConfig // 模态框信息
      this.proTableData.pagination.page = 1
      this.proTableData.pagination.size = 5
      this.treeData = e

      this.load(e)
      //
    },
    async tableDataClick(key, data) {
      //列表页回信息
      switch (key) {
        case 'pagination':
          console.log('父组件数据', 'pagination', data)
          this.proTableData.pagination = data
          console.log(this.proTableData.pagination)
          this.load(this.treeData)
          break
        case 'sorter':
          console.log('父组件数据', 'sorter', data)
          break
        case 'selectedRowData':
          console.log('父组件数据', 'selectedRowData', data)
          break
        case 'modification': // 修改数据
          this.loading = true

          this.url = `${this.treeData.key}${data.id}/`
          const res = await findAllSingle(`${this.treeData.key}${data.id}/`) //查找到这条数据
          this.modalTitle = '修改'
          this.modalConfig = this.treeData.modalConfig

          // 如果是工厂的子级则需要先把工厂列表请求回来 作为工厂子级的选项
          if (this.modalConfig.requestEnterpriseFactoryListUrl) {
            const res = await findAllSingle(`${this.modalConfig.requestEnterpriseFactoryListUrl}?enterprise=${this.id}`)
            if (res.result.results.length <= 0) {
              return Modal.error({ content: '请先建立工厂信息', onOk: () => (this.loading = false) })
            } else {
              res.result.results.forEach(i => (i.value = i.id))
              this.treeData.modalConfig.formConfig.forEach(item => {
                //把工厂信息作为其选项
                if (item.requestEnterpriseFactoryListUrlOption) {
                  item.props.option = res.result.results
                }
              })
            }
          }
          //this.proFormData.form.product_type = this.customerProfileInfo.product_type // 产品分类
          this.proFormData.form = this.positiveProcessingData(res.result) // 填充表单数据
          //this.proFormData.form = {...res.result} // 填充表单数据
          this.proFormData.formConfig = this.formConfigParams(this.treeData.modalConfig.formConfig) //
          this.visible = true
          this.loading = false
          break
        case 'deleteItem':
          const url = `${this.treeData.key}${data.id}/`
          const that = this
          Modal.confirm({
            title: '你确定要删除此信息么？',
            icon: createVNode(ExclamationCircleOutlined),
            content: '确认删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              const res = deleteDate(url)
              if (res) {
                that.load(that.treeData)
              } else {
                that.$message.error(res.message)
              }
            },
            onCancel() {},
          })
          break
        case 'view':
          this.loading = true
          this.url = `${this.treeData.key}${data.id}/`
          const viewRes = await findAllSingle(`${this.treeData.key}${data.id}`) //查找到这条数据
          this.modalTitle = '查看'

          this.modalConfig = this.treeData.modalConfig
          this.proFormData.form = this.positiveProcessingData(viewRes.result) // 填充表单数据
          let arr = cloneDeep(this.treeData.modalConfig.formConfig)
          arr.forEach(i => {
            if (i.props) {
              i.props.disabled = true
            }
          })
          this.proFormData.formConfig = this.formConfigParams(arr)
          this.visible = true
          this.loading = false
          break
      }
    },
    async menuClick(key, data) {
      //列表头部按钮所返回的信息
      switch (key) {
        case 'add':
          this.loading = true
          this.modalTitle = '新增'
          this.modalConfig = this.treeData.modalConfig
          // 处理配置信息
          if (this.modalConfig.requestEnterpriseFactoryListUrl) {
            const res = await findAllSingle(`${this.modalConfig.requestEnterpriseFactoryListUrl}?enterprise=${this.id}`)
            if (res.result.results.length <= 0) {
              return Modal.error({ content: '请先建立工厂信息', onOk: () => (this.loading = false) })
            } else {
              res.result.results.forEach(i => (i.value = i.id))
              this.treeData.modalConfig.formConfig.forEach(item => {
                //把工厂信息作为其选项
                if (item.requestEnterpriseFactoryListUrlOption) {
                  item.props.option = res.result.results
                }
              })
            }
          }
          this.proFormData.form = {} // 置空表单数据
          this.proFormData.form.product_type = this.customerProfileInfo.product_type // 产品分类
          this.proFormData.formConfig = this.formConfigParams(this.treeData.modalConfig.formConfig) //
          this.visible = true
          this.loading = false
          break
        case 'refresh':

        case 'density':
          if (data.key) {
            this.proTableData.size = data.key
          } else {
            return
          }
          break

        case 'setUp':
          break
      }
    },
    handleOk(type) {
      //console.log(this.$refs.ruleForm.$refs.ruleForm)
      this.$refs.ruleForm.$refs.ruleForm
        .validateFields()
        .then(() => {
          // 更新企业数据
          //console.log('values', this.$refs.ruleForm.componentData.form)
          const data = cloneDeep(this.$refs.ruleForm.componentData.form)
          this.onSubmit(type, data)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    cancel() {
      this.load(this.treeData)
    },
    async onSubmit(type, data) {
      //提交表单数据
      data.district = data.district && data.district.length !== 0 ? data.district.slice(-1)[0] : '' // 取地址的最后一位数给胖子
      data.pay_type = data.pay_type && data.pay_type.length !== 0 ? data.pay_type.slice(-1)[0] : 1 // 取付款方式最后一位数给胖子
      if (data.quality_certificate || data.quality_certificate_children) {
        if (data.quality_certificate_children)
          data.quality_certificate = [...data.quality_certificate, ...data.quality_certificate_children]
      }
      if (data.tags) {
        let arr = []
        data.tags.forEach(i => {
          arr.push(i.id)
        })
        data.tags = arr
      }
      const url = this.url
      let res
      if (type === 'create') {
        res = await create('/api/manage/customer/enterprise/', data, 'POST')
      }

      if (type === 'upData' || this.modalTitle === '修改') {
        // 更新数据
        if (data.area === '') data.area = 0
        if (data.person_total === '') data.person_total = 0
        const treeData = this.treeData
        console.log(treeData)
        let url = this.url
        if (treeData.displayFormChildren) {
          url = `/api/manage/customer/planimplementation/${this.proFormData.form.id}/`
        }
        res = await upData(url, data)
      }
      if (this.modalTitle === '新增') {
        // 创建数据
        data.enterprise = this.id
        const url = this.treeData.key
        res = await create(url, data)
      }
      if (res.code === 0) {
        if (type === 'create') {
          this.id = res.result.id
        }
        if (res.result.name && this.displayForm === true) {
          this.customerProfileInfo.name = res.result.name
        }
        message.success({
          content: '成功',
        })
        this.visible = false
        this.load(this.treeData)
      } else {
        message.error({
          content: res.message,
        })
      }
    },
    positiveProcessingData(data) {
      // 反向递归处理地址数据
      if (data.district) {
        const area = arrayToTree(this.area)
        data.district = treeFindPath(area, node => node.id === data.district * 1)[0]
      }
      if (data.pay_type) {
        const schema = this.schema
        const there = arrayToTree(schema.customer__enterprise.fields.pay_type.choices)
        data.pay_type = treeFindPath(there, node => node.id === data.pay_type * 1)[0]
      }
      if (data.start_time && data.end_time) {
        data.start_end_time = [data.start_time, data.end_time]
      }
      if (data.month_quantity === '0.00') data.month_quantity = ''
      if (data.year_quantity === '0.00') data.year_quantity = ''
      if (data.area === 0) data.area = ''
      if (data.person_total === 0) data.person_total = ''
      if (data.user) data.service_team = data.user.realname
      if (data.month_quantity === '') data.month_quantity = 0
      if (data.year_quantity === '') data.year_quantity = 0
      if (data.quality_certificate) {
        let type1 = []
        let type2 = []
        data.quality_certificate.forEach(i => {
          this.qualification.type1.forEach(j => {
            if (j.id === i) {
              type1.push(i)
            }
          })
          this.qualification.type2.forEach(k => {
            if (k.id === i) {
              type2.push(i)
            }
          })
        })
        //console.log(type1, type2);
        data.quality_certificate = type1
        data.quality_certificate_children = type2
        if (this.displayForm !== true && this.treeData.title !== '客户需求') {
          console.log(this.treeData)
          data.quality_certificate = type2
        }
      }
      // console.log(data)
      return data
    },
  },
}
</script>

<style scoped lang="less">
.proTableMenu {
  padding-right: 50px;
}
.PorForm {
  .ant-form-item-control {
    line-height: 24px !important;
  }
}
.item {
  display: flex;
  flex-direction: column;
}
.upperLayer {
  display: inline-block;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  //border-bottom: 1px solid #f0f0f0;
  .button {
    position: absolute;
  }
  h2 {
    width: 100%;
    display: inline-block;
    text-align: center;
  }
}
.rowColLeft {
  border-right: 1px solid #f0f0f0;
}
.rowColRight {
  padding-left: 20px;
  padding-right: 20px;
}
.row {
  width: 100%;

  .proTree {
    margin-left: 20px;
  }
}
.rowButton {
  padding: 25px 0px 25px 25px;
}
.modalContent {
  padding-left: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
}
</style>
