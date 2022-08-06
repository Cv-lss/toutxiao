<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".png,.jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>

    <van-popup
      class="avator-popup"
      v-model="show"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <updata-avator
        :photo="photo"
        v-if="show"
        @updata-avator="userInfo.photo = $event"
      ></updata-avator>
    </van-popup>
  </div>
</template>

<script>
import UpdataAvator from './components/UpdataAvator.vue'
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  components: { UpdataAvator },
  data() {
    return {
      userInfo: {},
      show: false,
      photo: ''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    },

    // 用户点击选择图片触发
    async selectPhoto(e) {
      // e.target拿到元素 里面有一个file数组 就是图片的信息
      const file = e.target.files[0]

      // 第一种写法 不安全
      // const url = window.URL.createObjectURL(file)
      // // console.log(111)
      // this.photo = url

      // // 第二种写法
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      //   // 要清空元素的值 才可以选择统一张展示
      //   e.target.value = ''
      //   this.show = true
      // }

      // 因为是异步的 所以封装一个函数 Promise 用await来同步
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar) {
  background-color: #3296fa;

  .van-nav-bar__title {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

.avator-popup {
  background-color: #000;
}
</style>
