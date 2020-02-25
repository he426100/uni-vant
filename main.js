import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$alert = function (content, buttonText = '确认', title = '提示', options = {}) {
    uni.showModal({
      title: title,
      content: content,
      confirmText: buttonText,
      ...options
    })
}

Vue.prototype.$showMsg = function (msg, duration = 2000, icon = 'none', options = {}) {
  uni.showToast({
      title: msg,
      duration: duration,
      icon: icon,
      ...options
  })
}

Vue.prototype.$error = function (msg, duration = 2000, options = {}) {
  this.$showMsg(msg, duration, 'none', options)
}

Vue.prototype.$success = function (msg, duration = 2000, options = {}) {
  this.$showMsg(msg, duration, 'success', options)
}

Vue.prototype.$showLoading = function (text = '加载中...') {
  uni.showLoading({
      title: text
  })
}

Vue.prototype.$hideLoading = function () {
  uni.hideLoading()
}

Vue.prototype.$confirm = function (content, title = '提示', options = {}) {
  if (typeof title === 'object') {
    options = title
    title = '提示'
  }
  return new Promise((resolve, reject) => {
    this.$alert(content, '确认', title, {
        success (res) {
            if (res.confirm) {
                resolve(true)
            } else {
                resolve(false)
            }
        },
        fail (res) {
            reject(res)
        },
        ...options
    })
  })
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
