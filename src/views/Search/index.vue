<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keyWords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>

    <!-- <search-suggestions></search-suggestions>
    <search-results></search-results>
    <search-history></search-history> -->
    <!-- 用动态组件来显示和隐藏哪些组价 -->
    <component :is="componentName" :keyWords="keyWords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue' // 历史
import SearchResults from './components/SearchResults.vue' // 结果
import SearchSuggestions from './components/SearchSuggestions.vue' // 建议
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestions
  },
  data() {
    return {
      keyWords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    componentName() {
      // 如果是空字符串就是显示搜索历史
      if (this.keyWords === '') {
        return 'SearchHistory'
      }
      // 如果是点击了之后就是结果
      if (this.isShowSearchResult) {
        return 'SearchResults'
      }
      return 'SearchSuggestions'
    }
  },
  methods: {
    onSearch() {
      console.log('111')
      this.isShowSearchResult = true
    },

    // 聚焦之后里面有值就显示搜索建议
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
