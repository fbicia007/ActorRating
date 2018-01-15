var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // movies: [
    //   //{ url: "http://www.test.com/image/1111.jpg" },
    //   { url: "../../images/烈日灼心-h.jpeg" },
    //   { url: "../../images/绣春刀2-h.jpeg" },
    //   { url: "../../images/战狼2-h.jpeg" },
    //   { url: "../../images/记忆大师-h.jpeg" }
    // ],
    releasedMovies: app.globalData.releasedMovies,
    list:
    [
      { id: 0, name: "上映热播"}, 
      { id: 1, name: "即将上映"}
    ] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '演员评分',
    })

    // wx.request({
    //   url: "https://xuwang.de/actorrating/releasedMovies",
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     "Content-Type":"application/json"
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }

    // })
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

  onItemClicked: function(res) {
    var id = res.currentTarget.dataset.id
    if (id == 0) {
      wx.navigateTo({
        url: '../released/released',
        success: function(res) {

        }
      })
    } else if (id == 1) {
      wx.navigateTo({
        url: '../willRelease/willRelease',
        success: function (res) {

        }
      })
    }
  },

  onSwiperClicked: function(res) {
    var id = res.currentTarget.id
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + id + "&released=" + 0,
      success: function (res) {

      }
    })
  }
})