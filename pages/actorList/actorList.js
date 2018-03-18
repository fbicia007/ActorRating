var app = getApp()
var timer

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: "",
    searchText: "",
    actors: [],
    start: 0,
    count: 0,
    hasMore: true,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/rating_empty.png',
    selectedSrc: '../../images/rating_full.png',
    halfSrc: '../../images/rating_half.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '演员',
    })

    this.setData({
      start: 0,
      count: 15
    })

    var that = this
    setTimeout(function () {
      onSearchRequest(that, that.data.inputText, that.data.start, that.data.count)
    }, 300)
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
    if (app.globalData.reloadActorList) {
      app.globalData.reloadActorList = false
      onSearchRequest(this, this.data.inputText, this.data.start, this.data.count)
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
    this.setData({
      focus: false
    })
    wx.hideKeyboard()
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
        count: 15 + count
      })
      onSearchRequest(this, this.data.searchText, this.data.start, this.data.count)
    }
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
    timer = setTimeout(function () {
      that.setData({
        inputText: value
      })
      onSearchRequest(that, value, 0, 15)
    }, 300)

  },

  onClearClicked: function (e) {
    this.setData({
      inputText: ""
    })
    onSearchRequest(this, this.data.inputText, 0, 15)
  },

  onActorClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("data: ", data)
    wx.navigateTo({
      url: '../actorDetails/actorDetails?id=' + data.id,
    })
  }
})

function onSearchRequest(that, value, start, count) {
  that.setData({
    searchText: value
  })
  app.getActors(value, start, count, function (res) {
    var dataWithRating = []
    var dataWithoutRating = []
    var averageRating = []
    if (start != 0) {
      dataWithRating = that.data.actors[0].data
      dataWithoutRating = that.data.actors[1].data
      averageRating = that.data.actors[0].rating
    }  

    var list = [{ "section": "", data: dataWithRating, rating: averageRating},
    { "section": "未达到最少评分条件", data: dataWithoutRating }]
    for (var i = 0; i < res.data.length; i++) {
      if (res.data[i] != null) {
        var tmpData = res.data[i]
        if (tmpData.rated) {
          dataWithRating.push(tmpData)
          averageRating.push(Math.round(tmpData.averageRating))
        } else {
          dataWithoutRating.push(tmpData)
        }

        that.setData({
          hasMore: true
        })
      } else {
        that.setData({
          hasMore: false
        })
      }
    }

    if (dataWithoutRating.length == 0) {
      list.splice(1, 1)
    }

    console.log("actors: ", list)

    that.setData({
      actors: list
    })
    
  })
}