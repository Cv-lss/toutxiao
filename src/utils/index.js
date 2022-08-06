// 上传图片的函数

export const resolveToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
