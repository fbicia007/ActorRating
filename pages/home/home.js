var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [{}, {}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '演员评分',
    })

    wx.showLoading({
      title: '全力加载中...',
    })

    var that = this
    var statusList = Object.values(app.globalData.statusList).reverse()
    var titlelist = app.globalData.pageTypelist
    for (let i = 0; i < statusList.length; i++) {
      console.log("status: ", statusList[i])
      app.getFilmInfo(statusList[i], 0, 7, function (res) {
        wx.hideLoading()
        var data = res.data

        that.data.films[i] = { title: titlelist[statusList[i]], data: data, status: statusList[i] }
        that.setData({
          films: that.data.films
        })
        console.log("films: ", that.data.films)
      })
    }
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

  onDetailClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("click id: ", data.id, " stauts: ", data.status)
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + data.id + "&status=" + data.status,
    })
  },

  onMoreClicked: function (e) {
    var temp = e.currentTarget.dataset;
    console.log("tmp: ", temp.type)
    wx.navigateTo({
      url: '../list/list?type=' + temp.type
    })
  },

  onSearchClicked: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  }

})