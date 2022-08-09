<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchResult"
        :key="item.id"
        :title="item.title"
      />
    </van-list>
    <!-- <van-cell-group>
      <van-cell
        v-for="(item, index) in searchResult"
        :key="index"
        :title="item.title"
      />
    </van-cell-group> -->
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      total: 0,
      searchResult: [],
      newArr: JSON.parse(localStorage.getItem('historyList')) || []
    }
  },
  mounted() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.keyWords
        })
        // console.log(result)
        // console.log(data, '111')
        if (data.data.results.length === 0) {
          this.list = [] // 清空数组
          this.finished = true // 停止加载
        }

        // 若数据条数不等于0
        // this.searchResult = data.data.results // 将数据放入list中
        this.searchResult.push(...data.data.results) // 将数据放入list中
        this.loading = false
        // 加载状态结束
        // 如果list长度大于等于总数据条数,数据全部加载完成
        // if (this.searchResult.length >= this.total) {
        //   this.finished = true // 结束加载状态
        // }

        // 搜索历史
        if (this.keyWords !== '') {
          this.newArr.push(this.keyWords)

          this.newArr = this.unique(this.newArr) // 调用unique方法去重

          this.list = []
          // console.log(this.list)
          for (let i = this.newArr.length; i > 0; i--) {
            // 数组倒序  最新输入的排在最上面
            this.list.push(this.newArr[i - 1])
          }

          if (this.list.length > 10) {
            // 最多保存10条
            this.list = this.list.slice(0, 10)
          }

          localStorage.setItem('historyList', JSON.stringify(this.list)) // 存localStorage
        }
      } catch (error) {
        console.log('失败')
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const timer = setTimeout(() => {
        this.getSearchResult({
          page: this.page++,
          per_page: this.per_page,
          q: this.keyWords
        })

        this.finished && clearTimeout(timer)
      }, 500)
    },
    // 去重方法封装
    unique(arr) {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index
      })
    }
  }
}
</script>

<style></style>
