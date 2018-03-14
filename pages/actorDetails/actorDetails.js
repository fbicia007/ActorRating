var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerHeight: "",
    commentTitle: "",
    commented: "",
    hideText: true,
    hideClass: 'up',
    showRating: false,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/rating_empty.png',
    selectedSrc: '../../images/rating_full.png',
    halfSrc: '../../images/rating_half.png',
    actor: "",
    averageRating: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = app.globalData.userInfo.openId
    var actorId = options.id

    loadActorDetails(that, openId, actorId)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
    if (app.globalData.reloadActorDetail) {
      app.globalData.reloadActorDetail = false
      var that = this
      var openId = app.globalData.userInfo.openId
      var actorId = this.data.actor.id
      console.log("reload")
      loadActorDetails(that, openId, actorId)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onCommentClicked: function () {
    var that = this
    wx.navigateTo({
      url: '../comment/comment?actorId=' + that.data.actor.id + '&commented=' + that.data.commented,
    })
  },

  showall: function () {
    var that = this;
    var hide = that.data.hideText;
    var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
    that.setData({
      hideText: !hide,
      hideClass: hideClass
    })
  },
  
  
})

function loadActorDetails(that, openId, actorId) {
  wx.showLoading({
    title: '全力加载中...',
  })

  app.getActorDetail(actorId, function (res) {
    wx.hideLoading()

    var data = res.data[0]
    console.log("data: ", data)

    that.setData({
      actor: data,
      averageRating: Math.round(data.averageRating)
    })

    if (data.rated) {
      that.setData({
        headerHeight: 520,
        showRating: true
      })
    } else {
      that.setData({
        headerHeight: 380,
        showRating: false
      })
    }
  })

  app.getMyComment(openId, actorId, function (res) {
    wx.hideLoading()

    var data = res.data[0]
    console.log("comment: ", data)

    if (data.comment != "" && data.rating != "") {
      that.setData({
        commentTitle: "我的评论",
        commented: true
      })
    } else {
      that.setData({
        commentTitle: "我要评论",
        commented: false
      })
    }
  }) 
}