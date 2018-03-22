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
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索演员',
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
    if (this.data.hasMore) {
      var count = this.data.count
      onSearchRequest(this, this.data.searchText, this.data.start + count, this.data.count + count)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadActorPhotoError: function (e) {
    var section = e.target.dataset.section
    var id = e.target.dataset.id
    var actors = this.data.actors

    for (let i = 0; i < actors.length; i++) {
      if (actors[i] != null && actors[i].id == id) {
        actors[i].photo = "../../images/image_holder_v.png"
      }
    }

    this.setData({
      actors: actors
    })
  },

  searchInputEvent: function (e) {
    var value = e.detail.value.trim()
    if (value != "") {
      clearTimeout(timer)
      var that = this
      timer = setTimeout(function () {
        that.setData({
          inputText: value
        })
        onSearchRequest(that, value, 0, 15)
      }, 300)
    }
  },

  onClearClicked: function (e) {
    this.setData({
      inputText: "",
      actors: ""
    })
  },

  onActorClicked: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../actorDetails/actorDetails?id=' + data.id,
    })
  },
})

function onSearchRequest(that, value, start, count) {
  that.setData({
    searchText: value,
    start: start,
    count: count
  })
  
  app.getSearchActorRequest(value, start, count, function (res) {
    var data = []
    for (var i = 0; i < res.data.length; i++) {
      if (res.data[i] != null) {
        data.push(res.data[i])
        that.setData({
          hasMore: true
        })
      } else {
        that.setData({
          hasMore: false
        })
      }
    }

    var actors = []
    if (start == 0) {
      actors = data
    } else {
      actors = that.data.actors.concat(data)
    }

    that.setData({
      actors: actors
    })
  })
}