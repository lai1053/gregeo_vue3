import VueTypes from 'vue-types'
import { ref, reactive, toRefs, getCurrentInstance } from 'vue'
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import {
  Table,
  Tree,
  Row,
  Col,
  Input,
  Button,
  Spin,
  Modal,
  Form,
  Select,
  Upload,
  Cascader,
  DatePicker,
  Tag,
} from 'ant-design-vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import './DataDetails.less'

const { TextArea, Group } = Input
const { TreeNode } = Tree
import { create, deleteDate, upDate, findSingle, findAllSingle, yun_osss_token, getCascaer } from '@/api/clientData'
import { testTreeData, testdataSource, basicFormConfig } from './testData'
import QuillEditor from '@/components/quill-editor'
import { area } from './area'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const getChildByKey = (array, key, id = 'spbm', pid = 'parentSpbm') => {
  let data = cloneDeep(array)
  let result = [],
    hash = {}
  data.forEach((item, index) => {
    if (item[id] == item[pid]) {
      item[pid] = null
    }
    if (item[id] == key) {
      hash[item[id]] = { ...item }
    }
  })

  data.forEach((item, index) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      result.push({ ...item })
      hash[item[id]] = { ...item }
    }
  })
  return result
}
const arrayToTree = (array, id = 'id', pid = 'parent', title = 'spmc', children = 'children') => {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    item.label = item.name
    item.value = item.id
    if (item[id] == item[pid]) {
      item[pid] = null
    }
    hash[data[index][id]] = data[index]
  })
  data.forEach(item => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
const enterpriseData = {
  enterpriseData: VueTypes.any,
}

const dataLoop = (data, key) => {
  if (!key) return
  let Obj = {}
  data.map(item => {
    if (item.key === key) return (Obj = item)
  })
  return Obj
}
const DataDetails = {
  props: {
    enterpriseData,
  },
  setup(props) {
    const { ctx } = getCurrentInstance() // 获取当前组件实例
    const state = reactive({
      contactNumber: {
        //电话信息
        country: '+86',
        area: '0000',
        phone: '',
      },
      month_quantity: {
        quantity: '',
        unit: '吨',
      },
      year_quantity: {
        quantity: '',
        unit: '吨',
      },
      website: {
        addonBefore: 'http://',
        addonAfter: '.com',
      },
      oss: {},
      actionUrl: '',
      enterpriseData: props.enterpriseData,
      expandedKeys: ['/api/user/manage/enterprise/'],
      searchValue: '',
      spinning: false,
      autoExpandParent: true,
      treeData: testTreeData,
      dataSource: testdataSource,
      selectData: {
        title: '客户综合信息',
        url_path: '/api/user/manage/enterprise/',
        pathF: true,
        formConfig: [],
      },
      columns: [],
      visible: false,
      updateFlag: false,
      rules: {},
      value: {},
      treeDataSing: [],
      CRUDUrl: '',
      formConfig: [],
      formConfigOld: [],
      basicFormConfig: basicFormConfig,
      upload: {
        fileList: [],
        previewVisible: false,
        previewImage: '',
      },
      quill: {
        width: 750,
        border: true,
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
      },
      quillEditorKey: [],
      CascaderValue: {},
      plantList: [], // 工厂列表
      tags: [],
      tagInputValue: '', //标签输入框的值
      tagInputVisible: '', // 标签输入框的显示隐藏判定
      // addressData:'' // 地址信息
      area: arrayToTree(area), // 地区列表
    })
    const assignData = () => {
      state.value = {}
      state.upload.fileList = [] // 图片
      state.quillEditorKey = [] // 富文本
      state.tags = [] //标签
      state.quill.value = ''
    }
    const load = async () => {
      let url = `${state.selectData.url_path}?${state.selectData.filter_name}=${props.enterpriseData.id}`
      const res = await findAllSingle(url)
      if (res.code === 0) {
        state.dataSource = res.result.results
      } else {
        Modal.error({
          content: res.message,
        })
      }
    }
    const addition = () => {
      assignData()
      if (state.selectData.isSearchAllPlant) {
        if (state.plantList.length === 0) {
          Modal.error({
            title: '请先建立工厂信息',
          })
          return
        }
      }
      state.formConfig = state.formConfigOld
      state.updateFlag = false
      state.visible = !state.visible
    }
    const deletItem = record => {
      Modal.confirm({
        title: '你确定要删除这条信息么',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          senDelet(record)
        },
      })
    }
    const senDelet = async record => {
      const res = await deleteDate(state.selectData.url_path, { id: record.record.id })
      if (res.code === 0) {
        load()
      } else {
        Modal.error({
          content: res.message,
        })
      }
    }
    const updateItem = async record => {
      state.updateFlag = true
      const data = { id: record.record.id }
      const res = await findSingle(state.selectData.url_path, data)
      if (res.result.native_place) {
        const area = arrayToTree(state.area)
        res.result.native_place = treeFindPath(area, node => node.id === res.result.native_place * 1)[0]
      }
      if (res.result.district) {
        const area = arrayToTree(state.area)
        res.result.district = treeFindPath(area, node => node.id === res.result.district * 1)[0]
      }
      state.value = res.result
      if (res.result.img_list) {
        state.upload.fileList = res.result.img_list
      }
      if (res.result.tags) {
        state.tags = res.result.tags
      }
      if (res.result.month_quantity) {
        state.month_quantity = res.result.month_quantity
      }
      if (res.result.year_quantity) {
        state.year_quantity = res.result.year_quantity
      }
      state.value = { ...res.result }
      state.visible = !state.visible
    }
    const onSelect = async (selectedKeys, info, expandedKeys) => {
      const key = selectedKeys[0]
      if (!key) return
      //console.log('selected', selectedKeys, info,expandedKeys);
      assignData()
      state.spinning = true
      let res
      const selectData = dataLoop(state.treeDataSing, key)
      state.selectData = selectData
      //配置表单校验字段和表单联级配置
      const dataTree = () => {}
      selectData.formConfig &&
        selectData.formConfig.forEach(async item => {
          // 配置验证字段
          if (item.rules) {
            state.rules[item.id] = [{ required: true, message: '此项为必填', trigger: 'blur' }]
          }
          if (item.rulesType) {
            state.rules[item.id] = [
              {
                type: item.rulesType,
                required: item.rules,
                message: item.rulesMessage ? item.rulesMessage : '',
                trigger: 'blur',
              },
            ]
          }
          if (item.isCascader) {
            const res = await getCascaer(item.cascaderUrl)
            item.CascaderValue = arrayToTree(res.result) //给每个联级选择器配上相对应的配置数据
            state.CascaderValue[item.id] = arrayToTree(res.result) // 用于反向递归查找父级树
          }
          if (item.isAddress) {
            item.CascaderValue = state.area
          }
        })
      // 表头和表单配置数据
      state.formConfig = selectData.formConfig || []
      state.formConfigOld = selectData.formConfig || []
      state.columns = selectData.columns || []
      if (selectData.pathF) {
        //客户综合信息表
        let fileList = ref([])
        res = await findSingle(selectData.url_path, { id: props.enterpriseData.id })
        state.CRUDUrl = selectData.url_path
        if (res.result.photo) {
          fileList = [
            {
              url: res.result.oss_host + res.result.photo,
            },
          ]
        }
        state.upload.fileList = fileList
        if (res.result.category) {
          // 因为后台只要联级元素的最后一个 所以要组装成需要的联机元素数组
          res.result.category = treeFindPath(state.CascaderValue.category, node => node.id === res.result.category)[0]
        }
        if (res.result.district) {
          const area = arrayToTree(state.area)
          res.result.district = treeFindPath(area, node => node.id === res.result.district * 1)[0]
        }
        res.result.service_start_time = res.result.service_start_time
          ? moment(res.result.service_start_time).format('YYYY-MM-DD')
          : null
        // if (res.result.product_category.length > 0) { // 因为后台只要联级元素的最后一个 所以要遍历组装成需要的联级元素数组
        //   const a = state.formConfig.filter((item)=>item.id === 'product_category' && !item.cloneIndex) // 先拿出这个对象
        //      const obj = a[0]
        //   let arr = []
        //   res.result.product_category.forEach((item,index)=>{
        //      let b = {}
        //     b[`product_category${index}`] = treeFindPath(state.CascaderValue.product_category, node => node.id === item)[0]
        //     const data = {
        //       ...obj,
        //       id:obj.id+index,
        //       cloneIndex: index,
        //       label:`子类型`
        //     }
        //     if(data.cloneIndex >0){
        //       arr.push(data)
        //     }
        //     res.result.product_category = b.product_category0 ? b.product_category0 :''
        //   })
        //    res.result = {...res.result,...b}
        //   const newArr = [...state.basicFormConfig,...arr]
        //   console.log(state.formConfigOld, arr);
        //   state.basicFormConfig = [...newArr]
        // }
        if (typeof res.result.service_team === 'object') res.result.service_team = ''
        state.contactNumber = { ...state.contactNumber, ...res.result.phone }
        state.website = { ...res.result.website }
        state.value = { ...res.result }
      } else if (selectData.isSearchAllPlant) {
        // 判定是否为工厂子级
        let plantUrl = `${selectData.url_path}?${selectData.filter_name}=${props.enterpriseData.id}`
        res = await findAllSingle(plantUrl)
        let url = `${selectData.plantList}?${selectData.filter_name}=${props.enterpriseData.id}`
        state.CRUDUrl = selectData.url_path
        let plantList = await findAllSingle(url) // 先拿到工厂的列表
        state.plantList = plantList.result.results
        plantList.result.results.forEach(i => {
          i.value = i.id
        })
        selectData.formConfig.forEach(item => {
          plantList.result.results.forEach(item => {
            item.value = item.id
            item.id = item.id
          })
          if (item.id === 'enterprise_factory') item.SelectValue = plantList.result.results
        })
      } else {
        let url = `${selectData.url_path}?${selectData.filter_name}=${props.enterpriseData.id}`
        res = await findAllSingle(url)
        state.CRUDUrl = url
      }

      // 表格数据
      if (res.code === 0 && res.result.results) {
        state.dataSource = res.result.results
      }

      state.spinning = false
    }
    const treeFindPath = (tree, func, path = [], result = []) => {
      for (const data of tree) {
        path.push(data.id)
        func(data) && result.push([...path])
        data.children && treeFindPath(data.children, func, path, result)
        path.pop()
      }
      return result
    }
    const onExpand = (expandedKeys, e) => {
      state.expandedKeys = expandedKeys
      state.autoExpandParent = true
    }
    const handleCancel = () => {
      state.upload.previewVisible = false
    }
    const beforeUpload = async file => {
      let o = await yun_osss_token()
      const oss = o.result
      const obj = {
        success_action_status: 201,
        OSSAccessKeyId: oss.accessid,
        policy: oss.policy,
        Signature: oss.signature,
        key: oss.dir + oss.expire,
      }
      state.actionUrl = oss.host
      state.oss = obj
      file.uid = oss.expire
      file.photo = oss.dir + oss.expire
      file.url = state.actionUrl + oss.dir + oss.expire
      state.value.photo = oss.dir + oss.expire
    }
    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      state.upload.previewImage = file.url || file.preview
      state.upload.previewVisible = true
    }
    const handleChange = ({ fileList }, type, key) => {
      state.upload.fileList = fileList
      if (key != 'photo') {
        state.value[key] = fileList
      }
    }
    const cascaderChange = (value, key) => {
      state.value[key] = value
    }
    const datePickerChange = (date, key, type) => {
      if (date === null) return
      if (type === 'MonthPicker') {
        state.value[key] = moment(date).format('YYYY-MM')
      }
      state.value[key] = moment(date).format('YYYY-MM-DD')
    }
    const inputChange = (e, item, key) => {
      if (item.isUnit) {
        if (key === 'quantity') {
          state[item.id][key] = e.target.value.replace(/[^\d]/g, '')
        } else {
          state[item.id][key] = e.target.value
        }
      }
      if (item.id === 'phone') {
        state.contactNumber[key] = e.target.value.replace(/[^\d]/g, '')
      }
      if (item.isInt) {
        state.value[item.id] = e.target.value.replace(/[^\d]/g, '')
      }
      if (item.isEmail) {
        state.value[item.id] = e.target.value.replace(/[\u4E00-\u9FA5]/g, '')
      }
      if (item.isHundred) {
        const isHundredValue = e.target.value.replace(/[^\d]/g, '')
        state.value[item.id] = isHundredValue.substring(0, 2)
      }
    }
    const tgeClose = (tag, removedTag) => {
      const tags = state.tags.filter(tag => tag !== removedTag)
      state.tags = tags
    }
    const TagHandleInputConfirm = () => {
      const inputValue = state.tagInputValue
      let tags = state.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      state.tags = tags
      state.tagInputVisible = false
      state.tagInputValue = ''
    }
    const showTagInput = tag => {
      state.tagInputVisible = true
      ctx.$nextTick(() => {
        ctx.$refs.TagInput.focus()
      })
    }
    const TagHandleEditInputChange = e => {
      state.tagInputValue = e.target.value
    }
    const RenderForms = data =>
      data.map(item => {
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )
        const phoneFormat = (
          <Group>
            <Row gutter={8}>
              <Col span={5}>
                <Input
                  v-model={[state.contactNumber.country, 'value']}
                  defaultValue="+86"
                  onChange={e => {
                    inputChange(e, item, 'country')
                  }}></Input>
              </Col>
              <Col span={5}>
                <Input
                  v-model={[state.contactNumber.area, 'value']}
                  defaultValue="0571"
                  onChange={e => {
                    inputChange(e, item, 'area')
                  }}></Input>
              </Col>
              <Col span={10}>
                <Input
                  v-model={[state.contactNumber.phone, 'value']}
                  onChange={e => {
                    inputChange(e, item, 'phone')
                  }}></Input>
              </Col>
            </Row>
          </Group>
        )
        const yieldFormat = (
          <Group size="lage">
            <Row gutter={8}>
              <Col span={20}>
                <Input
                  v-model={[state[item.id].quantity, 'value']}
                  defaultValue=""
                  onChange={e => {
                    inputChange(e, item, 'quantity')
                  }}></Input>
              </Col>
              <Col span={4}>
                <Input
                  v-model={[state[item.id].unit, 'value']}
                  defaultValue="吨"
                  onChange={e => {
                    inputChange(e, item, 'unit')
                  }}></Input>
              </Col>
            </Row>
          </Group>
        )

        if (item.addonBefore === 'httpSelect') {
          item.addonBefore = (
            <Select v-model={[state.website.addonBefore, 'value']} defaultValue="http://" className="select-before">
              <Select.Option value="http://">http://</Select.Option>
              <Select.Option value="https://">https://</Select.Option>
            </Select>
          )
        }
        if (item.addonAfter === 'httpSelect') {
          item.addonAfter = (
            <Select v-model={[state.website.addonAfter, 'value']} defaultValue=".com" className="select-after">
              <Select.Option value=".com">.com</Select.Option>
              <Select.Option value=".jp">.jp</Select.Option>
              <Select.Option value=".cn">.cn</Select.Option>
              <Select.Option value=".org">.org</Select.Option>
            </Select>
          )
        }

        const tags = state.tags
        return (
          <Form.Item class={item.module === 'QuillEditor' ? 'FormItem' : ''} name={item.id} label={item.label}>
            {item.module === 'InputGroup' && phoneFormat}
            {item.module === 'InputGroupQuantity' && yieldFormat}
            {item.module === 'InputWeb' && (
              <Input
                style={{ width: '85%' }}
                addonBefore={item.addonBefore ? item.addonBefore : null}
                maxlength={item.maxlength}
                v-model={[state.website.content, 'value']}
                onChange={e => {
                  inputChange(e, item)
                }}
                addonAfter={item.addonAfter ? item.addonAfter : null}></Input>
            )}
            {item.module === 'Input' && (
              <Input
                style={{ width: '85%' }}
                addonBefore={item.addonBefore ? item.addonBefore : null}
                maxlength={item.maxlength}
                v-model={[state.value[item.id], 'value']}
                onChange={e => {
                  inputChange(e, item)
                }}
                addonAfter={item.addonAfter ? item.addonAfter : null}></Input>
            )}
            {item.module === 'DatePicker' && (
              <DatePicker
                format={'YYYY-MM-DD'}
                onChange={date => {
                  datePickerChange(date, item.id)
                }}
                v-model={[state.value[item.id], 'value']}></DatePicker>
            )}
            {item.module === 'MonthPicker' && (
              <DatePicker.MonthPicker
                format={'YYYY-MM'}
                onChange={date => {
                  datePickerChange(date, item.id, 'MonthPicker')
                }}
                v-model={[state.value[item.id], 'value']}></DatePicker.MonthPicker>
            )}
            {item.module === 'TextArea' && (
              <TextArea style={{ width: '85%' }} v-model={[state.value[item.id], 'value']}></TextArea>
            )}
            {item.module === 'Select' && (
              <Select
                style={{ width: '85%' }}
                v-model={[state.value[item.id], 'value']}
                getPopupContainer={triggerNode => triggerNode.parentNode}>
                {item.SelectValue.map(i => {
                  return (
                    <Select.Option key={i.value} value={i.value}>
                      {i.name}
                    </Select.Option>
                  )
                })}
              </Select>
            )}
            {item.module === 'Upload' && (
              <div className="clearfix">
                <Upload
                  action={state.actionUrl}
                  listType="picture-card"
                  fileList={state.upload.fileList}
                  data={state.oss}
                  before-upload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={fileList => {
                    handleChange(fileList, item.imgeMultiple, item.id)
                  }}>
                  {state.upload.fileList.length < 3 ? uploadButton : null}
                  <Modal visible={state.upload.previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={state.upload.previewImage} />
                  </Modal>
                </Upload>
              </div>
            )}
            {item.module === 'Cascader' && (
              <span>
                <Cascader
                  style={{ width: '85%' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  v-model={[state.value[item.id], 'value']}
                  options={item.CascaderValue}
                  placeholder={'请选择您需要的信息'}
                  onChange={value => {
                    cascaderChange(value, item.id)
                  }}
                  expandTrigger={'hover'}></Cascader>
                {item.cloneIndex && (
                  <MinusCircleOutlined
                    class={'dynamic-delete-button'}
                    onClick={() => {
                      deleteType(item)
                    }}></MinusCircleOutlined>
                )}
              </span>
            )}
            {item.module === 'QuillEditor' && (
              <QuillEditor
                class={'quillEditor'}
                id={item.id}
                ref={item.id}
                width={state.quill.width}
                has-border={state.quill.border}
                //v-model={[state.value[item.id],'value']}
                value={state.value[item.id] || ''}
                sync-output={state.quill.syncOutput}
                theme={state.quill.theme}
                disabled={state.quill.disabled}
                fullscreen={state.quill.fullscreen}
                toolbar={state.quill.toolbar}
                upload={upload}></QuillEditor>
            )}
            {item.module === 'Tag' && (
              <div>
                {tags.map((tag, index) => {
                  return (
                    <Tag
                      closable={true}
                      onClose={() => {
                        tgeClose(item, tag)
                      }}>
                      {tag}
                    </Tag>
                  )
                })}
                {state.tagInputVisible && (
                  <Input
                    ref={'TagInput'}
                    type={'text'}
                    size="small"
                    style={{ width: '78px' }}
                    value={state.tagInputValue}
                    onChange={TagHandleEditInputChange}
                    onBlur={TagHandleInputConfirm}
                    onPressEnter={TagHandleInputConfirm}></Input>
                )}
                <Tag
                  onClick={() => {
                    showTagInput()
                  }}>
                  <plus-outlined />
                  点击添加标签
                </Tag>
              </div>
            )}
          </Form.Item>
        )
      })
    const onCancel = () => {
      state.visible = !state.visible
      assignData()
    }
    const deleteType = item => {
      state.basicFormConfig = state.basicFormConfig.filter(i => i !== item)
    }
    const upload = (file, insert) => {
      console.log(file)
      insert('https://ruiangeo-media.grewalleco.com/home_01_0108.webp', 'center')
    }
    return {
      state,
      // load,
      onSelect,
      onExpand,
      deletItem,
      updateItem,
      addition,
      onCancel,
      RenderForms,
      load,
      upload,
    }
  },
  components: {
    PlusOutlined,
    QuillEditor,
  },
  data() {
    return {
      testData: '',
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
    }
  },
  mounted() {
    //this.getAddressData() // 获取地址信息
    this.onSelect(['/api/user/manage/enterprise/'])
  },
  methods: {
    onIsOk() {
      let arr = []
      this.state.formConfig.forEach(item => {
        if (item.module === 'QuillEditor') {
          arr.push(item.id)
        }
      })
      const arrData = Array.from(new Set(arr))
      this.$refs.subForm
        .validate()
        .then(res => {
          if (arrData.length > 0) {
            // 富文本数据
            arrData.forEach(item => {
              res[item] = this.$refs[item].getContent()
            })
          }
          const beforeData = { ...this.state.value, ...res }
          const data = beforeData //清除没有数据的Key
          this.sendCreate(data, arrData)
        })
        .catch(error => {})
    },
    async sendCreate(data, arrData) {
      let enterprise = this.state.enterpriseData.id
      let enterprise_factory = this.state.enterpriseData.id
      if (!data.enterprise_factory) {
        data.enterprise = enterprise
      }
      if (data.native_place) data.native_place = data.native_place.slice(-1)[0] //地址的最后一级
      data.district = data.district && data.district.length !== 0 ? data.district.slice(-1)[0] : ''
      data.tags = this.state.tags ? this.state.tags : []
      Object.keys(data).forEach(key => {
        if (key === 'month_quantity') {
          data.month_quantity = this.state.month_quantity
          if (!data.month_quantity.unit) data.month_quantity.unit = '吨'
        }
        if (key === 'year_quantity') {
          data.year_quantity = this.state.year_quantity
          if (!data.year_quantity.unit) data.year_quantity.unit = '吨'
        }
      })
      let res
      if (this.state.updateFlag) {
        const id = this.state.value.id
        res = await upDate(this.state.selectData.url_path, { ...data, id })
      } else {
        let url = this.state.CRUDUrl
        if (this.state.selectData.isUpstream) {
          // 看是否为上游供应商如果是是上游供应商则替换为创建用户url
          url = this.state.selectData.url_path
        }
        res = await create(url, { ...data })
      }
      if (res.code === 0) {
        if (arrData.length > 0) {
          arrData.forEach(item => {
            this.state[item] = ''
          })
        }

        this.state.visible = !this.state.visible
        this.load()
      } else {
        Modal.error({
          title: '请求失败',
          content: res.message,
        })
      }
    },
    async formOk() {
      let arr = [] //value.slice(-1)[0]
      const data = { ...this.state.value }
      if (data.category && data.category !== null) data.category = data.category.slice(-1)[0]
      data.district = data.district && data.district.length !== 0 ? data.district.slice(-1)[0] : ''
      //处理产品类型 product_category
      Object.keys(data).forEach(item => {
        if (item.substr(0, 16) === 'product_category' && data[item]) {
          arr.push(data[item].slice(-1)[0])
        }
      })
      data.product_category = []
      // 处理网址
      const web = {
        ...this.state.website,
      }
      data.website = web
      if (data.address === null) data.address = ''
      const id = this.state.enterpriseData.id
      data.phone = this.state.contactNumber
      const res = await upDate(this.state.selectData.url_path, {
        ...data,
        enterprise: this.state.enterpriseData.id,
        id,
      })
      if (res.code === 0) {
        Modal.success({
          title: '修改成功',
        })
      } else {
        Modal.error({
          content: res.message,
        })
      }
    },
  },
  render(instance) {
    let i = 0
    let {
      searchValue,
      expandedKeys,
      autoExpandParent,
      treeData,
      columns,
      dataSource,
      spinning,
      formData,
      value,
      visible,
      ref,
      treeDataSing,
      formConfig,
      updateFlag,
      selectData,
      basicFormConfig,
      rules,
    } = instance.state
    columns &&
      columns.forEach(item => {
        if (item.dataIndex === 'cz') {
          item.customRender = record => {
            return (
              <span>
                <a onClick={() => instance.updateItem(record)}>修改</a>&nbsp;&nbsp;
                <a onClick={() => instance.deletItem(record)}>删除</a>
              </span>
            )
          }
        }
      })
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf()
        const beforeStr = item.title.substr(0, index)
        const afterStr = item.title.substr(index + searchValue.length)
        treeDataSing.push(item)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span
                style={{
                  color: '#f50',
                }}>
                {searchValue}
              </span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          )
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title} disabled={item.disabled} defaultExpandAll={true}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode disabled={item.disabled} defaultExpandAll={true} key={item.key} title={title} />
      })
    const addType = () => {
      const data = formConfig.filter(item => item.id === 'product_category' && !item.cloneIndex)
      i++
      data.forEach((e, index) => {
        const data = {
          id: `${e.id}${i}`,
          cloneIndex: i,
        }
        data.label = `子类型`
        basicFormConfig.push({ ...e, ...data })
      })
    }
    return (
      <div className={'dataContent'}>
        <Spin tip={'数据加载中'} delay={300} spinning={spinning}>
          <Row>
            <Col span={4}>
              <div className={'tree'}>
                <Tree
                  showLine
                  defaultSelectedKeys={['/api/user/manage/enterprise/']}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onExpand={(expandedKeys, e) => {
                    instance.onExpand(expandedKeys, e)
                  }}
                  onSelect={(selectedKeys, e, expandedKeys) => {
                    instance.onSelect(selectedKeys, e, expandedKeys)
                  }}>
                  {loop(treeData)}
                </Tree>
              </div>
            </Col>
            <Col span={19}>
              {selectData.addF && (
                <Button
                  style={{ bottom: '20px' }}
                  type="primary"
                  onClick={() => instance.addition(ref, formData, value)}>
                  新增
                </Button>
              )}
              {!selectData.pathF && (
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  rowKey={(record, index) => {
                    return index
                  }}
                  bordered></Table>
              )}
              {selectData.pathF && (
                <div className={'formDiv'}>
                  <Form ref={'subForm'} rules={rules} model={value} labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                    {instance.RenderForms(basicFormConfig)}
                    {/*<Form.Item  wrapperCol= {{span:10, offset: 8 }}><Button style={{width: "85%"}} type={"dashed"} icon={<PlusOutlined></PlusOutlined>} onClick={addType} >添加产品类型</Button></Form.Item>*/}
                  </Form>
                  <div className={'formButton'}>
                    <Button type="primary" onClick={instance.formOk}>
                      保存
                    </Button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <Modal
            width={960}
            title={updateFlag ? '修改' : '新增'}
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            onOk={() => {
              instance.onIsOk()
            }}
            onCancel={() => {
              instance.onCancel()
            }}>
            <Form ref={'subForm'} rules={rules} model={value} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              {instance.RenderForms(formConfig, instance)}
            </Form>
          </Modal>
        </Spin>
      </div>
    )
  },
}
export default DataDetails
