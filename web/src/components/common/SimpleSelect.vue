<!--普通下拉选择框-->
<template>
  <div>
    <el-select
      style="width: 100%"
      :value="value"
      :clearable="clearable"
      :disabled="disabled"
      @change="change"
      :size="size"
      :multiple="multiple"
      :placeholder="placeholder"
      @input="emitChange($event)"
      v-if="!allowCreate">
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.remark }}</span>
      </el-option>
    </el-select>

    <el-select
      :value="value"
      :clearable="clearable"
      :disabled="disabled"
      @change="change"
      filterable
      allow-create
      :size="size"
      :placeholder="placeholder"
      @input="emitChange($event)"
      v-if="allowCreate">
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.remark }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'SimpleSelect',
    props: {
      itemKey: {default: 'key'},
      itemText: {default: 'text'},
      itemRemark: {default: 'remark'},
      placeholder: {
        type: String,
        default: '请选择'
      },
      allowCreate: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {},
      change: {
        type: Function,
        default: function (value) {
        }
      },
      size: {
        type: String,
        default: 'small'
      },
      options: {
        type: Array,
        default: function () {
          let list = [
            {key: '0', text: '测试1'},
            {key: '1', text: '测试2'}
          ]
          return list
        }
      },
      value: {}
    },
    data () {
      return {}
    },
    computed: {
      optionList () {
        let options = this.options.map(item => {
          return {
            value: item[this.itemKey],
            label: item[this.itemText],
            remark: item[this.itemRemark]
          }
        });
        return options;
      }
    },
    methods: {
      emitChange (val) {
        console.log(val)
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>

</style>
