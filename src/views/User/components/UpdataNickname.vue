<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入你的新昵称"
      show-word-limit
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
      message: ''
    }
  },
  mounted() {
    this.message = this.userInfo.name
  },
  methods: {
    onClickLeft() {
      //   Toast('返回')
      console.log(111)
      this.message = this.userInfo.name
      this.$parent.$parent.isShowNickname = false
    },
    async onClickRight() {
      //   Toast('按钮')
      try {
        const result = await updataInfo({ name: this.message })
        console.log(result)
        this.$parent.$parent.getUserInfo()
        this.$toast.success('更改成功')
        this.$parent.$parent.isShowNickname = false
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
