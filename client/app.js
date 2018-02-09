var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')


App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
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
  getSearchRequest: function (text, start, count, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/search?srch_text=" + text + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  }
})