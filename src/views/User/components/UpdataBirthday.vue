<template>
  <div>
    <van-datetime-picker
      type="date"
      title="选择年月日"
      @confirm="confirmFn"
      @cancel="cancelFn"
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
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
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(2021, 0, 17),
      countArr: []
    }
  },
  methods: {
    async confirmFn(val) {
      const str = JSON.stringify(val)
      const time = str.substring(1, 11)
      // console.log(time)
      try {
        const result = await updataInfo({ birthday: time })
        console.log(result)
        this.$toast.success('成功')
        this.$parent.$parent.isShowBirthday = false
        this.$parent.$parent.getUserInfo()
      } catch (error) {
        this.$toast.fail('失败')
      }
    },

    cancelFn() {
      // 关闭弹窗
      this.$parent.$parent.isShowBirthday = false
    }
  },

  mounted() {
    // 修改进来的事件格式
    this.countArr = this.userInfo.birthday.split('-')
    console.log(this.countArr)
    this.currentDate = new Date(
      this.countArr[0],
      this.countArr[1],
      this.countArr[2]
    )
  }
}
</script>

<style></style>
