<template>
  <div>
    <header>
      <div class="login" v-if="isLogin">登录后的盒子</div>
      <div class="logout" v-else>未登录后的盒子</div>
    </header>

    <main>收藏/历史、消息通知、小子</main>

    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'My',
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token // 双!!是false 单!是取反
    }
  },
  methods: {
    logout() {
      // 点击退出清除token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
