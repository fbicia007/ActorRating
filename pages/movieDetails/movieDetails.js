var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviePosterWidth: 0,
    moviePosterHeight: 0,
    moviePoster: "",
    imageMode: "",
    tabs: ['简介', '演员'],
    stv: {
      windowWidth: 0,
      windowHeight: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false,
      pageHeight: 0
    },
    activeTab: 0,
    movie: "",
    actors: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var id = options.id
    var status = app.globalData.statusList[options.status]
    var movies = ""
    var openId = app.globalData.userInfo.openId

    let { tabs } = this.data
    var res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth
    this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length
    this.data.stv.windowWidth = res.windowWidth
    this.data.stv.windowHeight = res.windowHeight
    this.setData({
      stv: this.data.stv,
      moviePosterWidth: res.windowWidth,
      moviePosterHeight: res.windowHeight / 4
    })
    this.tabsCount = tabs.length

    wx.showLoading({
      title: '全力加载中...',
    })

    app.getFilmDetail(status, id, openId, function (res) {
      wx.hideLoading()
      var data = res.data[0]
      console.log("data: ", data)

      wx.setNavigationBarTitle({
        title: data.title,
      })
      that.setData({
        movie: data,
        actors: data.actors,
        moviePoster: data.posterH == '' ? data.posterV : data.posterH,
        imageMode: data.posterH == '' ? "aspectFill" : "widthFix"
      })

      console.log("actors: ", data.actors)
      console.log("moviePoster: ", that.data.moviePoster)
      console.log("imageMode: ", that.data.imageMode)
    })

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

  loadMoviePoster: function (e) {
    let { stv } = this.data;
    stv.pageHeight = this.data.stv.windowHeight - this.data.moviePosterHeight - 44
    this.setData({
      stv: this.data.stv
    })
  },

  loadMoviePosterError: function (e) {
    this.setData({
      moviePoster: "../../images/image_holder_h.png",
      imageMode: "widthFix"
    })
  },

  updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },

  handlerTabTap(e) {
    this.updateSelectedPage(e.currentTarget.dataset.index);
  },

  onLikeClicked: function(e) {
    var data = e.currentTarget.dataset
    var movieId = data.movieId
    var actorId = data.actorId
    var openId = app.globalData.userInfo.openId
    var likeSymbol = data.likeSymbol

    if (likeSymbol) {
      wx.showLoading({
        title: '正在取消...',
      })
    } else {
      wx.showLoading({
        title: '正在点赞...',
      })
    }

    var that = this
    app.getLikeRequest(openId, movieId, actorId, function (res) {
      wx.hideLoading()
      var data = res.data[0]
      var actors = that.data.actors
      for (let i = 0; i < actors.length; i++) {
        var actor = actors[i]
        if (actor.id == actorId) {
          actor.like = data.like
          actor.likeSymbol = data.likeSymbol
        }
      }
      that.setData({
        actors: actors
      })
    })
  }
})