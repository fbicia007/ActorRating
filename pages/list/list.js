// pages/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    hasMore: false,
    pageType: "",
    start: 0,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageType: options.type,
      start: 0,
      count: 10
    })
    var title = app.globalData.pageTypelist[options.type];
    wx.setNavigationBarTitle({ title: title })
    // wx.showLoading({
    //   title: '玩命加载中',
    //   mask: true,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })

    this.getFilm(this.data.start, this.data.count);

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

    if (this.data.hasMore) {
      var count = this.data.count
      this.setData({
        start: 0 + count,
        count: 5 + count
      })
      this.getFilm(this.data.start, this.data.count);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getFilm: function (start, count) {
    var that = this;

    app.getFilmInfo(this.data.pageType, start, count, function (res) {
      wx.hideLoading();
      var data = res.data;
      var films = that.data.films.concat(data)
      that.setData({
        films: films
        // total: data.total
      })

      // if (that.data.start == that.data.total) {
      //   that.setData({
      //     hasMore: false,
      //   })
      //   wx.showToast({
      //     title: '没有更多了',
      //     duration: 1000
      //   })
      // }

    })
  }, 

  onDetailClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("click id: ", data.id, " stauts: ", data.status)
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + data.id + "&status=" + data.status,
    })
  },

  onSearchClicked: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  }
})