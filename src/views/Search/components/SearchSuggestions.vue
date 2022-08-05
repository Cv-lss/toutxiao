<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highilgSuggestions"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'loadsh'
import { getSearchSuggestionsApi } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyWords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  },
  computed: {
    // 关键词变红色
    highilgSuggestions() {
      // 让正则变成动态的 new RegExp()
      const reg = new RegExp(this.keyWords, 'ig')
      // 用map遍历服务器返回的数据
      return this.suggestions.map((item) => {
        // 用replace方法替换里面的内容 第一个参数是正则 第二个参数可以是函数
        return item.replace(reg, (match) => {
          return `<span style="color:red">${match}</span>`
        })
      })
    }
  },
  methods: {
    // 开启防抖 第一步设置定时器 第二步清楚上一次的定时器
    // 用loadsh的节流方法
    getSearchSuggestions: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsApi(this.keyWords)
        console.log(data)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }, 500)
  }
}
</script>

<style></style>
