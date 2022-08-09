<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :defaultIndex="userInfo.gender"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updataInfo } from '@/api'

export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },

  methods: {
    async onConfirm(value, index) {
      try {
        // Toast(`当前值：${value}, 当前索引：${index}`)
        console.log(value)
        const result = await updataInfo({ gender: index })
        console.log(result)
        this.$parent.$parent.getUserInfo()
        this.$parent.$parent.isShowSex = false
        this.$toast.success('成功')
      } catch (error) {
        this.$toast.fail('失败')
      }
    },
    onCancel() {
      // Toast('取消')
      this.$parent.$parent.isShowSex = false
    }
  }
}
</script>

<style></style>
