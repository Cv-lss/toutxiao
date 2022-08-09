<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="info-navbar"
    />

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

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      @click="updataNickname"
      :value="userInfo.name"
    >
    </van-cell>

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isShowNickname"
      :style="{ height: '100%', width: '100%' }"
    >
      <updata-nickname
        @isShowNickname="isShowNickname"
        :userInfo="userInfo"
      ></updata-nickname>
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      @click="updataSex"
      :value="userInfo.gender === 1 ? '女' : '男'"
    >
    </van-cell>
    <van-popup v-model="isShowSex" position="bottom" :style="{ height: '45%' }">
      <updata-sex :userInfo="userInfo"></updata-sex>
    </van-popup>

    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      @click="updataBirthday"
      :value="userInfo.birthday"
    ></van-cell>
    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <updata-birthday :userInfo="userInfo"></updata-birthday>
    </van-popup>
  </div>
</template>

<script>
import UpdataAvator from './components/UpdataAvator.vue'
import UpdataNickname from './components/UpdataNickname.vue'
import UpdataSex from './components/UpdataSex.vue'
import UpdataBirthday from './components/UpdataBirthday.vue'
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  components: { UpdataAvator, UpdataNickname, UpdataSex, UpdataBirthday },
  data() {
    return {
      userInfo: {},
      gender: '',
      show: false,
      photo: '',
      isShowNickname: false,
      isShowSex: false,
      isShowBirthday: false,
      birthday: ''
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
    },

    // 显示昵称组件
    updataNickname() {
      // console.log(111)
      this.isShowNickname = true
    },

    // 性别
    updataSex() {
      this.isShowSex = true
    },

    // 生日
    updataBirthday() {
      this.isShowBirthday = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.info-navbar) {
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
