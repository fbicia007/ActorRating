var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')


App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  globalData: {
    // userInfo: { openId: "oUaRM5U1am9wsIGWXc8TiZ4vJqoU"},
    userInfo: "",
    reloadActorDetail: false,
    reloadActorList: false,
    basicUrl: "https://bloomingstars.cn/actorrating",
    statusList: { "0": "coming_soon", "1": "in_theaters" },
    pageTypelist: { "coming_soon": "即将拍摄", "in_theaters": "正在热映" }
  },
  getFilmInfo: function (pageType, start, count, cb) {
    var that = this

    wx.request({
      url: that.globalData.basicUrl + "/" + pageType + '.php?start=' + start + '&count=' + count,
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
      url: that.globalData.basicUrl + "/" + pageType + ".php?openId=" + openId + '&id=' + id,
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
  getSearchMovieRequest: function (text, start, count, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/search.php?srch_text=%25" + text + "%25" + '&start=' + start + '&count=' + count,
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
      url: that.globalData.basicUrl + "/like.php?openId=" + openId + '&movieId=' + movieId + '&actorId=' + actorId,
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
  getActors: function (start, count, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/actors.php?start=" + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        cb(res)
      }
    })
  },
  getSearchActorRequest: function (text, start, count, cb) {
    var that = this
    wx.request({
      url: that.globalData.basicUrl + "/actors.php?srch_text=%25" + text + "%25" + '&start=' + start + '&count=' + count,
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
    wx.request({
      url: that.globalData.basicUrl + "/actors.php?id=" + id,
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