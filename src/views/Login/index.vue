<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar title="登录" />

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 小图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证码的按钮 -->
        <!-- 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。
        在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。? -->
        <template #button>
          <van-button
            size="mini"
            round
            class="code-btn"
            native-type="button"
            v-if="isShow"
            @click="sendCode"
            >发送验证码
          </van-button>
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShow = true"
          />
        </template>
      </van-field>

      <div style="margin: 0.2rem">
        <van-button block type="info" native-type="submit" class="denglu"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 结构赋值
//  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
//  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
//  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
//  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
import { login, getCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: true
    }
  },
  methods: {
    // 封装一个loding提示
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },

    // 登录
    async onSubmit() {
      try {
        // 登陆成功后的提示
        this.loading()

        //   console.log("submit", values);
        // 向服务器发送请求
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)

        // console.log(data);

        // 发送请求找服务器那token 然后存在vuex的仓库里
        this.$store.commit('SET_TOKEN', token)

        // 登录成功后跳转页面
        this.$router.push('/profile')

        // 登录成功后的提示
        this.$toast.success('登录成功')
      } catch (error) {
        // 登录失败后的提示
        const status = error.response.status

        let message = '请重新登录'

        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    },

    // 获取验证码
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        // 加载提示
        this.loading()
        try {
          // 发送请求
          await getCodeAPI(this.mobile)
          // 给一个提示
          this.$toast.success('验证码获取成功')
          // 点击之后隐藏提示
          this.isShow = false
        } catch (error) {
          // 错误的时候要做的事情
          const status = error.response.status
          let message = '手机号错误'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #265686fd;

  // :deep是vue给的穿透样式用的 因为写了scoped之后样式只能在当前组件用
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

.toutiao {
  font-size: 40px;
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }

  .van-cell__value {
    flex: 10;
  }
}

.denglu {
  background-color: #265686fd;
  width: 630px;
  margin: 0 auto;
  border-radius: 15px;
}

:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }

  &.van-button--default {
    background-color: #eee;
    color: #a9929b;
  }
}
</style>
