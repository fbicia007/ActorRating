var app = getApp()
var timer

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: "",
    searchText: "",
    focus: true,
    films: [],
    start: 0,
    count: 0,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索影片',
    })

    // this.setData({
    //   start: 0,
    //   count: 15
    // })

    // var that = this
    // setTimeout(function () {
    //   onSearchRequest(that, that.data.inputText, that.data.start, that.data.count)
    // }, 300)
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
      onSearchRequest(this, this.data.searchText, this.data.start + count, this.data.count + count)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadMoviePosterError: function (e) {
    var id = e.target.dataset.id
    var films = this.data.films

    for (let i = 0; i < films.length; i++) {
      if (films[i] != null && films[i].id == id) {
        films[i].posterV = "../../images/image_holder_v.png"
      }
    }

    this.setData({
      films: films
    })
  },
  
  searchInputEvent: function (e) {
    var value = e.detail.value
    clearTimeout(timer)
    var that = this
    timer = setTimeout(function() {
      onSearchRequest(that, value, 0, 15)
    }, 300)
    
  },

  onClearClicked: function (e) {
    this.setData({
      inputText: "",
      films: ""
    })
  },

  onFilmClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("data: ", data)
    console.log("click id: ", data.id, " stauts: ", data.status)

    if (data.status == 0) {
      var url = '../shootingMovieDetails/shootingMovieDetails?id=' + data.id + "&status=" + data.status
    } else {
      var url = '../movieDetails/movieDetails?id=' + data.id + "&status=" + data.status
    }

    wx.navigateTo({
      url: url
    })

  }
})

function onSearchRequest(that, value, start, count) {
  that.setData({
    searchText: value,
    start: start,
    count: count
  })
  app.getSearchMovieRequest(value, start, count, function (res) {
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

    var films = []
    if (start == 0) {
      films = data
    } else {
      films = that.data.films.concat(data)
    }

    that.setData({
      films: films
    })
  })
}