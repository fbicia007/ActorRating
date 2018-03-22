var wxlogin = function login(that, success, fail) {
  util.showBusy('正在登录')
  // 调用登录接口
  qcloud.login({
    success(result) {
      if (result) {
        console.log("loginSuccess1: ", result)
        util.showSuccess('登录成功')
        success(result)
      } else {
        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            console.log("loginSuccess2: ", result)
            success(result)
          },

          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
            fail(error)
          }
        })
      }
    },

    fail(error) {
      util.showModel('登录失败', error)
      console.log('登录失败', error)
      fail(error)
    }
  })
}