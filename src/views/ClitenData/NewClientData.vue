<!-- @format -->

<template>
  <div class="newClientData">
    <!-- <a-divider type="vertical" />-->
    <div class="table">
      <a-tabs @change="tableCalbak">
        <a-tab-pane key="enterprise" tab="企业信息">
          <div class="enterprise">
            <a-form
              ref="enterpriseForm"
              :model="modalForm"
              :rules="rules"
              :label-col="labelCols"
              :wrapper-col="wrapperCols"
            >
              <div class="fromContent">
                <div :style="{ display: 'inline-block', width: '40%', verticalAlign: 'top' }">
                  <a-form-item ref="name" label="公司名称" name="name">
                    <a-input v-model:value="modalForm.name" />
                  </a-form-item>
                  <a-form-item ref="website" label="公司网址" name="website">
                    <a-input v-model:value="modalForm.website" />
                  </a-form-item>
                  <a-form-item ref="lxdh" label="公司电话" name="phone">
                    <a-input v-model:value="modalForm.phone" />
                  </a-form-item>
                  <a-form-item ref="address" label="公司地址" name="address">
                    <a-input v-model:value="modalForm.address" />
                  </a-form-item>
                  <a-form-item ref="output_type" label="产品类型" name="output_type">
                    <a-input v-model:value="modalForm.output_type" />
                  </a-form-item>
                  <a-form-item ref="yyzz" label="营业执照" name="yyzz">
                    <div class="clearfix">
                      <a-upload
                        v-model:fileList="fileList"
                        name="file"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :headers="headers"
                        :show-upload-list="false"
                        :action="actionUrl"
                        :data="oss"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                      >
                        <img
                          v-if="imageUrls"
                          :src="imageUrls"
                          alt="avatar"
                          :style="{ maxHeight: '150px', maxwidth: '200px' }"
                        />
                        <div v-else>
                          <!-- todo -->
                          <loading-outlined v-if="loadingUp" />
                          <plus-outlined v-else />
                          <div class="ant-upload-text">点击上传</div>
                        </div>
                      </a-upload>
                    </div>
                  </a-form-item>
                </div>
                <div :style="{ display: 'inline-block', width: '40%' }">
                  <a-form-item ref="industry" label="公司行业" name="industry">
                    <a-select v-model:value="modalForm.industry">
                      <a-select-option v-for="i in industry" :key="i.value" @value="i.value">
                        {{ i.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item ref="scale" label="公司规模" name="scale">
                    <a-select v-model:value="modalForm.scale">
                      <a-select-option v-for="i in scale" :key="i.value" @value="i.value">
                        {{ i.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item ref="enterprise_yield" label="公司产量" name="enterprise_yield">
                    <a-select v-model:value="modalForm.enterprise_yield" placeholder="请选择">
                      <a-select-option v-for="i in enterprise_yield" :key="i.value" :value="i.value">
                        {{ i.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item ref="status" label="业务状态" name="status">
                    <a-select v-model:value="modalForm.status" placeholder="请选择">
                      <a-select-option v-for="i in status" :key="i.value" @value="i.value">
                        {{ i.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item ref="level" label="客户级别" name="level">
                    <a-radio-group v-model:value="modalForm.level">
                      <a-radio :value="1"> 一级 </a-radio>
                      <a-radio :value="2"> 二级 </a-radio>
                      <a-radio :value="3"> 三级 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item ref="pay_type" label="付款方式" name="pay_type">
                    <a-radio-group v-model:value="modalForm.pay_type">
                      <a-radio :value="0"> 其他 </a-radio>
                      <a-radio :value="1"> 赊账 </a-radio>
                      <a-radio :value="2"> 现结 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item ref="source" label="来源" name="source">
                    <a-radio-group v-model:value="modalForm.source">
                      <a-radio :value="1"> 指定 </a-radio>
                      <a-radio :value="2"> 自主 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
        </a-tab-pane>
        <a-tab-pane key="prise_system" tab="企业价格体系">
          <div class="prise_system">
            <a-button @click="showModeList('prise_system')"> 新增执信息 </a-button>
            <div :style="{ height: '10px' }" />
            <a-table
              :style="{ minHeight: '380px' }"
              :pagination="false"
              :row-key="
                (record, index) => {
                  return index
                }
              "
              :columns="[
                {
                  title: '单价范围',
                  dataIndex: 'price_zone',
                  width: 150,
                  align: 'center',
                },
                {
                  title: '折扣',
                  dataIndex: 'discount',
                  width: 150,
                  align: 'center',
                },
                {
                  title: '优惠',
                  dataIndex: 'preferential',
                  width: 150,
                  align: 'center',
                },
                {
                  title: '活动',
                  dataIndex: 'activity',
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
              ]"
              :data-source="dataSource"
              bordered
            >
              <template #cz="{ index, record }">
                <span>
                  <a @click="deleteModalInfo(index, 'prise_system', record)">删除</a>&nbsp;
                  <a @click="editModelListInfo(index, 'prise_system', record)">编辑</a>
                </span>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="material" tab="企业原材料">
          <a-button @click="showModeList('material')"> 新增信息 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '原材料名称',
                dataIndex: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '原材料规格',
                dataIndex: 'sku',
                width: 150,
                align: 'center',
              },
              {
                title: '物性表',
                dataIndex: 'properties',
                width: 150,
                align: 'center',
              },
              {
                title: '成分清单',
                dataIndex: 'composition',
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
            ]"
            :data-source="dataSource"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'material', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'material', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="sample_product" tab="企业样品">
          <a-button @click="showModeList('sample_product')"> 新增信息 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '原材料规格',
                dataIndex: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '原材料规格',
                dataIndex: 'sku',
                width: 150,
                align: 'center',
              },
              {
                title: '物性表',
                dataIndex: 'properties',
                width: 150,
                align: 'center',
              },
              {
                title: '成分清单',
                dataIndex: 'composition',
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
            ]"
            :data-source="dataSource"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'material', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'material', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="enterprise_factory" tab="企业工厂">
          <a-button @click="showModeList('enterprise_factory')"> 新增信息 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '工厂名称',
                dataIndex: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '工厂地址',
                dataIndex: 'address',
                width: 150,
                align: 'center',
              },
              {
                title: '工厂面积',
                dataIndex: 'area',
                width: 150,
                align: 'center',
              },
              {
                title: '工厂人数',
                dataIndex: 'persons',
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
            ]"
            :data-source="dataSource"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'material', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'material', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="customer" tab="客户信息">
          <a-button @click="showModeList('enterprise_factory')"> 新增信息 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '客户昵称',
                dataIndex: 'nickname',
                width: 150,
                align: 'center',
              },
              {
                title: '职位',
                dataIndex: 'position',
                width: 150,
                align: 'center',
              },
              {
                title: '邮箱',
                dataIndex: 'email',
                width: 150,
                align: 'center',
              },
              {
                title: '部门',
                dataIndex: 'department',
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
            ]"
            :data-source="dataSource"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'material', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'material', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="sales_strategy" tab="销售策略">
          <a-button @click="showModeList('sales_strategy')"> 新增销售策略 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '策略目标',
                dataIndex: 'nickname',
                align: 'center',
                width: 200,
              },
              {
                width: 600,
                title: '策略内容',
                dataIndex: 'content',
                align: 'center',
              },
              {
                width: 200,
                title: '编辑',
                slots: { customRender: 'cz' },
                dataIndex: 'cz',
                align: 'center',
              },
            ]"
            :data-source="modalForm.sales_strategy"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'sales_strategy', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'sales_strategy', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="demand" tab="客户需求" force-render>
          <a-button @click="showModeList('demand')"> 新增客户需求 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                title: '需求内容',
                dataIndex: 'content',
                align: 'center',
                width: 300,
              },
              {
                title: '需求重点',
                dataIndex: 'focus',
                align: 'center',
                width: 300,
              },
              {
                title: '需求痛点',
                dataIndex: 'pain_points',
                align: 'center',
                width: 300,
              },
              {
                width: 200,
                title: '编辑',
                slots: { customRender: 'cz' },
                dataIndex: 'cz',
                align: 'center',
              },
            ]"
            :data-source="modalForm.demand"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'demand', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'demand', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="plan_implementation" tab="计划执行">
          <a-button @click="showModeList('plan_implementation')"> 新增执行计划 </a-button>
          <div :style="{ height: '10px' }" />
          <a-table
            :style="{ minHeight: '380px' }"
            :pagination="false"
            :row-key="
              (record, index) => {
                return index
              }
            "
            :columns="[
              {
                width: 240,
                title: '时间',
                dataIndex: 'nickname',
                align: 'center',
              },
              {
                width: 500,
                title: '内容',
                dataIndex: 'content',
                align: 'center',
              },
              {
                width: 200,
                title: '编辑',
                slots: { customRender: 'cz' },
                dataIndex: 'cz',
                align: 'center',
              },
            ]"
            :data-source="modalForm.plan_implementation"
            bordered
          >
            <template #cz="{ index, record }">
              <span>
                <a @click="deleteModalInfo(index, 'plan_implementation', record)">删除</a>&nbsp;
                <a @click="editModelListInfo(index, 'plan_implementation', record)">编辑</a>
              </span>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="sumit">
      <a-button type="primary" size="large" @click="onSubmit"> 保存 </a-button>
    </div>
    <a-modal v-model:visible="addmode" :title="title" :width="900" :destroy-on-close="true" @ok="addModelListInfo">
      <div v-if="this.tabKey === 'prise_system'">
        <a-form
          ref="prise_systemForm"
          :model="modalForm"
          :rules="rules"
          :label-col="labelCols"
          :wrapper-col="singleWrapperCols"
        >
          <a-form-item ref="price_zone" label="单价范围" name="price_zone">
            <a-input v-model:value="modalForm.price_zone" />
          </a-form-item>
          <a-form-item ref="discount" label="折扣" name="discount">
            <a-select v-model:value="modalForm.discount">
              <a-select-option v-for="i in 9" :key="i" :value="i * 0.1">
                {{ i + '折' }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item ref="preferential" label="优惠" name="preferential">
            <a-input v-model:value="modalForm.preferential" />
          </a-form-item>
          <a-form-item ref="activity" label="活动" name="activity">
            <a-input v-model:value="modalForm.activity" />
          </a-form-item>
        </a-form>
      </div>
      <div v-if="this.tabKey === 'material'">
        <div class="material">
          <a-form
            ref="materialForm"
            :model="modalForm"
            :rules="rules"
            :label-col="labelCols"
            :wrapper-col="singleWrapperCols"
          >
            <a-form-item ref="name" label="原材料名称" name="name">
              <a-input v-model:value="modalForm.name" />
            </a-form-item>
            <a-form-item ref="sku" label="原材料规格" name="sku">
              <a-input v-model:value="modalForm.sku" />
            </a-form-item>
            <a-form-item ref="properties" label="物性表" name="properties">
              <a-input v-model:value="modalForm.properties" />
            </a-form-item>
            <a-form-item ref="composition" label="成分清单" name="composition">
              <a-input v-model:value="modalForm.composition" />
            </a-form-item>
            <a-form-item ref="img_list" label="原材料图片" name="img_list">
              <div class="clearfix">
                <a-upload
                  v-model:fileList="fileList"
                  name="file"
                  list-type="picture"
                  class="avatar-uploader"
                  :headers="headers"
                  :action="actionUrl"
                  :data="oss"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <!--                  <img v-if="imageUrls" :src="imageUrls" alt="avatar" :style="{maxHeight: '150px',maxwidth:'200px'}" />-->
                  <!--                  <div v-else>-->
                  <!--                    &lt;!&ndash; todo &ndash;&gt;-->
                  <!--                    <loading-outlined v-if="loadingUp" />-->
                  <!--                    <plus-outlined v-else />-->
                  <!--                    <div class="ant-upload-text">点击上传</div>-->
                  <!--                  </div>-->
                  <a-button> <upload-outlined /> 点击上传 </a-button>
                </a-upload>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="this.tabKey === 'sample_product'">
        <div class="sample_product">
          <a-form
            ref="sample_productForm"
            :model="modalForm"
            :rules="rules"
            :label-col="labelCols"
            :wrapper-col="singleWrapperCols"
          >
            <a-form-item ref="sku" label="原材料规格" name="sku">
              <a-input v-model:value="modalForm.sku" />
            </a-form-item>
            <a-form-item ref="performance" label="样品性能" name="performance">
              <a-input v-model:value="modalForm.performance" />
            </a-form-item>
            <a-form-item ref="img_list" label="样品图片" name="img_list">
              <div class="clearfix">
                <a-upload
                  v-model:fileList="fileList"
                  name="file"
                  list-type="picture"
                  class="avatar-uploader"
                  :headers="headers"
                  :action="actionUrl"
                  :data="oss"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <!--                  <img v-if="imageUrls" :src="imageUrls" alt="avatar" :style="{maxHeight: '150px',maxwidth:'200px'}" />-->
                  <!--                  <div v-else>-->
                  <!--                    &lt;!&ndash; todo &ndash;&gt;-->
                  <!--                    <loading-outlined v-if="loadingUp" />-->
                  <!--                    <plus-outlined v-else />-->
                  <!--                    <div class="ant-upload-text">点击上传</div>-->
                  <!--                  </div>-->
                  <a-button> <upload-outlined /> 点击上传 </a-button>
                </a-upload>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="this.tabKey === 'enterprise_factory'">
        <div class="enterprise_factory">
          <a-form
            ref="enterprise_factoryForm"
            :model="modalForm"
            :rules="rules"
            :label-col="labelCols"
            :wrapper-col="singleWrapperCols"
          >
            <a-form-item ref="name" label="工厂名称" name="name">
              <a-input v-model:value="modalForm.name" />
            </a-form-item>
            <a-form-item ref="address" label="工厂地址" name="address">
              <a-input v-model:value="modalForm.address" />
            </a-form-item>
            <a-form-item ref="area" label="工厂面积" name="area">
              <a-input v-model:value="modalForm.area" />
            </a-form-item>
            <a-form-item ref="persons" label="工厂人数" name="persons">
              <a-input v-model:value="modalForm.persons" />
            </a-form-item>
            <a-form-item ref="total" label="成品成交量" name="total">
              <a-input v-model:value="modalForm.total" />
            </a-form-item>
            <a-form-item ref="product_lines" label="产线" name="product_lines">
              <a-input v-model:value="modalForm.product_lines" />
            </a-form-item>
            <a-form-item ref="success_rate" label="成品率" name="success_rate">
              <a-input v-model:value="modalForm.success_rate" />
            </a-form-item>
            <a-form-item ref="quantiry" label="现有生产数量" name="quantiry">
              <a-input v-model:value="modalForm.quantiry" />
            </a-form-item>
            <a-form-item ref="month_quantity" label="月生产量" name="month_quantity">
              <a-input v-model:value="modalForm.month_quantity" />
            </a-form-item>
            <a-form-item ref="year_quantity" label="年生产量" name="year_quantity">
              <a-input v-model:value="modalForm.month_quantity" />
            </a-form-item>
            <a-form-item ref="address_img" label="工厂地址图片" name="address_img">
              <div class="clearfix">
                <a-upload
                  v-model:fileList="fileList"
                  name="file"
                  list-type="picture"
                  class="avatar-uploader"
                  :headers="headers"
                  :action="actionUrl"
                  :data="oss"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <a-button> <upload-outlined /> 点击上传 </a-button>
                </a-upload>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="this.tabKey === 'customer'">
        <a-form
          ref="customerForm"
          :model="modalForm"
          :rules="rules"
          :label-col="labelCols"
          :wrapper-col="singleWrapperCols"
        >
          <a-form-item ref="nickname" label="客户昵称" name="nickname">
            <a-input v-model:value="modalForm.nickname" />
          </a-form-item>
          <a-form-item ref="email" label="邮箱" name="email">
            <a-input v-model:value="modalForm.email" />
          </a-form-item>
          <a-form-item ref="position" label="职位" name="position">
            <a-input v-model:value="modalForm.position" />
          </a-form-item>
          <a-form-item ref="phone" label="手机号码" name="phone">
            <a-input v-model:value="modalForm.phone" />
          </a-form-item>
          <a-form-item ref="gender" label="性别" name="gender">
            <a-select v-model:value="modalForm.discount">
              <a-select-option value="1"> 男 </a-select-option>
              <a-select-option value="2"> 女 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item ref="level" label="客户级别" name="level">
            <a-radio-group v-model:value="modalForm.level">
              <a-radio :value="1"> 一级 </a-radio>
              <a-radio :value="2"> 二级 </a-radio>
              <a-radio :value="3"> 三级 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item ref="description" label="描述" name="description">
            <a-input v-model:value="modalForm.description" />
          </a-form-item>
          <a-form-item ref="department" label="部门" name="department">
            <a-input v-model:value="modalForm.department" />
          </a-form-item>
          <a-form-item ref="source_user" label="用户来源" name="source_user">
            <a-input v-model:value="modalForm.source_user" />
          </a-form-item>
          <a-form-item ref="birth_date" label="出生日期" name="birth_date">
            <a-input v-model:value="modalForm.birth_date" />
          </a-form-item>
          <a-form-item ref="native_place" label="籍贯" name="native_place">
            <a-input v-model:value="modalForm.native_place" />
          </a-form-item>
          <a-form-item ref="start_work_date" label="入职时间" name="start_work_date">
            <a-input v-model:value="modalForm.start_work_date" />
          </a-form-item>
          <a-form-item ref="work_experience" label="工作经历" name="work_experience">
            <a-input v-model:value="modalForm.work_experience" />
          </a-form-item>
          <a-form-item ref="avatar" label="头像" name="avatar">
            <div class="clearfix">
              <a-upload
                v-model:fileList="fileList"
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :headers="headers"
                :show-upload-list="false"
                :action="actionUrl"
                :data="oss"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img
                  v-if="imageUrls"
                  :src="imageUrls"
                  alt="avatar"
                  :style="{ maxHeight: '150px', maxwidth: '200px' }"
                />
                <div v-else>
                  <!-- todo -->
                  <loading-outlined v-if="loadingUp" />
                  <plus-outlined v-else />
                  <div class="ant-upload-text">点击上传</div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div v-if="addModalInfoDiv === 'customer_enterprises'" class="addModalInfo">
        <a-row align="bottom" class="rowBotonm">
          <a-col :span="4" :push="2"> 姓名： </a-col>
          <a-col :span="16">
            <a-input v-model:value="modalForm.addInfo.nickname" placeholder="请输入客户姓名" />
          </a-col>
        </a-row>
        <a-row align="bottom" class="rowBotonm">
          <a-col :span="4" :push="2"> 性别： </a-col>
          <a-col :span="16">
            <a-radio-group v-model:value="modalForm.addInfo.gender">
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
              <a-radio :value="0"> 其他 </a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row align="bottom" class="rowBotonm">
          <a-col :span="4" :push="2"> 部门： </a-col>
          <a-col :span="16">
            <a-input v-model:value="modalForm.addInfo.department" placeholder="请输入客户部门" />
          </a-col>
        </a-row>
        <a-row class="rowBotonm">
          <a-col :span="4" :push="2"> 职务： </a-col>
          <a-col :span="16">
            <a-input v-model:value="modalForm.addInfo.position" placeholder="职务" />
          </a-col>
        </a-row>
        <a-row class="rowBotonm">
          <a-col :span="4" :push="2"> 邮箱： </a-col>
          <a-col :span="16">
            <a-input v-model:value="modalForm.addInfo.email" placeholder="请输入邮箱" />
          </a-col>
        </a-row>
        <a-row class="rowBotonm">
          <a-col :span="4" :push="2"> 电话： </a-col>
          <a-col :span="16">
            <a-input v-model:value="modalForm.addInfo.phone" placeholder="电话" />
          </a-col>
        </a-row>
      </div>
      <div v-if="addModalInfoDiv === 'demand'">
        <a-row class="rowBotonm">
          <a-col :span="4" push="1"> 需求详情： </a-col>
          <a-col :span="18">
            <a-textarea v-model:value="modalForm.addInfo.content" class="minTextarea" />
          </a-col>
        </a-row>
        <a-row class="rowBotonm">
          <a-col :span="4" push="1"> 需求重点： </a-col>
          <a-col :span="18">
            <a-textarea v-model:value="modalForm.addInfo.focus" class="minTextarea" />
          </a-col>
        </a-row>
        <a-row class="rowBotonm">
          <a-col :span="4" push="1"> 需求痛点： </a-col>
          <a-col :span="18">
            <a-textarea v-model:value="modalForm.addInfo.pain_points" class="minTextarea" />
          </a-col>
        </a-row>
      </div>
      <div v-if="addModalInfoDiv === 'sales_strategy'">
        <a-row :style="{ paddingBottom: '25px' }">
          <a-col :span="4" push="1"> 策略目标： </a-col>
          <a-col :span="18">
            <a-input v-model:value="modalForm.addInfo.nickname" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" push="1"> 策略方案： </a-col>
          <a-col :span="18">
            <a-textarea v-model:value="modalForm.addInfo.content" class="minTextarea" />
          </a-col>
        </a-row>
      </div>
      <div v-if="addModalInfoDiv === 'plan_implementation'">
        <a-row :style="{ paddingBottom: '25px' }">
          <a-col :span="4"> 执行时间: </a-col>
          <a-col :span="20">
            <a-range-picker v-model:value="modalForm.addInfo.date" class="rangePicek" @change="dateChange" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4"> 执行步骤 </a-col>
          <a-col :span="18">
            <a-textarea v-model:value="modalForm.addInfo.content" class="minTextarea" />
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  create,
  findSingle,
  yun_osss_token,
  upDate,
  findAllSingle,
  deleteDate,
  enterprisePut,
} from '../../api/clientData'
import moment from 'moment'
import { filterFormOld, form, tableData, columns, modalForm, modalFormOld, rules } from './fixedData'
import { PlusOutlined, LoadingOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
function removeEmptyField(obj) {
  let newObj = {}
  if (typeof obj === 'string') {
    obj = JSON.parse(obj)
  }
  if (obj instanceof Array) {
    newObj = []
  }
  if (obj instanceof Object) {
    for (let attr in obj) {
      // 属性值不为'',null,undefined才加入新对象里面(去掉'',null,undefined)
      if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
        if (obj[attr] instanceof Object) {
          // 空数组或空对象不加入新对象(去掉[],{})
          if (JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
            continue
          }
          // 属性值为对象,则递归执行去除方法
          newObj[attr] = removeEmptyField(obj[attr])
        } else if (
          typeof obj[attr] === 'string' &&
          ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
            (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
        ) {
          // 属性值为JSON时
          try {
            let attrObj = JSON.parse(obj[attr])
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyField(attrObj)
            }
          } catch (e) {
            newObj[attr] = obj[attr]
          }
        } else {
          newObj[attr] = obj[attr]
        }
      }
    }
  }
  return newObj
}
export default {
  name: 'NewClientData',
  components: {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
  },
  props: ['showModelTitle', 'addTogo', 'childrenId'],
  data() {
    return {
      title: '新增',
      modalForm: {},
      columns: [],
      dataSource: [],
      id: 29,
      url: '/api/user/manage/enterprise/',
      tabKey: 'enterprise',
      iscreate: false, //是否创建过
      rules,
      labelCols: { span: 8 },
      wrapperCols: { span: 16 },
      singleWrapperCols: { span: 8 },
      fileList: [],
      fileImgList: [],
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      actionUrl: '',
      oss: {},
      loadingUp: false,
      addmode: false,
      addModalInfoDiv: '',
      imageUrl: '',
      changeUrl: '',
      industry: [
        {
          name: '',
          value: 0,
        },
        {
          name: '化工',
          value: 1,
        },
        {
          name: '食品盒',
          value: 2,
        },
        {
          name: '节能环保',
          value: 3,
        },
      ],
      scale: [
        {
          name: '',
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
      enterprise_yield: [
        {
          name: '',
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
      status: [
        {
          name: '',
          value: 0,
        },
        {
          name: '潜在客户',
          value: 1,
        },
        {
          name: '签约中',
          value: 2,
        },
        {
          name: '已签约',
          value: 3,
        },
        {
          name: '已完成',
          value: 4,
        },
      ],
    }
  },
  computed: {
    imageUrls() {
      let imgUrl = ''
      if (this.modalForm.photo != null && this.changeUrl === '') {
        imgUrl = this.modalForm.oss_host + this.modalForm.photo
      } else {
        imgUrl = this.changeUrl
      }

      return imgUrl
    },
  },
  mounted() {
    this.tableCalbak('enterprise')
  },
  methods: {
    async load() {
      const key = this.tabKey
      let res = {}
      let requestUrl = ''
      const id = this.childrenId
      if (key != 'enterprise') {
        this.url = `/api/user/manage/enterprise/${key}/`
        requestUrl = `/api/user/manage/enterprise/${key}/?enterprise=`
      } else {
        this.url = `/api/user/manage/enterprise/`
        requestUrl = `/api/user/manage/enterprise/`
      }
      res = await findAllSingle(requestUrl, { id })
      let data = {}
      if (this.tabKey != 'enterprise') {
        if (res.result.results.length > 0) {
          this.iscreate = true
          data = { ...res.result.results[0] }
        } else {
          this.iscreate = false
        }
      } else {
        data = res.result
      }
      if (key === 'enterprise') {
        this.iscreate = true
      }
      const imgUrl = 'https://media.grewalleco.com/'
      if (data.img_list && data.img_list.length > 0) {
        data.img_list.forEach((item, index) => {
          this.fileList.push({
            uid: index,
            url: imgUrl + item,
          })
        })
      }
      if (data.address_img && data.address_img.length > 0) {
        data.address_img.forEach((item, index) => {
          this.fileList.push({
            uid: index,
            url: imgUrl + item,
          })
        })
      }
      this.dataSource = res.result.results
      data[this.tabKey] = res.result.results
      this.modalForm = { ...data }
    },
    async beforeUpload(file) {
      let o = await yun_osss_token()
      const oss = o.result
      this.actionUrl = oss.host
      const obj = {
        success_action_status: 201,
        OSSAccessKeyId: oss.accessid,
        policy: oss.policy,
        Signature: oss.signature,
        key: oss.dir + oss.expire,
      }
      this.modalForm.photo = oss.dir + oss.expire
      this.modalForm.oss_host = oss.host
      this.oss = obj
      this.fileImgList.push(oss.dir + oss.expire)
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleChange(info) {
      /* console.log(info.file);*/
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.changeUrl = imageUrl
        })
        ;(this.imageUrl = this.modalForm.oss_host + this.modalForm.photo),
          this.fileImgList.forEach(item => {
            if (this.modalForm.img_list) {
              this.modalForm.img_list.push(item)
            }
            if (this.modalForm.address_img) {
              this.modalForm.address_img.push(item)
            }
          })
      }
      if (info.file.status === 'error') {
      }
    },
    async tableCalbak(key) {
      this.fileList = []
      this.modalForm = {}
      this.tabKey = key
      const id = this.childrenId
      let res = {}
      let requestUrl = ''
      if (key != 'enterprise') {
        this.url = `/api/user/manage/enterprise/${key}/`
        requestUrl = `/api/user/manage/enterprise/${key}/?enterprise=`
      } else {
        this.url = `/api/user/manage/enterprise/`
        requestUrl = `/api/user/manage/enterprise/`
      }
      res = await findAllSingle(requestUrl, { id })
      let data = {}
      if (this.tabKey != 'enterprise') {
        if (res.result.results.length > 0) {
          this.iscreate = true
          data = { ...res.result.results[0] }
        } else {
          this.iscreate = false
        }
      } else {
        data = res.result
      }
      if (key === 'enterprise') {
        this.iscreate = true
      }
      const imgUrl = 'https://media.grewalleco.com/'

      if (data.img_list && data.img_list.length > 0) {
        data.img_list.forEach((item, index) => {
          this.fileList.push({
            uid: index,
            url: imgUrl + item,
          })
        })
      }
      if (data.address_img && data.address_img.length > 0) {
        data.address_img.forEach((item, index) => {
          this.fileList.push({
            uid: index,
            url: imgUrl + item,
          })
        })
      }
      this.dataSource = res.result.results
      data[this.tabKey] = res.result.results
      this.modalForm = { ...data }
    },
    deleteModalInfo(index, key, record) {
      switch (key) {
        case 'customer_enterprises':
          this.modalForm.customer_enterprises.splice(index, 1)

          break
        case 'demand':
          this.modalForm.demand.splice(index)
          break
        case 'sales_strategy':
          this.modalForm.sales_strategy.splice(index)
          break
        case 'plan_implementation':
          this.modalForm.plan_implementation.splice(index)
          break
      }
      const that = this
      Modal.warning({
        title: '你确定要删除此条信息么',
        onOk: () => that.dele(record),
      })
    },
    async dele(record) {
      const url = this.url
      const res = await deleteDate(url, { ...record })
      if (res.code === 0) {
        this.load()
      }
    },
    editModelListInfo(index, key, record) {
      let obj = this.modalForm[this.tabKey][index]
      this.modalForm.addInfo = obj
      this.modalForm.editIndex = index // 添加索引
      this.title = '编辑'
      this.addModalInfoDiv = key
      this.addmode = true
    },
    async addModelListInfo() {
      const that = this
      const key = this.addModalInfoDiv
      const index = this.modalForm.editIndex
      let res // 修改或者查询数据
      switch (key) {
        case 'customer_enterprises':
          let obj = this.modalForm.addInfo

          let addObj = {
            ...obj,
          }
          let ss = ''
          Object.keys(addObj).forEach(key => {
            ss = addObj[key]
          })
          if (ss === undefined) {
            this.$error({
              title: '新增失败',
              content: '字段不能为空',
            })
            return
          }
          let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
          let nub = /^\d+$|^\d+[.]?\d+$/
          if (reg.test(obj.email) === false) {
            this.$error({
              title: '错误',
              content: '邮箱不合法',
            })
            return
          }
          if (nub.test(obj.phone) === false) {
            this.$error({
              title: '错误',
              content: '手机号码输入有误',
            })
            return
          }

          if (this.title === '新增') {
            this.modalForm.customer_enterprises.push(addObj)
          } else {
            this.modalForm.customer_enterprises.splice(index, 1, addObj)
          }

          break
        case 'demand':
          let a = {
            ...this.modalForm.addInfo,
          }
          console.log(a)
          let aText = ''
          Object.keys(a).forEach(key => {
            aText = a[key]
          })
          if (!aText) {
            this.$error({
              title: '新增失败',
              content: '字段不能为空',
            })
            return
          }
          if (this.title === '新增') {
            this.modalForm.demand.push(a)
          } else {
            this.modalForm.demand.splice(index, 1, a)
          }
          break
        case 'sales_strategy':
          const b = {
            ...this.modalForm.addInfo,
          }
          let bText = ''
          Object.keys(b).forEach(key => {
            bText = b[key]
          })
          if (!bText) {
            this.$error({
              title: '新增失败',
              content: '字段不能为空',
            })
            return
          }
          if (this.title === '新增') {
            this.modalForm.sales_strategy.push(b)
          } else {
            this.modalForm.sales_strategy.splice(index, 1, b)
          }
          break
        case 'plan_implementation':
          if (!this.modalForm.addInfo.date) {
            this.$error({
              title: '新增失败',
              content: '字段不能为空',
            })
            return
          }
          let start_time = moment(this.modalForm.addInfo.date[0]).format('YYYY-MM-DD') || undefined
          let end_time = moment(this.modalForm.addInfo.date[1]).format('YYYY-MM-DD') || undefined
          const c = {
            date: this.modalForm.addInfo.date,
            nickname: `${start_time}到${end_time}`,
            content: this.modalForm.addInfo.content,
            start_time: moment(this.modalForm.addInfo.date[0]).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(this.modalForm.addInfo.date[1]).format('YYYY-MM-DD HH:mm:ss'),
          }

          let cText = ''
          Object.keys(c).forEach(key => {
            cText = c[key]
          })
          if (cText === undefined) {
            this.$error({
              title: '新增失败',
              content: '字段不能为空',
            })
            return
          }
          const cc = {
            nickname: '202001-202002',
            content: '很多的内容',
            start_time: '撒大苏打',
            end_time: '啊手动阀手动阀',
          }
          if (this.title === '新增') {
            this.modalForm.plan_implementation.push(c)
          } else {
            this.modalForm.plan_implementation.splice(index, 1, c)
          }
          break
      }
      const data = { ...this.modalForm }
      if (this.title === '编辑') {
        // 修改数据
        res = await upDate(this.url, { ...data, enterprise: this.childrenId, id: data.id })
      } else {
        // 新增数据
        res = await create(this.url, { ...data, enterprise: this.childrenId })
      }

      if (res.code === 0) {
        Modal.success({
          title: '保存成功',
          onOk: () => (that.addmode = !that.addmode),
        })
        this.load()
      } else {
        Modal.error({
          title: '保存失败',
          content: res.message,
        })
        return
      }
      this.modalForm = {}
    },
    onSubmit() {
      this.$refs[`${this.tabKey}Form`]
        .validate()
        .then(res => {
          const data = removeEmptyField(this.modalForm)
          this.sendUserList(data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async sendUserList(data) {
      let res
      if (this.iscreate === false) {
        // 没有创建过 现在创建新数据
        res = await create(this.url, { ...data, enterprise: this.childrenId })
      } else {
        // 更新数据
        res = await upDate(this.url, { ...data, enterprise: this.childrenId, id: this.modalForm.id })
      }
      if (res.code === 0) {
        Modal.success({
          title: '客户数据保存成功',
          content: '您可以选择选择修改其他数据或者返回上一层',
        })
      } else {
        Modal.error({
          title: '客户数据保存失败',
          content: res.message,
        })
      }
    },
    showModeList(key) {
      this.title = '新增'
      this.addmode = true
      this.modalForm = {}
      this.addModalInfoDiv = key
    },
    dateChange(date, dateString) {},
  },
}
</script>

<style scoped lang="less">
.newClientData {
  padding: 25px;
  display: flex;
  justify-content: space-between;
  min-height: 525px;

  .table {
    width: 100%;
  }
  .sumit {
    position: absolute;
    top: 3%;
    margin-left: 92%;
  }
  .addModalInfo {
    .ant-row {
      padding-bottom: 20px !important;
    }
  }
  .fromContent {
    position: relative;
    width: 100%;
  }
}
.rowBotonm {
  padding-bottom: 20px;
}
.minTextarea {
  min-height: 100px;
}
.rangePicek {
  width: 452px;
}
</style>
