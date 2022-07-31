// 封装本地存储 用class类  有封装 继承 多态的特性
class Storage {
  get(key) {
    const value = localStorage.getItem(key)

    // json.parse只能转换json格式的 如果不是json格式的会报错 所以用try判断一下 如果是json的 就转换一下return出去
    // 如果不是就直接return 出去value
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    // value是个对象 判断是不是对象 不能是null 如果是对象就转换一下
    if (typeof value === 'object' && value != null) {
      value = JSON.stringify(value)
    }
    // 把key和value存储进去
    localStorage.setItem(key, value)
  }

  remove(key) {
    // 删除存储的内容
    localStorage.removeItem(key)
  }
}

export default new Storage()
