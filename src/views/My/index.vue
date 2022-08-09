<template style="background-color: #f5f7f9">
  <div>
    <header style="width: 375px; height: 200px">
      <div class="login" v-if="isLogin">
        <div data-v-b1a8e4f8="" class="user-info banner">
          <div data-v-b1a8e4f8="" class="van-row"></div>
          <div data-v-b1a8e4f8="" class="van-row">
            <div data-v-b1a8e4f8="" class="avator van-col van-col--12">
              <div
                data-v-b1a8e4f8=""
                class="van-row van-row--flex van-row--align-center van-row--justify-space-around"
              >
                <div
                  data-v-b1a8e4f8=""
                  class="van-image van-image--round"
                  style="width: 1.5rem; height: 1.5rem"
                >
                  <img
                    class="van-image__img"
                    :src="personalInformation.photo"
                  />
                </div>
                <span data-v-b1a8e4f8="" class="mobile">
                  {{ personalInformation.name }}
                </span>
              </div>
            </div>
            <div data-v-b1a8e4f8="" class="avator van-col van-col--11">
              <div
                data-v-b1a8e4f8=""
                class="van-row van-row--flex van-row--align-center van-row--justify-end"
              >
                <button
                  @click="$router.push('/user')"
                  data-v-b1a8e4f8=""
                  class="btn van-button van-button--default van-button--mini van-button--round"
                >
                  <div data-v-b1a8e4f8="" class="van-button__content">
                    <span data-v-b1a8e4f8="" class="van-button__text"
                      >编辑资料</span
                    >
                    <!-- <button @click="$router.push('/user')" class="EditData">
                      编辑资料
                    </button> -->
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div data-v-b1a8e4f8="" class="van-row">
            <div data-v-b1a8e4f8="" class="user-grid van-grid">
              <div
                data-v-b1a8e4f8=""
                class="van-grid-item"
                style="flex-basis: 25%"
              >
                <div
                  class="van-grid-item__content van-grid-item__content--center"
                >
                  <div class="van-grid-item__icon-wrapper">
                    0
                    <!---->
                  </div>
                  <span class="van-grid-item__text">头条</span>
                </div>
              </div>
              <div
                data-v-b1a8e4f8=""
                class="van-grid-item"
                style="flex-basis: 25%"
              >
                <div
                  class="van-grid-item__content van-grid-item__content--center"
                >
                  <div class="van-grid-item__icon-wrapper">
                    {{ personalInformation.fans_count }}
                    <!---->
                  </div>
                  <span class="van-grid-item__text">粉丝</span>
                </div>
              </div>
              <div
                data-v-b1a8e4f8=""
                class="van-grid-item"
                style="flex-basis: 25%"
              >
                <div
                  class="van-grid-item__content van-grid-item__content--center"
                >
                  <div class="van-grid-item__icon-wrapper">
                    0
                    <!---->
                  </div>
                  <span class="van-grid-item__text">关注</span>
                </div>
              </div>
              <div
                data-v-b1a8e4f8=""
                class="van-grid-item"
                style="flex-basis: 25%"
              >
                <div
                  class="van-grid-item__content van-grid-item__content--center"
                >
                  <div class="van-grid-item__icon-wrapper">
                    0
                    <!---->
                  </div>
                  <span class="van-grid-item__text">获赞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 未登录的盒子 -->
      <div class="logout" v-else @click="$router.push('/login')">
        <div data-v-b1a8e4f8="" class="login-register banner">
          <img
            data-v-b1a8e4f8=""
            src="data:image/png;base64,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"
            class="img"
          /><span data-v-b1a8e4f8="" class="login-text">登录 / 注册</span>
        </div>
      </div>
    </header>

    <main data-v-b1a8e4f8="">
      <div data-v-b1a8e4f8="" class="grid van-grid van-hairline--top">
        <div data-v-b1a8e4f8="" class="van-grid-item" style="flex-basis: 50%">
          <div
            role="button"
            tabindex="0"
            class="van-grid-item__content van-grid-item__content--center van-grid-item__content--clickable van-hairline"
          >
            <div class="van-grid-item__icon-wrapper">
              <span data-v-b1a8e4f8="" class="toutiao toutiao-shoucang1"></span
              ><!---->
            </div>
            <span class="van-grid-item__text">收藏</span>
          </div>
        </div>
        <div data-v-b1a8e4f8="" class="van-grid-item" style="flex-basis: 50%">
          <div
            role="button"
            tabindex="0"
            class="van-grid-item__content van-grid-item__content--center van-grid-item__content--clickable van-hairline"
          >
            <div class="van-grid-item__icon-wrapper">
              <span data-v-b1a8e4f8="" class="toutiao toutiao-lishi1"></span
              ><!---->
            </div>
            <span class="van-grid-item__text">历史</span>
          </div>
        </div>
      </div>
      <div data-v-b1a8e4f8="" class="link">
        <div
          data-v-b1a8e4f8=""
          role="button"
          tabindex="0"
          class="van-cell van-cell--clickable"
        >
          <div data-v-b1a8e4f8="" class="van-cell__title">
            <span data-v-b1a8e4f8="">消息通知</span>
          </div>
          <i
            data-v-b1a8e4f8=""
            class="van-icon van-icon-arrow van-cell__right-icon"
            ><!----></i
          >
        </div>
        <div
          data-v-b1a8e4f8=""
          role="button"
          tabindex="0"
          class="van-cell van-cell--clickable"
        >
          <div data-v-b1a8e4f8="" class="van-cell__title">
            <span data-v-b1a8e4f8="">小智同学</span>
          </div>
          <i
            data-v-b1a8e4f8=""
            class="van-icon van-icon-arrow van-cell__right-icon"
            ><!----></i
          >
        </div>
      </div>
    </main>

    <footer>
      <!-- <button v-if="isLogin" @click="logout"></button> -->
      <button
        v-if="isLogin"
        @click="logout"
        data-v-b1a8e4f8=""
        class="logout-btn van-button van-button--default van-button--normal van-button--block"
      >
        <div data-v-b1a8e4f8="" class="van-button__content">
          <span data-v-b1a8e4f8="" class="van-button__text">退出 </span>
        </div>
      </button>
    </footer>
  </div>
