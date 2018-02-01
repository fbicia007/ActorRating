var app = getApp()
var timer

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: "",
    films: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索影片',
    })

    var that = this
    setTimeout(function () {
      onSearchRequest(that, that.data.inputText)
    }, 500)
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
  
  searchInputEvent: function (e) {
    var value = e.detail.value
    clearTimeout(timer)
    var that = this
    timer = setTimeout(function() {
      onSearchRequest(that, value)
    }, 300)
    
  },

  onClearClicked: function (e) {
    this.setData({
      inputText: ""
    })
    onSearchRequest(this, this.data.inputText)
  },

  onFilmClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("data: ", data)
    console.log("click id: ", data.id, " stauts: ", data.status)
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + data.id + "&status=" + data.status,
    })
  }
})

function onSearchRequest(that, value) {
  app.getSearchRequest(value, function (res) {
    var data = res.data
    console.log("data: ", data)
    that.setData({
      films: data
    })
  })
}