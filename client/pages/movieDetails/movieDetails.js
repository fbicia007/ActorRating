var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviePosterWidth: 0,
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
    actors: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var id = options.id
    var status = app.globalData.statusList[options.status]
    var movies = ""

    wx.showLoading({
      title: '全力加载中...',
    })

    app.getFilmDetail(status, id, function (res) {
      wx.hideLoading()
      var data = res.data[0]
      console.log("data: ", data)

      wx.setNavigationBarTitle({
        title: data.title,
      })
      that.setData({
        movie: data,
        actors: data.actors
      })
    })

    let { tabs } = this.data;
    var res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth;
    this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length
    this.data.stv.windowWidth = res.windowWidth
    this.data.stv.windowHeight = res.windowHeight
    this.setData({
      stv: this.data.stv,
      moviePosterWidth: res.windowWidth
    })
    this.tabsCount = tabs.length;
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
    var imageHeight = e.detail.height * (this.data.moviePosterWidth / e.detail.width)
    let { stv } = this.data;
    stv.pageHeight = this.data.stv.windowHeight - imageHeight - 36
    this.setData({
      stv: this.data.stv
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
    console.log("onLikeClicked movieId:", movieId, "actorId:", actorId, "openId:", app.globalData.userInfo.openId)
  }
})