</template>

<script>
import { getPersonalInformation } from '@/api'
import { Dialog } from 'vant'

export default {
  name: 'My',
  data() {
    return {
      personalInformation: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token // 双!!是false 单!是取反
    }
  },
  mounted() {
    this.getPersonalInformation()
  },
  methods: {
    logout() {
      // 点击退出清除token
      Dialog.confirm({
        title: '黑马头条',
        message: '是否退出账号'
      })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    async getPersonalInformation() {
      try {
        const { data } = await getPersonalInformation()
        console.log(data)
        this.personalInformation = data.data
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
:deep(.user-info[data-v-b1a8e4f8]) {
  display: flex;
  flex-direction: column;
}
.banner[data-v-b1a8e4f8] {
  width: 100%;
  height: 5.33333rem;
  background: url(~@/assets/images/banner.png) no-repeat 50% / cover;
}
.user-info > .van-row[data-v-b1a8e4f8] {
  flex: 1;
}
.user-info > .van-row[data-v-b1a8e4f8] {
  flex: 1;
}
.user-info .avator > .van-row[data-v-b1a8e4f8],
.user-info .avator[data-v-b1a8e4f8] {
  height: 100%;
}

.van-col--12 {
  width: 50%;
}
.van-col {
  float: left;
  box-sizing: border-box;
  min-height: 0.02667rem;
}
.user-info .avator > .van-row[data-v-b1a8e4f8],
.user-info .avator[data-v-b1a8e4f8] {
  height: 100%;
}
.van-row--align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.van-row--justify-space-around {
  -webkit-justify-content: space-around;
  justify-content: space-around;
}
.van-row--flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.van-image--round {
  overflow: hidden;
  border-radius: 50%;
}

.van-image {
  position: relative;
  display: inline-block;
}
.van-image--round img {
  border-radius: inherit;
}
.van-image__error,
.van-image__img,
.van-image__loading {
  display: block;
  width: 100%;
  height: 100%;
}
img {
  border-style: none;
}
.user-info .mobile[data-v-b1a8e4f8] {
  font-size: 0.4rem;
  color: #fff;
}
.user-info .avator > .van-row[data-v-b1a8e4f8],
.user-info .avator[data-v-b1a8e4f8] {
  height: 100%;
}

.van-col--11 {
  width: 45.83333333%;
}
.van-col {
  float: left;
  box-sizing: border-box;
  min-height: 0.02667rem;
}
.user-info .avator > .van-row[data-v-b1a8e4f8],
.user-info .avator[data-v-b1a8e4f8] {
  height: 100%;
}

.van-row--align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.van-row--justify-end {
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.van-row--flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.user-info .btn[data-v-b1a8e4f8] {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}

.van-button--round {
  border-radius: 26.64rem;
}
.van-button--mini {
  height: 0.64rem;
  padding: 0 0.10667rem;
  font-size: 0.26667rem;
}
.van-button--default {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
.van-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}
.van-button:before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: #000;
  border: inherit;
  border-color: #000;
  border-radius: inherit;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
  content: ' ';
}
.van-button__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
.user-info .btn[data-v-b1a8e4f8] {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}
.van-button--mini {
  height: 0.64rem;
  padding: 0 0.10667rem;
  font-size: 0.26667rem;
}
.van-button--default {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
.van-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}
button,
select {
  text-transform: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input,
textarea {
  color: inherit;
  font: inherit;
}
.user-info .btn[data-v-b1a8e4f8][data-v-f7eea52e] {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}

.user-info .btn[data-v-b1a8e4f8][data-v-f7eea52e] {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}

.van-button[data-v-f7eea52e] {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.van-button--default[data-v-f7eea52e] {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}

.van-button--mini[data-v-f7eea52e] {
  height: 0.64rem;
  padding: 0 0.10667rem;
  font-size: 0.26667rem;
}

.van-button[data-v-f7eea52e] {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.van-button--default[data-v-f7eea52e] {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}

.van-button--mini[data-v-f7eea52e] {
  height: 0.64rem;
  padding: 0 0.10667rem;
  font-size: 0.26667rem;
}

button[data-v-f7eea52e],
input[data-v-f7eea52e],
textarea[data-v-f7eea52e] {
  color: inherit;
  font: inherit;
}

.user-info .btn[data-v-b1a8e4f8] {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}

.van-button--mini {
  height: 0.64rem;
  padding: 0 0.10667rem;
  font-size: 0.26667rem;
}
.van-button--default {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
.van-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}
button,
select {
  text-transform: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input,
textarea {
  color: inherit;
  font: inherit;
}
user agent stylesheet button {
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: buttontext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
  cursor: default;
}

.user-info > .van-row[data-v-b1a8e4f8] {
  flex: 1;
}
.van-grid {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.van-grid-item {
  position: relative;
  box-sizing: border-box;
}
.user-info .user-grid[data-v-b1a8e4f8] .van-grid-item__content {
  background-color: inherit;
  color: #fff;
}
.van-grid-item__content--center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0.42667rem 0.21333rem;
  background-color: #fff;
}
.user-info .user-grid[data-v-b1a8e4f8] .van-grid-item__icon-wrapper {
  font-size: 0.4rem;
}
.van-grid-item__icon-wrapper {
  position: relative;
}
.user-info
  .user-grid[data-v-b1a8e4f8]
  .van-grid-item__content
  .van-grid-item__text {
  color: #fff;
  margin-top: 0.13333rem;
}

.van-grid-item__text {
  color: #646566;
  font-size: 0.32rem;
  line-height: 1.5;
  word-break: break-all;
}

:deep(main) {
  display: block;
}
main .grid[data-v-b1a8e4f8] {
  color: #646566;
}
.van-grid {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.van-hairline,
.van-hairline--bottom,
.van-hairline--left,
.van-hairline--right,
.van-hairline--surround,
.van-hairline--top,
.van-hairline--top-bottom {
  position: relative;
}
.van-grid-item {
  position: relative;
  box-sizing: border-box;
}
.van-grid-item__content--clickable {
  cursor: pointer;
}

.van-grid-item__content--center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0.42667rem 0.21333rem;
  background-color: #fff;
}
.van-hairline,
.van-hairline--bottom,
.van-hairline--left,
.van-hairline--right,
.van-hairline--surround,
.van-hairline--top,
.van-hairline--top-bottom {
  position: relative;
}
.van-grid-item__icon-wrapper {
  position: relative;
}
user agent stylesheet div {
  display: block;
}
.van-grid-item__content--clickable {
  cursor: pointer;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0.42667rem 0.21333rem;
  background-color: #fff;
}
main .grid .toutiao.toutiao-shoucang1[data-v-b1a8e4f8] {
  color: #ed5253;
}

main .grid .toutiao[data-v-b1a8e4f8] {
  font-size: 0.6rem;
}
.toutiao {
  font-family: toutiao !important;
  font-size: 0.21333rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-grid-item__content--clickable {
  cursor: pointer;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0.42667rem 0.21333rem;
  background-color: #fff;
}
.van-grid-item__text {
  color: #646566;
  font-size: 0.32rem;
  line-height: 1.5;
  word-break: break-all;
}
.van-grid-item__content--clickable {
  cursor: pointer;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0.42667rem 0.21333rem;
  background-color: #fff;
}
main .grid .toutiao.toutiao-lishi1[data-v-b1a8e4f8] {
  color: #ffb31d;
}
main .link[data-v-b1a8e4f8] {
  margin: 0.13333rem 0;
}
.van-cell--clickable {
  cursor: pointer;
}

.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
.van-cell__title,
.van-cell__value {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.van-cell--clickable {
  cursor: pointer;
}
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
.van-cell__right-icon {
  margin-left: 0.10667rem;
  color: #969799;
}
.van-cell__left-icon,
.van-cell__right-icon {
  height: 0.64rem;
  font-size: 0.42667rem;
  line-height: 0.64rem;
}
.van-icon,
.van-icon:before {
  display: inline-block;
}
.van-icon {
  position: relative;
  font: normal normal normal 0.37333rem/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.logout-btn[data-v-b1a8e4f8] {
  color: red;
  border: 0;
}
.van-button--block {
  display: block;
  width: 100%;
}
.van-button--normal {
  padding: 0 0.4rem;
  font-size: 0.37333rem;
}
.van-button--default {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
.van-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.van-button__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}

.logout-btn[data-v-b1a8e4f8] {
  color: red;
  border: 0;
}
.van-button--normal {
  padding: 0 0.4rem;
  font-size: 0.37333rem;
}
.van-button--default {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
.van-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 1.17333rem;
  margin: 0;
  padding: 0;
  font-size: 0.42667rem;
  line-height: 1.2;
  text-align: center;
  border-radius: 0.05333rem;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.login-register[data-v-b1a8e4f8] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.banner[data-v-b1a8e4f8] {
  width: 100%;
  height: 5.33333rem;
  background: url(~@/assets/images/banner.png) no-repeat 50% / cover;
}

.login-register .img[data-v-b1a8e4f8] {
  width: 1.76rem;
  height: 1.76rem;
}
img {
  border-style: none;
}

.login-register .login-text[data-v-b1a8e4f8] {
  color: #fff;
  font-size: 0.4rem;
  margin-top: 0.26667rem;
}
</style>
