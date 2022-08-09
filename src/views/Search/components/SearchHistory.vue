<template>
  <div>
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon
          name="delete-o"
          class="delete-o"
          @click="isShow = true"
          v-show="isShow != true"
        />
        <span v-show="isShow" @click="allDele" style="margin-right: 5px"
          >全部删除</span
        >
        <span v-show="isShow" @click="isShow = false">完成</span>
      </template>
    </van-cell>

    <div>
      <van-cell
        :title="item"
        v-show="pastHistory"
        v-for="(item, index) in historyList"
        :key="index"
        @click.stop="clickHistory(item, index)"
      >
        <div>
          <!-- <van-icon name="close" class="delete-o" @click="deleteHis" /> -->
          <span v-show="isShow" @click.stop="deleteHis(index)" class="spanFn">
            <van-icon name="close" class="delete-o" />
          </span>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
// import { getSearchResult } from '@/api'
import { getSearchResult } from '@/api'
export default {
  data() {
    return {
      historyList: [],
      pastHistory: true,
      isShow: false
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
    isshowFn() {
      // console.log(111)
      this.isShow = true
    },
    getHistory() {
      if (localStorage.getItem('historyList')) {
        // historyList有值才执行接下来的操作
        const arrlist = JSON.parse(localStorage.getItem('historyList'))
        this.historyList = arrlist
        if (this.historyList.length !== 0) {
          this.pastHistory = true // 有值显示历史记录
        }
      } else {
        this.pastHistory = false
      }
    },

    // 点击历史记录直接搜索
    async clickHistory(item, index) {
      // console.log(item)
      // this.$parent.$parent.keyWords = item
      this.$emit('historyStr', item)
      // this.$emit('isShowSearchResult')
      // // 接口前处理
      await getSearchResult({
        q: item
      })
      // 调用搜索接口
      // console.log(result)
      this.$parent.isShowSearchResult = true
      // this.$bus.$emit('getHistoryText')

      const listIndex = index

      this.historyList.splice(0, 0, this.historyList[listIndex]) // 每次点击记录被点击的展示在最前面
      this.historyList = this.unique(this.historyList) // 去重

      localStorage.setItem('historyList', JSON.stringify(this.historyList)) // 新数组储存
    },

    // 去重方法封装
    unique(arr) {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index
      })
    },

    // 点击删除记录
    deleteHis(index) {
      console.log(111)
      if (isNaN(index) || index >= this.historyList.length) {
        return false
      }
      this.historyList.splice(index, 1)

      localStorage.setItem('historyList', JSON.stringify(this.historyList)) // 保存删除后的新数组
      if (this.historyList.length === 0) {
        this.pastHistory = false
      }
    },

    // 点击全部删除
    allDele() {
      localStorage.removeItem('historyList')
      this.getHistory()
    }
  }
}
</script>

<style>
/* .van-icon {
  top: 0.13rem;
} */

.van-field__left-icon .van-icon {
  top: 0;
}
/* .spanFn {
  margin-bottom: 10px;
} */
</style>
