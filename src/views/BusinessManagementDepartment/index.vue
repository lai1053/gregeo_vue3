<template>
  <a-spin
    tip="数据加载中"
    :delay="1"
    :spinning="loading"
  >
    <div class="item">
      <a-row>
        <a-col
          span="5"
          class="rowColLeft"
        >
          <div>
            <a-input-search
              style="margin-bottom: 8px"
              placeholder="搜索"
              @change="onChange"
            />
            <div class="titleAdd">
              <h3>{{ parentData.name }}</h3>
              <span @click="titleAddClick(null, null)">
                <a-tooltip title="新增部门"> <IconFont type="iconAddto" /></a-tooltip>
              </span>
            </div>
            <a-tree
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="gData"
              @expand="onExpand"
              @select="onSelect"
            >
              <template #title="{ title, key }">
                <span v-if="title.indexOf(searchValue) > -1">
                  {{ title.substr(0, title.indexOf(searchValue)) }}
                  <span style="color: #f50">{{ searchValue }}</span>
                  <span class="featuresHover">
                    {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    <a>
                      <span @click="titleAddClick(title, key)"> <IconFont type="iconAddto" /> </span>
                      <span @click="titleModifyClick(title, key)"> <IconFont type="iconedit" /></span>
                    </a>
                  </span>
                </span>
                <span v-else>{{ title }}</span>
              </template>
            </a-tree>
          </div>
        </a-col>
        <a-col span="19">
          <div class="table">
            <ProTableMenu
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
      <a-modal
        v-model:visible="visible"
        :body-style="{}"
        :title="modalTitle"
        :width="width"
        :destroy-on-close="true"
        :footer="modalVisibleContent === 'ProForm' ? undefined : null"
        @ok="handleOk()"
        @cancel="cancel"
      >
        <ProForm
          v-if="modalVisibleContent === 'ProForm'"
          ref="ruleForm"
          :pro-form-data="proFormData"
        />
        <div
          v-if="modalVisibleContent === 'view'"
          class="viewCart"
        >
          <div class="title">
            <div class="titleImg">
              <a-avatar
                :src="viewCart.avatar"
                :size="64"
              />
            </div>
            <div class="titleText">
              <h2>{{ viewCart.username }}</h2>
              <span>
                <IconFont
                  v-if="viewCart.gender === 1"
                  type="iconboy"
                />
                <IconFont
                  v-if="viewCart.gender === 2"
                  type="icongirl"
                />
              </span>
            </div>
          </div>
          <a-divider />
          <div class="content">
            <a-row>
              <a-col
                span="10"
                class="colLeft"
              >
                邮箱账号:
              </a-col>
              <a-col
                span="14"
                class="colRight"
              >
                {{ viewCart.email }}
              </a-col>
            </a-row>
            <a-row>
              <a-col
                span="10"
                class="colLeft"
              >
                电话号码:
              </a-col>
              <a-col
                span="14"
                class="colRight"
              >
                {{ viewCart.phone }}
              </a-col>
            </a-row>
            <a-row>
              <a-col
                span="10"
                class="colLeft"
              >
                所属部门:
              </a-col>
              <a-col
                span="14"
                class="colRight"
              >
                {{ viewCart.department_name }}
              </a-col>
            </a-row>
            <a-row>
              <a-col
                span="10"
                class="colLeft"
              >
                部门角色:
              </a-col>
              <a-col
                span="14"
                class="colRight"
              >
                {{ viewCart.role_name }}
              </a-col>
            </a-row>
          </div>
        </div>
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
const departmentList = [
  {
    span: 12,
    label: '邮箱',
    rules: [{ required: true, message: '请输入邮箱', type: 'email', trigger: 'blur' }],
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'email',
    component: 'MetaInput',
    props: {
      key: 'email',
      placeholder: '新生成用户后邮箱不可更改',
    },
  },
  {
    span: 12,
    label: '姓名',
    rules: [{ required: true, message: '请输入此行信息', type: 'string', trigger: 'blur' }],
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'realname',
    component: 'MetaInput',
    props: {
      key: 'realname',
    },
  },
  {
    span: 12,
    label: '所属部门',
    rules: [{ required: true, message: '请输入此行信息', type: 'any', trigger: 'blur' }],
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'department',
    component: 'MetaSelect',
    props: {
      disabled: true,
      option: [],
    },
  },
  {
    span: 12,
    label: '角色',
    rules: [{ required: true, message: '请输入此行信息', type: 'any', trigger: 'blur' }],
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'role',
    component: 'MetaSelect',
    props: {
      option: [],
    },
  },
  {
    span: 12,
    label: '初始密码',
    rules: [{ required: true, message: '请输入给员工的初始密码', type: 'any', trigger: 'blur' }],
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'password',
    component: 'MetaInput',
    props: {
      key: 'password',
      placeholder: '不小于6位数且带大小写拼音的员工初始登录的密码',
    },
  },
  {
    span: 12,
    label: '性别',
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'gender',
    component: 'MetaRadioGroup',
    rules: [{ required: true, message: '此项为必填', type: 'any', trigger: 'blur' }],
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
        {
          name: '未知',
          value: 0,
        },
      ],
    },
  },
  {
    span: 12,
    label: '联系方式',
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 23,
      offset: 0,
    },
    key: 'phone',
    component: 'MetaInput',
    props: {
      key: 'phone',
    },
  },
  {
    span: 24,
    label: '备注',
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 24,
      offset: 0,
    },
    key: 'mark',
    component: 'MetaInputText',
    props: {
      key: 'mark',
    },
  },
]
import ProForm from '@/components/ProForm'
import ProTableMenu from '@/components/ProTableMenu'
import PorTable from '@/components/ProTable'
import { message, Modal } from 'ant-design-vue'
import { arrayToTree, getParentKey } from '@/utils/arrayToThree'
import { removeEmptyField } from '@/utils/removeEmptyField'
import { fixedData } from './fixedData'
import {
  currentInfo,
  getDepartment,
  createDepartment,
  modifyDepartment,
  getUserList,
  createCompanyUser,
  getCompanyUser,
  getRole,
} from '@/api/businessManagementDepartment'
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2343780_4rcl740gm75.js',
})
const { proFormData, proTableData, proTableMenuData } = fixedData
export default {
  components: {
    ProForm,
    ProTableMenu,
    PorTable,
    IconFont,
  },
  data() {
    return {
      loading: false,
      visible: false,
      modalTitle: '',
      modalVisibleContent: '',
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      parentData: {}, // 最顶级的父级信息
      gData: [], // 树状图需要的数据
      resList: [], // 后台返回过来经过了处理的数据
      width: '',
      proFormData,
      proTableData,
      proTableMenuData,
      selectedKeysData: '', // 当前选中的部门信息
      viewCart: '', // 卡片数据
    }
  },
  mounted() {
    this.getUserInfo()
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      const res = await getDepartment()
      res.result.results.forEach(i => {
        i.key = i.id
        i.scopedSlots = { title: 'title' }
        i.title = i.name
      })

      this.resList = res.result.results
      const data = arrayToTree(res.result.results)
      this.gData = data
      this.loading = false
    },
    async getTableList() {
      if (!this.selectedKeysData) {
        this.loading = false
        return
      }
      const id = this.selectedKeysData.id
      const parameters = {
        page: this.proTableData.pagination.page,
        size: this.proTableData.pagination.size,
        department: id,
      }
      const res = await getUserList(parameters)
      if (res.code === 0) {
        this.proTableData.pagination.count = res.result.count
        this.proTableData.tableData = res.result.results // 把接口数据添加给表格数据
      } else {
        message.error(res.message)
      }
      this.loading = false
    },
    async getUserInfo() {
      const userInfo = await currentInfo()
      // 根据当前的企业信息创建最顶级的父节点信息
      this.parentData = userInfo.result
    },
    titleAddClick(e, key) {
      this.modalTitle = '新增'
      this.width = '480px'
      this.modalVisibleContent = 'ProForm'
      this.proFormData.formConfig = [
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
      ]
      this.proFormData.form.startingName = e === null ? null : e
      this.proFormData.form.key = key
      this.visible = true
    },
    titleModifyClick(e, key) {
      this.modalTitle = '修改'
      this.width = '480px'
      this.modalVisibleContent = 'ProForm'
      let data = this.resList.filter(i => {
        return i.key === key
      })
      this.proFormData.formConfig = [
        {
          span: 24,
          label: '当前部门名称',
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
      ]
      this.proFormData.form = { ...data[0] }
      this.visible = true
      //this.proFormData.form.startingName
    },
    async onSelect(selectedKeys, info) {
      if (selectedKeys.length < 1) return
      this.loading = true
      const id = selectedKeys[0]
      const selectedKeysData = this.resList.filter(i => {
        return i.key === id
      })
      this.selectedKeysData = selectedKeysData[0]
      this.proTableMenuData.title = this.selectedKeysData.title
      this.getTableList()
    },
    handleOk() {
      this.$refs.ruleForm.$refs.ruleForm
        .validateFields()
        .then(() => {
          // 更新企业数据
          this.sendCode(this.$refs.ruleForm.componentData.form)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async sendCode(data) {
      this.loading = true
      const modalTitle = this.modalTitle
      let res
      switch (modalTitle) {
        case '新增':
          const createDepartmentParameters = {
            name: data.name,
            description: data.description,
            parent: data.key === 0 ? null : data.key,
          }
          res = await createDepartment(createDepartmentParameters)
          let listData = this.resList
          if (res.code === 0) {
            res.result.key = res.result.id
            res.result.scopedSlots = { title: 'title' }
            res.result.title = res.result.name
            listData.push(res.result)
            this.gData = arrayToTree(removeEmptyField(listData))
          } else {
            message.error(res.message)
          }

          break
        case '修改':
          const modifyDepartmentParameters = {
            id: data.key,
            name: data.name,
            description: data.description,
          }
          res = await modifyDepartment(modifyDepartmentParameters)
          if (res.code === 0) {
            this.resList.forEach(i => {
              if (i.key === data.key) {
                i.name = data.name
                i.title = data.name
                i.description = data.description
              }
            })
            this.gData = arrayToTree(removeEmptyField(this.resList))
            message.success('修改成功')
          } else {
            message.error(res.message)
          }
          break
        case '新增用户':
          const addUserParameters = {
            email: data.email,
            realname: data.realname,
            gender: data.gender,
            phone: data.phone,
            password: data.password,
            department: data.department,
            role: data.role,
            mark: data.mark,
          }
          const userRes = await createCompanyUser(addUserParameters)
          if (userRes.code === 0) {
            Modal.success({
              title: '用户创建成功',
              content: `登录邮箱为：${addUserParameters.email},密码为${addUserParameters.password}`,
            })
            this.getTableList()
          } else {
            message.error(userRes.message)
          }
          break
      }

      this.proFormData.form = {}
      this.visible = false
      this.loading = false
    },
    cancel() {
      this.proFormData.form = {}
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange(e) {
      const value = e.target.value
      const expandedKeys = this.resList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.gData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    },
    async menuClick(key, data) {
      //列表头部按钮所返回的信息
      switch (key) {
        case 'add':
          if (!this.selectedKeysData) return message.error('您还没有选择部门')
          this.loading = true
          // 先拿到当前部门信息
          this.proFormData.form.department = this.selectedKeysData.key
          //然后请求角色信息
          const role = await getRole()
          role.result.results.forEach(i => {
            i.value = i.id
          })
          if (role.result.results.length < 1) return message.error('您还没有可供选择的角色，请先到角色管理新增角色')
          // 把角色信息和部门信息放入配置当中
          departmentList.forEach(i => {
            if (i.key === 'role') {
              i.props.option = role.result.results
            }
            if (i.key === 'department') {
              i.props.option = [
                {
                  name: this.selectedKeysData.title,
                  value: this.selectedKeysData.key,
                },
              ]
            }
          })
          this.modalTitle = '新增用户'
          this.width = '910px'
          this.modalVisibleContent = 'ProForm'
          this.proFormData.formConfig = departmentList
          this.visible = true
          this.loading = false
          break
        case 'refresh':
          break

        case 'density':
          break

        case 'setUp':
          break
      }
    },
    async tableDataClick(key, data) {
      //列表页回信息
      switch (key) {
        case 'pagination':
          break
        case 'modification': // 修改数据
          message.warning('还没写这个东西')
          break
        case 'view': // 查看
          const userRes = await getCompanyUser({ id: data.id })
          this.viewCart = userRes.result
          this.modalTitle = '查看信息'
          this.modalVisibleContent = 'view'
          this.width = '480px'
          this.visible = true
          break
      }
    },
  },
}
</script>
<style scoped lang="less">
.colLeft {
  height: 34px;
  letter-spacing: 2px;
}
.colRight {
  text-align: left;
}

.titleAdd {
  padding: 10px 0px 0px 0px;
  h3 {
    display: inline-block;
  }
  span {
    .anticon {
      font-size: 16px;
    }
    margin-left: 6px;
  }
}
.viewCart {
  .title {
    height: 135px;
    //width:235px ;
    display: flex;
    justify-content: center;
    align-items: center;
    .titleImg {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    text-align: center;
    padding-bottom: 24px;
    .iconAddto::v-deep(.anticon) {
      margin-right: 6px;
      font-size: 24px;
    }
  }
  .titleText {
    padding-left: 10px;
    display: inline-block;
    h2 {
      display: inline-block;
    }
    span {
      margin-left: 6px;
      font-size: 24px;
    }
  }
  .ant-divider-horizontal {
    margin: 0 0 24px 0;
  }
}
.item {
  display: flex;
  flex-direction: column;
  padding: 25px;
  .ant-modal-body {
    padding: 0 !important;
  }
  .ant-modal {
    .ant-modal-body {
      padding: 0 !important;
    }
  }
}
.rowColLeft {
  padding-right: 25px !important;
  padding-bottom: 25px !important;
  border-right: 1px solid #f0f0f0;
}
.featuresHover {
  a {
    span {
      visibility: hidden;
    }
  }
  a:hover {
    span {
      margin-left: 3px;
      align-items: center;
      text-align: center;
      visibility: visible;
    }
  }
}
.table {
  padding-left: 20px;
}
</style>
