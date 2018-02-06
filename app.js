//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    wx.login({
      success: function (loginResult) {
        wx.getUserInfo({
          success: function (userResult) {
            console.log("login: ", userResult.userInfo)
            console.log("code: ", loginResult.code)
            console.log("encryptedData: ", userResult.encryptedData)
            console.log("iv: ", userResult.iv)
            // callback(null, {
            //   code: loginResult.code,
            //   encryptedData: userResult.encryptedData,
            //   iv: userResult.iv,
            //   userInfo: userResult.userInfo,
            // })
          },

          fail: function (userError) {
            // var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态')
            // error.detail = userError
            // callback(error, null)
          },
        });
      },

      fail: function (loginError) {
        // var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态')
        // error.detail = loginError
        // callback(error, null)
      },
    })
  },
  globalData: {
    userInfo: null,
    basicUrl: "https://xuwang.de/actorrating",
    statusList: { "0": "coming_soon", "1": "in_theaters" },
    pageTypelist: { "coming_soon": "即将上映", "in_theaters": "正在热映" }
  },
  getFilmInfo: function (pageType, start, count, cb) {
    var that = this

    wx.request({
      url: that.globalData.basicUrl + "/" + pageType + '?start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getFilmDetail: function (pageType, id, cb) {
    var that = this
    console.log("url: ", that.globalData.basicUrl + "/" + pageType + '?id=' + id)
    wx.request({
      url: that.globalData.basicUrl + "/" + pageType + '?id=' + id,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getSearchRequest: function (text, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/search?srch_text=" + text,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  }
})