<!-- @format -->

<template>
  <div class="item">
    <!--          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" 选择框信息先预留
-->
    <a-table
      :row-appendselection="rowSelection"
      :columns="componentData.columns"
      :data-source="componentData.tableData"
      :size="componentData.size"
      :pagination="false"
      :row-key="
        (record, index) => {
          return index
        }
      "
      @change="handleTableChange"
    >
      <template #name="{ text }">
        <a-tooltip :title="text">
          {{ text }}
        </a-tooltip>
      </template>
      <template #cz="{ record }">
        <span>
          <a
            v-if="!componentData.allDisabled"
            @click="modification(record)"
          >修改</a>&nbsp;
          <!--          <a
            v-if="!componentData.allDisabled"
            @click="deleteItem(record)"
          >删除</a>&nbsp;-->
          <a
            v-if="componentData.allDisabled"
            @click="view(record)"
          >查看</a>&nbsp;

          <!--          <a @click="deleteItem(record)">删除</a>-->
        </span>
      </template>
      <template #czs="{ record }">
        <span>
          <a @click="modification(record)">修改</a>&nbsp; <a @click="view(record)">查看</a>&nbsp;
          <!--          <a @click="deleteItem(record)">删除</a>-->
        </span>
      </template>
      <template #viewEdit="{ record }">
        <span>
          <a @click="view(record)">查看</a>&nbsp;
          <!--          <a @click="modification(record)">编辑</a>-->
        </span>
      </template>
      <template #status="{ text, record }">
        <span>
          <span
            class="statusClass"
            :style="{ backgroundColor: record.statusClassColor }"
          />
          {{ text }}
        </span>
      </template>
    </a-table>
    <div class="pagination">
      <a-pagination
        v-model:current="componentData.pagination.page"
        :page-size="componentData.pagination.size"
        :total="componentData.pagination.count"
        :page-size-options="componentData.pagination.pageSizeOptions"
        :show-size-changer="true"
        show-quick-jumper
        @change="paginationLoad"
        @showSizeChange="showSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Index',
  props: ['proTableData', 'tableDataClick'],
  setup(props) {},
  data() {
    return {
      selectedRowKeys: [],
      componentData: {
        columns: [],
        tableData: [],
        size: 'default', // 继承接受 middle 和 small
        pagination: {
          page: 1, //-- 当前页
          size: 5, //-- 页大小
          count: 20, //--页总数
          pageSizeOptions: ['5', '10', '20', '30'],
        },
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
  watch: {
    proTableData: {
      handler(value, oldValue) {
        if (value) {
          this.componentData = { ...value }
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.componentData = { ...this.proTableData }
  },
  methods: {
    paginationLoad(page, pageSize) {
      //console.log('这里触发了一次页脚', page, pageSize)
      this.$emit('tableDataClick', 'pagination', this.componentData.pagination)
    },
    showSizeChange(current, size) {
      //console.log('这里触发了一次页脚', current,size)
      this.componentData.pagination.size = size
      this.componentData.pagination.page = current
      this.$emit('tableDataClick', 'pagination', this.componentData.pagination)
    },
    handleTableChange(pagination, filters, sorter) {
      //console.log(pagination, filters, sorter)
      this.$emit('tableDataClick', 'sorter', sorter)
    },
    onSelectChange(selectedRowKeys, selectedRowData) {
      //console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRowData)
      this.selectedRowKeys = selectedRowKeys
      this.$emit('tableDataClick', 'selectedRowData', selectedRowData)
    },
    view(record) {
      this.$emit('tableDataClick', 'view', record)
    },
    modification(record) {
      this.$emit('tableDataClick', 'modification', record)
    },
    deleteItem(record) {
      this.$emit('tableDataClick', 'deleteItem', record)
    },
  },
}
</script>

<style scoped lang="less">
.item {
  padding: 25px;
  display: flex;
  flex-direction: column;
  .menuList {
    height: 48px;
    font-weight: bold;
    align-items: center;
  }
  .pagination {
    padding-top: 25px;
    .ant-pagination {
      position: relative;
      float: right;
    }
  }
}

.statusClass {
  margin-right: 5px;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
</style>
