<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.show = false">取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { upDataAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },

    uploadAvator() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        // 提示正在上传
        this.$toast.loading({
          message: '图片正在上传...',
          forbidClick: true
        })
        try {
          const { data } = await upDataAvator(blob)
          // console.log(data)
          // 把新修改的传给父组件
          this.$emit('updata-avator', data.data.photo)
          // 关闭弹窗
          this.$parent.$parent.show = false

          // 提示成功
          this.$toast.success('上传成功~')
        } catch (error) {
          this.$toast.fail('上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
