<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button round size="small" class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        class="mychannel-item"
        :class="{ active: item.name === '推荐' }"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add_channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsInfo } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  computed: {
    recommendChannels() {
      // 计算属性计算出来的 先用filter拿到里面每一个数据 然后在用find过滤每一个复合条件的 然后取反 return出来
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  },
  methods: {
    // 获取全部频道信息接口
    async getAllChannels() {
      const { data } = await getAllChannelsInfo()
      console.log(data)
      this.allChannels = data.data.channels
    },

    // 点击频道要做的事情
    changeActive(index, item) {
      if (this.isEdit) {
        // false 执行
        if (item.name === '推荐') return // 如果等于推荐就不执行
        this.$emit('del_channel', item.id)
      } else {
        // 等于true执行
        // this.$emit('close') //可以使用自定义事件
        this.$parent.$parent.show = false // 这个使用parent属性更方便 可以找到父组件

        // 频道切换
        this.$emit('change_active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }

  :deep(.van-grid-item__content) {
    background-color: #eee;
  }

  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
  }

  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
