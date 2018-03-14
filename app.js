var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')


App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  globalData: {
    userInfo: { openId: "oUaRM5U1am9wsIGWXc8TiZ4vJqoU"},
    // userInfo: "",
    reloadActorDetail: false,
    basicUrl: "https://xuwang.de/actorrating",
    statusList: { "0": "coming_soon", "1": "in_theaters" },
    pageTypelist: { "coming_soon": "即将拍摄", "in_theaters": "正在热映" }
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
  getFilmDetail: function (pageType, id, openId, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/" + pageType + "?openId=" + openId + '&id=' + id,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getComingSoonFilmDetail: function (pageType, id, openId, cb) {
    var that = this
    console.log("url: ", that.globalData.basicUrl + "/" + pageType + ".php?openId=" + openId + '&id=' + id)
    wx.request({
      url: that.globalData.basicUrl + "/" + pageType + ".php?openId=" + openId + '&id=' + id,
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
      url: that.globalData.basicUrl + "/search?srch_text=%" + text + "%" + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getLikeRequest: function (openId, movieId, actorId, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/like?openId=" + openId + '&movieId=' + movieId + '&actorId=' + actorId,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getVoteRequest: function (openId, actorId, roleId, cb) {
    var that = this
    console.log("vote: ", that.globalData.basicUrl + "/coming_soon_vote.php?openId=" + openId + '&actorId=' + actorId + '&roleId=' + roleId)
    wx.request({
      url: that.globalData.basicUrl + "/coming_soon_vote.php?openId=" + openId + '&actorId=' + actorId + '&roleId=' + roleId,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getActors: function (text, start, count, cb) {
    var that = this
    console.log("getActors url: ", that.globalData.basicUrl + "/actors?srch_text=%" + text + "%" + '&start=' + start + '&count=' + count)
    wx.request({
      url: that.globalData.basicUrl + "/actors?srch_text=%" + text + "%" + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getActorDetail: function (id, cb) {
    var that = this
    console.log("getActorDetail url: ", that.globalData.basicUrl + "/actors?id=" + id)
    wx.request({
      url: that.globalData.basicUrl + "/actors?id=" + id,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getMyComment: function (openId, actorId, cb) {
    var that = this
    console.log("getMyComment url: ", that.globalData.basicUrl + "/actorVote.php?openId=" + openId + '&actorId=' + actorId)
    wx.request({
      url: that.globalData.basicUrl + "/actorVote.php?openId=" + openId + '&actorId=' + actorId,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  doComment: function (openId, actorId, rating, comment, cb) {
    var that = this
    console.log("comment url: ", that.globalData.basicUrl + "/actorVote.php?openId=" + openId + '&actorId=' + actorId + '&rating=' + rating + '&comment=' + comment)
    wx.request({
      url: that.globalData.basicUrl + "/actorVote.php?openId=" + openId + '&actorId=' + actorId + '&rating=' + rating + '&comment=' + comment,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  }
})