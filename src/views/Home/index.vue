<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search" @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>

      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>

    <!-- 频道弹层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }" closeable close-icon-position="top-left">
      <channel-popup :myChannels="myChannels" @change_active="active = $event" @del_channel="delChannel"
        @add_channel="addChannel">
      </channel-popup>
      <!-- $event在模板中自定义事件接受的值是第一个参数 -->
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  setChannelToLocal,
  getChannelByLocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelPopup
  },
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    initMyChannels() {
      if (this.isLogin) {
        // 如果登录了就发送请求
        this.getMyChannel()
      } else {
        // 如果没有登录 就在本地拿 如果本地没有就发送默认的请求
        const MyChannels = getChannelByLocal()
        if (MyChannels) {
          this.myChannels = MyChannels
        } else {
          this.getMyChannel()
        }
      }
    },

    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()

        this.myChannels = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败, 请刷新')
      }
    },

    // 删除点击的频道
    async delChannel(id) {
      this.$toast.loading({
        message: '删除中...',
        forbidClick: true
      })
      try {
        const newChannel = this.myChannels.filter((item) => item.id !== id) // 然后在过滤掉数组里面相等id的
        if (this.isLogin) {
          await delChannel(id) // 先发送请求删除线上的
        } else {
          setChannelToLocal(newChannel)
        }
        this.myChannels = newChannel
        this.$toast.success('删除成功')
      } catch (error) {
        this.$toast.fail('删除失败')
      }
    },

    // 点击添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '添加中...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setChannelToLocal([...this.myChannels, channel])
        }
        // console.log(channel)

        this.myChannels.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        this.$toast.fail('添加失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  position: sticky;
  top: 0;
  left: 0;

  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 87px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.9;
  border-bottom: 1px solid #eee;
  z-index: 999;

  position: fixed;
  top: 92px;
  right: 0;
  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  margin-bottom: 100px;
  overflow: auto;
}
</style>
